import { Card } from "@/components/ui/card";
import { useParallax } from "@/hooks/use-parallax";

const Story = () => {
  const parallax1 = useParallax(0.12);
  const parallax2 = useParallax(0.08);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Parallax background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-kindai-purple/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallax1}px)` }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-kindai-orange/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallax2}px)` }}
        />
      </div>
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 shadow-card border-2 hover:border-primary/50 transition-smooth">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-kindai-pink text-glow-pink">T</span>
                <span className="text-kindai-orange text-glow-orange">h</span>
                <span className="text-kindai-green text-glow-green">e</span>
                {" "}
                <span className="text-kindai-blue text-glow-blue">R</span>
                <span className="text-kindai-purple text-glow-purple">e</span>
                <span className="text-kindai-pink text-glow-pink">b</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">l</span>
                <span className="text-kindai-blue text-glow-blue">'</span>
                <span className="text-kindai-purple text-glow-purple">s</span>
                {" "}
                <span className="text-kindai-pink text-glow-pink">B</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">g</span>
                <span className="text-kindai-blue text-glow-blue">i</span>
                <span className="text-kindai-purple text-glow-purple">n</span>
                <span className="text-kindai-pink text-glow-pink">n</span>
                <span className="text-kindai-orange text-glow-orange">i</span>
                <span className="text-kindai-green text-glow-green">n</span>
                <span className="text-kindai-blue text-glow-blue">g</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I was told I'd never make it. Neurodivergent, no safety net — just a kid with ideas in a world that said "no." But I fought, learned, and built.
                </p>
                
                <p>
                  That burning desire to care for loved ones, forged by adversity, fueled my path. Now, through Loveable AI, I empower you to build incredible things too.
                </p>
                
                <p className="text-xl font-semibold text-foreground pt-4">
                  This is for the underdogs, the dreamers, the rebels.
                </p>
              </div>
              
              <div className="pt-6 border-t border-border">
                <blockquote className="text-2xl md:text-3xl font-bold text-kindai-purple italic">
                  "Forged by bullies, freed by building."
                </blockquote>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Story;
