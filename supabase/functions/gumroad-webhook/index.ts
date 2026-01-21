import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import React from "https://esm.sh/react@18.3.1";
import { renderAsync } from "https://esm.sh/@react-email/components@0.0.22";
import { PurchaseWelcome } from "../_shared/email-templates/templates/PurchaseWelcome.tsx";

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

// Background task to send welcome email
async function sendWelcomeEmail(email: string, productName: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured, skipping welcome email");
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    
    // Render React Email template
    const html = await renderAsync(
      React.createElement(PurchaseWelcome, { productName })
    );

    const { data, error } = await resend.emails.send({
      from: "Kindai <onboarding@resend.dev>",
      to: [email],
      subject: "🚀 Welcome to the Rebel Toolkit — Your AI Agents Are Ready!",
      html,
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
