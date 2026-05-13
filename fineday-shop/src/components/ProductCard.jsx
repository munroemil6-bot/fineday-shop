function ProductCard({
  product,
  addToCart
}) {

  return (

    <div className="bg-white p-4 rounded-xl shadow-lg">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300";
        }}
      />

      {/* NAME */}
      <h2 className="text-2xl font-bold mt-4">
        {product.name}
      </h2>

      {/* PRICE */}
      <p className="text-lg">
        Ksh {product.price}
      </p>

      {/* QUANTITY */}
      <p>
        Quantity:
        {" "}
        {product.quantity}
      </p>

      {/* BUTTON */}
      <button
        onClick={() =>
          addToCart(product)
        }
        className="mt-4 bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800"
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;