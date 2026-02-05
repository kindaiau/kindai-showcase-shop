// KindAI Cyberpunk Brand Colors - Official Palette
export const colors = {
  // Brand colors
  pink: '#FF46CB',
  orange: '#FC6456',
  yellow: '#FFD75E',
  green: '#5DD7A7',
  aqua: '#56DFF4',
  blue: '#4D69E1',
  violet: '#7830B8',
  
  // UI colors - Cyberpunk dark theme
  dark: '#0A0C10',
  darkCard: '#101318',
  darkCardAlt: '#1A1D24',
  darkFooter: '#080A0D',
  
  // Text colors - Cyan-tinted white
  text: '#E6FFFF',
  textMuted: '#7ABFBF',
  textSubtle: '#5A9999',
  textFaint: '#3D7373',
  
  // Border - Aqua glow
  border: 'rgba(86, 223, 244, 0.3)',
};

// Gradient definitions - Updated for cyberpunk theme
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.aqua} 0%, ${colors.pink} 100%)`,
  hero: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.violet} 50%, ${colors.blue} 100%)`,
  rebel: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.orange} 50%, ${colors.yellow} 100%)`,
  full: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.orange} 25%, ${colors.green} 75%, ${colors.aqua} 100%)`,
};

// Typography - Monospace for cyberpunk aesthetic
export const fonts = {
  family: "'Courier New', 'Consolas', 'Monaco', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
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
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
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
    color: colors.aqua,
    textDecoration: 'underline',
  },
};
