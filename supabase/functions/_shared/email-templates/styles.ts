// Kindai Brand Colors - Official Palette
export const colors = {
  // Brand colors
  pink: '#FF46C8',
  orange: '#FC6456',
  yellow: '#FFD75E',
  green: '#5DD7A7',
  aqua: '#56DFF4',
  blue: '#5667DF',
  violet: '#7B2CBF',
  
  // UI colors
  dark: '#0a0a0a',
  darkCard: '#1a1a1a',
  darkCardAlt: '#262626',
  darkFooter: '#0f0f0f',
  
  // Text colors
  text: '#ffffff',
  textMuted: '#a1a1aa',
  textSubtle: '#71717a',
  textFaint: '#52525b',
  
  // Border
  border: '#333333',
};

// Gradient definitions
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.orange} 100%)`,
  hero: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.orange} 50%, ${colors.green} 100%)`,
  full: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.orange} 25%, ${colors.green} 75%, ${colors.aqua} 100%)`,
};

// Typography
export const fonts = {
  family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

// Shared styles for email components
export const baseStyles = {
  body: {
    margin: '0',
    padding: '0',
    backgroundColor: colors.dark,
    fontFamily: fonts.family,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: colors.darkCard,
    borderRadius: '16px',
    overflow: 'hidden',
  },
  text: {
    color: colors.text,
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  textMuted: {
    color: colors.textMuted,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  link: {
    color: colors.pink,
    textDecoration: 'underline',
  },
};
