import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/cart.css";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-heading">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>
              Order ID: {order._id}
            </h3>

            <p className="order-status">
              Status: {order.status}
            </p>

            <p className="order-total">
              Total: ₹{order.totalPrice}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;