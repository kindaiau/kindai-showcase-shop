import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import React from "https://esm.sh/react@18.3.1";
import { renderAsync } from "https://esm.sh/@react-email/components@0.0.22";
import { NurtureEmail1 } from "../_shared/email-templates/templates/NurtureEmail1.tsx";
import { NurtureEmail2 } from "../_shared/email-templates/templates/NurtureEmail2.tsx";
import { NurtureEmail3 } from "../_shared/email-templates/templates/NurtureEmail3.tsx";
import { NurtureEmail4 } from "../_shared/email-templates/templates/NurtureEmail4.tsx";
import { NurtureEmail5 } from "../_shared/email-templates/templates/NurtureEmail5.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email sequence configuration
const EMAIL_SEQUENCE = [
  { 
    number: 1, 
    subject: "You're in. Here's why courses don't work.",
    delayDays: 0,
    template: NurtureEmail1
  },
  { 
    number: 2, 
    subject: "What if AI did the work FOR you?",
    delayDays: 2,
    template: NurtureEmail2
  },
  { 
    number: 3, 
    subject: '"But I\'m not technical..."',
    delayDays: 4,
    template: NurtureEmail3
  },
  { 
    number: 4, 
    subject: "What you're actually getting",
    delayDays: 6,
    template: NurtureEmail4
  },
  { 
    number: 5, 
    subject: "Last call, rebel",
    delayDays: 8,
    template: NurtureEmail5
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    const { action, email, name, subscriberId } = await req.json();

    // Action: "enqueue" - Add a new subscriber to the nurture sequence
    if (action === "enqueue") {
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check if already in queue
      const { data: existing } = await supabase
        .from("email_nurture_queue")
        .select("id, status")
        .eq("email_address", email)
        .eq("sequence_name", "rebel-toolkit")
        .single();

      if (existing && existing.status === "active") {
        console.log(`Email ${email.substring(0, 3)}*** already in active nurture sequence`);
        return new Response(JSON.stringify({ status: "already_enrolled" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Calculate first email send time (immediate for email 1)
      const now = new Date();
      
      const { error: insertError } = await supabase
        .from("email_nurture_queue")
        .upsert({
          subscriber_id: subscriberId || null,
          email_address: email,
          subscriber_name: name || "Rebel",
          sequence_name: "rebel-toolkit",
          current_email_number: 0,
          next_send_at: now.toISOString(),
          status: "active",
          emails_sent: [],
        }, { onConflict: "email_address" });

      if (insertError) {
        console.error("Error enqueueing subscriber:", insertError);
        throw insertError;
      }

      console.log(`Enqueued ${email.substring(0, 3)}*** for nurture sequence`);
      return new Response(JSON.stringify({ status: "enrolled" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: "process" - Process pending emails (called by cron or manually)
    if (action === "process") {
      const now = new Date();
      
      // Get all subscribers who need an email sent
      const { data: pendingEmails, error: fetchError } = await supabase
        .from("email_nurture_queue")
        .select("*")
        .eq("status", "active")
        .lte("next_send_at", now.toISOString())
        .order("next_send_at", { ascending: true })
        .limit(50); // Process in batches

      if (fetchError) {
        console.error("Error fetching pending emails:", fetchError);
        throw fetchError;
      }

      if (!pendingEmails || pendingEmails.length === 0) {
        console.log("No pending emails to send");
        return new Response(JSON.stringify({ processed: 0 }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`Processing ${pendingEmails.length} pending emails`);
      let successCount = 0;
      let errorCount = 0;

      for (const subscriber of pendingEmails) {
        try {
          const nextEmailNumber = subscriber.current_email_number + 1;
          const emailConfig = EMAIL_SEQUENCE.find(e => e.number === nextEmailNumber);

          if (!emailConfig) {
            // Sequence complete
            await supabase
              .from("email_nurture_queue")
              .update({ 
                status: "completed",
                next_send_at: null 
              })
              .eq("id", subscriber.id);
            
            console.log(`Completed sequence for ${subscriber.email_address.substring(0, 3)}***`);
            continue;
          }

          // Render the email
          const html = await renderAsync(
            React.createElement(emailConfig.template, {
              firstName: subscriber.subscriber_name || "Rebel",
              senderName: "The Kindai Team",
            })
          );

          // Send the email
          const { error: emailError } = await resend.emails.send({
            from: "Kindai <hello@kindai.com.au>",
            to: [subscriber.email_address],
            subject: emailConfig.subject,
            html,
          });

          if (emailError) {
            console.error(`Failed to send email ${nextEmailNumber} to ${subscriber.email_address.substring(0, 3)}***:`, emailError);
            errorCount++;
            continue;
          }

          // Calculate next send time
          const nextEmailConfig = EMAIL_SEQUENCE.find(e => e.number === nextEmailNumber + 1);
          let nextSendAt = null;
          
          if (nextEmailConfig) {
            const daysDiff = nextEmailConfig.delayDays - emailConfig.delayDays;
            const nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + daysDiff);
            nextSendAt = nextDate.toISOString();
          }

          // Update subscriber record
          const emailsSent = [...(subscriber.emails_sent || []), {
            number: nextEmailNumber,
            sent_at: now.toISOString(),
            subject: emailConfig.subject,
          }];

          await supabase
            .from("email_nurture_queue")
            .update({
              current_email_number: nextEmailNumber,
              last_sent_at: now.toISOString(),
              next_send_at: nextSendAt,
              emails_sent: emailsSent,
              status: nextEmailConfig ? "active" : "completed",
            })
            .eq("id", subscriber.id);

          console.log(`Sent email ${nextEmailNumber} to ${subscriber.email_address.substring(0, 3)}***`);
          successCount++;

        } catch (err) {
          console.error(`Error processing subscriber ${subscriber.id}:`, err);
          errorCount++;
        }
      }

      return new Response(JSON.stringify({ 
        processed: pendingEmails.length,
        success: successCount,
        errors: errorCount 
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: "send-single" - Send a specific email to a specific subscriber (for testing)
    if (action === "send-single") {
      const emailNumber = parseInt(req.headers.get("x-email-number") || "1");
      const emailConfig = EMAIL_SEQUENCE.find(e => e.number === emailNumber);

      if (!emailConfig || !email) {
        return new Response(JSON.stringify({ error: "Invalid email number or email address" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const html = await renderAsync(
        React.createElement(emailConfig.template, {
          firstName: name || "Rebel",
          senderName: "The Kindai Team",
        })
      );

      const { error: emailError } = await resend.emails.send({
        from: "Kindai <hello@kindai.com.au>",
        to: [email],
        subject: emailConfig.subject,
        html,
      });

      if (emailError) {
        console.error("Failed to send test email:", emailError);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ status: "sent", emailNumber }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Nurture email error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
