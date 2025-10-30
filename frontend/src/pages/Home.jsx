import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId });
      toast.success("🛍️ Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <Toaster position="top-right" />

      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600 text-center">
        🛒 Tech Shop - Available Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} addToCart={addToCart} />
        ))}
      </div>

      {/* Optional Footer */}
      <div className="text-center mt-10 text-gray-500">
        © {new Date().getFullYear()} Tech Shop. All rights reserved.
      </div>
    </div>
  );
}
