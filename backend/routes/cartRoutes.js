import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().populate("product");
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    let item = await CartItem.findOne({ product: productId });

    if (item) {
      item.quantity += 1;
    } else {
      item = new CartItem({ product: productId, quantity: 1 });
    }

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// Update quantity
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });

    const item = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate("product");

    if (!item) return res.status(404).json({ message: "Cart item not found" });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update cart item" });
  }
});

// Remove item
router.delete("/:id", async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove cart item" });
  }
});

export default router;
