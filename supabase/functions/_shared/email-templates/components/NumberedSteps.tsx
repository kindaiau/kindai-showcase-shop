import React from "https://esm.sh/react@18.3.1";
import { Section, Text } from "https://esm.sh/@react-email/components@0.0.22";
import { colors, fonts } from "../styles.ts";

interface Step {
  title: string;
  description: string;
}

interface NumberedStepsProps {
  steps: Step[];
}

// Color rotation for step numbers
const stepColors = [colors.pink, colors.orange, colors.green, colors.aqua, colors.blue];

export const NumberedSteps = ({ steps }: NumberedStepsProps) => {
  return (
    <Section style={{ marginBottom: '30px' }}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            padding: '15px',
            backgroundColor: colors.darkCardAlt,
            borderRadius: '8px',
            marginBottom: index < steps.length - 1 ? '10px' : '0',
          }}
        >
          <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '40px', verticalAlign: 'top' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      backgroundColor: stepColors[index % stepColors.length],
                      color: colors.text,
                      borderRadius: '50%',
                      textAlign: 'center' as const,
                      lineHeight: '28px',
                      fontWeight: 'bold',
                      fontFamily: fonts.family,
                      fontSize: '14px',
                    }}
                  >
                    {index + 1}
                  </span>
                </td>
                <td>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: '15px',
                      margin: '0',
                      fontWeight: 'bold',
                      fontFamily: fonts.family,
                    }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.textMuted,
                      fontSize: '14px',
                      margin: '4px 0 0 0',
                      fontFamily: fonts.family,
                    }}
                  >
                    {step.description}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </Section>
  );
};

export default NumberedSteps;
