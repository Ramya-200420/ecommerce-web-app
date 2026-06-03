import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const loadData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setUser(storedUser);
    setCart(storedCart);
  };

  useEffect(() => {
    loadData();

    // listen for login/logout/cart changes
    window.addEventListener("storage", loadData);

    return () => window.removeEventListener("storage", loadData);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    loadData(); // instant UI update

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">ShopEase</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">Cart ({cart.length})</Link>

        {user && <Link to="/orders">My Orders</Link>}

        {user?.role === "admin" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="welcome">
              Welcome {user.name}
            </span>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;