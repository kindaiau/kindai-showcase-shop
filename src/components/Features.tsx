import { Card } from "@/components/ui/card";
import { Brain, Zap, Heart, Sparkles, RefreshCw, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Built for ADHD Brains",
    description: "A small system that fits neurodivergent minds. 3 agents + 1 external brain (Sheet). No bloated workflows.",
    color: "text-kindai-pink",
  },
  {
    icon: Zap,
    title: "Prompt → Make → Publish",
    description: "One simple loop per day. Prompt your agents with ideas, make digital assets quickly, publish to your channels.",
    color: "text-kindai-orange",
  },
  {
    icon: Heart,
    title: "Compassion Meets Speed",
    description: "Built for builders who outgrew rigid tools. Less friction, more freedom. For rebels who value compassion + speed.",
    color: "text-kindai-green",
  },
  {
    icon: Sparkles,
    title: "3 Specialized AI Agents",
    description: "Your rebel toolkit includes step-by-step setup, templates, checklists, and powerful AI agents to bring your vision to life.",
    color: "text-kindai-blue",
  },
  {
    icon: RefreshCw,
    title: "Simple Daily Rhythm",
    description: "No endless setup. Just one loop per day. Review wins, update automations, plan next steps. That's enough.",
    color: "text-kindai-purple",
  },
  {
    icon: CheckCircle,
    title: "Complete Freedom",
    description: "For people tired of broken systems. Build websites, e-commerce stores, and AI magic without limits.",
    color: "text-kindai-pink",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your{" "}
              <span className="inline-block">
                <span className="text-kindai-pink text-glow-pink">R</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">b</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-purple text-glow-purple">l</span>
              </span>
              {" "}
              <span className="inline-block">
                <span className="text-kindai-pink text-glow-pink">T</span>
                <span className="text-kindai-orange text-glow-orange">o</span>
                <span className="text-kindai-green text-glow-green">o</span>
                <span className="text-kindai-blue text-glow-blue">l</span>
                <span className="text-kindai-purple text-glow-purple">k</span>
                <span className="text-kindai-pink text-glow-pink">i</span>
                <span className="text-kindai-orange text-glow-orange">t</span>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build incredible digital products. No fluff, just power.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-card transition-smooth border-2 hover:border-primary/30 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className={`${feature.color} transition-smooth group-hover:scale-110`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
