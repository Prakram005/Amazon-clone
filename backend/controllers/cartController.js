const Cart = require("../models/Cart");
const Product = require("../models/Product");

const buildCartSummary = (cart) => {
  const items = cart.items || [];
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    _id: cart._id,
    userId: cart.userId,
    items,
    itemsCount,
    subtotal
  };
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return cart;
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId || "default-user";
    const cart = await getOrCreateCart(userId);

    res.json(buildCartSummary(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId = "default-user", productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await getOrCreateCart(userId);
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + Number(quantity), product.stock);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Math.min(Number(quantity), product.stock)
      });
    }

    await cart.save();
    res.status(201).json(buildCartSummary(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { userId = "default-user", quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(userId);
    const item = cart.items.find(
      (cartItem) => cartItem.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    item.quantity = Math.min(Number(quantity), product.stock);
    await cart.save();

    res.json(buildCartSummary(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.query.userId || req.body?.userId || "default-user";
    const cart = await getOrCreateCart(userId);

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.json(buildCartSummary(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.query.userId || req.body?.userId || "default-user";
    const cart = await getOrCreateCart(userId);

    cart.items = [];
    await cart.save();

    res.json(buildCartSummary(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
