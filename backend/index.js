import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("🛒 Simple Cart Backend Running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
