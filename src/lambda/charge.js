require('dotenv').config();
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  if (!data.email || !data.token || !data.amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Some required fields were not supplied.',
      }),
    };
  }

  try {
    let { status } = await stripe.charges.create({
      amount: parseInt(data.amount),
      currency: 'aud',
      description: 'Wedding Gift',
      receipt_email: data.email,
      source: data.token,
      metadata: {
        order_id: uuidv4(),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error: ${err.message}`,
      }),
    };
  }
};
