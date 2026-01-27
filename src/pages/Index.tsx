import { useEffect } from "react";
import AnimatedParticles from "@/components/AnimatedParticles";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import BenefitsSection from "@/components/landing/BenefitsSection";
import BottomCtaSection from "@/components/landing/BottomCtaSection";
import FaqSection from "@/components/landing/FaqSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LeadCaptureSection from "@/components/landing/LeadCaptureSection";
import PricingSection from "@/components/landing/PricingSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import WhatYouGetSection from "@/components/landing/WhatYouGetSection";
import { storeUtmParamsFromUrl } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    storeUtmParamsFromUrl();
  }, []);

  return (
    <div className="min-h-screen relative">
      <SEO 
        title="Kindai - The 3-Agent Playbook for Digital Rebels"
        description="3 AI Agents that create content, build strategies, and automate your business — in minutes, not weeks. Built by rebels, for rebels."
        image="/og-home.png"
        url="https://kindai.dev"
      />
      <AnimatedParticles count={40} />
      <SiteHeader />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WhatYouGetSection />
      <SocialProofSection />
      <FaqSection />
      <PricingSection />
      <LeadCaptureSection />
      <BottomCtaSection />
      <Footer />
    </div>
  );
};

export default Index;
