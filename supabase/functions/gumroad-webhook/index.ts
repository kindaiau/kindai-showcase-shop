import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    // Parse form data from Gumroad webhook
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
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
