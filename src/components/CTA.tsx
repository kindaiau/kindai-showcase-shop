import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Sparkles className="w-4 h-4 text-kindai-pink" />
            <span className="text-sm font-medium">Ready to Build Your Freedom?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Start Building Like a
            <br />
            <span className="text-gradient-hero">Rebel Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant access to the complete 3-Agent Playbook. Templates, checklists, diagrams, and your rebel toolkit. No fluff, just power.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 gradient-rebel hover:opacity-90 transition-smooth shadow-glow group"
            >
              Get the Playbook Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>
          
          <div className="pt-8 space-y-2 text-sm text-muted-foreground">
            <p>✓ Instant digital access</p>
            <p>✓ Setup in 30 minutes</p>
            <p>✓ Built for neurodivergent minds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
