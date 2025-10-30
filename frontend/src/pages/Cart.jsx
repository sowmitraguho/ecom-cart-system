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
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>${item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-gray-300 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-gray-300 px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg mt-2">
            Total: ${total.toFixed(2)}
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleCheckoutSubmit}
            className="mt-6 border-t pt-4 space-y-3 max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold mb-2">Checkout Information</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={checkoutData.name}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, name: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={checkoutData.email}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, email: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
      )}

      {/* Receipt Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold mb-2">🧾 Order Receipt</h2>
            <p className="mb-2">
              <strong>Name:</strong> {checkoutData.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {checkoutData.email}
            </p>
            <div className="border-t mt-3 pt-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm mb-1"
                >
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>${item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="text-right font-bold mt-2">
                Total: ${total.toFixed(2)}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
