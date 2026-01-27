import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { Footer } from "../components/Footer.tsx";
import { colors, fonts } from "../styles.ts";

interface NurtureEmail2Props {
  firstName: string;
  senderName?: string;
}

export const NurtureEmail2 = ({ 
  firstName,
  senderName = "The Kindai Team"
}: NurtureEmail2Props) => {
  return (
    <EmailWrapper preview="Not another chatbot. Something different.">
      <Header title="The Solution" />
      
      <Section style={{ padding: '30px' }}>
        <Text style={{ ...textStyle, fontSize: '18px' }}>
          Hey {firstName},
        </Text>
        
        <Text style={textStyle}>
          Yesterday I told you about the execution gap — the space between knowing what 
          to do and actually doing it.
        </Text>
        
        <Text style={textStyle}>
          Today, let me show you how we close it.
        </Text>
        
        <Text style={textStyle}>
          <strong>The 3-Agent Playbook</strong> isn't a course. It's not templates you have to 
          figure out. It's not "prompts" you copy-paste into ChatGPT.
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.pink }}>
          It's three specialized AI agents that actually DO the work:
        </Text>
        
        {/* Agent 1 */}
        <Section style={agentBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', fontWeight: 'bold', color: colors.pink }}>
            🎨 Content Creator Agent
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.textMuted }}>
            Tell it what you need → Get complete blog posts, social media, emails, and ads. Ready to publish.
          </Text>
        </Section>
        
        {/* Agent 2 */}
        <Section style={agentBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', fontWeight: 'bold', color: colors.orange }}>
            📊 Business Strategist Agent
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.textMuted }}>
            Describe your business → Get pricing strategies, positioning, market analysis, and complete business plans.
          </Text>
        </Section>
        
        {/* Agent 3 */}
        <Section style={agentBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', fontWeight: 'bold', color: colors.green }}>
            ⚙️ Automation Engineer Agent
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.textMuted }}>
            Explain your workflow → Get working automations and technical setups. No code required.
          </Text>
        </Section>
        
        <Text style={{ ...textStyle, marginTop: '24px', fontWeight: 'bold' }}>
          The difference?
        </Text>
        
        <Section style={comparisonBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.textMuted }}>
            ❌ <strong>Traditional way:</strong> Research → Learn → Draft → Revise → Finalize = 4-8 hours
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.green }}>
            ✅ <strong>Rebel way:</strong> Describe → Wait → Use = 5-15 minutes
          </Text>
        </Section>
        
        <Text style={textStyle}>
          One purchase. Lifetime access. All future updates included.
        </Text>
        
        <Section style={{ textAlign: 'center' as const, marginTop: '24px' }}>
          <Button href="https://kindai.dev/purchase?utm_source=email&utm_campaign=nurture&utm_content=email2">
            See what's inside the Playbook →
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

const agentBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '16px',
  borderRadius: '8px',
  margin: '12px 0',
};

const comparisonBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  margin: '16px 0',
};

export default NurtureEmail2;
