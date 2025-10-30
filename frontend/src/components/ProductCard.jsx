export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        {/* Price Tag */}
        <div className="absolute top-2 right-2 bg-yellow-300 text-indigo-700 font-bold px-2 py-1 rounded-lg shadow-md">
          ${product.price}
        </div>
      </div>

      {/* Product Info */}
      <h2 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h2>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product._id)}
        className="mt-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition transform"
      >
        Add to Cart
      </button>
    </div>
  );
}