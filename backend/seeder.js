import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany(); // clear existing data
    await Product.insertMany(products); // insert new sample data
    console.log("✅ Sample products added!");
    process.exit(); // stop the process after completion
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
