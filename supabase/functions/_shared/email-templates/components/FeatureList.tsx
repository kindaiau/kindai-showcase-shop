import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { colors, fonts } from "../styles.ts";

interface FeatureItem {
  emoji?: string;
  text: string;
  highlight?: string;
  highlightColor?: string;
}

interface FeatureListProps {
  title?: string;
  items: FeatureItem[];
}

export const FeatureList = ({ title, items }: FeatureListProps) => {
  return (
    <Section
      style={{
        marginTop: '30px',
        paddingTop: '30px',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {title && (
        <Text
          style={{
            color: colors.text,
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 15px 0',
            fontFamily: fonts.family,
          }}
        >
          {title}
        </Text>
      )}
      <ul
        style={{
          color: colors.textMuted,
          fontSize: '14px',
          lineHeight: '1.8',
          margin: '0',
          paddingLeft: '20px',
          fontFamily: fonts.family,
        }}
      >
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            {item.emoji && `${item.emoji} `}
            {item.highlight ? (
              <>
                <strong style={{ color: item.highlightColor || colors.pink }}>
                  {item.highlight}
                </strong>
                {item.text && ` — ${item.text}`}
              </>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default FeatureList;
