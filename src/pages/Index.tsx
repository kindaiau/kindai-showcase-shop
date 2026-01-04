import Hero from "@/components/Hero";
import Story from "@/components/Story";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyDifferent from "@/components/WhyDifferent";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimatedParticles from "@/components/AnimatedParticles";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedParticles count={40} />
      <Hero />
      <Story />
      <HowItWorks />
      <Features />
      <WhyDifferent />
      <WhoIsThisFor />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
