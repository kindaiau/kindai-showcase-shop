
# Automated Guided Demo - 3-Agent Showcase

## Overview
Create a new "Watch Demo" experience that automatically runs all 3 AI agents sequentially with a sample business, allowing visitors to see the full capability without any user input. This provides an impressive "wow" moment for potential customers.

## User Experience

### Entry Points
1. **New route**: `/demo/guided` - dedicated page for the automated showcase
2. **Button on Demo page**: "Watch Full Demo" option alongside the interactive agent selection
3. **Landing page CTA**: Optional link from hero or "How it Works" section

### The Guided Demo Flow
1. User lands on the guided demo page
2. Shows a sample business: "Artisan Pottery Studio - handmade ceramics for home decor enthusiasts"
3. Displays a brief intro (3 seconds) explaining what's about to happen
4. Automatically runs agents in sequence:
   - Business Strategist creates a business plan
   - Content Creator writes social media calendar
   - Automation Engineer builds Zapier workflow
5. Each agent's output streams in real-time (like ChatGPT)
6. Progress indicator shows which agent is active
7. After completion: CTA to try interactive demo or purchase

## Files to Create/Modify

### 1. New Component: `src/components/toolkit/GuidedDemo.tsx`

Creates the automated showcase experience:
- Auto-starts on mount (with optional countdown)
- Runs all 3 agents sequentially using existing `streamChat` pattern
- Shows real-time streaming output in expandable cards
- Progress stepper at top (Strategy → Content → Tech)
- Sample business displayed prominently
- Copy/Download buttons after completion
- Strong CTAs when complete

### 2. New Page: `src/pages/GuidedDemo.tsx`

Wrapper page for the guided demo:
- SEO metadata for sharing
- Header with navigation back to main demo/home
- Renders the GuidedDemo component
- Mobile-responsive layout

### 3. Update: `src/App.tsx`

Add route for `/demo/guided`

### 4. Update: `src/pages/Demo.tsx`

Add "Watch Full Demo" button as alternative to interactive selection:
- Positioned above the agent cards
- Navigates to `/demo/guided`
- Doesn't count against message limit

## Sample Business Content

```text
Business: Artisan Clay Studio
Type: Handmade pottery and ceramics for home decor enthusiasts
```

Agent prompts will be tailored to this business:
- **Strategy**: Business plan with pricing tiers, target market, revenue projections
- **Content**: 5-day Instagram launch campaign with ready-to-post copy
- **Tech**: Zapier workflow for new customer onboarding

## Technical Implementation

### GuidedDemo Component Structure

```text
+------------------------------------------+
|  [← Back]              [Home] [Get Access]|
+------------------------------------------+
|                                          |
|   Watch the AI Agents in Action          |
|   Sample: Artisan Clay Studio            |
|                                          |
|   [Strategy] ──── [Content] ──── [Tech]  |
|      ✓              ●              ○     |
|                                          |
+------------------------------------------+
|  📊 Business Strategist                  |
|  ──────────────────────────────────────  |
|  Executive Summary:                      |
|  Artisan Clay Studio is a premium...     |
|  [streaming content appears here...]     |
|                                          |
+------------------------------------------+
|  ✏️ Content Creator                      |
|  ──────────────────────────────────────  |
|  Day 1 - Instagram                       |
|  [waiting / streaming / complete]        |
|                                          |
+------------------------------------------+
|  ⚡ Automation Engineer                  |
|  ──────────────────────────────────────  |
|  [waiting / streaming / complete]        |
|                                          |
+------------------------------------------+
|                                          |
|  [Try Interactive Demo]  [Get Access →]  |
|                                          |
+------------------------------------------+
```

### Key Features
- **Auto-scroll**: Viewport follows the active streaming content
- **Pause/Resume**: Optional pause button if user wants to read
- **Skip to End**: Fast-forward option to see results
- **No message limit impact**: Guided demo is free, doesn't count toward the 5-message limit
- **Shareable**: Direct URL can be shared to show the demo

### Streaming Implementation
Reuses the existing pattern from `MockBusinessTest.tsx`:
- Fetches from `rebel-ai-chat` edge function with `demoMode: true`
- Token-by-token streaming with SSE parsing
- Updates state progressively for live rendering

## Mobile Considerations
- Cards stack vertically
- Smaller typography
- Sticky progress indicator at top
- Touch-friendly CTA buttons
