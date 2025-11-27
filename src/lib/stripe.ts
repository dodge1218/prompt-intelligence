import { supabase } from './supabase';

// Price IDs for different tiers
export const STRIPE_PRICES = {
  pie_audit: import.meta.env.VITE_STRIPE_PRICE_PIE_AUDIT || 'price_placeholder',
};

export async function checkout(product: 'pie_audit') {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be logged in to purchase');

  const priceId = STRIPE_PRICES[product];
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

  const { url, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  if (url) {
    window.location.href = url;
  } else {
    throw new Error('Failed to create checkout session');
  }
}
