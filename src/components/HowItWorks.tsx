import { MessageSquare, Bot, Download, ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us What You Need",
    description: "Need a blog post? Sales page? Email sequence? Business plan? Just describe it in plain English.",
    color: "kindai-pink",
    examples: ["Write me a welcome email sequence", "Create a content calendar for my coaching business", "Build an automation for lead follow-ups"],
  },
  {
    number: "02",
    icon: Bot,
    title: "Our AI Agents Do The Work",
    description: "Three specialized agents work as your team. No learning curve. No templates to fill. We do it.",
    color: "kindai-green",
    agents: [
      { name: "Content Agent", task: "writes your content" },
      { name: "Strategy Agent", task: "builds your plans" },
      { name: "Tech Agent", task: "creates your automations" },
    ],
  },
  {
    number: "03",
    icon: Download,
    title: "Download, Copy, or Deploy",
    description: "Ready-to-use content delivered. Copy with one click, export as files, or deploy directly.",
    color: "kindai-blue",
    features: ["One-click copy", "Export to any format", "Track in your dashboard"],
  },
];

const HowItWorks = () => {
  const parallax1 = useParallax(0.1);
  const parallax2 = useParallax(0.15);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-40 -right-40 w-80 h-80 bg-kindai-pink/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallax1}px)` }}
        />
        <div
          className="absolute bottom-40 -left-40 w-80 h-80 bg-kindai-green/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallax2}px)` }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <ScrollReveal animation="fade-left">
            <div className="text-center space-y-4">
              <p className="text-kindai-green font-medium uppercase tracking-wider text-sm">
                How It Works
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-kindai-pink text-glow-pink">Y</span>
                <span className="text-kindai-orange text-glow-orange">o</span>
                <span className="text-kindai-green text-glow-green">u</span>{" "}
                <span className="text-kindai-blue text-glow-blue">D</span>
                <span className="text-kindai-pink text-glow-pink">e</span>
                <span className="text-kindai-orange text-glow-orange">s</span>
                <span className="text-kindai-green text-glow-green">c</span>
                <span className="text-kindai-blue text-glow-blue">r</span>
                <span className="text-kindai-pink text-glow-pink">i</span>
                <span className="text-kindai-orange text-glow-orange">b</span>
                <span className="text-kindai-green text-glow-green">e</span>.{" "}
                <span className="text-kindai-blue text-glow-blue">W</span>
                <span className="text-kindai-pink text-glow-pink">e</span>{" "}
                <span className="text-kindai-orange text-glow-orange">D</span>
                <span className="text-kindai-green text-glow-green">e</span>
                <span className="text-kindai-blue text-glow-blue">l</span>
                <span className="text-kindai-pink text-glow-pink">i</span>
                <span className="text-kindai-orange text-glow-orange">v</span>
                <span className="text-kindai-green text-glow-green">e</span>
                <span className="text-kindai-blue text-glow-blue">r</span>.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No courses. No tutorials. No learning curve. Just tell our AI agents what you need, and they do the work.
              </p>
            </div>
          </ScrollReveal>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal
                key={index}
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={index * 150}
              >
                <div className="relative group h-full">
                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-muted-foreground/30 to-transparent" />
                )}

                <div className="bg-card border-2 border-border hover:border-primary/30 rounded-2xl p-6 transition-smooth h-full">
                  {/* Number badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${step.color}/20 text-${step.color} font-bold text-lg mb-4`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`text-${step.color} mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>

                  {/* Step-specific content */}
                  {step.examples && (
                    <div className="space-y-2">
                      {step.examples.map((example, i) => (
                        <div
                          key={i}
                          className="text-sm bg-muted/50 rounded-lg px-3 py-2 text-muted-foreground italic"
                        >
                          "{example}"
                        </div>
                      ))}
                    </div>
                  )}

                  {step.agents && (
                    <div className="space-y-2">
                      {step.agents.map((agent, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full bg-${step.color}`} />
                          <span className="font-medium">{agent.name}</span>
                          <span className="text-muted-foreground">{agent.task}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.features && (
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, i) => (
                        <span
                          key={i}
                          className={`text-xs bg-${step.color}/10 text-${step.color} px-2 py-1 rounded-full`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom tagline with link */}
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">The difference?</span>{" "}
              Other tools teach you to fish.{" "}
              <span className="text-kindai-green font-semibold">We hand you the fish — cooked, seasoned, and plated.</span>
            </p>
            <a 
              href="/how-it-works" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              See the full breakdown with demos
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
