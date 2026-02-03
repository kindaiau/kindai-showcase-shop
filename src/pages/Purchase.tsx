import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePurchaseStatus } from "@/hooks/use-purchase-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  Loader2,
  ArrowLeft,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import SEO from "@/components/SEO";

// Gumroad product configuration
const GUMROAD_PRODUCT_ID = "rebelkit";

const Purchase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { hasPurchased, isLoading: purchaseLoading, refetch } = usePurchaseStatus(user);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isSignedIn = Boolean(user);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Redirect to toolkit if already purchased
    if (!purchaseLoading && hasPurchased) {
      navigate("/toolkit");
    }
  }, [hasPurchased, purchaseLoading, navigate]);

  const handleVerifyLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licenseKey.trim()) {
      toast({
        title: "License key required",
        description: "Please enter your license key from Gumroad.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      const selectedTier = sessionStorage.getItem("selected_tier") || undefined;
      const { data, error } = await supabase.functions.invoke("gumroad-verify-license", {
        body: {
          license_key: licenseKey.trim(),
          product_id: GUMROAD_PRODUCT_ID,
          tier: selectedTier,
        },
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "License verified!",
          description: "Welcome to the Rebel Toolkit!",
        });
        sessionStorage.removeItem("selected_tier");
        await refetch();
        navigate("/purchase/success");
      } else {
        toast({
          title: "Verification failed",
          description: data.error || "Invalid license key. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("License verification error:", error);
      toast({
        title: "Verification error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Verify Your Purchase - Rebel Toolkit"
        description="Enter your Gumroad license key to unlock access to the Rebel Toolkit."
        url="https://kindai.dev/purchase"
      />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {isSignedIn ? (
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </header>

      <main className="container px-4 py-16 max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Verify Your Purchase</h1>
          <p className="text-muted-foreground">
            Enter the license key from your Gumroad purchase email to unlock access.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          {!isSignedIn ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Please sign in first to verify your license key.
              </p>
              <Button onClick={() => navigate("/auth")} className="w-full">
                Sign In to Continue
              </Button>
            </div>
          ) : (
            <form onSubmit={handleVerifyLicense} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="license-key" className="text-base font-medium">
                  License Key
                </Label>
                <Input
                  id="license-key"
                  type="text"
                  placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="font-mono text-center text-lg h-12"
                  autoComplete="off"
                />
                <p className="text-xs text-muted-foreground">
                  Find this in your Gumroad purchase confirmation email
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isVerifying || !licenseKey.trim()} 
                className="w-full h-12 text-base gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Unlock Access
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Help section */}
        <div className="mt-8 p-4 rounded-xl bg-muted/30 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Need help?</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Can't find your license key?{" "}
            <a 
              href="https://customers.gumroad.com/article/191-how-to-find-a-license-key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Check Gumroad's guide
            </a>
          </p>
        </div>

        {/* Buy link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have the toolkit yet?{" "}
          <Link to="/#pricing" className="text-primary hover:underline font-medium">
            Get it here
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Purchase;
