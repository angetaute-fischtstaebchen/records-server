const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    records: [
      {
        recordId: { type: Schema.Types.ObjectId, ref: 'Record' },
        quantity: { type: Number, default: 1, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = model('Order', OrderSchema);
module.exports = Order;
