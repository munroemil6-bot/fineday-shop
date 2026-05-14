import { useEffect, useState } from "react";
import API from "../services/api";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

function Products() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [receipt, setReceipt] = useState(null);

  const fetchProducts = async () => {

    try {

      const response = await API.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();
  }, []);

  // ADD TO CART
  const addToCart = async (product) => {
    if (product.quantity <= 0) {
      alert("Out of stock");
      return;
    }

    // UPDATE CART
    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      // IF PRODUCT EXISTS
      if (existingItem) {

        return prevCart.map((item) =>

          item.id === product.id

            ? {
                ...item,
                cartQuantity:
                  item.cartQuantity + 1
              }

            : item
        );
      }

      // NEW PRODUCT
      return [
        ...prevCart,
        {
          ...product,
          cartQuantity: 1
        }
      ];
    });

    // UPDATE UI ONLY
    setProducts((prevProducts) =>

      prevProducts.map((item) =>

        item.id === product.id

          ? {
              ...item,
              quantity: item.quantity - 1
            }

          : item
      )
    );

    // UPDATE DB.JSON
    try {

      await API.patch(
        `/products/${product.id}`,
        {
          quantity: product.quantity - 1
        }
      );

    } catch (error) {

      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (!itemToRemove) return;

    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + itemToRemove.cartQuantity
            }
          : item
      )
    );

    try {
      const productInState = products.find(
        (item) => item.id === productId
      );

      await API.patch(`/products/${productId}`, {
        quantity:
          (productInState?.quantity ?? 0) +
          itemToRemove.cartQuantity
      });
    } catch (error) {
      console.log(error);
    }
  };

  // BUY
  const handleBuy = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const total = cart.reduce(
      (sum, item) =>
        sum + (item.price * item.cartQuantity),
      0
    );

    const items = cart
      .map(
        (item) =>
          `${item.name}\nx${item.cartQuantity}\n- Ksh ${
            item.price * item.cartQuantity
          }`
      )
      .join("\n");

    setReceipt({ items, total });
    setCart([]);
  };

  const handleFinalizePurchase = () => {
    if (receipt) {
      setReceipt(null);
      window.location.reload();
    }
  };

  // SEARCH
  const filteredProducts = products.filter(
    (product) =>

      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

  <div className="bg-gray-100 min-h-screen">

    {/* HEADER ONLY */}
    <div
      className="
        h-[350px]
        flex
        flex-col
        items-center
        justify-center
        bg-cover
        bg-center
        relative
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542838132-92c53300491e')"
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* HEADER CONTENT */}
      <div className="relative z-10 text-center">

        <h1 className="text-6xl font-bold text-white">
          Products
        </h1>

        <p className="text-white text-xl mt-4">
          Wholesale Shopping Made Easy
        </p>

      </div>

    </div>

    {/* PAGE CONTENT */}
    <div className="p-8">

      {/* SEARCH */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">

        {/* PRODUCTS */}
        <div className="lg:col-span-3">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}

          </div>

        </div>

        {/* CART */}
        <Cart
          cart={cart}
          handleBuy={handleBuy}
          removeFromCart={removeFromCart}
        />

      </div>

    </div>

    {receipt && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">
            Purchase Successful
          </h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg mb-4">
            {receipt.items}

            TOTAL: Ksh {receipt.total}
          </pre>
          <button
            type="button"
            onClick={handleFinalizePurchase}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            Close and Reload
          </button>
        </div>
      </div>
    )}

  </div>
);
}

export default Products;