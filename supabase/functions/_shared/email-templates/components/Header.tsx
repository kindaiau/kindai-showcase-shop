import React from "https://esm.sh/react@18.3.1";
import { Section, Heading, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { colors, gradients } from "../styles.ts";

interface HeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
}

export const Header = ({ 
  title, 
  subtitle, 
  emoji = "🚀" 
}: HeaderProps) => {
  return (
    <Section
      style={{
        background: gradients.hero,
        padding: '40px',
        textAlign: 'center' as const,
      }}
    >
      <Heading
        style={{
          color: colors.text,
          fontSize: '32px',
          margin: '0',
          fontWeight: 'bold',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {emoji} {title}
      </Heading>
      {subtitle && (
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: '12px 0 0 0',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {subtitle}
        </Text>
      )}
    </Section>
  );
};

export default Header;
