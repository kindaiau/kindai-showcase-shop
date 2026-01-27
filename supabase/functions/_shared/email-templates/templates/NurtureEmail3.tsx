import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { Footer } from "../components/Footer.tsx";
import { colors, fonts } from "../styles.ts";

interface NurtureEmail3Props {
  firstName: string;
  senderName?: string;
}

export const NurtureEmail3 = ({ 
  firstName,
  senderName = "The Kindai Team"
}: NurtureEmail3Props) => {
  return (
    <EmailWrapper preview="Neither are most rebels using this.">
      <Header title="But I'm not technical..." />
      
      <Section style={{ padding: '30px' }}>
        <Text style={{ ...textStyle, fontSize: '18px' }}>
          Hey {firstName},
        </Text>
        
        <Text style={textStyle}>
          I get this question a lot:
        </Text>
        
        <Text style={{ ...textStyle, fontStyle: 'italic', color: colors.textMuted }}>
          "This sounds amazing, but I'm not technical. Will it work for me?"
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', fontSize: '18px' }}>
          Short answer: <span style={{ color: colors.green }}>Yes.</span> The Playbook was built for non-technical rebels.
        </Text>
        
        <Text style={textStyle}>
          Here's why:
        </Text>
        
        <Section style={featureBox}>
          <Text style={{ ...textStyle, margin: '0 0 16px 0' }}>
            <strong style={{ color: colors.pink }}>1. No prompts to engineer</strong><br />
            <span style={{ color: colors.textMuted }}>The agents are pre-configured. Just describe what you want in plain English.</span>
          </Text>
          
          <Text style={{ ...textStyle, margin: '0 0 16px 0' }}>
            <strong style={{ color: colors.orange }}>2. No code required</strong><br />
            <span style={{ color: colors.textMuted }}>The Tech Agent builds automations FOR you. You don't touch code.</span>
          </Text>
          
          <Text style={{ ...textStyle, margin: '0' }}>
            <strong style={{ color: colors.green }}>3. ADHD-friendly design</strong><br />
            <span style={{ color: colors.textMuted }}>Built by a neurodivergent founder who gets overwhelm. No fluff, no 47-step processes.</span>
          </Text>
        </Section>
        
        <Text style={textStyle}>
          If you can describe what you want, the agents handle the rest.
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', marginTop: '24px' }}>
          Don't take my word for it:
        </Text>
        
        <Section style={testimonialBox}>
          <Text style={{ ...textStyle, fontStyle: 'italic', margin: '0 0 8px 0' }}>
            "I went from idea to published blog post in 12 minutes. I've never shipped this fast."
          </Text>
          <Text style={{ ...textStyle, margin: '0', fontSize: '14px', color: colors.textMuted }}>
            — Solo founder, week 1 with the Playbook
          </Text>
        </Section>
        
        <Section style={testimonialBox}>
          <Text style={{ ...textStyle, fontStyle: 'italic', margin: '0 0 8px 0' }}>
            "The Business Strategist gave me a complete pricing strategy. It would've taken me days to figure that out alone."
          </Text>
          <Text style={{ ...textStyle, margin: '0', fontSize: '14px', color: colors.textMuted }}>
            — Coach transitioning online
          </Text>
        </Section>
        
        <Text style={{ ...textStyle, marginTop: '24px' }}>
          Ready to stop learning and start doing?
        </Text>
        
        <Section style={{ textAlign: 'center' as const, marginTop: '16px' }}>
          <Button href="https://kindai.dev/purchase?utm_source=email&utm_campaign=nurture&utm_content=email3">
            Get the 3-Agent Playbook →
          </Button>
        </Section>
        
        <Text style={{ ...textStyle, marginTop: '30px' }}>
          {senderName}
        </Text>
      </Section>
      
      <Footer />
    </EmailWrapper>
  );
};

const textStyle = {
  color: colors.text,
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 20px 0',
  fontFamily: fonts.family,
};

const featureBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const testimonialBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  borderLeft: `4px solid ${colors.pink}`,
  margin: '16px 0',
};

export default NurtureEmail3;
