import React from "https://esm.sh/react@18.3.1";
import {
  Html,
  Head,
  Body,
  Container,
} from "https://esm.sh/@react-email/components@0.0.22";
import { colors, fonts } from "../styles.ts";

interface EmailWrapperProps {
  children: React.ReactNode;
  preview?: string;
}

export const EmailWrapper = ({ 
  children, 
  preview 
}: EmailWrapperProps) => {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {preview && (
          <meta name="description" content={preview} />
        )}
      </Head>
      <Body
        style={{
          margin: '0',
          padding: '40px 20px',
          backgroundColor: colors.dark,
          fontFamily: fonts.family,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: colors.darkCard,
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
};

export default EmailWrapper;
