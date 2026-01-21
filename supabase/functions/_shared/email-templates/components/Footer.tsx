import React from "https://esm.sh/react@18.3.1";
import { Section, Text, Link } from "https://esm.sh/@react-email/components@0.0.22";
import { colors, fonts } from "../styles.ts";

interface FooterProps {
  supportEmail?: string;
}

export const Footer = ({ 
  supportEmail = "support@kindai.io" 
}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Section
      style={{
        padding: '30px',
        backgroundColor: colors.darkFooter,
        textAlign: 'center' as const,
      }}
    >
      <Text
        style={{
          color: colors.textSubtle,
          fontSize: '14px',
          margin: '0 0 10px 0',
          fontFamily: fonts.family,
        }}
      >
        Questions? Reply to this email or contact us at{' '}
        <Link
          href={`mailto:${supportEmail}`}
          style={{ color: colors.pink, textDecoration: 'underline' }}
        >
          {supportEmail}
        </Link>
      </Text>
      <Text
        style={{
          color: colors.textFaint,
          fontSize: '12px',
          margin: '0',
          fontFamily: fonts.family,
        }}
      >
        © {currentYear} Kindai. Built for rebels, by rebels.
      </Text>
    </Section>
  );
};

export default Footer;
