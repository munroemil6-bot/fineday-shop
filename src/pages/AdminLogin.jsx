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

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Fine Day Shop
          </h1>
          <p className="text-xl text-gray-600">
            Wholesale Shopping Made Easy
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LOGIN FORM */}
          <div className="flex justify-center lg:justify-end">
            <form
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-200"
            >

              <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                Admin Login
              </h2>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@fineday.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* BUTTON */}
              <button
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition"
              >
                Login
              </button>

            </form>
          </div>

          {/* STORE DETAILS */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-200 w-full max-w-md">

              {/* OWNER IMAGE */}
              <div className="mb-6">
                <img
                  src=""
                  alt="Carolyne Naliaka"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* OWNER INFO */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Carolyne Naliaka
              </h3>
              <p className="text-green-600 font-semibold mb-4">
                Store Owner & Manager
              </p>

              {/* STORE DESCRIPTION */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    About Fine Day Shop
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Your trusted wholesale partner for quality products at unbeatable prices. We are committed to providing excellent service and premium products to our valued customers.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Contact
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Phone: 0723274962<br />
                    Email: fineday@gmail.com<br />
                    Address: Bungoma, Kenya
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Hours
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Monday - Saturday: 8:00 AM - 6:00 PM<br />
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;
