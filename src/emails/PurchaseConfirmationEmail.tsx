import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PurchaseConfirmationEmailProps {
  customerEmail: string;
  productName: string;
  tier?: string;
  licenseKey?: string;
  toolkitUrl?: string;
}

export const PurchaseConfirmationEmail = ({
  customerEmail = "customer@example.com",
  productName = "The Rebel Toolkit",
  tier = "Starter",
  licenseKey,
  toolkitUrl = "https://kindai.io/toolkit",
}: PurchaseConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to The Rebel Toolkit! Your purchase is confirmed 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>
              Welcome to The Rebel Toolkit! 🚀
            </Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Hey Rebel! 👋
            </Heading>

            <Text style={paragraph}>
              Your purchase has been verified and you now have <strong>full access</strong> to The Rebel Toolkit!
            </Text>

            <Section style={highlightBox}>
              <Heading as="h3" style={highlightHeading}>
                Your toolkit includes:
              </Heading>
              <ul style={list}>
                <li style={listItem}>
                  🤖 <strong>3 AI Agents</strong> - Brand Voice, Offer Crafter, Business Test
                </li>
                <li style={listItem}>
                  📚 <strong>Complete Guides</strong> - Step-by-step rebel playbooks
                </li>
                <li style={listItem}>
                  📝 <strong>Templates</strong> - Ready-to-use frameworks
                </li>
                <li style={listItem}>
                  ⚡ <strong>Lifetime Access</strong> - All future updates included
                </li>
              </ul>
            </Section>

            {tier && (
              <Text style={paragraph}>
                <strong>Your Tier:</strong> {tier}
              </Text>
            )}

            {licenseKey && (
              <Section style={licenseBox}>
                <Text style={licenseLabel}>Your License Key:</Text>
                <Text style={licenseKey}>{licenseKey}</Text>
                <Text style={licenseNote}>
                  Keep this safe! You can use it to verify your purchase anytime.
                </Text>
              </Section>
            )}

            <Section style={buttonContainer}>
              <Button style={button} href={toolkitUrl}>
                Access Your Toolkit →
              </Button>
            </Section>

            <Text style={paragraph}>
              If you have any questions, just reply to this email. We're here to help!
            </Text>

            <Text style={paragraph}>
              Stay rebellious,<br />
              <strong style={brandText}>The Kindai Team</strong>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Thank you for your purchase! Built by Rebels, for Rebels.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PurchaseConfirmationEmail;

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

const highlightBox = {
  backgroundColor: "#f0fdf4",
  borderLeft: "4px solid #10b981",
  padding: "20px",
  margin: "30px 0",
  borderRadius: "4px",
};

const highlightHeading = {
  marginTop: "0",
  color: "#10b981",
  fontSize: "18px",
};

const list = {
  margin: "0",
  paddingLeft: "20px",
};

const listItem = {
  marginBottom: "10px",
  fontSize: "15px",
};

const licenseBox = {
  backgroundColor: "#fef3c7",
  border: "2px dashed #f59e0b",
  padding: "20px",
  margin: "30px 0",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const licenseLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#92400e",
  margin: "0 0 10px 0",
};

const licenseKey = {
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "monospace",
  color: "#92400e",
  backgroundColor: "#fffbeb",
  padding: "12px",
  borderRadius: "4px",
  margin: "10px 0",
};

const licenseNote = {
  fontSize: "12px",
  color: "#92400e",
  margin: "10px 0 0 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "40px 0",
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
