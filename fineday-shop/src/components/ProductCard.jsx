function ProductCard({ product, addToCart }) {
 return (
  <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    {/* IMAGE */}
    <div className="relative">

      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      {/* STOCK BADGE */}
      <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        {product.quantity} Left
      </div>

    </div>

    {/* CONTENT */}
    <div className="p-5">

      {/* PRODUCT NAME */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {product.name}
      </h3>

      {/* PRICE */}
      <div className="flex justify-between items-center mb-2">

        <p className="text-gray-500">
          Price
        </p>

        <p className="text-2xl font-bold text-green-700">
          Ksh {product.price}
        </p>

      </div>

      {/* STOCK */}
      <div className="flex justify-between items-center mb-5">

        <p className="text-gray-500">
          Available
        </p>

        <p className="font-semibold text-gray-700">
          {product.quantity} Items
        </p>

      </div>

      {/* BUTTON */}
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          addToCart(product);
        }}
        disabled={product.quantity <= 0}
        className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
          product.quantity > 0
            ? "bg-green-600 hover:bg-green-700 hover:scale-105"
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
