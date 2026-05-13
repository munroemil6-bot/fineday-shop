import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    setProducts(res.data);
  };

  const editProduct = async (product) => {

    const price = prompt("New Price", product.price);
    const quantity = prompt("New Quantity", product.quantity);

    await axios.patch(
      `http://localhost:3001/products/${product.id}`,
      {
        price: Number(price),
        quantity: Number(quantity)
      }
    );

    fetchProducts();
  };

  const deleteProduct = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this product?"
    );

  if (!confirmDelete) return;

  await axios.delete(
    `http://localhost:3001/products/${id}`
  );

  fetchProducts();
};

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-6">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => editProduct(p)}
            className="bg-white p-4 rounded shadow cursor-pointer"
          >

            <img src={p.image} className="h-40 w-full object-cover" />

            <h2 className="text-xl font-bold">{p.name}</h2>
            <p>Price: {p.price}</p>
            <p>Qty: {p.quantity}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;