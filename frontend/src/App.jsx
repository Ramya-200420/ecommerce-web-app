import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={
            user ? (
              <Orders />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;