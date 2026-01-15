import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { renderPurchaseConfirmationEmail } from "../_shared/email-templates.ts";

// Helper function to verify webhook signature using HMAC SHA256
async function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string | null
): Promise<boolean> {
  if (!secret || !signature) {
    // If no secret is configured, skip verification (development mode)
    console.warn("Webhook secret not configured - skipping signature verification");
    return true;
  }

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const payloadData = encoder.encode(payload);
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, payloadData);
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return computedSignature === signature;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return false;
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const webhookSecret = Deno.env.get("GUMROAD_WEBHOOK_SECRET");

    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("X-Gumroad-Signature");

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse form data from Gumroad webhook
    const formData = new URLSearchParams(rawBody);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log("Received Gumroad webhook:", JSON.stringify(data));

    // Validate required fields
    const { 
      sale_id, 
      product_id, 
      email, 
      license_key,
      product_name,
      seller_id 
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

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check if this sale already exists
    const { data: existingPurchase } = await adminClient
      .from("user_purchases")
      .select("id")
      .eq("gumroad_sale_id", sale_id)
      .single();

    if (existingPurchase) {
      console.log(`Sale ${sale_id} already recorded, skipping`);
      return new Response(
        JSON.stringify({ success: true, message: "Sale already recorded" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user with this email exists
    const { data: existingUser } = await adminClient
      .from("profiles")
      .select("user_id")
      .eq("email", email)
      .single();

    // Insert purchase record
    const { error: insertError } = await adminClient
      .from("user_purchases")
      .insert({
        user_id: existingUser?.user_id || null,
        email: email,
        license_key: license_key || null,
        product_id: product_id,
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

    console.log(`Successfully recorded purchase for ${email}, sale_id: ${sale_id}`);

    // Send purchase confirmation email
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        const emailHtml = renderPurchaseConfirmationEmail({
          customerEmail: email,
          productName: product_name || "The Rebel Toolkit",
          tier: purchaseTier || undefined,
          licenseKey: license_key || undefined,
          toolkitUrl: "https://kindai.io/toolkit",
        });
        
        await resend.emails.send({
          from: "Kindai <onboarding@resend.dev>",
          to: [email],
          subject: "🎉 Welcome to The Rebel Toolkit!",
          html: emailHtml,
        });
        console.log(`Purchase confirmation email sent to ${email}`);
      }
    } catch (emailError) {
      // Don't fail the webhook if email fails
      console.error("Failed to send purchase confirmation email:", emailError);
    }

    // TODO: Schedule follow-up email for 3 days later
    // This could be implemented with a separate Supabase scheduled function
    // or by inserting a record into a pending_emails table with send_at timestamp

    return new Response(
      JSON.stringify({ success: true, message: "Purchase recorded" }),
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
