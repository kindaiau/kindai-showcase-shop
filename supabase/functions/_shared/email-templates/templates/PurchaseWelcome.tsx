import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { NumberedSteps } from "../components/NumberedSteps.tsx";
import { FeatureList } from "../components/FeatureList.tsx";
import { colors, fonts } from "../styles.ts";

interface PurchaseWelcomeProps {
  productName?: string;
}

export const PurchaseWelcome = ({ 
  productName = "Rebel Toolkit" 
}: PurchaseWelcomeProps) => {
  const steps = [
    {
      title: "Go to the Toolkit",
      description: "Click the button below to access your dashboard",
    },
    {
      title: "Sign in with THIS email",
      description: "Use the same email you used to purchase",
    },
    {
      title: "Start building!",
      description: "All 3 agents + templates are unlocked",
    },
  ];

  const features = [
    {
      highlight: "Content Creator Agent",
      highlightColor: colors.pink,
      text: "Blog posts, emails, social content",
    },
    {
      highlight: "Business Strategist Agent",
      highlightColor: colors.orange,
      text: "Plans, pricing, market analysis",
    },
    {
      highlight: "Automation Engineer Agent",
      highlightColor: colors.green,
      text: "Workflows, integrations, SEO",
    },
    {
      text: "Done-for-you templates and checklists",
    },
    {
      text: "30-day launch roadmap",
    },
  ];

  return (
    <EmailWrapper preview={`Welcome to ${productName}! Your AI agents are ready.`}>
      <Header 
        title="Welcome to the Rebellion!" 
        emoji="🚀"
      />
      
      <Section style={{ padding: '40px' }}>
        <Text
          style={{
            color: colors.text,
            fontSize: '18px',
            lineHeight: '1.6',
            margin: '0 0 20px 0',
            fontFamily: fonts.family,
          }}
        >
          Thank you for purchasing the <strong>{productName}</strong>!
        </Text>
        
        <Text
          style={{
            color: colors.textMuted,
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0 0 30px 0',
            fontFamily: fonts.family,
          }}
        >
          Your 3 AI agents are ready and waiting. Here's how to access everything:
        </Text>
        
        {/* Steps */}
        <NumberedSteps steps={steps} />
        
        {/* CTA Button */}
        <Section style={{ textAlign: 'center' as const, padding: '20px 0' }}>
          <Button href="https://kindai-showcase-shop.lovable.app/welcome">
            Access Your Toolkit →
          </Button>
        </Section>
        
        {/* What's Inside */}
        <FeatureList 
          title="✨ What's Inside:" 
          items={features} 
        />
      </Section>
      
      <Footer />
    </EmailWrapper>
  );
};

export default PurchaseWelcome;
