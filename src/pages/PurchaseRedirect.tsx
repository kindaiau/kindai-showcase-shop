import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GUMROAD_PRODUCT_ID = "rebelkit";

// Helper to encode state for URL
const encodeState = (data: { license_key: string; sale_id?: string; email?: string }) => {
  return btoa(JSON.stringify(data));
};

// Helper to decode state from URL
const decodeState = (state: string): { license_key: string; sale_id?: string; email?: string } | null => {
  try {
    return JSON.parse(atob(state));
  } catch {
    return null;
  }
};

const PurchaseRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyPurchase = async () => {
      // Check for encoded state first (returning from auth)
      const stateParam = searchParams.get("state");
      let licenseKey = searchParams.get("license_key");
      let saleId = searchParams.get("sale_id");
      let email = searchParams.get("email");

      // If we have encoded state, decode it
      if (stateParam && !licenseKey) {
        const decodedState = decodeState(stateParam);
        if (decodedState) {
          licenseKey = decodedState.license_key;
          saleId = decodedState.sale_id || null;
          email = decodedState.email || null;
        }
      }

      if (!licenseKey) {
        setStatus("error");
        setErrorMessage("No license key found. Please enter it manually.");
        return;
      }

      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Encode license data in URL state and redirect to auth
        const state = encodeState({
          license_key: licenseKey,
          sale_id: saleId || undefined,
          email: email || undefined,
        });
        navigate(`/auth?redirect=${encodeURIComponent(`/purchase/redirect?state=${state}`)}`);
        return;
      }

      // Verify the license
      try {
        const selectedTier = searchParams.get("tier") || undefined;
        const { data, error } = await supabase.functions.invoke("gumroad-verify-license", {
          body: {
            license_key: licenseKey,
            product_id: GUMROAD_PRODUCT_ID,
            tier: selectedTier,
          },
        });

        if (error) throw error;

        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate("/purchase/success"), 1500);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Could not verify license. Please try again.");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("error");
        setErrorMessage(error.message || "Verification failed. Please enter your license manually.");
      }
    };

    verifyPurchase();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {status === "verifying" && (
          <>
            <div className="inline-flex p-6 rounded-full bg-primary/10">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold">Verifying your purchase...</h1>
            <p className="text-muted-foreground">
              Please wait while we activate your access.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="inline-flex p-6 rounded-full bg-green-500/10">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold">Purchase verified!</h1>
            <p className="text-muted-foreground">
              Redirecting you to the toolkit...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="inline-flex p-6 rounded-full bg-destructive/10">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold">Verification issue</h1>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button onClick={() => navigate("/purchase")}>
              Enter License Manually
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseRedirect;
