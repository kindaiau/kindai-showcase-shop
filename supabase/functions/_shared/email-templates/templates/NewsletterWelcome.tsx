import React from "https://esm.sh/react@18.3.1";
import { Section, Text, Hr } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { colors, fonts } from "../styles.ts";

interface NewsletterWelcomeProps {
  name?: string;
}

export const NewsletterWelcome = ({ 
  name 
}: NewsletterWelcomeProps) => {
  const greeting = name ? `Hey ${name}!` : 'Hey there!';

  return (
    <EmailWrapper preview="Welcome to the Rebel Movement! 🎉">
      <Header 
        title="Welcome, Rebel!" 
        emoji="🚀"
      />
      
      <Section style={{ padding: '40px 30px' }}>
        <Text
          style={{
            color: colors.pink,
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            fontFamily: fonts.family,
          }}
        >
          {greeting} You're on the list!
        </Text>
        
        <Text
          style={{
            color: colors.text,
            fontSize: '16px',
            lineHeight: '1.8',
            margin: '0 0 24px 0',
            fontFamily: fonts.family,
          }}
        >
          You've just joined an exclusive community of rebels who refuse to be 
          limited by traditional coding barriers.
        </Text>
        
        {/* What You'll Get Box */}
        <Section
          style={{
            background: colors.darkCardAlt,
            borderLeft: `4px solid ${colors.green}`,
            padding: '20px',
            margin: '0 0 30px 0',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Text
            style={{
              color: colors.green,
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              fontFamily: fonts.family,
            }}
          >
            What You'll Get:
          </Text>
          <ul
            style={{
              color: colors.text,
              fontSize: '15px',
              lineHeight: '2',
              margin: '0',
              paddingLeft: '20px',
              fontFamily: fonts.family,
            }}
          >
            <li>🎯 Exclusive rebel business tips</li>
            <li>🛠️ Templates & resources</li>
            <li>🧠 ADHD-friendly strategies</li>
            <li>⚡ AI insights and updates</li>
            <li>🎁 Special offers for subscribers</li>
          </ul>
        </Section>
        
        <Text
          style={{
            color: colors.text,
            fontSize: '16px',
            lineHeight: '1.8',
            margin: '0 0 16px 0',
            fontFamily: fonts.family,
          }}
        >
          You're now part of the rebel community. We'll keep you updated with 
          the best tips and resources to help you build your freedom business.
        </Text>
        
        <Text
          style={{
            color: colors.text,
            fontSize: '16px',
            lineHeight: '1.8',
            margin: '0 0 32px 0',
            fontFamily: fonts.family,
          }}
        >
          Keep building, keep rebelling, and keep breaking the rules that don't 
          serve you.
        </Text>
        
        {/* CTA Button */}
        <Section style={{ textAlign: 'center' as const, margin: '32px 0' }}>
          <Button href="https://kindai-showcase-shop.lovable.app">
            Explore More →
          </Button>
        </Section>
        
        <Text
          style={{
            color: colors.text,
            fontSize: '16px',
            margin: '0',
            fontFamily: fonts.family,
          }}
        >
          Stay rebellious,
          <br />
          <strong style={{ color: colors.pink }}>The Kindai Team</strong>
        </Text>
        
        <Hr
          style={{
            borderColor: colors.border,
            margin: '30px 0',
          }}
        />
        
        <Text
          style={{
            color: colors.textSubtle,
            fontSize: '12px',
            textAlign: 'center' as const,
            margin: '0',
            fontFamily: fonts.family,
          }}
        >
          You're receiving this email because you subscribed to the Kindai newsletter.
          <br />
          Built by Rebels, for Rebels.
        </Text>
      </Section>
    </EmailWrapper>
  );
};

export default NewsletterWelcome;
