import { useEffect, useState } from "react";

import axios from "axios";

import { signOut } from "firebase/auth";

import { auth } from "../services/firebase";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [quantity, setQuantity] = useState("");

  const [image, setImage] = useState("");

  const [addQuantities, setAddQuantities] = useState({});

  const navigate = useNavigate();

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3001/products"
      );

      console.log(response.data);

      setProducts(response.data);

    } catch (error) {

      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Poll for real-time updates every 2 seconds
    const interval = setInterval(() => {
      fetchProducts();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // UPDATE PRICE
  const updatePrice = async (id, value) => {

    // UPDATE UI
    setProducts((prevProducts) =>

      prevProducts.map((product) =>

        product.id === id
          ? {
              ...product,
              price: Number(value)
            }
          : product
      )
    );

    // UPDATE DB
    try {

      await axios.patch(
        `http://localhost:3001/products/${id}`,
        {
          price: Number(value)
        }
      );

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE QUANTITY BY ADDING NEW AMOUNT
  const updateQuantity = async (id, value) => {
    const addAmount = Number(value);
    if (!addAmount || addAmount <= 0) {
      alert("Please enter a valid amount to add");
      return;
    }

    const productToUpdate = products.find(
      (product) => product.id === id
    );
    if (!productToUpdate) return;

    const newQuantity = productToUpdate.quantity + addAmount;

    // UPDATE UI
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: newQuantity
            }
          : product
      )
    );

    // CLEAR add quantity field for this product
    setAddQuantities((prev) => ({
      ...prev,
      [id]: ""
    }));

    // UPDATE DB
    try {
      await axios.patch(
        `http://localhost:3001/products/${id}`,
        {
          quantity: newQuantity
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    // REMOVE FROM UI
    setProducts((prevProducts) =>

      prevProducts.filter(
        (product) => product.id !== id
      )
    );

    // REMOVE FROM DB
    try {

      await axios.delete(
        `http://localhost:3001/products/${id}`
      );

    } catch (error) {

      console.log(error);
    }
  };

  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert("Please enter product name");
      return;
    }
    if (!price || price <= 0) {
      alert("Please enter valid price");
      return;
    }
    if (!quantity || quantity < 0) {
      alert("Please enter valid quantity");
      return;
    }
    if (!image.trim()) {
      alert("Please enter image URL");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
      image: image.trim()
    };

    try {
      // UPDATE DB FIRST
      await axios.post(
        "http://localhost:3001/products",
        newProduct
      );

      // THEN UPDATE UI
      setProducts((prevProducts) => [
        ...prevProducts,
        newProduct
      ]);

      // CLEAR FORM
      setName("");
      setPrice("");
      setQuantity("");
      setImage("");
      setShowForm(false);

      alert("Product Added Successfully!");
    } catch (error) {
      console.log(error);
      alert("Error adding product. Please try again.");
    }
  };

  // LOGOUT
  const handleLogout = async () => {

    await signOut(auth);

    navigate("/admin-login");
  };

  return (

    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen text-white">

      {/* HEADER */}
      <div
        className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4')"
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* HEADER TEXT */}
        <div className="relative z-10 text-center">

          <h1 className="text-6xl font-bold text-white">
            Fine Day
          </h1>

          <p className="text-xl mt-4 text-gray-200">
            Admin Dashboard
          </p>

        </div>

      </div>

      {/* MAIN */}
      <div className="p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl text-black font-bold">
            Manage Products
          </h1>

          <div className="flex gap-4">

            {/* ADD BUTTON */}
            <button
              type="button"
              onClick={() =>
                setShowForm(!showForm)
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-xl"
            >
              +
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Sign Out
            </button>

          </div>

        </div>

        {/* ADD PRODUCT FORM */}
        {showForm && (

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct(e);
            }}
            className="bg-green-700 p-6 rounded-xl shadow-lg mb-8"
          >

            <h2 className="text-2xl font-bold mb-4">
              Add Product
            </h2>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border border-gray-700 bg-black text-white p-3 rounded-lg w-full mb-4"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="border border-gray-700 bg-black text-white p-3 rounded-lg w-full mb-4"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="border border-gray-700 bg-black text-white p-3 rounded-lg w-full mb-4"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="border border-gray-700 bg-black text-white p-3 rounded-lg w-full mb-4"
            />

            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 w-full"
            >
              Add Product
            </button>

          </form>
        )}

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.length > 0 ? (

            products.map((product) => (

              <div
                key={product.id}
                className="bg-green-700 p-4 rounded-xl shadow-lg"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="text-2xl font-bold mt-4">
                  {product.name}
                </h2>

                {/* PRICE */}
                <label className="font-semibold">
                  Price
                </label>

                <input
                  type="number"
                  defaultValue={product.price}
                  onBlur={(e) =>
                    updatePrice(
                      product.id,
                      e.target.value
                    )
                  }
                  className="border border-gray-700 bg-black text-white p-2 rounded-lg w-full mt-2 mb-4"
                />

                {/* QUANTITY */}
                <label className="font-semibold">
                  Current Quantity
                </label>

                <input
                  type="number"
                  value={product.quantity}
                  disabled
                  className="border border-gray-700 bg-gray-900 text-white p-2 rounded-lg w-full mt-2"
                />

                <label className="font-semibold mt-4 block">
                  Add Quantity
                </label>

                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    min="0"
                    value={addQuantities[product.id] ?? ""}
                    onChange={(e) =>
                      setAddQuantities((prev) => ({
                        ...prev,
                        [product.id]: e.target.value
                      }))
                    }
                    placeholder="Amount to add"
                    className="border border-gray-700 bg-black text-white p-2 rounded-lg w-full"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        addQuantities[product.id]
                      )
                    }
                    className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
                >
                  Delete Product
                </button>

              </div>
            ))

          ) : (

            <h1 className="text-2xl text-gray-300">
              No Products Found
            </h1>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;