const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    gift: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gift', GiftSchema);
