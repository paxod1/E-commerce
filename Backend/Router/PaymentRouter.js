const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const Orderpayment = require('../Model/OrderSchema'); 

const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_T975QT6olxQszO', // Make sure this is the correct key
  key_secret: 'ySggkZYOFVedl1x9aojlV3Eb', 
});

router.post('/createOrder', async (req, res) => {
  console.log("from backend payment router",req.body)
  const { amount } = req.body; 
  const options = {
    amount: amount, 
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`, 
  };

  try {
    const order = await razorpayInstance.orders.create(options);
 
    const newOrder = new Orderpayment({
      amount: options.amount,
      currency: options.currency,
      receipt: options.currency,
      razorpayOrderId: order.id,
      status: 'created', 
    });
    console.log("from paided???????????????",options.amount,options.currency,options.currency,order.id,)
    
    await newOrder.save();

    res.status(200).send(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send(error);
  }
});

module.exports = router;
