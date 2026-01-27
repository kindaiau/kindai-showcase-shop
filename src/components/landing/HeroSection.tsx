import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16">
      <div className="container px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              The 3-Agent Playbook for Digital Rebels
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Stop learning.{" "}
              <span className="text-kindai-pink">Start doing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              3 AI Agents that create content, build strategies, and automate 
              your business — in minutes, not weeks. Built by rebels, for rebels.
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
                  Get the Playbook
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-6">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-green" />
                No code required
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-blue" />
                ADHD-friendly
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kindai-pink" />
                Lifetime access
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elegant">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your AI Execution Team
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-orange" />
                  <div>
                    <strong className="text-foreground">Content Creator</strong>
                    <span className="text-muted-foreground"> — Blog posts, social media, emails. Ready to publish.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-pink" />
                  <div>
                    <strong className="text-foreground">Business Strategist</strong>
                    <span className="text-muted-foreground"> — Plans, pricing, positioning. Done for you.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-kindai-green" />
                  <div>
                    <strong className="text-foreground">Automation Engineer</strong>
                    <span className="text-muted-foreground"> — Workflows and tech setup. No code needed.</span>
                  </div>
                </li>
              </ul>
              <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
                <strong className="text-foreground">Traditional way:</strong> 4–8 hours.{" "}
                <strong className="text-kindai-green">Rebel way:</strong> 5–15 minutes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
