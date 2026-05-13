import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth }
from "../services/firebase";

import {
  useNavigate
} from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  // LOGIN
  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        // FIREBASE LOGIN
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user =
          userCredential.user;

        // ADMIN CHECK
        if (
          user.email !==
          "fineday@gmail.com"
        ) {

          alert(
            "Only Admin Allowed"
          );

          return;
        }

        // SUCCESS
        navigate(
          "/admin-dashboard"
        );

      } catch (error) {

        console.log(
          error.code
        );

        console.log(
          error.message
        );

        alert(
          "Invalid Email or Password"
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-[380px]"
      >

        <h1 className="text-4xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-6"
        />

        {/* BUTTON */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;