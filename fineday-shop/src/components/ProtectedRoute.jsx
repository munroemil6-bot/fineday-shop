import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();

  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  // ONLY ALLOW THIS ADMIN EMAIL
  if (!user || user.email !== "finedayshoppers1234@gmail.com") {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default ProtectedRoute;