import React from "https://esm.sh/react@18.3.1";
import { Section, Text, Link } from "https://esm.sh/@react-email/components@0.0.22";
import { EmailWrapper } from "../components/EmailWrapper.tsx";
import { Header } from "../components/Header.tsx";
import { Button } from "../components/Button.tsx";
import { Footer } from "../components/Footer.tsx";
import { colors, fonts } from "../styles.ts";

interface NurtureEmail1Props {
  firstName: string;
  senderName?: string;
}

export const NurtureEmail1 = ({ 
  firstName,
  senderName = "The Kindai Team"
}: NurtureEmail1Props) => {
  return (
    <EmailWrapper preview="The $10,000 lesson I learned the hard way...">
      <Header title="Welcome to the Rebellion" />
      
      <Section style={{ padding: '30px' }}>
        <Text style={{ ...textStyle, fontSize: '18px' }}>
          Hey {firstName}, 👋
        </Text>
        
        <Text style={textStyle}>
          Welcome to the rebellion. 🔥
        </Text>
        
        <Text style={textStyle}>
          Quick story: I spent $10,000+ on courses, masterminds, and "how to" content 
          before I realized the truth:
        </Text>
        
        <Text style={{ ...textStyle, fontWeight: 'bold', color: colors.pink, fontSize: '18px' }}>
          Information isn't the problem. Execution is.
        </Text>
        
        <Text style={textStyle}>
          You know what you <em>should</em> do. You've watched the videos. Read the threads. 
          Saved the templates.
        </Text>
        
        <Text style={textStyle}>
          But when it's time to actually DO the thing? That's when the overwhelm hits.
        </Text>
        
        <Section style={quoteBox}>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.textMuted }}>
            • "Where do I even start?"
          </Text>
          <Text style={{ ...textStyle, margin: '0 0 8px 0', color: colors.textMuted }}>
            • "Is this good enough?"
          </Text>
          <Text style={{ ...textStyle, margin: '0', color: colors.textMuted }}>
            • "Maybe I need one more course first..."
          </Text>
        </Section>
        
        <Text style={textStyle}>
          Sound familiar?
        </Text>
        
        <Text style={textStyle}>
          That's the <strong>execution gap</strong>. And it's not your fault — it's how most 
          business education is designed.
        </Text>
        
        <Text style={textStyle}>
          Over the next few days, I'll show you how we're fixing it.
        </Text>
        
        <Text style={textStyle}>
          Talk soon,<br />
          <strong>{senderName}</strong>
        </Text>
        
        <Section style={{ marginTop: '30px', padding: '20px', backgroundColor: colors.darkCardAlt, borderRadius: '8px' }}>
          <Text style={{ ...textStyle, margin: '0 0 16px 0', fontSize: '14px', color: colors.textMuted }}>
            P.S. If you're ready to skip ahead:
          </Text>
          <Button href="https://kindai.dev/purchase?utm_source=email&utm_campaign=nurture&utm_content=email1">
            Check out the 3-Agent Playbook →
          </Button>
        </Section>
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

const quoteBox = {
  backgroundColor: colors.darkCardAlt,
  padding: '20px',
  borderRadius: '8px',
  borderLeft: `4px solid ${colors.orange}`,
  margin: '20px 0',
};

export default NurtureEmail1;
