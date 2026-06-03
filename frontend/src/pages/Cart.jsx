import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(items);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCartItems(updatedCart);
  };

  const checkout = async () => {
    try {
      const products = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity
      }));

      const totalPrice = cartItems.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );

      await API.post("/orders", {
        products,
        totalPrice
      });

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      setCartItems([]);
    } catch (error) {
      console.log(error);
      alert("Checkout Failed");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-heading">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2>Cart Empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-card"
            >
              <h3 className="cart-name">
                {item.name}
              </h3>

              <p className="cart-price">
                ₹{item.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="total-box">
            Total: ₹
            {cartItems.reduce(
              (total, item) =>
                total +
                item.price * item.quantity,
              0
            )}
          </div>

          <button
            className="checkout-btn"
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;