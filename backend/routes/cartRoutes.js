import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
  const items = await CartItem.find().populate("product");
  res.json(items);
});

// Add to cart
router.post("/", async (req, res) => {
  const { productId } = req.body;
  let item = await CartItem.findOne({ product: productId });

  if (item) {
    item.quantity += 1;
  } else {
    item = new CartItem({ product: productId, quantity: 1 });
  }

  await item.save();
  res.json(item);
});

// Update quantity
router.put("/:id", async (req, res) => {
  const { quantity } = req.body;
  const item = await CartItem.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true }
  ).populate("product");
  res.json(item);
});

// Remove item
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

export default router;
