import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight, Home } from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";
import { toast } from "sonner";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Rebel Starter",
    price: "$47",
    period: "one-time",
    description: "Perfect for solo rebels just starting their journey",
    features: [
      "Access to all 3 AI Agents",
      "50 agent requests per month",
      "All toolkit templates & guides",
      "Community access",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Rebel Pro",
    price: "$97",
    period: "one-time",
    description: "For serious rebels building real businesses",
    features: [
      "Everything in Starter",
      "Unlimited agent requests",
      "Priority AI processing",
      "Advanced automation templates",
      "1-on-1 onboarding call",
      "Priority support",
      "Lifetime updates",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Rebel Team",
    price: "$297",
    period: "one-time",
    description: "For teams that need collaborative power",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared workspace & templates",
      "Custom agent training",
      "White-label options",
      "Dedicated success manager",
      "Custom integrations",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handlePurchase = (tierName: string) => {
    setSelectedTier(tierName);
    // Mock purchase - in real app, this would integrate with Stripe
    toast.success(`Selected ${tierName}! Redirecting to signup...`);
    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kindai" className="w-10 h-10" />
            <h1 className="font-bold text-lg">
              <span className="text-kindai-pink">Rebel</span> Toolkit
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </header>

      <div className="container px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Sparkles className="w-4 h-4 text-kindai-pink" />
            <span className="text-sm font-medium">Simple, Transparent Pricing</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-gradient-rebel">Rebel Path</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            One-time payment. Lifetime access. No subscriptions, no sneaky fees. 
            Just you, your AI team, and unlimited possibilities.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-kindai-green" />
              Lifetime access
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-kindai-green" />
              All future updates
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-kindai-green" />
              30-day guarantee
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 relative ${
                tier.highlighted
                  ? "border-4 border-kindai-pink shadow-glow scale-105 z-10"
                  : "border-2 border-border"
              } transition-all hover:shadow-card`}
            >
              {tier.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kindai-pink text-white">
                  {tier.badge}
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-2">/{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-kindai-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlighted
                    ? "gradient-rebel text-white hover:opacity-90"
                    : "bg-muted hover:bg-muted/80"
                }`}
                size="lg"
                onClick={() => handlePurchase(tier.name)}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="font-semibold text-lg mb-2">What exactly do I get?</h3>
              <p className="text-muted-foreground">
                Instant access to 3 specialized AI agents (Content Creator, Business Strategist, 
                Automation Engineer), all toolkit templates, guides, checklists, and a complete 
                playbook for building your business.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="font-semibold text-lg mb-2">Is this a subscription?</h3>
              <p className="text-muted-foreground">
                Nope! One-time payment, lifetime access. We hate subscriptions as much as you do.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="font-semibold text-lg mb-2">What if it doesn't work for me?</h3>
              <p className="text-muted-foreground">
                30-day money-back guarantee. If you're not satisfied, we'll refund you. No questions asked.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="font-semibold text-lg mb-2">Do I need coding skills?</h3>
              <p className="text-muted-foreground">
                Absolutely not. The AI agents do all the technical work. You just describe what you need 
                in plain English.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
