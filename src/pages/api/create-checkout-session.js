import Stripe from 'stripe';

// This is your test secret API key.
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);
const baseUrl = 'https://ilford-sprite-35-ii-landing.vercel.app';

export const post = async ({ redirect }) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          product: 'prod_NZhBzSSYRND5HA',
          currency: 'usd',
          unit_amount: 2895,
        },
        quantity: 1,
      },
    ],
    custom_text: {
      submit: {
        message:
          '-> Use credit card 4242 4242 4242 4242 for full checkout flow <-',
      },
    },
    mode: 'payment',
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}`,
  });

  return redirect(session.url);
};
