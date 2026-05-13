import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import ProductCard from "../components/ProductCard";

import Cart from "../components/Cart";

import SearchBar from "../components/SearchBar";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:3001/products"
        );

      console.log(response.data);

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const addToCart = async (
    product
  ) => {

    if (product.quantity <= 0) {

      alert("Out of stock");

      return;
    }

    await axios.patch(
      `http://localhost:3001/products/${product.id}`,
      {
        quantity:
          product.quantity - 1
      }
    );

    setCart([
      ...cart,
      product
    ]);

    fetchProducts();
  };

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) {

    return (
      <h1 className="text-4xl p-8">
        Loading Products...
      </h1>
    );
  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-6">
        Products
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {filteredProducts.length === 0 ? (

        <h1 className="text-3xl">
          No Products Found
        </h1>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className="lg:col-span-3">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                )
              )}

            </div>

          </div>

          <Cart cart={cart} />

        </div>
      )}

    </div>
  );
}

export default Products;