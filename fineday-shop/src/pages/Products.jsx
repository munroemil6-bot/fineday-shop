import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

function Products() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3001/products"
      );

      console.log(response.data);

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

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

      await axios.patch(
        `http://localhost:3001/products/${product.id}`,
        {
          quantity: product.quantity - 1
        }
      );

    } catch (error) {

      console.log(error);
    }
  };

  // BUY
  const handleBuy = () => {

    if (cart.length === 0) {

      alert("Cart is empty");

      return;
    }

    const total = cart.reduce(

      (sum, item) =>

        sum +
        (
          item.price *
          item.cartQuantity
        ),

      0
    );

    const items = cart.map((item) =>

      `${item.name}
x${item.cartQuantity}
- Ksh ${
        item.price *
        item.cartQuantity
      }`
    ).join("\n");

    alert(

`Purchase Successful!

${items}

TOTAL:
Ksh ${total}`
    );

    // CLEAR CART ONLY
    setCart([]);
  };

  // SEARCH
  const filteredProducts = products.filter(
    (product) =>

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
        />

      </div>

    </div>
  );
}

export default Products;