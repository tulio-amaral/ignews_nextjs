import Stripe from 'stripe';
import pck from '../../package.json'

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ignews',
      version: pck.version
    }
  }
);

