function Cart({
  cart,
  handleBuy
}) {

  // TOTAL
  const total =
    cart.reduce(

      (sum, item) =>

        sum +
        (
          item.price *
          item.cartQuantity
        ),

      0
    );

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-5">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-4">
        Cart
      </h2>

      {/* EMPTY */}
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

            <p className="font-bold">
              {item.name}
            </p>

            <p>
              Quantity:
              {" "}
              {item.cartQuantity}
            </p>

            <p>
              Price:
              {" "}
              Ksh {item.price}
            </p>

            <p className="font-semibold">

              Subtotal:
              {" "}

              Ksh
              {" "}

              {item.price *
                item.cartQuantity}

            </p>

          </div>
        ))
      )}

      {/* TOTAL */}
      <h3 className="mt-4 text-xl font-bold">

        Total:
        {" "}
        Ksh {total}

      </h3>

      {/* BUY */}
      <button
        onClick={handleBuy}
        className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        Buy Now
      </button>

    </div>
  );
}

export default Cart;