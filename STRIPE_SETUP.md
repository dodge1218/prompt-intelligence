# Stripe Payment Setup Guide

This guide will help you set up Stripe payments for Money GPT.

## 1. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register) and sign up.
2. Activate your account (or use Test Mode for development).

## 2. Create Products & Prices
Create three products in your Stripe Dashboard:

1. **Basic Plan**
   - Name: "Money GPT Basic"
   - Price: $9.00 / month
   - Copy the **Price ID** (starts with `price_...`)

2. **Pro Plan**
   - Name: "Money GPT Pro"
   - Price: $29.00 / month
   - Copy the **Price ID**

3. **Enterprise Plan**
   - Name: "Money GPT Enterprise"
   - Price: $99.00 / month
   - Copy the **Price ID**

## 3. Get API Keys
1. Go to **Developers > API keys**.
2. Copy the **Publishable key** (starts with `pk_...`).
3. Copy the **Secret key** (starts with `sk_...`).

## 4. Configure Environment Variables

### Local Development (`.env.local`)
Add these variables to your `.env.local` file:

```env
# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Product Price IDs
VITE_STRIPE_PRICE_BASIC=price_...
VITE_STRIPE_PRICE_PRO=price_...
VITE_STRIPE_PRICE_ENTERPRISE=price_...

# Webhook Secret (see step 5)
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase Service Key (for admin updates)
SUPABASE_SERVICE_KEY=...
```

### Vercel Production
Add the same variables to your Vercel Project Settings.

## 5. Setup Webhooks
1. Go to **Developers > Webhooks**.
2. Click **Add endpoint**.
3. **Endpoint URL**: `https://your-project.vercel.app/api/stripe-webhook`
4. **Events to listen for**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**.
6. Copy the **Signing secret** (starts with `whsec_...`) and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`.

## 6. Testing
1. Use [Stripe Test Cards](https://stripe.com/docs/testing) to simulate payments.
2. Check the Vercel function logs to verify webhooks are being received.
3. Verify that the user's subscription status updates in Supabase.
