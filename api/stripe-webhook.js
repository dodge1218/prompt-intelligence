
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // MUST use service key for admin updates

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id || session.metadata?.userId;
        
        if (userId) {
          // Determine tier based on price ID (you might need a mapping here or store tier in metadata)
          // For now, we'll assume the price ID maps to a tier or we fetch it from Stripe
          // A better way is to pass the tier in metadata during checkout creation
          
          // Let's fetch the subscription to get more details if needed
          const subscriptionId = session.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Update user in Supabase
          const { error } = await supabase
            .from('users')
            .update({
              subscription_status: 'active',
              subscription_tier: 'pro', // This should be dynamic based on price
              credits_remaining: 500, // Reset credits based on tier
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
            
          if (error) throw error;
          console.log(`User ${userId} upgraded to active subscription`);
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        // Handle renewals, cancellations, etc.
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        // Handle cancellation
        // Find user by stripe customer id if you stored it, or use metadata if available
        break;
      }
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}
