import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import React from "https://esm.sh/react@18.3.1";
import { renderAsync } from "https://esm.sh/@react-email/components@0.0.22";
import { NewsletterWelcome } from "../_shared/email-templates/templates/NewsletterWelcome.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper to mask email for logging
const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const maskedLocal = local.length > 2 ? local.slice(0, 2) + '***' : '***';
  return `${maskedLocal}@${domain}`;
};

// Simple validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidName = (name: string): boolean => {
  return name.length <= 100 && !/[<>"'&]/.test(name);
};

// Rate limiting helper
const checkRateLimit = async (
  supabase: any, 
  identifier: string, 
  action: string, 
  maxRequests: number = 3, 
  windowMs: number = 3600000
): Promise<{ allowed: boolean; remaining: number }> => {
  const windowStart = new Date(Date.now() - windowMs).toISOString();
  
  // Check recent requests
  const { count, error } = await supabase
    .from("email_subscribers")
    .select("id", { count: "exact", head: true })
    .eq("email", identifier)
    .gte("subscribed_at", windowStart);

  if (error) {
    console.error("Rate limit check error:", error);
    // On error, allow the request but log it
    return { allowed: true, remaining: maxRequests };
  }

  const requestCount = count || 0;
  const remaining = Math.max(0, maxRequests - requestCount);
  
  return { 
    allowed: requestCount < maxRequests, 
    remaining 
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    
    // Honeypot check - if this hidden field is filled, it's likely a bot
    if (body.website) {
      console.log("Honeypot triggered, rejecting request");
      // Return fake success to not tip off the bot
      return new Response(
        JSON.stringify({ data: { id: "ok" } }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate name if provided
    if (name && !isValidName(name)) {
      return new Response(
        JSON.stringify({ error: "Invalid name format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Initialize Supabase for rate limiting check
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Check rate limit - max 3 signups per email per hour
      const { allowed, remaining } = await checkRateLimit(supabase, email, "email-signup");
      
      if (!allowed) {
        console.log(`Rate limit exceeded for ${maskEmail(email)}`);
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { 
            status: 429, 
            headers: { 
              "Content-Type": "application/json", 
              "Retry-After": "3600",
              ...corsHeaders 
            } 
          }
        );
      }
    }

    // Log with masked email for privacy
    console.log(`Sending welcome email to: ${maskEmail(email)}`);

    // Render React Email template
    const html = await renderAsync(
      React.createElement(NewsletterWelcome, { name: name || undefined })
    );

    const emailResponse = await resend.emails.send({
      from: "Kindai <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Rebel Movement! 🎉",
      html,
    });

    console.log("Welcome email sent successfully");

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
