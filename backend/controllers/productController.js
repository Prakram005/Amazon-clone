const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};
    const productListFields =
      "name price category image images brand rating numReviews stock createdAt";

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query)
      .select(productListFields)
      .sort({ createdAt: -1 })
      .lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
