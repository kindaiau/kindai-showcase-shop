import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePurchaseStatus } from "@/hooks/use-purchase-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Check, 
  ExternalLink, 
  Key, 
  Loader2,
  ArrowLeft,
  Zap,
  BookOpen,
  Bot,
  FileText
} from "lucide-react";

// Gumroad product configuration
const GUMROAD_PRODUCT_ID = "xktdh";
const GUMROAD_PRODUCT_URL = "https://matthewgas.gumroad.com/l/xktdh";

const Purchase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { hasPurchased, isLoading: purchaseLoading, refetch } = usePurchaseStatus(user);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      const { data, error } = await supabase.functions.invoke("gumroad-verify-license", {
        body: {
          license_key: licenseKey.trim(),
          product_id: GUMROAD_PRODUCT_ID,
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-2xl font-bold">Sign in to continue</h1>
          <p className="text-muted-foreground">
            You need to be signed in to purchase or verify your license.
          </p>
          <Button onClick={() => navigate("/auth")} size="lg">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Bot, label: "3 AI Agents", desc: "Brand Voice, Offer, Business Test" },
    { icon: BookOpen, label: "Complete Guides", desc: "Step-by-step rebel playbooks" },
    { icon: FileText, label: "Templates", desc: "Ready-to-use frameworks" },
    { icon: Zap, label: "Lifetime Access", desc: "All future updates included" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </header>

      <main className="container px-4 py-12 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                <Sparkles className="w-4 h-4" />
                The Rebel Toolkit
              </div>
              <h1 className="text-4xl font-bold leading-tight">
                Build Your Freedom Business
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to escape the 9-5 and build a business that works for your neurodivergent brain.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$47</span>
                <span className="text-muted-foreground line-through">$97</span>
                <span className="text-sm text-primary font-medium">Launch Price</span>
              </div>
              <Button 
                size="lg" 
                className="w-full gap-2"
                onClick={() => window.open(GUMROAD_PRODUCT_URL, "_blank")}
              >
                Buy Now on Gumroad
                <ExternalLink className="w-4 h-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Secure payment via Gumroad. Instant access.
              </p>
            </div>
          </div>

          {/* Right: License Verification */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Already Purchased?</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter your license key from your Gumroad purchase email to unlock access.
                  </p>
                </div>

                <form onSubmit={handleVerifyLicense} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="license-key">License Key</Label>
                    <Input
                      id="license-key"
                      type="text"
                      placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    className="w-full gap-2"
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Verify License
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-muted/30">
              <h3 className="font-semibold">What's included:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Brand Voice AI Agent - Find your unique voice
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Offer Crafter AI Agent - Create irresistible offers
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Business Test AI Agent - Validate ideas fast
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Complete setup guides and templates
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Lifetime access to all updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Purchase;
