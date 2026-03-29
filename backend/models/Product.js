const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  brand: {
    type: String,
    default: "Amazon Basics"
  },
  specifications: {
    type: [
      {
        label: String,
        value: String
      }
    ],
    default: []
  },
  rating: {
    type: Number,
    default: 4.2
  },
  numReviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
