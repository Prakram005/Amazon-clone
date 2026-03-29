const Cart = require("../models/Cart");
const Order = require("../models/Order");

const SHIPPING_PRICE = 40;
const TAX_RATE = 0.18;

exports.createOrder = async (req, res) => {
  try {
    const { userId = "default-user", shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const itemsPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice >= 1000 ? 0 : SHIPPING_PRICE;
    const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Order.create({
      userId,
      items: cart.items,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.query.userId || "default-user";
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
