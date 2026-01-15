import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AccessInstructionsEmailProps {
  customerEmail: string;
  tier?: string;
  toolkitUrl?: string;
  hasAccount?: boolean;
}

export const AccessInstructionsEmail = ({
  customerEmail = "customer@example.com",
  tier = "Starter",
  toolkitUrl = "https://kindai.io/toolkit",
  hasAccount = false,
}: AccessInstructionsEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>How to access your Rebel Toolkit 🔑</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>
              Let's Get You Started! 🔑
            </Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Hey Rebel! 👋
            </Heading>

            <Text style={paragraph}>
              You're all set to start using The Rebel Toolkit. Here's how to get in:
            </Text>

            <Section style={stepBox}>
              <Heading as="h3" style={stepHeading}>
                {hasAccount ? "Step 1: Log In" : "Step 1: Create Your Account"}
              </Heading>
              <Text style={stepText}>
                {hasAccount 
                  ? "Sign in with the email address you used for purchase:" 
                  : "Create your free account using the email address you used for purchase:"}
              </Text>
              <Text style={emailHighlight}>{customerEmail}</Text>
            </Section>

            <Section style={stepBox}>
              <Heading as="h3" style={stepHeading}>
                Step 2: Access Your Toolkit
              </Heading>
              <Text style={stepText}>
                Your license is automatically linked to your account. Click the button below to access your toolkit:
              </Text>
              <Section style={buttonContainer}>
                <Button style={button} href={toolkitUrl}>
                  Access Your Toolkit →
                </Button>
              </Section>
            </Section>

            <Section style={stepBox}>
              <Heading as="h3" style={stepHeading}>
                Step 3: Start Building
              </Heading>
              <Text style={stepText}>
                Once inside, you'll find:
              </Text>
              <ul style={list}>
                <li style={listItem}>
                  <strong>3 AI Agents</strong> ready to help you craft your brand voice, create offers, and test business ideas
                </li>
                <li style={listItem}>
                  <strong>Complete guides</strong> with step-by-step instructions
                </li>
                <li style={listItem}>
                  <strong>Templates & frameworks</strong> to accelerate your progress
                </li>
              </ul>
            </Section>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                💡 <strong>Pro Tip:</strong> Start with the Brand Voice Agent to discover your unique voice, then use the Offer Crafter to create your first irresistible offer!
              </Text>
            </Section>

            <Text style={paragraph}>
              Need help? Just reply to this email and we'll get you sorted out.
            </Text>

            <Text style={paragraph}>
              Stay rebellious,<br />
              <strong style={brandText}>The Kindai Team</strong>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Built by Rebels, for Rebels. Welcome to the movement! 🚀
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AccessInstructionsEmail;

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const header = {
  background: "linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%)",
  padding: "40px 20px",
  textAlign: "center" as const,
  borderRadius: "12px 12px 0 0",
};

const headerHeading = {
  color: "#ffffff",
  margin: "0",
  fontSize: "28px",
  fontWeight: "bold",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px 30px",
  border: "1px solid #e5e7eb",
  borderTop: "none",
  borderRadius: "0 0 12px 12px",
};

const greeting = {
  fontSize: "18px",
  marginTop: "0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#333333",
};

const stepBox = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "24px",
  margin: "20px 0",
  borderRadius: "8px",
};

const stepHeading = {
  marginTop: "0",
  marginBottom: "12px",
  color: "#1e293b",
  fontSize: "18px",
};

const stepText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#475569",
  margin: "0 0 12px 0",
};

const emailHighlight = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#FF1B8D",
  fontFamily: "monospace",
  backgroundColor: "#fef2f2",
  padding: "8px 12px",
  borderRadius: "4px",
  display: "inline-block",
};

const list = {
  margin: "12px 0",
  paddingLeft: "20px",
};

const listItem = {
  marginBottom: "10px",
  fontSize: "15px",
  lineHeight: "1.6",
};

const highlightBox = {
  backgroundColor: "#fef3c7",
  border: "2px solid #fbbf24",
  padding: "20px",
  margin: "30px 0",
  borderRadius: "8px",
};

const highlightText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#92400e",
  margin: "0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const button = {
  background: "linear-gradient(135deg, #FF1B8D 0%, #FF6B35 100%)",
  color: "#ffffff",
  padding: "16px 32px",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(255, 27, 141, 0.3)",
};

const brandText = {
  color: "#FF1B8D",
};

const hr = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "30px 0",
};

const footer = {
  fontSize: "12px",
  color: "#6b7280",
  textAlign: "center" as const,
};
