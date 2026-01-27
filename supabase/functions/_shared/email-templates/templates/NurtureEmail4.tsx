import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { Footer } from "../components/Footer.tsx";
import { colors, fonts } from "../styles.ts";

interface NurtureEmail4Props {
  firstName: string;
  senderName?: string;
}

export const NurtureEmail4 = ({ 
  firstName,
  senderName = "The Kindai Team"
}: NurtureEmail4Props) => {
  return (
    <EmailWrapper preview="Let me break down everything inside...">
      <Header title="What You're Actually Getting" />
      
      <Section style={{ padding: '30px' }}>
        <Text style={{ ...textStyle, fontSize: '18px' }}>
          Hey {firstName},
        </Text>
        
        <Text style={textStyle}>
          Before you decide, let me show you exactly what's inside the 3-Agent Playbook:
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.pink, marginTop: '24px' }}>
          The Three Agents:
        </Text>
        
        <Section style={checklistBox}>
          <Text style={checkItem}>
            ✅ <strong>Content Creator</strong> — blogs, social, emails, ads (done-for-you)
          </Text>
          <Text style={checkItem}>
            ✅ <strong>Business Strategist</strong> — plans, pricing, positioning (done-for-you)
          </Text>
          <Text style={{ ...checkItem, margin: '0' }}>
            ✅ <strong>Automation Engineer</strong> — workflows, tech setup (done-for-you)
          </Text>
        </Section>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.orange, marginTop: '24px' }}>
          The Extras:
        </Text>
        
        <Section style={checklistBox}>
          <Text style={checkItem}>✅ Ready-to-use templates and frameworks</Text>
          <Text style={checkItem}>✅ Step-by-step guides for each agent</Text>
          <Text style={checkItem}>✅ Lifetime access (no subscriptions)</Text>
          <Text style={{ ...checkItem, margin: '0' }}>✅ All future updates included</Text>
        </Section>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.green, marginTop: '24px' }}>
          What this replaces:
        </Text>
        
        <Section style={{ ...checklistBox, borderLeftColor: colors.textMuted }}>
          <Text style={{ ...checkItem, color: colors.textMuted }}>❌ Hours of ChatGPT prompt engineering</Text>
          <Text style={{ ...checkItem, color: colors.textMuted }}>❌ Expensive copywriters and strategists</Text>
          <Text style={{ ...checkItem, color: colors.textMuted }}>❌ Courses that teach but don't execute</Text>
          <Text style={{ ...checkItem, margin: '0', color: colors.textMuted }}>❌ The paralysis of "where do I start?"</Text>
        </Section>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', marginTop: '30px' }}>
          The math:
        </Text>
        
        <Section style={mathBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.textMuted }}>
            One blog post from a freelancer: <strong>$200-500</strong>
          </Text>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.textMuted }}>
            One business strategy session: <strong>$500-2,000</strong>
          </Text>
          <Text style={{ ...textStyle, margin: '0 0 16px 0', color: colors.textMuted }}>
            One automation setup: <strong>$300-1,000</strong>
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.green, fontWeight: 'bold' }}>
            The Playbook does all three, unlimited times, for a one-time investment.
          </Text>
        </Section>
        
        <Section style={{ textAlign: 'center' as const, marginTop: '24px' }}>
          <Button href="https://kindai.dev/purchase?utm_source=email&utm_campaign=nurture&utm_content=email4">
            Get lifetime access now →
          </Button>
        </Section>
        
        <Text style={{ ...textStyle, marginTop: '20px', textAlign: 'center' as const, fontSize: '14px', color: colors.textMuted }}>
          30-day money-back guarantee. If it doesn't work for you, I'll refund every penny.
        </Text>
        
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

const checklistBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '16px 20px',
  borderRadius: '8px',
  borderLeft: `4px solid ${colors.green}`,
  margin: '12px 0',
};

const checkItem = {
  color: colors.text,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 10px 0',
  fontFamily: fonts.family,
};

const mathBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  margin: '16px 0',
};

export default NurtureEmail4;
