import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";

const audience = ["Builders who outgrew rigid tools", "People who want less friction", "Rebels who value compassion + speed", "Neurodivergent minds seeking freedom", "Anyone tired of broken systems", "Dreamers ready to build their future"];

const WhoIsThisFor = () => {
  const parallax1 = useParallax(0.1);
  const parallax2 = useParallax(0.15);

  return <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div 
          className="absolute top-0 left-1/4 w-72 h-72 bg-kindai-orange/10 rounded-full blur-3xl" 
          style={{ transform: `translateY(${parallax1}px)` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-kindai-green/10 rounded-full blur-3xl" 
          style={{ transform: `translateY(${parallax2}px)` }}
        />
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Built for Real People    <span className="text-kindai-blue">Digital Rebels</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              This playbook is for the ones who refuse to be limited
            </p>
          </div>
          
          <Card className="p-8 md:p-12 shadow-card">
            <div className="grid md:grid-cols-2 gap-6">
              {audience.map((item, index) => <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full gradient-rebel flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-relaxed">
                    {item}
                  </p>
                </div>)}
            </div>
          </Card>
        </div>
      </div>
    </section>;
};
export default WhoIsThisFor;