const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "INR", 
  },
  receipt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  }, 
  razorpayOrderId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('OrderPayment', orderSchema);

module.exports = Order;
