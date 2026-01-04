import { Sparkles } from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";
import { useParallax } from "@/hooks/use-parallax";
import ScrollReveal from "@/components/ScrollReveal";

const CTA = () => {
  const parallax = useParallax(0.1);

  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 gradient-hero opacity-10" 
        style={{ transform: `translateY(${parallax}px)` }}
      />
      
      <div className="container px-4 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
              <Sparkles className="w-4 h-4 text-kindai-pink" />
              <span className="text-sm font-medium">Ready to Build Your Freedom?</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-kindai-pink text-glow-pink">S</span>
              <span className="text-kindai-orange text-glow-orange">t</span>
              <span className="text-kindai-green text-glow-green">a</span>
              <span className="text-kindai-blue text-glow-blue">r</span>
              <span className="text-kindai-purple text-glow-purple">t</span>
              {" "}
              <span className="text-kindai-pink text-glow-pink">B</span>
              <span className="text-kindai-orange text-glow-orange">u</span>
              <span className="text-kindai-green text-glow-green">i</span>
              <span className="text-kindai-blue text-glow-blue">l</span>
              <span className="text-kindai-purple text-glow-purple">d</span>
              <span className="text-kindai-pink text-glow-pink">i</span>
              <span className="text-kindai-orange text-glow-orange">n</span>
              <span className="text-kindai-green text-glow-green">g</span>
              {" "}
              <span className="text-kindai-blue text-glow-blue">L</span>
              <span className="text-kindai-purple text-glow-purple">i</span>
              <span className="text-kindai-pink text-glow-pink">k</span>
              <span className="text-kindai-orange text-glow-orange">e</span>
              {" "}
              <span className="text-kindai-green text-glow-green">a</span>
              <br />
              <span className="inline-block">
                <span className="text-kindai-blue text-glow-blue">R</span>
                <span className="text-kindai-purple text-glow-purple">e</span>
                <span className="text-kindai-pink text-glow-pink">b</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">l</span>
              </span>
              {" "}
              <span className="inline-block">
                <span className="text-kindai-blue text-glow-blue">T</span>
                <span className="text-kindai-purple text-glow-purple">o</span>
                <span className="text-kindai-pink text-glow-pink">d</span>
                <span className="text-kindai-orange text-glow-orange">a</span>
                <span className="text-kindai-green text-glow-green">y</span>
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to the complete 3-Agent Playbook. Templates, checklists, diagrams, and your rebel toolkit. No fluff, just power.
            </p>
            
            <EmailCaptureForm variant="inline" />
            
            <div className="pt-8 space-y-2 text-sm text-muted-foreground">
              <p>✓ Instant digital access</p>
              <p>✓ Setup in 30 minutes</p>
              <p>✓ Built for neurodivergent minds</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
