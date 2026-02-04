
# Automated Guided Demo - 3-Agent Showcase

## Status: ✅ Implemented

## Overview
Created a "Watch Demo" experience that automatically runs all 3 AI agents sequentially with a sample business ("Artisan Clay Studio"), allowing visitors to see the full capability without any user input.

## What was built

### Entry Points
1. **Route**: `/demo/guided` - dedicated page for the automated showcase
2. **Demo page button**: "Watch Full Demo" banner added above agent selection cards

### The Guided Demo Flow
1. User lands on the guided demo page
2. Shows sample business: "Artisan Clay Studio - handmade pottery and ceramics for home decor enthusiasts"
3. 3-second countdown with skip option
4. Automatically runs agents in sequence:
   - Business Strategist creates business plan
   - Content Creator writes social media calendar
   - Automation Engineer builds Zapier workflow
5. Real-time streaming output
6. Progress stepper shows active agent
7. Completion CTAs for interactive demo or purchase

## Files Created/Modified

- `src/components/toolkit/GuidedDemo.tsx` - Main guided demo component
- `src/pages/GuidedDemo.tsx` - Page wrapper with SEO
- `src/App.tsx` - Added `/demo/guided` route
- `src/pages/Demo.tsx` - Added "Watch Full Demo" banner

## Features
- **Auto-start**: Begins after 3-second countdown (skippable)
- **Auto-scroll**: Viewport follows active streaming content
- **Copy/Download**: Export all results after completion
- **No message limit impact**: Doesn't count toward 5-message limit
- **Shareable URL**: Direct link can be shared
