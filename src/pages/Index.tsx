import Hero from "@/components/Hero";
import Story from "@/components/Story";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyDifferent from "@/components/WhyDifferent";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimatedParticles from "@/components/AnimatedParticles";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import SiteHeader from "@/components/SiteHeader";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <SEO 
        title="Kindai - The 3-Agent Playbook for Digital Rebels"
        description="3 AI Agents that create content, build strategies, and automate your business. Built by rebels, for rebels. ADHD-friendly."
        image="/og-home.png"
        url="https://kindai.dev"
      />
      <AnimatedParticles count={40} />
      <SiteHeader />
      <Hero />
      <Story />
      <HowItWorks />
      <Features />
      <WhyDifferent />
      <WhoIsThisFor />
      <CTA />
      <Footer />
      <FloatingHelpButton />
    </div>
  );
};

export default Index;
