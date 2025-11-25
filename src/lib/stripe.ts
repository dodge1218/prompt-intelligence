import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Price IDs for different tiers (replace with actual Stripe Price IDs)
export const STRIPE_PRICES = {
  basic: 'price_basic_placeholder', // Replace with actual price ID
  pro: 'price_pro_placeholder',     // Replace with actual price ID
  enterprise: 'price_enterprise_placeholder' // Replace with actual price ID
};

export async function checkout(tier: 'basic' | 'pro' | 'enterprise') {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be logged in to purchase');

  const priceId = STRIPE_PRICES[tier];
  if (!priceId) throw new Error('Invalid price ID');

  // Call the serverless function to create a checkout session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId: user.id,
      returnUrl: window.location.origin,
    }),
  });

  const { sessionId, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  // Redirect to Stripe Checkout
  const { error: stripeError } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (stripeError) {
    throw new Error(stripeError.message);
  }
}
