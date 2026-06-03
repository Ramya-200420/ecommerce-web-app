import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setUser(storedUser);
    setCart(storedCart);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    loadUser();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};