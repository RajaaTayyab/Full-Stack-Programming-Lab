const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommercedb')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,   // 👈 new field
});

const Product = mongoose.model('Product', productSchema);

// Seed route
app.get('/seed', async (req, res) => {
  await Product.deleteMany(); // clears old data first
  await Product.insertMany([
    {
      name: "Laptop",
      price: 999,
      description: "A powerful laptop for work and play.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"
    },
    {
      name: "Phone",
      price: 499,
      description: "A sleek and fast smartphone.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"
    },
    {
      name: "Headphones",
      price: 79,
      description: "Wireless headphones with great sound.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
    },
    {
      name: "Keyboard",
      price: 129,
      description: "Mechanical keyboard for fast typing.",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
    },
    {
      name: "Monitor",
      price: 349,
      description: "4K monitor with vivid colors.",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
    },
    {
      name: "Mouse",
      price: 49,
      description: "Ergonomic wireless mouse.",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80"
    },
  ]);
  res.send("Products seeded with images!");
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(5000, () => console.log("Backend running on port 5000"));