import { useEffect, useState } from "react";
import api from "../api/api";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ name: "", email: "" });

  const fetchCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, newQty) => {
    if (newQty <= 0) return;
    await api.put(`/cart/${id}`, { quantity: newQty });
    fetchCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.email) {
      toast.error("Please fill all fields");
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCheckoutData({ name: "", email: "" });
    toast.success("Order placed successfully!");
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{item.product.name}</h2>
                  <p className="text-yellow-500 font-bold text-md">${item.product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="font-medium text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="text-right font-bold text-xl text-indigo-700">
            Total: ${total.toFixed(2)}
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleCheckoutSubmit}
            className="mt-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-4"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              Checkout Information
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              value={checkoutData.name}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, name: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={checkoutData.email}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, email: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 hover:shadow-lg transition transform"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
      )}

      {/* Receipt Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-3 text-indigo-600">🧾 Order Receipt</h2>
            <p className="mb-2"><strong>Name:</strong> {checkoutData.name}</p>
            <p className="mb-2"><strong>Email:</strong> {checkoutData.email}</p>
            <div className="border-t mt-3 pt-3 space-y-1">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-gray-700">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span className="font-bold">${item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="text-right font-bold text-indigo-700 mt-2">
                Total: ${total.toFixed(2)}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}