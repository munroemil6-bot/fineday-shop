import { useEffect, useState } from "react";

import API from "../services/api";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

    useEffect(() => {
    fetchProducts();
    }, []);

    const fetchProducts = async () => {
    try {
        const response = await API.get("/products");

        setProducts(response.data);

    } catch (error) {
        console.log(error);
    }
    };

  const addToCart = async (product) => {
    if (product.quantity <= 0) {
      alert("Out of stock");
      return;
    }

    const updatedQuantity = product.quantity - 1;

    await API.patch(`/products/${product.id}`, {
      quantity: updatedQuantity
    });

    setCart([...cart, product]);

    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
  <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-5xl font-bold mb-6">
      Products
    </h1>

    <SearchBar
      search={search}
      setSearch={setSearch}
    />

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
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

      <Cart cart={cart} />
    </div>
  </div>
);
}

export default Products;