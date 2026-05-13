import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminDashboard() {

  const [products,
    setProducts] =
    useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      const response =
        await axios.get(
          "http://localhost:3001/products"
        );

      setProducts(response.data);
    };

  const editProduct =
    async (product) => {

      const price =
        prompt(
          "New Price",
          product.price
        );

      const quantity =
        prompt(
          "New Quantity",
          product.quantity
        );

      await axios.patch(
        `http://localhost:3001/products/${product.id}`,
        {
          price:
            Number(price),

          quantity:
            Number(quantity)
        }
      );

      fetchProducts();
    };

  const addProduct =
    async () => {

      const name =
        prompt("Name");

      const price =
        prompt("Price");

      const quantity =
        prompt("Quantity");

      const image =
        prompt("Image URL");

      await axios.post(
        "http://localhost:3001/products",
        {
          name,
          price:
            Number(price),
          quantity:
            Number(quantity),
          image
        }
      );

      fetchProducts();
    };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            onClick={() =>
              editProduct(product)
            }
            className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p>
              Ksh {product.price}
            </p>

            <p>
              Quantity:
              {product.quantity}
            </p>

          </div>
        ))}

      </div>

      <button
        onClick={addProduct}
        className="fixed bottom-8 right-8 bg-black text-white text-4xl w-16 h-16 rounded-full"
      >
        +
      </button>

    </div>
  );
}

export default AdminDashboard;