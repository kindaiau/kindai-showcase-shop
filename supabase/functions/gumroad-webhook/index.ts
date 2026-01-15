import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

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

// Welcome email HTML template
const getWelcomeEmailHtml = (productName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ec4899 0%, #f97316 50%, #22c55e 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: bold;">
                🚀 Welcome to the Rebellion!
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for purchasing the <strong>${productName}</strong>!
              </p>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your 3 AI agents are ready and waiting. Here's how to access everything:
              </p>
              
              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #262626; border-radius: 8px; margin-bottom: 10px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #ec4899; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold;">1</span>
                        </td>
                        <td style="color: #ffffff; font-size: 15px;">
                          <strong>Go to the Toolkit</strong><br>
                          <span style="color: #a1a1aa;">Click the button below to access your dashboard</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background-color: #262626; border-radius: 8px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #f97316; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold;">2</span>
                        </td>
                        <td style="color: #ffffff; font-size: 15px;">
                          <strong>Sign in with THIS email</strong><br>
                          <span style="color: #a1a1aa;">Use the same email you used to purchase</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background-color: #262626; border-radius: 8px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #22c55e; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold;">3</span>
                        </td>
                        <td style="color: #ffffff; font-size: 15px;">
                          <strong>Start building!</strong><br>
                          <span style="color: #a1a1aa;">All 3 agents + templates are unlocked</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://kindai-showcase-shop.lovable.app/welcome" 
                       style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold;">
                      Access Your Toolkit →
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- What's Inside -->
              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 0 0 15px 0;">
                  ✨ What's Inside:
                </p>
                <ul style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><strong style="color: #ec4899;">Content Creator Agent</strong> — Blog posts, emails, social content</li>
                  <li><strong style="color: #f97316;">Business Strategist Agent</strong> — Plans, pricing, market analysis</li>
                  <li><strong style="color: #22c55e;">Automation Engineer Agent</strong> — Workflows, integrations, SEO</li>
                  <li>Done-for-you templates and checklists</li>
                  <li>30-day launch roadmap</li>
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f0f0f; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0 0 10px 0;">
                Questions? Reply to this email or contact us at support@kindai.io
              </p>
              <p style="color: #52525b; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Kindai. Built for rebels, by rebels.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Background task to send welcome email
async function sendWelcomeEmail(email: string, productName: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured, skipping welcome email");
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    
    const { data, error } = await resend.emails.send({
      from: "Kindai <onboarding@resend.dev>",
      to: [email],
      subject: "🚀 Welcome to the Rebel Toolkit — Your AI Agents Are Ready!",
      html: getWelcomeEmailHtml(productName),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
    } else {
      console.log(`Welcome email sent successfully to ${maskEmail(email)}`);
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

// Verify sale with Gumroad API to prevent forged webhooks
async function verifySaleWithGumroad(saleId: string): Promise<{ valid: boolean; saleData?: any }> {
  const gumroadToken = Deno.env.get("GUMROAD_ACCESS_TOKEN");
  
  if (!gumroadToken) {
    console.warn("GUMROAD_ACCESS_TOKEN not configured, skipping sale verification");
    // Fall back to accepting webhook if token not configured
    return { valid: true };
  }

  try {
    const response = await fetch(
      `https://api.gumroad.com/v2/sales/${saleId}`,
      {
        headers: {
          Authorization: `Bearer ${gumroadToken}`,
        },
      }
    );

    const data = await response.json();
    
    if (data.success && data.sale) {
      return { valid: true, saleData: data.sale };
    }
    
    console.error("Gumroad sale verification failed:", data.message || "Unknown error");
    return { valid: false };
  } catch (error) {
    console.error("Error verifying sale with Gumroad:", error);
    // In case of network error, we'll reject the webhook for safety
    return { valid: false };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Parse form data from Gumroad webhook
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Log webhook receipt without PII
    console.log("Received Gumroad webhook for sale_id:", data.sale_id || "unknown");

    // Validate required fields
    const { 
      sale_id, 
      product_id, 
      email, 
      license_key,
      product_name,
    } = data;
    const variantName = data.variants || data.variant || null;
    const purchaseTier = deriveTierFromVariant(variantName);
    const priceCents = Number.isFinite(Number(data.price)) ? Number(data.price) : null;

    if (!sale_id || !product_id || !email) {
      console.error("Missing required fields in webhook");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Verify this is a real sale with Gumroad API
    const { valid: isValidSale, saleData } = await verifySaleWithGumroad(sale_id);
    
    if (!isValidSale) {
      console.error(`Rejected potentially forged webhook for sale_id: ${sale_id}`);
      return new Response(
        JSON.stringify({ error: "Sale verification failed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use verified data from Gumroad API if available
    const verifiedEmail = saleData?.email || email;
    const verifiedProductId = saleData?.product_id || product_id;
    const verifiedLicenseKey = saleData?.license_key || license_key;

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check if this sale already exists
    const { data: existingPurchase } = await adminClient
      .from("user_purchases")
      .select("id, created_at")
      .eq("gumroad_sale_id", sale_id)
      .maybeSingle();

    if (existingPurchase) {
      // Check for duplicate webhook within 60 seconds (idempotency)
      const timeDiff = Date.now() - new Date(existingPurchase.created_at).getTime();
      if (timeDiff < 60000) {
        console.log(`Duplicate webhook for sale ${sale_id} within 60s, skipping`);
        return new Response(
          JSON.stringify({ success: true, message: "Duplicate webhook ignored" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log(`Sale ${sale_id} already recorded`);
      return new Response(
        JSON.stringify({ success: true, message: "Sale already recorded" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user with this email exists
    const { data: existingUser } = await adminClient
      .from("profiles")
      .select("user_id")
      .eq("email", verifiedEmail)
      .maybeSingle();

    // Insert purchase record
    const { error: insertError } = await adminClient
      .from("user_purchases")
      .insert({
        user_id: existingUser?.user_id || null,
        email: verifiedEmail,
        license_key: verifiedLicenseKey || null,
        product_id: verifiedProductId,
        purchase_date: new Date().toISOString(),
        is_verified: true,
        gumroad_sale_id: sale_id,
        tier: purchaseTier,
        gumroad_variant: variantName,
        price_cents: priceCents,
      });

    if (insertError) {
      console.error("Error inserting purchase:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to record purchase" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully recorded verified purchase for ${maskEmail(verifiedEmail)}, sale_id: ${sale_id}`);

    // Send welcome email as background task (don't await to not block response)
    const productDisplayName = product_name || "Rebel Toolkit";
    // @ts-ignore - EdgeRuntime is available in Supabase Edge Functions
    (globalThis as any).EdgeRuntime?.waitUntil?.(sendWelcomeEmail(verifiedEmail, productDisplayName)) 
      ?? sendWelcomeEmail(verifiedEmail, productDisplayName).catch(console.error);

    return new Response(
      JSON.stringify({ success: true, message: "Purchase verified and recorded" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in gumroad-webhook:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

const deriveTierFromVariant = (variant: string | null) => {
  if (!variant) return null;
  const normalized = variant.toLowerCase();
  if (normalized.includes("starter")) return "Starter";
  if (normalized.includes("growth")) return "Growth";
  if (normalized.includes("agency")) return "Agency";
  return null;
};
