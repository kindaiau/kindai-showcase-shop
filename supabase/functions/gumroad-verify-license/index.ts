import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const gumroadToken = Deno.env.get("GUMROAD_ACCESS_TOKEN");

    if (!gumroadToken) {
      console.error("GUMROAD_ACCESS_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get license key from request body
    const { license_key, product_id, tier } = await req.json();

    if (!license_key || !product_id) {
      return new Response(
        JSON.stringify({ error: "License key and product ID are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Verifying license for user ${user.id}, product: ${product_id}`);

    // Call Gumroad API to verify license
    const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        product_id: product_id,
        license_key: license_key,
      }),
    });

    const gumroadData = await gumroadResponse.json();
    console.log("Gumroad response:", JSON.stringify(gumroadData));

    if (!gumroadData.success) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid license key", 
          details: gumroadData.message || "License verification failed" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // License is valid - store purchase record
    const purchase = gumroadData.purchase;
    const purchaseVariant = purchase?.variant || purchase?.variants || null;
    const purchaseTier = tier || deriveTierFromVariant(purchaseVariant);
    const priceCents = Number.isFinite(Number(purchase?.price)) ? Number(purchase.price) : null;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check if purchase already exists
    const { data: existingPurchase } = await adminClient
      .from("user_purchases")
      .select("id")
      .eq("gumroad_sale_id", purchase.sale_id)
      .single();

    if (existingPurchase) {
      // Update existing purchase with user_id if not set
      await adminClient
        .from("user_purchases")
        .update({ 
          user_id: user.id, 
          is_verified: true,
          tier: purchaseTier,
          gumroad_variant: purchaseVariant,
          price_cents: priceCents,
          updated_at: new Date().toISOString()
        })
        .eq("gumroad_sale_id", purchase.sale_id);
    } else {
      // Insert new purchase record
      const { error: insertError } = await adminClient
        .from("user_purchases")
        .insert({
          user_id: user.id,
          email: purchase.email || user.email,
          license_key: license_key,
          product_id: product_id,
          purchase_date: purchase.created_at || new Date().toISOString(),
          is_verified: true,
          gumroad_sale_id: purchase.sale_id,
          tier: purchaseTier,
          gumroad_variant: purchaseVariant,
          price_cents: priceCents,
        });

      if (insertError) {
        console.error("Error saving purchase:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to save purchase record" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log(`License verified successfully for user ${user.id}`);

    // Send welcome email for purchase
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const recipientEmail = purchase.email || user.email;
        
        await resend.emails.send({
          from: "Kindai <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: "🎉 Welcome to The Rebel Toolkit!",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
                <div style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                    Welcome to The Rebel Toolkit! 🚀
                  </h1>
                </div>
                
                <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                  <p style="font-size: 18px; margin-top: 0;">
                    Hey Rebel! 👋
                  </p>
                  
                  <p style="font-size: 16px; line-height: 1.8;">
                    Your purchase has been verified and you now have <strong>full access</strong> to The Rebel Toolkit!
                  </p>
                  
                  <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <h3 style="margin-top: 0; color: #10b981;">Your toolkit includes:</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                      <li style="margin-bottom: 10px;">🤖 <strong>3 AI Agents</strong> - Brand Voice, Offer Crafter, Business Test</li>
                      <li style="margin-bottom: 10px;">📚 <strong>Complete Guides</strong> - Step-by-step rebel playbooks</li>
                      <li style="margin-bottom: 10px;">📝 <strong>Templates</strong> - Ready-to-use frameworks</li>
                      <li>⚡ <strong>Lifetime Access</strong> - All future updates included</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://kindai.io/toolkit" style="background: linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(255, 27, 141, 0.3);">
                      Access Your Toolkit →
                    </a>
                  </div>
                  
                  <p style="font-size: 16px;">
                    If you have any questions, just reply to this email. We're here to help!
                  </p>
                  
                  <p style="font-size: 16px; margin-bottom: 10px;">
                    Stay rebellious,<br>
                    <strong style="color: #FF1B8D;">The Kindai Team</strong>
                  </p>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                  
                  <p style="font-size: 12px; color: #6b7280; text-align: center;">
                    Thank you for your purchase! Built by Rebels, for Rebels.
                  </p>
                </div>
              </body>
            </html>
          `,
        });
        console.log(`Welcome email sent to ${recipientEmail}`);
      }
    } catch (emailError) {
      // Don't fail the verification if email fails
      console.error("Failed to send welcome email:", emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "License verified successfully",
        product_name: purchase.product_name,
        email: purchase.email,
        tier: purchaseTier
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in gumroad-verify-license:", error);
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
