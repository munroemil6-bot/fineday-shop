function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-1">
          Price: Ksh {product.price}
        </p>

        <p className="text-gray-600 mb-4">
          In stock: {product.quantity}
        </p>

        <button
          onClick={() => addToCart(product)}
          disabled={product.quantity <= 0}
          className={`w-full py-3 rounded-lg text-white transition ${
            product.quantity > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.quantity > 0
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
