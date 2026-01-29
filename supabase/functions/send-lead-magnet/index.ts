import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidName = (name: string): boolean => {
  return name.length > 0 && name.length <= 100 && !/[<>"'&]/.test(name);
};

// The lead magnet email with the checklist content
const generateChecklistEmail = (name: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #f8f8f2; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a2e;">
    <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">
        🚀 The 5-Minute Business Rebel Checklist
      </h1>
    </div>
    
    <div style="background: #16213e; padding: 40px 30px; border: 1px solid #2d3a5c; border-top: none; border-radius: 0 0 12px 12px;">
      <p style="font-size: 18px; margin-top: 0; color: #f8f8f2;">
        Hey ${name}! 👋
      </p>
      
      <p style="font-size: 16px; line-height: 1.8; color: #a0a0b0;">
        You're about to discover the exact steps rebels use to launch businesses 
        in days, not months. No fluff. Just action.
      </p>
      
      <div style="background: #1a1a2e; border-left: 4px solid #FF1B8D; padding: 25px; margin: 30px 0; border-radius: 4px;">
        <h2 style="margin-top: 0; color: #FF1B8D; font-size: 20px;">📋 Your 5-Minute Checklist</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #f8f8f2; margin-bottom: 10px;">✅ Step 1: Define Your Offer (60 seconds)</h3>
          <p style="color: #a0a0b0; margin-left: 20px;">
            Complete this sentence: "I help [WHO] achieve [WHAT] by [HOW]."
            <br><br>
            <em style="color: #6b7280;">Example: "I help solo founders get their first 100 customers by building landing pages that convert."</em>
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #f8f8f2; margin-bottom: 10px;">✅ Step 2: Find 10 Potential Customers (90 seconds)</h3>
          <p style="color: #a0a0b0; margin-left: 20px;">
            Search these 3 places for your WHO:
            <br>• Reddit: r/[your niche] + r/entrepreneur
            <br>• Twitter/X: Search "[problem you solve]"
            <br>• LinkedIn: Search job titles of your ideal customer
            <br><br>
            <em style="color: #6b7280;">Save 10 profiles. You'll DM them in step 4.</em>
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #f8f8f2; margin-bottom: 10px;">✅ Step 3: Create Your MVP Offer (60 seconds)</h3>
          <p style="color: #a0a0b0; margin-left: 20px;">
            Write 3 bullet points of what they get:
            <br>• Deliverable 1: [Specific outcome]
            <br>• Deliverable 2: [Specific outcome]
            <br>• Timeline: [When they get it]
            <br><br>
            <em style="color: #6b7280;">Pro tip: Start with a service, not a product. Services validate faster.</em>
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #f8f8f2; margin-bottom: 10px;">✅ Step 4: Send 5 No-Pitch DMs (90 seconds)</h3>
          <p style="color: #a0a0b0; margin-left: 20px;">
            Use this template:
            <br><br>
            <em style="color: #FF6B35;">"Hey [Name], I noticed you're [specific thing]. I'm researching [your topic] — what's the biggest challenge you face with [problem area]? Would love your 2-min perspective."</em>
            <br><br>
            <em style="color: #6b7280;">No pitch. Just learn. The sales come from listening.</em>
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #f8f8f2; margin-bottom: 10px;">✅ Step 5: Track Responses (30 seconds)</h3>
          <p style="color: #a0a0b0; margin-left: 20px;">
            Create a simple spreadsheet:
            <br>• Name | Platform | Response? | Pain Point | Follow-up Date
            <br><br>
            <em style="color: #6b7280;">2+ responses = signal. 0 responses = pivot your WHO.</em>
          </p>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, rgba(255,27,141,0.1) 0%, rgba(255,107,53,0.1) 100%); border: 1px solid rgba(255,27,141,0.3); padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
        <h3 style="color: #FF1B8D; margin-top: 0;">🔥 Ready to 10x your execution speed?</h3>
        <p style="color: #a0a0b0; margin-bottom: 20px;">
          The Rebel Toolkit has 3 AI Agents that do this work FOR you.<br>
          Content. Strategy. Automation. In 5-15 minutes.
        </p>
        <a href="https://kindai.io/purchase" style="display: inline-block; background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
          Get the Rebel Toolkit →
        </a>
      </div>
      
      <p style="font-size: 14px; color: #a0a0b0; margin-bottom: 10px;">
        Now go execute. You've got 5 minutes. No excuses. 💪
      </p>
      
      <p style="font-size: 16px; margin-bottom: 10px; color: #f8f8f2;">
        Stay rebellious,<br>
        <strong style="color: #FF1B8D;">The Kindai Team</strong>
      </p>
      
      <hr style="border: none; border-top: 1px solid #2d3a5c; margin: 30px 0;">
      
      <p style="font-size: 12px; color: #6b7280; text-align: center;">
        You received this because you downloaded The 5-Minute Business Rebel Checklist.
        <br>Built by Rebels, for Rebels. 🤘
      </p>
    </div>
  </body>
</html>
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, utm, page_url } = await req.json();

    // Validate inputs
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!isValidName(name)) {
      return new Response(JSON.stringify({ error: "Valid name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Save to email_subscribers table
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error: insertError } = await supabase.from("email_subscribers").upsert(
      {
        email,
        name,
        preferences: {
          lead_magnet: "5-minute-checklist",
          utm_source: utm?.utm_source || null,
          utm_medium: utm?.utm_medium || null,
          utm_campaign: utm?.utm_campaign || null,
          page_url: page_url || null,
          subscribed_via: "lead_magnet",
        },
      },
      { onConflict: "email" }
    );

    if (insertError) {
      console.error("Error saving subscriber:", insertError);
      // Continue anyway - we still want to send the email
    }

    // Send the lead magnet email
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      const { error: emailError } = await resend.emails.send({
        from: "Kindai <hello@kindai.com.au>",
        to: [email],
        subject: "🚀 Your 5-Minute Business Rebel Checklist",
        html: generateChecklistEmail(name),
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      console.log(`Lead magnet email sent to ${email.substring(0, 3)}***`);
    } else {
      console.warn("RESEND_API_KEY not configured - skipping email");
    }

    // Enqueue subscriber for nurture sequence
    try {
      const now = new Date();
      // First nurture email sends 2 days after lead magnet
      const firstNurtureDate = new Date(now);
      firstNurtureDate.setDate(firstNurtureDate.getDate() + 2);

      const { error: queueError } = await supabase
        .from("email_nurture_queue")
        .upsert({
          email_address: email,
          subscriber_name: name,
          sequence_name: "rebel-toolkit",
          current_email_number: 0,
          next_send_at: firstNurtureDate.toISOString(),
          status: "active",
          emails_sent: [],
        }, { 
          onConflict: "email_address",
          ignoreDuplicates: true 
        });

      if (queueError) {
        console.error("Error enqueueing for nurture:", queueError);
        // Don't fail the request - lead magnet was sent successfully
      } else {
        console.log(`Enqueued ${email.substring(0, 3)}*** for nurture sequence starting ${firstNurtureDate.toISOString()}`);
      }
    } catch (queueErr) {
      console.error("Nurture queue error:", queueErr);
    }

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Lead magnet error:", error?.message);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
