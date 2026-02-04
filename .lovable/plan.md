
# Increase Demo Message Limit from 3 to 5

## Overview
A simple configuration change to give visitors more opportunity to experience the AI agents before making a purchase decision.

## Change

### File: `src/pages/Demo.tsx`

**Line 21** - Update the constant:
```typescript
// Before
const DEMO_MESSAGE_LIMIT = 3;

// After
const DEMO_MESSAGE_LIMIT = 5;
```

## What This Affects
- The header will show "X of 5 free messages remaining" instead of 3
- The visual indicator dots will show 5 circles instead of 3
- Users can send 5 messages before seeing the "Demo Limit Reached" screen
- The limit reached message will reference 5 messages

## Note
Existing users who have already used messages will retain their count in localStorage. For example, if someone used 2 messages before, they'll now have 3 remaining (instead of 1). Users who already hit the 3-message limit will have 2 more messages available.
