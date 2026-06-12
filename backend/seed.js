require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const dummyProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "High-fidelity sound with active noise cancellation and a premium design.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Minimalist Smartwatch",
    price: 199.50,
    description: "Sleek and elegant smartwatch for your daily fitness tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    name: "Luxury Mechanical Keyboard",
    price: 149.00,
    description: "Custom-built mechanical keyboard with premium switches and a sleek aluminum case.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Classic Aviator Sunglasses",
    price: 89.99,
    description: "Timeless aviator design with polarized lenses for maximum UV protection.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    name: "Leather Messenger Bag",
    price: 125.00,
    description: "Handcrafted genuine leather messenger bag with spacious compartments.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    name: "Ergonomic Office Chair",
    price: 350.00,
    description: "Premium ergonomic chair designed for long hours of comfortable working.",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2070&auto=format&fit=crop",
    category: "Furniture"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas for seeding...");
    await Product.deleteMany({}); // clear existing
    await Product.insertMany(dummyProducts);
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });
