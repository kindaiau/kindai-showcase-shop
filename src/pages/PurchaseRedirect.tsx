import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GUMROAD_PRODUCT_ID = "rebelkit";

const PurchaseRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyPurchase = async () => {
      // Gumroad passes these params on redirect
      const licenseKey = searchParams.get("license_key");
      const saleId = searchParams.get("sale_id");
      const email = searchParams.get("email");

      if (!licenseKey) {
        setStatus("error");
        setErrorMessage("No license key found. Please enter it manually.");
        return;
      }

      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Store license key and redirect to auth
        sessionStorage.setItem("pending_license_key", licenseKey);
        sessionStorage.setItem("pending_sale_id", saleId || "");
        sessionStorage.setItem("pending_email", email || "");
        navigate("/auth?redirect=/purchase/redirect");
        return;
      }

      // Verify the license
      try {
        const { data, error } = await supabase.functions.invoke("gumroad-verify-license", {
          body: {
            license_key: licenseKey,
            product_id: GUMROAD_PRODUCT_ID,
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

    // Check for stored license key (returning from auth)
    const storedLicenseKey = sessionStorage.getItem("pending_license_key");
    if (storedLicenseKey && !searchParams.get("license_key")) {
      // Add it to the URL and re-run
      const newParams = new URLSearchParams(searchParams);
      newParams.set("license_key", storedLicenseKey);
      const storedSaleId = sessionStorage.getItem("pending_sale_id");
      const storedEmail = sessionStorage.getItem("pending_email");
      if (storedSaleId) newParams.set("sale_id", storedSaleId);
      if (storedEmail) newParams.set("email", storedEmail);
      
      // Clear storage
      sessionStorage.removeItem("pending_license_key");
      sessionStorage.removeItem("pending_sale_id");
      sessionStorage.removeItem("pending_email");
      
      navigate(`/purchase/redirect?${newParams.toString()}`, { replace: true });
      return;
    }

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
