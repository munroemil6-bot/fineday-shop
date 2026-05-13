function Cart({
  cart,
  handleBuy
}) {

  // TOTAL
  const total = cart.reduce(

    (sum, item) =>

      sum +
      (
        item.price *
        item.quantityInCart
      ),

    0
  );

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-5">

      <h2 className="text-2xl font-bold mb-4">
        Cart
      </h2>

      {cart.length === 0 ? (

        <p className="text-gray-500">
          No items in cart
        </p>

      ) : (

        cart.map((item) => (

          <div
            key={item.id}
            className="border-b py-3"
          >

            <p className="font-semibold">
              {item.name}
            </p>

            <p className="text-sm text-gray-600">
              Quantity:
              {" "}
              {item.quantityInCart}
            </p>

            <p className="text-sm text-gray-600">
              Price:
              {" "}
              Ksh {item.price}
            </p>

            <p className="font-bold text-sm">
              Subtotal:
              {" "}
              Ksh
              {" "}
              {item.price *
                item.quantityInCart}
            </p>

          </div>
        ))
      )}

      <h3 className="mt-4 text-xl font-bold">
        Total:
        {" "}
        Ksh {total}
      </h3>

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