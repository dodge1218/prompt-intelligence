# Stripe Payment Setup Guide

This guide will help you set up Stripe payments for Money GPT.

## 1. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register) and sign up.
2. Activate your account (or use Test Mode for development).

## 2. Create Products & Prices
✅ **COMPLETED**

1. **PIE Audit Report**
   - Name: "Prompt Intelligence Engine (PIE) Audit – One-Time Report"
   - Price: $29.00 (One-time)
   - Price ID: `price_1SXXcSCbXtbQTY34AJ4KwfNA`

## 3. Get API Keys
✅ **COMPLETED**

1. **Publishable key**: `pk_test_...`
2. **Secret key**: `sk_test_...`

## 4. Configure Environment Variables
✅ **COMPLETED**

### Local Development (`.env.local`)
These variables have been added to your `.env.local` file:

```env
# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Product Price IDs
VITE_STRIPE_PRICE_PIE_AUDIT=price_1SXXcSCbXtbQTY34AJ4KwfNA

# Webhook Secret (see step 5)
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase Service Key (for admin updates)
SUPABASE_SERVICE_KEY=...
```

### Vercel Production
✅ Keys have been pushed to Vercel via CLI.
- `VITE_STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `VITE_STRIPE_PRICE_PIE_AUDIT`

**Action Required**: You must redeploy your project for these new environment variables to take effect.
```bash
vercel --prod
```

## 5. Setup Webhooks
✅ **COMPLETED**

1. **Endpoint URL**: `https://money-gpt.vercel.app/api/stripe-webhook`
2. **Signing Secret**: `whsec_m4Md2jMRqGZhtbOpQMr4m7rjJl4mntYJ`
3. **Vercel Config**: Secret added to production environment variables.

## 6. Final Deployment (REQUIRED)
Now that all environment variables are set, you must redeploy the application for them to take effect.

```bash
vercel --prod
```

## 7. Testing
1. Open your app: https://money-gpt.vercel.app
2. Log in.
3. Click "Analyze" and try to purchase the audit.
4. Use a [Stripe Test Card](https://stripe.com/docs/testing) (e.g., `4242 4242 4242 4242`).
5. After payment, you should be redirected back and your account should be upgraded.

## 6. Testing
1. Use [Stripe Test Cards](https://stripe.com/docs/testing) to simulate payments.
2. Check the Vercel function logs to verify webhooks are being received.
3. Verify that the user's subscription status updates in Supabase.
