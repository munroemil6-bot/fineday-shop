import {
  useState
} from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../services/firebase";

import {
  useNavigate
} from "react-router-dom";

function AdminLogin() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/dashboard");

      } catch {

        setError(
          "Invalid credentials"
        );
      }
    };

  const handleGoogleLogin =
    async () => {

      await signInWithPopup(
        auth,
        provider
      );

      navigate("/dashboard");
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-800">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-black text-white py-3 rounded-lg mb-4"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-lg"
        >
          Sign In With Google
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;