import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PricingComparisonTable from "./PricingComparisonTable";

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasTracked, setHasTracked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sectionRef.current || hasTracked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          trackEvent("pricing_view", { location: "pricing" });
          setHasTracked(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTracked]);

  const tiers = [
    {
      name: "Starter",
      price: "$47",
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
      highlight: "For teams + client work",
      features: [
        "Everything in Growth",
        "White-label client templates",
        "Multi-project workflows",
        "Done-for-you implementation guides",
      ],
    },
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            One-time payment
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Choose Your{" "}
            <span className="text-kindai-pink text-glow-pink">R</span>
            <span className="text-kindai-orange text-glow-orange">e</span>
            <span className="text-kindai-green text-glow-green">b</span>
            <span className="text-kindai-blue text-glow-blue">e</span>
            <span className="text-kindai-pink text-glow-pink">l</span>
            {" "}Path
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Lifetime access. No subscriptions. No upsells.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 shadow-elegant flex flex-col ${
                tier.badge ? "border-primary/40 bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.highlight}</p>
                </div>
                {tier.badge && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground ml-1">one-time</span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${tier.badge ? "bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90" : ""}`}
                variant={tier.badge ? "default" : "outline"}
                onClick={() => navigate("/purchase")}
              >
                Get {tier.name}
              </Button>
            </div>
          ))}
        </div>

        <PricingComparisonTable />

        <p className="text-center text-sm text-muted-foreground mt-8">
          🔒 30-day money-back guarantee. Secure payment via Gumroad.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
