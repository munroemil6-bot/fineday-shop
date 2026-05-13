import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="bg-black text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        FineDay Shop
      </h1>

      <div className="flex gap-6">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/admin-login">
          Admin
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;