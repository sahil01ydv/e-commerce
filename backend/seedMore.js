require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const newProducts = [
  {
    name: "Nike Air Max 270",
    price: 159.99,
    description: "Iconic Nike Air Max shoes with a 270-degree air unit for unmatched cushioning and style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    category: "Footwear"
  },
  {
    name: "iPhone 15 Pro Max",
    price: 1199.00,
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and 48MP camera system.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "MacBook Pro 16 inch",
    price: 2499.00,
    description: "Supercharged by M3 Pro chip. Stunning Liquid Retina XDR display with all-day battery life.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Sony WH-1000XM5",
    price: 349.99,
    description: "Industry-leading noise cancellation headphones with exceptional sound quality and 30-hour battery.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1988&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Rolex Submariner Watch",
    price: 8999.00,
    description: "Iconic luxury diving watch with Oystersteel case, unidirectional rotatable bezel, and timeless design.",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=2070&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    name: "Canon EOS R6 Mark II",
    price: 2499.00,
    description: "Full-frame mirrorless camera with 24.2MP sensor, 4K 60fps video, and advanced autofocus system.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Gaming RGB Mouse",
    price: 69.99,
    description: "Ultra-lightweight gaming mouse with 25K DPI sensor, programmable buttons, and customizable RGB lighting.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=2028&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Designer Perfume Collection",
    price: 129.00,
    description: "Premium fragrance with notes of bergamot, jasmine, and sandalwood. Long-lasting and elegant.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2004&auto=format&fit=crop",
    category: "Beauty"
  },
  {
    name: "Adidas Ultraboost Running Shoes",
    price: 189.99,
    description: "Premium running shoes with responsive Boost midsole and Primeknit upper for ultimate comfort.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
    category: "Footwear"
  },
  {
    name: "iPad Pro 12.9 inch",
    price: 1099.00,
    description: "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Ray-Ban Wayfarer",
    price: 163.00,
    description: "The most iconic sunglasses in the world. Classic wayfarer shape with premium polarized lenses.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    name: "Premium Yoga Mat",
    price: 79.99,
    description: "Extra thick eco-friendly yoga mat with non-slip surface and alignment guides for all levels.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2080&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    name: "Minimalist Backpack",
    price: 99.00,
    description: "Water-resistant urban backpack with laptop compartment, USB charging port, and anti-theft design.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    name: "Smart Home Speaker",
    price: 199.00,
    description: "Premium smart speaker with room-filling sound, voice assistant, and multi-room audio support.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
    category: "Electronics"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas...");
    await Product.insertMany(newProducts);
    console.log(`✅ ${newProducts.length} new products added successfully!`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });
