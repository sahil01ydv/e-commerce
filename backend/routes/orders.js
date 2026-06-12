const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// POST - Place a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod: 'Cash on Delivery',
      totalAmount
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET - Get logged-in user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
