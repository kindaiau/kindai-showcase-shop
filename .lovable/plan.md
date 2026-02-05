
# Apply KindAI Cyberpunk Design System

## Overview
Transform the current light-mode-first design into a bold cyberpunk theme featuring dark backgrounds, aqua/pink neon accents, monospace typography, and enhanced glow effects. This creates a distinctive "digital rebel" aesthetic.

## Visual Impact

The new theme shifts from:
- **Light backgrounds** to **deep dark blue-black** (`#0A0C10`)
- **Pink primary** stays but **Aqua becomes the new hero color**
- **System fonts** to **Monospace** (Courier New/Consolas)
- **Subtle shadows** to **Neon glow effects**

## Files to Modify

### 1. `src/index.css` - Core Theme Tokens

**What changes:**
- Background shifts to dark cyberpunk blue (`220 30% 5%`)
- Foreground becomes bright cyan-tinted white (`180 100% 95%`)
- Primary becomes Aqua (tech color) - swaps with pink
- Secondary becomes Pink (accent)
- Accent becomes Yellow (attention/highlight)
- New success color token added
- Muted colors updated for dark theme readability
- Border gets semi-transparent aqua glow
- Input fields get darker styling
- Gradients updated: `gradient-rebel` now includes yellow, new `gradient-energy` added
- Shadows enhanced with dual-color neon glow
- Radius reduced from `0.75rem` to `0.5rem` for sharper edges
- Body font changes to monospace

**Dark mode section:**
- Will be removed since the base theme is now permanently dark

**New utility classes:**
- `.text-gradient-energy` - Aqua to pink gradient text
- `.glass-card` - Frosted glass effect with aqua border
- `.neon-glow` - Interactive hover glow effect
- `.floating-orb` - Animated background decoration

### 2. `tailwind.config.ts` - Extended Theme

**New additions to `colors`:**
- `success` color token with DEFAULT and foreground

**New additions to `backgroundImage`:**
- `gradient-rebel` - Pink/orange/yellow rainbow
- `gradient-energy` - Aqua to pink
- `gradient-glow` - Vertical aqua fade

**New additions to `boxShadow`:**
- `glow` - Dual-color neon shadow
- `card` - Deep dark shadow

**Updated `keyframes`:**
- `pulse-glow` - Now includes scale transform for more impact
- `scale-in` - New entrance animation with scale

### 3. `supabase/functions/_shared/email-templates/styles.ts` - Email Consistency

Update to match new cyberpunk palette:
- Background colors updated to match new dark theme
- Primary color references shift to aqua
- Font family adds monospace fallback option

## Color Mapping Reference

| Role | Before | After |
|------|--------|-------|
| Background | White/Light gray | Deep dark blue `#0A0C10` |
| Foreground | Dark gray | Cyan-white `#E6FFFF` |
| Primary | Pink `#FF46C8` | Aqua `#56DFF4` |
| Secondary | Blue `#5667DF` | Pink `#FF46CB` |
| Accent | Orange `#FC6456` | Yellow `#FFD75E` |
| Border | Light gray | Aqua glow (30% opacity) |

## Technical Notes

### Typography Change
The monospace font stack gives the site a "terminal/hacker" aesthetic:
```css
font-family: 'Courier New', 'Consolas', 'Monaco', monospace;
```

### Neon Glow Effect
The new dual-layer shadow creates depth:
```css
box-shadow: 0 0 40px hsl(189 88% 65% / 0.4), 0 0 80px hsl(318 100% 64% / 0.2);
```

### Glass Card Pattern
A reusable frosted glass effect for cards:
```css
background: hsl(220 25% 8% / 0.8);
backdrop-filter: blur(12px);
border: 1px solid hsl(189 88% 65% / 0.3);
```

## Migration Notes

Since this is a dark-theme-first approach:
1. The `:root` section becomes the dark theme
2. The `.dark` class section is removed (no longer needed)
3. All components automatically inherit the new cyberpunk styling
4. The theme toggle (if present) may need adjustment

## Existing Features Preserved
- All animation keyframes (accordion, particle, bounce, etc.)
- Mobile touch feedback utilities
- Text glow effects for each brand color
- Hover scale interactions
- Kindai brand color palette (HSL values slightly adjusted)
