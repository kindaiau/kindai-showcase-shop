import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { Footer } from "../components/Footer.tsx";
import { colors, fonts } from "../styles.ts";

interface NurtureEmail5Props {
  firstName: string;
  senderName?: string;
}

export const NurtureEmail5 = ({ 
  firstName,
  senderName = "The Kindai Team"
}: NurtureEmail5Props) => {
  return (
    <EmailWrapper preview="Are you ready to stop learning and start doing?">
      <Header title="Last Call, Rebel 🔥" />
      
      <Section style={{ padding: '30px' }}>
        <Text style={{ ...textStyle, fontSize: '18px' }}>
          Hey {firstName},
        </Text>
        
        <Text style={textStyle}>
          This is my last email about the 3-Agent Playbook.
        </Text>
        
        <Text style={textStyle}>
          Here's what I know about you:
        </Text>
        
        <Text style={{ ...textStyle, color: colors.textMuted }}>
          You've consumed enough content. You've saved enough bookmarks. You've told yourself 
          "I'll start Monday" more times than you can count.
        </Text>
        
        <Text style={textStyle}>
          The gap between where you are and where you want to be isn't knowledge.
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', fontSize: '24px', color: colors.pink, textAlign: 'center' as const, margin: '30px 0' }}>
          It's execution.
        </Text>
        
        <Text style={textStyle}>
          The Playbook closes that gap. Three AI agents that do the work while you focus on 
          what matters.
        </Text>
        
        <Section style={doneBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.green }}>
            ✓ Content? <strong>Done.</strong>
          </Text>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.green }}>
            ✓ Strategy? <strong>Done.</strong>
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.green }}>
            ✓ Tech setup? <strong>Done.</strong>
          </Text>
        </Section>
        
        <Text style={{ ...textStyle, textAlign: 'center' as const, fontWeight: 'bold' }}>
          One purchase. Lifetime access. 30-day guarantee.
        </Text>
        
        <Section style={{ textAlign: 'center' as const, marginTop: '24px' }}>
          <Button href="https://kindai.dev/purchase?utm_source=email&utm_campaign=nurture&utm_content=email5">
            Get the 3-Agent Playbook →
          </Button>
        </Section>
        
        <Section style={altBox}>
          <Text style={{ ...textStyle, margin: '0', color: colors.textMuted, fontSize: '15px' }}>
            Or don't. Keep consuming. Keep planning. Keep waiting for the "right time."
          </Text>
        </Section>
        
        <Text style={textStyle}>
          But if you're ready to stop learning and start doing?
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.pink }}>
          I'll see you inside.
        </Text>
        
        <Text style={{ ...textStyle, marginTop: '30px' }}>
          {senderName}
        </Text>
        
        <Text style={{ ...textStyle, marginTop: '20px', padding: '16px', backgroundColor: colors.darkCardAlt, borderRadius: '8px', fontSize: '14px' }}>
          P.S. Rebels don't wait for permission. They build. 🔥
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

const doneBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  borderLeft: `4px solid ${colors.green}`,
  margin: '24px 0',
  textAlign: 'center' as const,
};

const altBox = {
  margin: '24px 0',
  padding: '16px',
  borderTop: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.border}`,
};

export default NurtureEmail5;
