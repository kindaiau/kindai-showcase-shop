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
import SEO from "@/components/SEO";

// Gumroad product configuration
const GUMROAD_PRODUCT_ID = "rebelkit";
// Note: Set up redirect in Gumroad product settings: Product > Checkout > After purchase redirect URL
// Set it to: https://kindai-showcase-shop.lovable.app/purchase/redirect
const GUMROAD_PRODUCT_URL = `https://matthewgas.gumroad.com/l/rebelkit?wanted=true`;

const Purchase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
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

    // Check for pre-selected tier from pricing section
    const storedTier = sessionStorage.getItem("selected_tier");
    if (storedTier) {
      setSelectedTier(storedTier);
    }

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

  const features = [
    { icon: Bot, label: "3 AI Agents", desc: "Brand Voice, Offer, Business Test" },
    { icon: BookOpen, label: "Complete Guides", desc: "Step-by-step rebel playbooks" },
    { icon: FileText, label: "Templates", desc: "Ready-to-use frameworks" },
    { icon: Zap, label: "Lifetime Access", desc: "All future updates included" },
  ];

  const tiers = [
    {
      name: "Starter",
      price: "$47",
      cadence: "one-time",
      highlight: "Best for solo rebels",
      features: [
        "3 AI Agents (Content, Strategy, Automation)",
        "Core guides & templates",
        "Lifetime access + updates",
      ],
      badge: "Most Popular",
    },
    {
      name: "Growth",
      price: "$97",
      cadence: "one-time",
      highlight: "For scaling your first offer",
      features: [
        "Everything in Starter",
        "50+ advanced prompt templates",
        "Priority email support",
        "Bonus: Offer validation checklist",
      ],
    },
    {
      name: "Agency",
      price: "$197",
      cadence: "one-time",
      highlight: "For teams + client work",
      features: [
        "Everything in Growth",
        "White-label client templates",
        "Multi-project workflows",
        "Done-for-you implementation guides",
      ],
    },
  ];

  const handleTierSelect = (tierName: string) => {
    sessionStorage.setItem("selected_tier", tierName);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Get Rebel Toolkit - Build Your Freedom Business"
        description="Everything you need to escape the 9-5. 3 AI Agents, complete guides, templates, and lifetime access. Built for neurodivergent entrepreneurs."
        image="/og-purchase.png"
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

      <main className="container px-4 py-12 max-w-4xl mx-auto">
        {/* Already Purchased Banner - Prominent at top */}
        <div className="mb-10 p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-3 rounded-full bg-primary/20">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Already purchased?</h2>
                <p className="text-sm text-muted-foreground">
                  {isSignedIn ? "Enter your license key to unlock access" : "Sign in to verify your license key."}
                </p>
              </div>
            </div>
            <form onSubmit={handleVerifyLicense} className="flex flex-col gap-2 flex-1">
              <Label htmlFor="license-key" className="text-sm font-medium">
                License key
              </Label>
              <div className="flex gap-2">
                <Input
                  id="license-key"
                  type="text"
                  placeholder="Enter license key..."
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="font-mono flex-1"
                  disabled={!isSignedIn}
                />
                <Button type="submit" disabled={isVerifying || !isSignedIn} className="shrink-0">
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock"}
                </Button>
              </div>
              {!isSignedIn && (
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                  Sign in to verify
                </Button>
              )}
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                <Sparkles className="w-4 h-4" />
                The Rebel Toolkit
              </div>
              <h1 className="text-4xl font-bold leading-tight">
                Build Your{" "}
                <span className="text-kindai-pink text-glow-pink">F</span>
                <span className="text-kindai-orange text-glow-orange">r</span>
                <span className="text-kindai-green text-glow-green">e</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">d</span>
                <span className="text-kindai-orange text-glow-orange">o</span>
                <span className="text-kindai-green text-glow-green">m</span>{" "}
                Business
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

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Choose your access tier</h2>
              <div className="grid gap-4">
                {tiers.map((tier) => {
                  const isSelected = selectedTier === tier.name;
                  return (
                  <div
                    key={tier.name}
                    className={`rounded-xl border p-5 space-y-4 transition-all ${
                      isSelected 
                        ? "border-primary ring-2 ring-primary/30 bg-primary/10" 
                        : tier.badge 
                          ? "border-primary/40 bg-primary/5" 
                          : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{tier.name}</h3>
                          {isSelected && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-white bg-primary px-2 py-1 rounded-full">
                              Selected
                            </span>
                          )}
                          {!isSelected && tier.badge && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-full">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.highlight}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{tier.price}</p>
                        <p className="text-xs text-muted-foreground">{tier.cadence}</p>
                      </div>
                    </div>

                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      className="w-full gap-2"
                      onClick={() => {
                        handleTierSelect(tier.name);
                        window.open(GUMROAD_PRODUCT_URL, "_blank");
                      }}
                    >
                      Choose {tier.name}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  );
                })}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Secure payment via Gumroad. Instant access.
              </p>
            </div>
          </div>

          {/* Right: What's Included */}
          <div className="space-y-8">
            <div className="space-y-4 p-6 rounded-xl bg-muted/30">
              <h3 className="font-semibold text-lg">What's included:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Brand Voice AI Agent - Find your unique voice</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Offer Crafter AI Agent - Create irresistible offers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Business Test AI Agent - Validate ideas fast</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Complete setup guides and templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Lifetime access to all updates</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  🔒 30-day money-back guarantee
                </p>
                <p className="text-xs text-muted-foreground">
                  Not happy? Get a full refund, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Purchase;
