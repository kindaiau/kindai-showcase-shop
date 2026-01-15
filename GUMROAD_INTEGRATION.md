# Gumroad Integration Guide

This document explains how to configure and use the Gumroad integration for the Kindai Showcase Shop.

## Overview

The integration provides:
- **Embedded Checkout**: Gumroad overlay appears on-site instead of redirecting users
- **Webhook Handling**: Automatic purchase recording and email sending
- **Email Automation**: Branded React Email templates for purchase confirmations and follow-ups
- **Secure Verification**: HMAC SHA-256 webhook signature validation

## Setup Instructions

### 1. Configure Gumroad Product

In your [Gumroad Dashboard](https://app.gumroad.com/products):

1. **Set Redirect URL**:
   - Go to Product Settings → Checkout
   - Set "After purchase redirect URL" to: `https://your-domain.com/purchase/redirect`
   - For development: `https://kindai-showcase-shop.lovable.app/purchase/redirect`

2. **Configure Webhook**:
   - Go to Product Settings → Advanced
   - Set "Ping URL" to your Supabase function:
     ```
     https://YOUR_PROJECT.supabase.co/functions/v1/gumroad-webhook
     ```
   - Generate and save a webhook secret (use in environment variables)

3. **Get Product Details**:
   - Note your product ID (e.g., "rebelkit")
   - Note your Gumroad subdomain (e.g., "matthewgas")

### 2. Environment Variables

#### Frontend (.env file)
```env
VITE_GUMROAD_PRODUCT_ID=rebelkit
VITE_GUMROAD_SUBDOMAIN=matthewgas
```

#### Backend (Supabase Edge Functions Secrets)

Set these in Supabase Dashboard → Edge Functions → Secrets:

```env
GUMROAD_PRODUCT_ID=rebelkit
GUMROAD_ACCESS_TOKEN=your_gumroad_access_token
GUMROAD_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_api_key
```

To set secrets in Supabase:
```bash
supabase secrets set GUMROAD_WEBHOOK_SECRET=your_secret_here
supabase secrets set RESEND_API_KEY=your_resend_key_here
```

### 3. Get Gumroad API Access Token

1. Go to [Gumroad Settings → Advanced → Applications](https://app.gumroad.com/settings/advanced#application-form)
2. Create a new application
3. Copy the Access Token
4. Add it to your Supabase secrets as `GUMROAD_ACCESS_TOKEN`

### 4. Configure Resend for Emails

1. Sign up at [Resend.com](https://resend.com)
2. Verify your domain or use the test domain
3. Create an API key
4. Add it to Supabase secrets as `RESEND_API_KEY`
5. Update the "from" address in:
   - `supabase/functions/gumroad-webhook/index.ts`
   - `supabase/functions/gumroad-verify-license/index.ts`

## How It Works

### Purchase Flow

1. **User clicks "Buy Now"**
   - Gumroad overlay opens on the same page
   - User completes purchase in overlay

2. **After Payment**
   - Gumroad redirects to `/purchase/redirect` with `license_key` param
   - App checks if user is logged in
   - If not logged in: stores license in sessionStorage and redirects to auth
   - If logged in: verifies license via Gumroad API

3. **Webhook Processing** (parallel to redirect)
   - Gumroad sends POST to `gumroad-webhook` function
   - Function verifies HMAC signature
   - Records purchase in database
   - Sends confirmation email
   - Links purchase to user account if email matches

4. **License Verification**
   - Calls Gumroad API to verify license
   - Creates/updates purchase record
   - Sends welcome email
   - Grants access to toolkit

5. **Success Page**
   - User sees confirmation
   - Gets next steps and toolkit access

### Email Templates

Three React Email templates are available:

1. **Purchase Confirmation** (`PurchaseConfirmationEmail.tsx`)
   - Sent immediately after purchase
   - Includes license key and tier info
   - Link to access toolkit

2. **Access Instructions** (`AccessInstructionsEmail.tsx`)
   - Step-by-step guide to get started
   - Account creation/login instructions
   - Pro tips for using the toolkit

3. **Follow-up** (`FollowUpEmail.tsx`)
   - Sent 3 days after purchase (scheduled)
   - Tips for getting started
   - Upsell opportunities for starter tier

Templates are rendered in Supabase functions using the utilities in:
- `supabase/functions/_shared/email-templates.ts`

### Webhook Security

The webhook handler verifies all incoming requests using HMAC SHA-256:

```typescript
// Gumroad includes this header with the signature
X-Gumroad-Signature: computed_hmac_sha256_hash
```

If signature verification fails, the webhook returns 403 Forbidden.

If no `GUMROAD_WEBHOOK_SECRET` is set, verification is skipped (development mode).

## Testing

### Test Gumroad Overlay

1. Start dev server: `npm run dev`
2. Navigate to `/purchase`
3. Click any "Choose [Tier]" button
4. Gumroad overlay should appear

### Test Webhook

1. In Gumroad product settings, use "Send test ping"
2. Check Supabase function logs for webhook receipt
3. Verify signature validation works
4. Check that test email is sent (if configured)

### Test Full Purchase Flow

1. Use Gumroad's test mode or make a real purchase
2. Verify redirect to success page
3. Check database for purchase record
4. Confirm email receipt
5. Test toolkit access

## Troubleshooting

### Overlay doesn't appear
- Check browser console for Gumroad script errors
- Verify `index.html` includes `<script src="https://gumroad.com/js/gumroad.js"></script>`
- Check that anchor has class `gumroad-button`

### Webhook returns 403
- Verify `GUMROAD_WEBHOOK_SECRET` matches Gumroad settings
- Check function logs for signature mismatch details

### Emails not sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery status
- Verify "from" address is authorized in Resend

### License verification fails
- Check `GUMROAD_ACCESS_TOKEN` is valid
- Verify product ID matches
- Check Gumroad API status

## File Reference

### Frontend
- `index.html` - Gumroad script inclusion
- `src/pages/Purchase.tsx` - Checkout page with overlay buttons
- `src/pages/PurchaseRedirect.tsx` - Post-purchase redirect handler
- `src/pages/PurchaseSuccess.tsx` - Success page
- `src/emails/*.tsx` - React Email templates

### Backend
- `supabase/functions/gumroad-webhook/index.ts` - Webhook handler
- `supabase/functions/gumroad-verify-license/index.ts` - License verification
- `supabase/functions/_shared/email-templates.ts` - Email rendering utilities

### Configuration
- `.env` - Frontend environment variables
- `.env.example` - Environment variable template
- Supabase secrets - Backend environment variables

## Future Enhancements

- [ ] Implement scheduled follow-up emails (3 days post-purchase)
- [ ] Add email analytics/tracking
- [ ] Support multiple product variations in overlay
- [ ] Add purchase analytics dashboard
- [ ] Implement refund webhook handling
