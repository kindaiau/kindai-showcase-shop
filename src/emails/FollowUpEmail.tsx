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

interface FollowUpEmailProps {
  customerEmail: string;
  tier?: string;
  toolkitUrl?: string;
  daysAfterPurchase?: number;
}

export const FollowUpEmail = ({
  customerEmail = "customer@example.com",
  tier = "Starter",
  toolkitUrl = "https://kindai.io/toolkit",
  daysAfterPurchase = 3,
}: FollowUpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>How are you finding The Rebel Toolkit? 💡</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>
              How's Your Rebel Journey Going? 🚀
            </Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Hey Rebel! 👋
            </Heading>

            <Text style={paragraph}>
              It's been a few days since you joined The Rebel Toolkit, and we wanted to check in!
            </Text>

            <Text style={paragraph}>
              Have you had a chance to explore the AI agents yet? Here are some tips to get the most out of your toolkit:
            </Text>

            <Section style={tipBox}>
              <Heading as="h3" style={tipHeading}>
                🎯 Quick Start Guide
              </Heading>
              <ul style={list}>
                <li style={listItem}>
                  <strong>Start with Brand Voice:</strong> Spend 15-20 minutes discovering your unique voice. This forms the foundation for everything else.
                </li>
                <li style={listItem}>
                  <strong>Create Your First Offer:</strong> Use the Offer Crafter to turn your expertise into an irresistible offer.
                </li>
                <li style={listItem}>
                  <strong>Validate Fast:</strong> Run the Business Test to make sure you're on the right track before investing more time.
                </li>
              </ul>
            </Section>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                💡 <strong>Rebel Tip:</strong> The best results come from taking action on one thing at a time. Don't try to do everything at once—pick one agent, go deep, and implement what you learn.
              </Text>
            </Section>

            <Text style={paragraph}>
              Remember: You have <strong>lifetime access</strong> to all updates and improvements. There's no rush, but the sooner you start, the sooner you'll see results.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={toolkitUrl}>
                Continue Building →
              </Button>
            </Section>

            {tier === "Starter" && (
              <Section style={upgradeBox}>
                <Heading as="h3" style={upgradeHeading}>
                  🌟 Ready to Level Up?
                </Heading>
                <Text style={upgradeText}>
                  If you're finding The Rebel Toolkit valuable and want advanced features like priority support, premium prompt packs, and client-ready frameworks, consider upgrading to Growth or Agency tier.
                </Text>
                <Text style={upgradeText}>
                  <strong>Special upgrade pricing available for existing members.</strong> Reply to this email if you're interested!
                </Text>
              </Section>
            )}

            <Text style={paragraph}>
              Got questions or stuck on something? Just hit reply and we'll help you out. We read every email personally.
            </Text>

            <Text style={paragraph}>
              Keep building,<br />
              <strong style={brandText}>The Kindai Team</strong>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              You're receiving this because you purchased The Rebel Toolkit {daysAfterPurchase} days ago.
              <br />
              Built by Rebels, for Rebels.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default FollowUpEmail;

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

const tipBox = {
  backgroundColor: "#eff6ff",
  border: "2px solid #3b82f6",
  padding: "24px",
  margin: "30px 0",
  borderRadius: "8px",
};

const tipHeading = {
  marginTop: "0",
  marginBottom: "16px",
  color: "#1e40af",
  fontSize: "18px",
};

const list = {
  margin: "12px 0",
  paddingLeft: "20px",
};

const listItem = {
  marginBottom: "16px",
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#1e40af",
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

const upgradeBox = {
  backgroundColor: "#faf5ff",
  border: "2px solid #a855f7",
  padding: "24px",
  margin: "30px 0",
  borderRadius: "8px",
};

const upgradeHeading = {
  marginTop: "0",
  marginBottom: "12px",
  color: "#7e22ce",
  fontSize: "18px",
};

const upgradeText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#6b21a8",
  margin: "0 0 12px 0",
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
