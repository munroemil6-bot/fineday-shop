import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, provider } from "../services/firebase";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // extra safety check
      if (user.email !== "fineday@gmail.com") {
        setError("Not authorized as admin");
        return;
      }

      navigate("/dashboard");

    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  const handleGoogle = async () => {

    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user.email !== "fineday@gmail.com") {
        setError("Not authorized admin account");
        return;
      }

      navigate("/dashboard");

    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-700">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl w-[380px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        <input
          className="w-full border p-3 mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white py-3 mb-3"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full bg-red-500 text-white py-3"
        >
          Google Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;