import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="bg-green-700 text-white shadow-lg">

      <div className="flex flex-col items-center justify-center py-4">

        {/* STORE NAME */}
        <h1 className="text-3xl font-extrabold tracking-wide mb-3">
          Fineday General Store
        </h1>

        {/* LINKS */}
        <div className="flex gap-10 text-lg font-medium">

          <Link
            to="/"
            className="hover:text-green-200 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-green-200 transition"
          >
            Products
          </Link>

          <Link
            to="/admin-login"
            className="hover:text-green-200 transition"
          >
            Admin
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;