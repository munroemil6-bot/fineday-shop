import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  signOut
} from "firebase/auth";

import { auth }
from "../services/firebase";

import {
  useNavigate
} from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [image, setImage] =
    useState("");

  const navigate =
    useNavigate();

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:3001/products"
          );

        console.log(
          response.data
        );

        setProducts(
          response.data
        );

      } catch (error) {

        console.log(
          error.message
        );
      }
    };

  // UPDATE PRICE
    const updatePrice =
    async (id, value) => {

        // UPDATE UI FIRST
        setProducts((prevProducts) =>

        prevProducts.map((product) =>

            product.id === id
            ? {
                ...product,
                price:
                    Number(value)
                }
            : product
        )
        );

        // UPDATE DB.JSON
        try {

        await axios.patch(
            `http://localhost:3001/products/${id}`,
            {
            price:
                Number(value)
            }
        );

        } catch (error) {

        console.log(error);
        }
    };

  // UPDATE QUANTITY
    const updateQuantity =
    async (id, value) => {

        // UPDATE UI
        setProducts((prevProducts) =>

        prevProducts.map((product) =>

            product.id === id
            ? {
                ...product,
                quantity:
                    Number(value)
                }
            : product
        )
        );

        // UPDATE DB
        try {

        await axios.patch(
            `http://localhost:3001/products/${id}`,
            {
            quantity:
                Number(value)
            }
        );

        } catch (error) {

        console.log(error);
        }
    };

  // DELETE
    const deleteProduct =
    async (id) => {

        // REMOVE FROM UI
        setProducts((prevProducts) =>

        prevProducts.filter(
            (product) =>
            product.id !== id
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
    const addProduct =
    async (e) => {

        e.preventDefault();

        const newProduct = {

        id: Date.now(),

        name,

        price:
            Number(price),

        quantity:
            Number(quantity),

        image
        };

        // UPDATE UI IMMEDIATELY
        setProducts((prevProducts) => [
        ...prevProducts,
        newProduct
        ]);

        // UPDATE DB.JSON
        try {

        await axios.post(
            "http://localhost:3001/products",
            newProduct
        );

        } catch (error) {

        console.log(error);
        }

        alert("Product Added!");

        // CLEAR FORM
        setName("");
        setPrice("");
        setQuantity("");
        setImage("");

        setShowForm(false);
    };

  // LOGOUT
  const handleLogout =
    async () => {

      await signOut(auth);

      navigate(
        "/admin-login"
      );
    };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      {/* TOP */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex gap-4">

          {/* ADD BUTTON */}
          <button
            onClick={() =>
              setShowForm(
                !showForm
              )
            }
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-xl"
          >
            +
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
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
         className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >

          <h2 className="text-2xl font-bold mb-4">
            Add Product
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            className="bg-black text-white px-6 py-3 rounded-lg"
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
              className="bg-white p-4 rounded-xl shadow-lg"
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
                defaultValue={
                  product.price
                }
                onBlur={(e) =>
                  updatePrice(
                    product.id,
                    e.target.value
                  )
                }
                className="border p-2 rounded-lg w-full mt-2 mb-4"
              />

              {/* QUANTITY */}
              <label className="font-semibold">
                Quantity
              </label>

              <input
                type="number"
                defaultValue={
                  product.quantity
                }
                onBlur={(e) =>
                  updateQuantity(
                    product.id,
                    e.target.value
                  )
                }
                className="border p-2 rounded-lg w-full mt-2"
              />

              {/* DELETE */}
              <button
                onClick={() =>
                  deleteProduct(
                    product.id
                  )
                }
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Delete Product
              </button>

            </div>
          ))

        ) : (

          <h1 className="text-2xl">
            No Products Found
          </h1>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;