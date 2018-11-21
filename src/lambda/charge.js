require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  let { status } = await stripe.charges.create({
    amount: 100,
    currency: 'aud',
    description: 'Wedding Gift',
    receipt_email: data.email,
    source: data.token
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status })
  };
};
