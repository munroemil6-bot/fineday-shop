function ProductCard({
  product,
  addToCart
}) {

  return (

    <div className="bg-white p-4 rounded-xl shadow-lg">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-2xl font-bold mt-4">
        {product.name}
      </h2>

      <p className="text-lg">
        Ksh {product.price}
      </p>

      <p>
        Quantity:
        {product.quantity}
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
        className="mt-4 bg-black text-white w-full py-2 rounded-lg"
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;