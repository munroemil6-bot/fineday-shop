import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-8 py-4">
      <h1 className="text-3xl font-bold">
        Local Shop
      </h1>

      <div className="space-x-6">
        <Link
          to="/"
          className="hover:text-yellow-400"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="hover:text-yellow-400"
        >
          Products
        </Link>

        <Link
          to="/admin-login"
          className="hover:text-yellow-400"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;