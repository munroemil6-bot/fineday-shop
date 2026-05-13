function Cart({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">
        Cart
      </h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            className="border-b py-2"
          >
            <h3 className="font-bold">
              {item.name}
            </h3>

            <p>Ksh {item.price}</p>
          </div>
        ))
      )}

      <h2 className="text-2xl font-bold mt-4">
        Total: Ksh {total}
      </h2>
    </div>
  );
}

export default Cart;