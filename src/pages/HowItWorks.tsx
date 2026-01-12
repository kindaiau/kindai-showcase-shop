import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageSquare, Bot, Download, Sparkles, FileText, Target, Zap, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";
import Footer from "@/components/Footer";
import AnimatedParticles from "@/components/AnimatedParticles";
import SiteHeader from "@/components/SiteHeader";
import FloatingHelpButton from "@/components/FloatingHelpButton";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe What You Need",
    subtitle: "Talk to our AI like you'd talk to a teammate",
    description: "No technical jargon required. Just describe your goal in plain English. Whether it's a blog post, email sequence, business plan, or automation workflow — simply tell us what you're trying to achieve.",
    color: "kindai-pink",
    examples: [
      "Write me a 5-email welcome sequence for my coaching clients",
      "Create a content calendar for my fitness brand",
      "Build an automation that follows up with new leads",
      "Draft a sales page for my online course"
    ],
    videoPlaceholder: "Demo: Describing your first request",
    diagram: {
      type: "input",
      elements: ["Your Idea", "→", "Simple Prompt", "→", "AI Understands"]
    }
  },
  {
    number: "02",
    icon: Bot,
    title: "AI Agents Get to Work",
    subtitle: "Three specialized agents, one powerful team",
    description: "Your request is routed to the right specialist. Each agent is trained for specific tasks — so you get expert-level results, not generic AI output.",
    color: "kindai-green",
    agents: [
      {
        name: "Content Agent",
        icon: FileText,
        tasks: ["Blog posts & articles", "Email sequences", "Social media content", "Sales copy & landing pages"],
        color: "kindai-pink"
      },
      {
        name: "Strategy Agent", 
        icon: Target,
        tasks: ["Business plans", "Marketing strategies", "Content calendars", "Growth roadmaps"],
        color: "kindai-blue"
      },
      {
        name: "Tech Agent",
        icon: Zap,
        tasks: ["Workflow automations", "Integration setups", "System configurations", "Technical implementations"],
        color: "kindai-green"
      }
    ],
    videoPlaceholder: "Demo: Watch the agents in action",
    diagram: {
      type: "agents",
      elements: ["Your Request", "→", "Content Agent", "Strategy Agent", "Tech Agent", "→", "Expert Output"]
    }
  },
  {
    number: "03",
    icon: Download,
    title: "Get Your Results",
    subtitle: "Ready to use, not ready to learn",
    description: "Within minutes, you have finished content you can use immediately. Copy with one click, export to any format, or deploy directly. Track everything in your personal dashboard.",
    color: "kindai-blue",
    outputs: [
      { icon: "📝", label: "Copy to clipboard" },
      { icon: "📥", label: "Download as file" },
      { icon: "📊", label: "Export to Google Sheets" },
      { icon: "🚀", label: "Deploy directly" }
    ],
    features: [
      "One-click copy for instant use",
      "Export to any format (Word, PDF, etc.)",
      "Track all your generated content",
      "Revise and iterate with follow-up prompts"
    ],
    videoPlaceholder: "Demo: Using your finished content",
    diagram: {
      type: "output",
      elements: ["Finished Content", "→", "Review & Edit", "→", "Copy / Export / Deploy"]
    }
  }
];

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const parallax1 = useParallax(0.1);
  const parallax2 = useParallax(0.15);

  return (
    <div className="min-h-screen relative bg-background">
      <AnimatedParticles count={30} />
      <SiteHeader />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 -left-40 w-96 h-96 bg-kindai-pink/15 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallax1}px)` }}
          />
          <div
            className="absolute bottom-20 -right-40 w-96 h-96 bg-kindai-blue/15 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallax2}px)` }}
          />
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              How{" "}
              <span className="text-kindai-pink text-glow-pink">R</span>
              <span className="text-kindai-orange text-glow-orange">e</span>
              <span className="text-kindai-green text-glow-green">b</span>
              <span className="text-kindai-blue text-glow-blue">e</span>
              <span className="text-kindai-pink text-glow-pink">l</span>{" "}
              <span className="text-kindai-orange text-glow-orange">T</span>
              <span className="text-kindai-green text-glow-green">o</span>
              <span className="text-kindai-blue text-glow-blue">o</span>
              <span className="text-kindai-pink text-glow-pink">l</span>
              <span className="text-kindai-orange text-glow-orange">k</span>
              <span className="text-kindai-green text-glow-green">i</span>
              <span className="text-kindai-blue text-glow-blue">t</span>
              {" "}Works
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps. Zero learning curve. Just tell us what you need — we do the rest.
            </p>

            {/* Quick visual overview */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-8">
              <div className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2">
                <MessageSquare className="w-5 h-5 text-kindai-pink" />
                <span className="font-medium">Describe</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              <div className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2">
                <Bot className="w-5 h-5 text-kindai-green" />
                <span className="font-medium">AI Works</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              <div className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2">
                <Download className="w-5 h-5 text-kindai-blue" />
                <span className="font-medium">Get Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      {steps.map((step, stepIndex) => (
        <section
          key={stepIndex}
          className={`py-20 ${stepIndex % 2 === 1 ? 'bg-muted/30' : 'bg-background'}`}
        >
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-${step.color}/20 text-${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div>
                  <p className={`text-${step.color} font-bold text-sm uppercase tracking-wider`}>
                    Step {step.number}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold">{step.title}</h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Content */}
                <div className="space-y-6">
                  <p className="text-lg font-medium text-muted-foreground">
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step-specific content */}
                  {step.examples && (
                    <div className="space-y-3">
                      <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Example prompts:
                      </p>
                      <div className="space-y-2">
                        {step.examples.map((example, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-card border border-border rounded-lg p-3"
                          >
                            <MessageSquare className={`w-4 h-4 mt-0.5 text-${step.color} flex-shrink-0`} />
                            <span className="text-sm italic">"{example}"</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.agents && (
                    <div className="grid gap-4">
                      {step.agents.map((agent, i) => (
                        <div
                          key={i}
                          className={`bg-card border-2 border-border hover:border-${agent.color}/50 rounded-xl p-4 transition-smooth`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-${agent.color}/20 flex items-center justify-center`}>
                              <agent.icon className={`w-5 h-5 text-${agent.color}`} />
                            </div>
                            <h3 className="font-bold text-lg">{agent.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {agent.tasks.map((task, j) => (
                              <span
                                key={j}
                                className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                              >
                                {task}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.features && (
                    <div className="space-y-3">
                      {step.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 text-${step.color}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.outputs && (
                    <div className="grid grid-cols-2 gap-3">
                      {step.outputs.map((output, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
                        >
                          <span className="text-2xl">{output.icon}</span>
                          <span className="text-sm font-medium">{output.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Visual/Video */}
                <div className="space-y-6">
                  {/* Flow Diagram */}
                  <div className="bg-card border-2 border-border rounded-2xl p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                      Visual Flow
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {step.diagram.elements.map((el, i) => (
                        el === "→" ? (
                          <ArrowRight key={i} className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <div
                            key={i}
                            className={`bg-${step.color}/10 border border-${step.color}/30 rounded-lg px-4 py-2 text-center`}
                          >
                            <span className="font-medium text-sm">{el}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden aspect-video border-2 border-border group cursor-pointer hover:border-primary/30 transition-smooth">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-${step.color} flex items-center justify-center group-hover:scale-110 transition-smooth shadow-lg`}>
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        {step.videoPlaceholder}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Coming soon
                      </p>
                    </div>
                    
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Summary Diagram */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                The Complete Picture
              </h2>
              <p className="text-xl text-muted-foreground">
                From idea to finished product in minutes, not hours
              </p>
            </div>

            {/* Full flow diagram */}
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* You */}
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-rebel flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                  <p className="font-bold">You</p>
                  <p className="text-xs text-muted-foreground">Describe your idea</p>
                </div>

                <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />

                {/* Rebel Toolkit */}
                <div className="text-center space-y-2">
                  <div className="w-32 h-20 mx-auto rounded-xl border-2 border-primary/30 bg-primary/5 flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-kindai-pink/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-kindai-pink" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-kindai-blue/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-kindai-blue" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-kindai-green/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-kindai-green" />
                    </div>
                  </div>
                  <p className="font-bold">Rebel Toolkit</p>
                  <p className="text-xs text-muted-foreground">3 AI Agents work</p>
                </div>

                <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />

                {/* Results */}
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-full bg-kindai-green/20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-kindai-green" />
                  </div>
                  <p className="font-bold">Results</p>
                  <p className="text-xs text-muted-foreground">Ready to use</p>
                </div>
              </div>
            </div>

            {/* Time comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Traditional Way</p>
                <p className="text-2xl font-bold text-destructive">4-8 hours</p>
                <p className="text-sm text-muted-foreground mt-2">Research, learn, draft, revise, finalize</p>
              </div>
              <div className="bg-kindai-green/10 rounded-xl p-6 border-2 border-kindai-green/30">
                <p className="text-sm text-muted-foreground mb-2">With Rebel Toolkit</p>
                <p className="text-2xl font-bold text-kindai-green">5-15 minutes</p>
                <p className="text-sm text-muted-foreground mt-2">Describe, wait, use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to See It in Action?
            </h2>
            <p className="text-xl text-muted-foreground">
              Stop watching tutorials. Start getting results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 gradient-rebel hover:opacity-90 transition-smooth shadow-glow group"
                onClick={() => navigate("/toolkit")}
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Try Rebel Toolkit Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingHelpButton />
    </div>
  );
};

export default HowItWorksPage;
