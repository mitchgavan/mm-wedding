require('dotenv').config();
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const connectToDatabase = require('./db/db.js');
const Gift = require('./model/Gift');

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  if (!data.email || !data.token || parseInt(data.amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Some required fields were not supplied.',
      }),
    });
  }

  const orderId = uuidv4();

  stripe.charges
    .create({
      amount: parseInt(data.amount),
      currency: 'aud',
      description: 'Wedding Gift',
      receipt_email: data.email,
      source: data.token,
      metadata: {
        order_id: orderId,
      },
    })
    .then(() => {
      const giftItem = {
        amount: parseInt(data.amount) / 100,
        email: data.email,
        from: data.from,
        orderId,
        message: data.message,
      };

      connectToDatabase().then(() => {
        Gift.create(giftItem)
          .then(gift => {
            return callback(null, {
              statusCode: 200,
              body: JSON.stringify({ gift }),
            });
          })
          .catch(err => {
            return callback(null, {
              statusCode: 400,
              body: JSON.stringify({
                message: `Error: ${err.message}`,
              }),
            });
          });
      });
    })
    .catch(err => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: `Error: ${err.message}`,
        }),
      });
    });
};
