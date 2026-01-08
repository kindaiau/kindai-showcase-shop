import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

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

// Helper to escape HTML entities
const escapeHtml = (str: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
};

// Simple validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidName = (name: string): boolean => {
  return name.length <= 100 && !/[<>"'&]/.test(name);
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

    // Log with masked email for privacy
    console.log(`Sending welcome email to: ${maskEmail(email)}`);

    // Escape name for HTML safety
    const safeName = name ? escapeHtml(name) : '';

    const emailResponse = await resend.emails.send({
      from: "Kindai <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Rebel Movement! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">
                Welcome, Rebel! 🚀
              </h1>
            </div>
            
            <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <h2 style="color: #FF1B8D; margin-top: 0;">
                ${safeName ? `Hey ${safeName}! ` : 'Hey there! '}You're on the list!
              </h2>
              
              <p style="font-size: 16px; line-height: 1.8;">
                You've just joined an exclusive community of rebels who refuse to be limited by traditional coding barriers.
              </p>
              
              <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #10b981;">What You'll Get:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">🎯 Exclusive rebel business tips</li>
                  <li style="margin-bottom: 10px;">🛠️ Templates & resources</li>
                  <li style="margin-bottom: 10px;">🧠 ADHD-friendly strategies</li>
                  <li style="margin-bottom: 10px;">⚡ AI insights and updates</li>
                  <li>🎁 Special offers for subscribers</li>
                </ul>
              </div>
              
              <p style="font-size: 16px;">
                You're now part of the rebel community. We'll keep you updated with the best tips and resources to help you build your freedom business.
              </p>
              
              <p style="font-size: 16px;">
                Keep building, keep rebelling, and keep breaking the rules that don't serve you.
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="https://kindai.com" style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
                  Explore More
                </a>
              </div>
              
              <p style="font-size: 16px; margin-bottom: 10px;">
                Stay rebellious,<br>
                <strong style="color: #FF1B8D;">The Kindai Team</strong>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #6b7280; text-align: center;">
                You're receiving this email because you subscribed to the Kindai newsletter.<br>
                Built by Rebels, for Rebels.
              </p>
            </div>
          </body>
        </html>
      `,
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
