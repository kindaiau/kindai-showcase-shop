import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Features from "@/components/Features";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Story />
      <Features />
      <WhoIsThisFor />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
