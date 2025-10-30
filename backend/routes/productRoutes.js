import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed sample products (optional)
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany();
    const products = await Product.insertMany([
      { name: "Laptop", price: 1200, image: "https://via.placeholder.com/150" },
      { name: "Phone", price: 800, image: "https://via.placeholder.com/150" },
      { name: "Headphones", price: 200, image: "https://via.placeholder.com/150" },
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
