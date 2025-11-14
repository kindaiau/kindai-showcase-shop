import { Card } from "@/components/ui/card";

const Story = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 shadow-card border-2 hover:border-primary/50 transition-smooth">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-rebel">
                The Rebel's Beginning
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
                <blockquote className="text-2xl md:text-3xl font-bold text-gradient-hero italic">
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
