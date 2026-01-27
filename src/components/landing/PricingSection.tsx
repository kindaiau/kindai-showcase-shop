import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasTracked, setHasTracked] = useState(false);

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

  return (
    <section id="pricing" ref={sectionRef} className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Pilot pricing</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {/* TODO: Replace with final pricing once the wedge is chosen. */}
            Transparent pilot pricing based on your team size and timeline.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <h3 className="text-xl font-semibold">Starter Pilot</h3>
            <p className="mt-2 text-muted-foreground">
              Ideal for solo operators or small teams testing their first
              workflow.
            </p>
            <div className="mt-6 text-3xl font-semibold">$X,XXX</div>
            <p className="text-sm text-muted-foreground">per month</p>
            <Button asChild className="mt-6 w-full" variant="outline">
              <a href="#lead-form">Request details</a>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <h3 className="text-xl font-semibold">Growth Pilot</h3>
            <p className="mt-2 text-muted-foreground">
              Designed for teams ready to operationalize an outcome across the
              organization.
            </p>
            <div className="mt-6 text-3xl font-semibold">$XX,XXX</div>
            <p className="text-sm text-muted-foreground">per month</p>
            <Button
              asChild
              className="mt-6 w-full bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
            >
              <a href="#lead-form">Start a pilot</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
