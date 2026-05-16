import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;