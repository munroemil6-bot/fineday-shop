function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold">
          {product.name}
        </h2>

        <p className="mt-2">
          Price: Ksh {product.price}
        </p>

        <p>
          Available: {product.quantity}
        </p>

        {product.quantity < 5 && (
          <p className="text-red-500 font-bold">
            Low Stock
          </p>
        )}

        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;