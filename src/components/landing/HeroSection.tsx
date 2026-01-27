import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16">
      <div className="container px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Kindai — People-first AI assistant system
            </p>
            {/* TODO: Replace with wedge-specific copy. */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Kindai helps [Your User] get [Specific Outcome] in [Timeframe]
              without [Pain].
            </h1>
            {/* TODO: Replace with wedge-specific subheading. */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              A simple, human-centered AI copilot that clarifies priorities,
              automates the busywork, and keeps you moving every week.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-base px-6 bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
              >
                <a
                  href="#lead-form"
                  onClick={() => trackEvent("cta_click", { location: "hero" })}
                >
                  Start Pilot
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-6">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-green" />
                Built for busy teams
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-blue" />
                Human-in-the-loop support
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-pink" />
                Pilot ready in days
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elegant">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                What Kindai replaces
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-orange" />
                  Disconnected tools, manual status updates, and never-ending
                  follow-ups.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-pink" />
                  Inconsistent handoffs between strategy, execution, and
                  accountability.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-green" />
                  Weeks lost deciding what to do next.
                </li>
              </ul>
              <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
                {/* TODO: Add wedge-specific proof point. */}
                <strong className="text-foreground">Pilot promise:</strong> a
                clear weekly plan, automated follow-through, and measurable
                outcomes in your first sprint.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
