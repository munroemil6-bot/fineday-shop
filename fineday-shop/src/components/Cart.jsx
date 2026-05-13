function Cart({ cart }) {

  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">

      <h1 className="text-3xl font-bold mb-4">
        Cart
      </h1>

      {cart.length === 0 ? (

        <p>
          Cart is empty
        </p>

      ) : (

        cart.map((item) => (

          <div
            key={item.id}
            className="border-b py-2"
          >

            <h2>
              {item.name}
            </h2>

            <p>
              Ksh {item.price}
            </p>

          </div>
        ))
      )}

      <h2 className="text-2xl font-bold mt-4">
        Total:
        Ksh {total}
      </h2>

    </div>
  );
}

export default Cart;