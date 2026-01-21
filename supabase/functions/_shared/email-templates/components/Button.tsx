import React from "https://esm.sh/react@18.3.1";
import { Button as EmailButton } from "https://esm.sh/@react-email/components@0.0.22";
import { colors, gradients } from "../styles.ts";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ 
  href, 
  children, 
  variant = 'primary' 
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  
  return (
    <EmailButton
      href={href}
      style={{
        display: 'inline-block',
        background: isPrimary ? gradients.primary : colors.darkCardAlt,
        color: colors.text,
        textDecoration: 'none',
        padding: '16px 40px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        textAlign: 'center' as const,
      }}
    >
      {children}
    </EmailButton>
  );
};

export default Button;
