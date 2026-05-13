import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import API from "../services/api";

function AdminDashboard() {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const response =
      await API.get("/products");

    setProducts(response.data);
  };

  const restock = async (
    product
  ) => {

    const updatedQuantity =
      product.quantity + 10;

    await API.patch(
      `/products/${product.id}`,
      {
        quantity: updatedQuantity
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/add-product"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white p-6 rounded-xl shadow-lg"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="mt-2">
              Price: Ksh {product.price}
            </p>

            <p>
              Quantity: {product.quantity}
            </p>

            <button
              onClick={() =>
                restock(product)
              }
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Restock +10
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;