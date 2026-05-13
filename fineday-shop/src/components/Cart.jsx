function Cart({
  cart,
  handleBuy
}) {

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">

      <h2 className="text-2xl font-bold mb-4">
        Cart
      </h2>

      {cart.length === 0 ? (

        <p className="text-gray-500">
          No items in cart
        </p>

      ) : (

        cart.map((item, index) => (

          <div
            key={index}
            className="border-b py-2"
          >

            <p className="font-semibold">
              {item.name}
            </p>

            <p className="text-sm text-gray-600">
              Ksh {item.price}
            </p>

          </div>
        ))
      )}

      <h3 className="mt-4 text-lg font-bold">
        Total: Ksh {total}
      </h3>

      {/* BUY BUTTON */}
      <button
        onClick={handleBuy}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Buy Now
      </button>

    </div>
  );
}

export default Cart;