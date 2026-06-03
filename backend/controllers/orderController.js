const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user.id,
      products,
      totalPrice
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};