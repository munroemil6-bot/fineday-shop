import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [image, setImage] =
    useState("");

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    const newProduct = {

      name,

      price: Number(price),

      quantity: Number(quantity),

      image
    };

    try {

      await axios.post(
        "http://localhost:3001/products",
        newProduct
      );

      alert(
        "Product Added Successfully"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-[400px]"
      >

        <h1 className="text-4xl font-bold mb-6 text-center">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setImage(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;