import { useEffect, useState } from "react";

import API from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data);
  };

  const restock = async (product) => {
    const updatedQuantity = product.quantity + 10;

    await API.patch(`/products/${product.id}`, {
      quantity: updatedQuantity
    });

    fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2">
              Quantity: {product.quantity}
            </p>

            <button
              onClick={() => restock(product)}
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