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
    const { license_key, product_id } = await req.json();

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

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "License verified successfully",
        product_name: purchase.product_name,
        email: purchase.email
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
