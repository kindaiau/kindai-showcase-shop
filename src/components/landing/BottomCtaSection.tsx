import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const badges = ["Lifetime access", "30-day guarantee", "No code required"];

const BottomCtaSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to stop learning and{" "}
            <span className="text-kindai-pink text-glow-pink">s</span>
            <span className="text-kindai-orange text-glow-orange">t</span>
            <span className="text-kindai-green text-glow-green">a</span>
            <span className="text-kindai-blue text-glow-blue">r</span>
            <span className="text-kindai-pink text-glow-pink">t</span>
            {" "}
            <span className="text-kindai-orange text-glow-orange">d</span>
            <span className="text-kindai-green text-glow-green">o</span>
            <span className="text-kindai-blue text-glow-blue">i</span>
            <span className="text-kindai-pink text-glow-pink">n</span>
            <span className="text-kindai-orange text-glow-orange">g</span>?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Get the 3-Agent Playbook and build your digital business in minutes, not months.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
            >
              <a
                href="/purchase"
                onClick={() => trackEvent("cta_click", { location: "bottom" })}
              >
                Get the Playbook
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">See how it works</a>
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
