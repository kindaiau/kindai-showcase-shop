import { Check, X } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import ScrollReveal from "@/components/ScrollReveal";

const comparisons = [
  {
    others: "Here's how to write a blog post",
    us: "Here's your blog post, ready to publish",
  },
  {
    others: "Courses and tutorials to learn",
    us: "AI agents that work for you",
  },
  {
    others: "You learn, then you do the work",
    us: "We do the work, you approve",
  },
  {
    others: "Templates you fill out yourself",
    us: "Completed content you customize",
  },
  {
    others: "Hours of learning before results",
    us: "Minutes from idea to finished product",
  },
];

const differentiators = [
  {
    title: "Done-For-You, Not DIY",
    description: "Our AI agents create the actual content, strategies, and automations. You just describe what you need.",
    color: "kindai-pink",
  },
  {
    title: "3 Specialized Agents",
    description: "Content Agent writes. Strategy Agent plans. Tech Agent automates. Like having a team, not a tool.",
    color: "kindai-green",
  },
  {
    title: "Built for ADHD Brains",
    description: "No 47-step processes. No overwhelm. Simple prompts, immediate results. Designed for how you actually work.",
    color: "kindai-blue",
  },
];

const WhyDifferent = () => {
  const parallax = useParallax(0.1);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kindai-purple/5 rounded-full blur-3xl"
          style={{ transform: `translate(-50%, calc(-50% + ${parallax}px))` }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <ScrollReveal animation="fade-left">
            <div className="text-center space-y-4">
              <p className="text-kindai-purple font-medium uppercase tracking-wider text-sm">
                Why We're Different
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-kindai-pink text-glow-pink">S</span>
                <span className="text-kindai-orange text-glow-orange">t</span>
                <span className="text-kindai-green text-glow-green">o</span>
                <span className="text-kindai-blue text-glow-blue">p</span>{" "}
                <span className="text-kindai-pink text-glow-pink">L</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">a</span>
                <span className="text-kindai-blue text-glow-blue">r</span>
                <span className="text-kindai-pink text-glow-pink">n</span>
                <span className="text-kindai-orange text-glow-orange">i</span>
                <span className="text-kindai-green text-glow-green">n</span>
                <span className="text-kindai-blue text-glow-blue">g</span>.{" "}
                <span className="text-kindai-pink text-glow-pink">S</span>
                <span className="text-kindai-orange text-glow-orange">t</span>
                <span className="text-kindai-green text-glow-green">a</span>
                <span className="text-kindai-blue text-glow-blue">r</span>
                <span className="text-kindai-pink text-glow-pink">t</span>{" "}
                <span className="text-kindai-orange text-glow-orange">D</span>
                <span className="text-kindai-green text-glow-green">o</span>
                <span className="text-kindai-blue text-glow-blue">i</span>
                <span className="text-kindai-pink text-glow-pink">n</span>
                <span className="text-kindai-orange text-glow-orange">g</span>.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Most tools give you instructions. We give you results.
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Table */}
          <ScrollReveal animation="fade-right" delay={100}>
            <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-2 bg-muted/50">
                <div className="p-4 md:p-6 border-r border-border">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <X className="w-5 h-5 text-destructive" />
                    <span>Other Tools</span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-5 h-5 text-kindai-green" />
                    <span className="text-gradient-rebel">Rebel Toolkit</span>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-t border-border"
                >
                  <div className="p-4 md:p-6 border-r border-border text-muted-foreground">
                    {item.others}
                  </div>
                  <div className="p-4 md:p-6 font-medium">
                    {item.us}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Differentiators */}
          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <ScrollReveal key={index} animation={index % 2 === 0 ? "fade-left" : "fade-right"} delay={index * 100}>
                <div
                  className={`bg-card border-2 border-border hover:border-${item.color}/50 rounded-2xl p-6 transition-smooth h-full`}
                >
                  <div className={`w-3 h-3 rounded-full bg-${item.color} mb-4`} />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal animation="scale">
            <div className="text-center bg-gradient-to-r from-kindai-pink/10 via-kindai-green/10 to-kindai-blue/10 rounded-2xl p-8 border-2 border-border">
              <p className="text-2xl font-bold mb-2">
                Ready to stop learning and start{" "}
                <span className="text-kindai-green">getting things done</span>?
              </p>
              <p className="text-muted-foreground">
                Join thousands of rebels who chose results over tutorials.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
