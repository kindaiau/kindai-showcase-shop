import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const badges = ["Secure by design", "Human-in-the-loop", "Pilot-ready"];

const BottomCtaSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to run your pilot?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {/* TODO: Replace with wedge-specific CTA copy. */}
            Let’s map the fastest path to your next measurable outcome.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
            >
              <a
                href="#lead-form"
                onClick={() => trackEvent("cta_click", { location: "bottom" })}
              >
                Start Pilot
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:hello@kindai.ai">Contact us</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border px-4 py-2 bg-muted/30"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCtaSection;
