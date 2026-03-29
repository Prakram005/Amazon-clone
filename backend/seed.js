const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  {
    name: "Apple iPhone 15 128GB",
    price: 72999,
    description: "Bright OLED display, fast performance, excellent cameras, and all-day battery life for daily use.",
    category: "Electronics",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Display", value: "6.1-inch Super Retina XDR" },
      { label: "Storage", value: "128GB" },
      { label: "Camera", value: "48MP main camera" },
      { label: "Battery", value: "Up to 20 hours video playback" }
    ],
    rating: 4.7,
    numReviews: 128,
    stock: 10
  },
  {
    name: "Noise Cancelling Bluetooth Headphones",
    price: 5999,
    description: "Soft ear cushions, deep bass, foldable design, and long battery backup for work and travel.",
    category: "Electronics",
    brand: "SoundMax",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Battery", value: "30 hours playback" },
      { label: "Connection", value: "Bluetooth 5.3" },
      { label: "Microphone", value: "Built-in mic" },
      { label: "Weight", value: "245 grams" }
    ],
    rating: 4.4,
    numReviews: 76,
    stock: 20
  },
  {
    name: "Gaming Laptop 15.6 inch",
    price: 68999,
    description: "Powerful laptop with smooth performance for coding, study, editing, and gaming.",
    category: "Electronics",
    brand: "Acer",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642633279-1796119d5482?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Processor", value: "Intel Core i7" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Graphics", value: "NVIDIA RTX 4050" }
    ],
    rating: 4.5,
    numReviews: 64,
    stock: 8
  },
  {
    name: "Men's Running Shoes",
    price: 3499,
    description: "Lightweight running shoes with cushioned sole and breathable mesh upper.",
    category: "Fashion",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Material", value: "Mesh and rubber" },
      { label: "Closure", value: "Lace-Up" },
      { label: "Use", value: "Running and walking" },
      { label: "Fit", value: "Regular fit" }
    ],
    rating: 4.3,
    numReviews: 205,
    stock: 20
  },
  {
    name: "Women's Casual Tote Bag",
    price: 1899,
    description: "Spacious everyday tote bag with simple design, zipper closure, and strong handles.",
    category: "Fashion",
    brand: "Lavie",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Material", value: "Synthetic leather" },
      { label: "Compartments", value: "3 main compartments" },
      { label: "Closure", value: "Zip closure" },
      { label: "Use", value: "Office and casual" }
    ],
    rating: 4.2,
    numReviews: 58,
    stock: 14
  },
  {
    name: "Cotton Crew Neck T-Shirt",
    price: 699,
    description: "Soft cotton t-shirt for daily wear with a comfortable regular fit.",
    category: "Fashion",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Fabric", value: "100% Cotton" },
      { label: "Fit", value: "Regular fit" },
      { label: "Sleeve", value: "Half sleeve" },
      { label: "Care", value: "Machine wash" }
    ],
    rating: 4.1,
    numReviews: 149,
    stock: 15
  },
  {
    name: "Non-Stick Cookware Set",
    price: 4299,
    description: "Kitchen cookware set with non-stick coating and heat-resistant handles.",
    category: "Home",
    brand: "Pigeon",
    image: "https://images.unsplash.com/photo-1584990347449-a2d4f87c4834?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584990347449-a2d4f87c4834?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583778176476-4a8b02a64c60?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Pieces", value: "6-piece set" },
      { label: "Coating", value: "Non-stick coating" },
      { label: "Compatibility", value: "Gas stove compatible" },
      { label: "Handle", value: "Heat resistant handle" }
    ],
    rating: 4.4,
    numReviews: 91,
    stock: 9
  },
  {
    name: "Wooden Study Table",
    price: 7999,
    description: "Compact study table with clean design, storage shelf, and sturdy frame.",
    category: "Home",
    brand: "Home Centre",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Material", value: "Engineered wood" },
      { label: "Dimensions", value: "90 x 50 x 75 cm" },
      { label: "Storage", value: "Open shelf included" },
      { label: "Use", value: "Study and work from home" }
    ],
    rating: 4.0,
    numReviews: 42,
    stock: 6
  },
  {
    name: "Smart Fitness Watch",
    price: 2499,
    description: "Track steps, heart rate, sleep, and notifications in one lightweight watch.",
    category: "Electronics",
    brand: "Noise",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Display", value: "1.8-inch touch display" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Health", value: "Heart rate and SpO2 tracking" },
      { label: "Water Rating", value: "IP68" }
    ],
    rating: 4.2,
    numReviews: 188,
    stock: 18
  },
  {
    name: "Hydrating Face Wash",
    price: 349,
    description: "Gentle daily face wash that cleans skin without making it feel dry.",
    category: "Beauty",
    brand: "Cetaphil",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620917669788-55b6f40c5488?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { label: "Skin Type", value: "Dry to normal skin" },
      { label: "Use", value: "Daily face cleansing" },
      { label: "Volume", value: "125ml" },
      { label: "Formula", value: "Soap free" }
    ],
    rating: 4.6,
    numReviews: 97,
    stock: 25
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
