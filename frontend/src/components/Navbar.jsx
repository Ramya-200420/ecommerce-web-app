import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        ShopEase
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

        {user && (
          <Link to="/orders">
            My Orders
          </Link>
        )}

        {user?.role === "admin" && (
            <Link to="/admin">
            Admin Dashboard
            </Link>
        )}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="welcome">
              Welcome {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;