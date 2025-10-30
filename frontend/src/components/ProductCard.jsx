export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <button
        onClick={() => addToCart(product._id)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
