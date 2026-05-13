import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

function Products() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [bought, setBought] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3001/products"
      );

      console.log("DB PRODUCTS:", response.data);

      setProducts(response.data);

    } catch (error) {

      console.log(
        "FETCH ERROR:",
        error.message
      );
    }
  };

  // ADD TO CART
 const addToCart = async (product) => {

  // OUT OF STOCK
  if (product.quantity <= 0) {

    alert("Out of stock");

    return;
  }

  // UPDATE CART
  setCart((prevCart) => {

    const existingItem =
      prevCart.find(
        (item) => item.id === product.id
      );

    // IF ITEM EXISTS
    if (existingItem) {

      return prevCart.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantityInCart:
                item.quantityInCart + 1
            }
          : item
      );
    }

    // NEW ITEM
    return [
      ...prevCart,
      {
        ...product,
        quantityInCart: 1
      }
    ];
  });

  // UPDATE ONLY THE CLICKED PRODUCT
  setProducts((prevProducts) =>

    prevProducts.map((item) =>

      item.id === product.id
        ? {
            ...item,
            quantity:
              item.quantity - 1
          }
        : item
    )
  );

  // UPDATE DB.JSON
  try {

    await axios.patch(
      `http://localhost:3001/products/${product.id}`,
      {
        quantity:
          product.quantity - 1
      }
    );

  } catch (error) {

    console.log(
      "PATCH ERROR:",
      error.message
    );
  }
};

  // BUY NOW
  const buyItems = () => {

  if (cart.length === 0) {

    alert("Cart is empty");

    return;
  }

  // CALCULATE TOTAL
  const total = cart.reduce(

    (sum, item) =>

      sum +
      (
        item.price *
        item.quantityInCart
      ),

    0
  );

  // ITEMS LIST
  const itemsBought = cart.map(

    (item) =>

      `${item.name}
x${item.quantityInCart}
- Ksh ${
        item.price *
        item.quantityInCart
      }`

  ).join("\n");

  // POPUP
  alert(

`Purchase Successful!

Items Bought:
${itemsBought}

Total Amount:
Ksh ${total}`
  );

  // CLEAR CART ONLY
  setCart([]);
};

  // SEARCH FILTER
  const filtered = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6">
        Products
      </h1>

      {/* SEARCH */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* PRODUCTS */}
        <div className="lg:col-span-3">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {filtered.length > 0 ? (

              filtered.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))

            ) : (

              <p className="text-xl text-gray-500">
                No products found...
              </p>
            )}

          </div>

        </div>

        {/* CART */}
        <Cart
          cart={cart}
          bought={bought}
          handleBuy={buyItems}
        />

      </div>

    </div>
  );
}

export default Products;