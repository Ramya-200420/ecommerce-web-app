import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });

        alert("Product Updated Successfully");
      } else {
        await API.post("/products", {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });

        alert("Product Added Successfully");
      }

      clearForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock
    });
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      await API.put(`/orders/${orderId}`, {
        status
      });

      alert("Order Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + order.totalPrice,
    0
  );

  return (
    <div
      style={{
        padding: "30px"
      }}
    >
      <h1
        style={{
          color: "#1e40af",
          marginBottom: "20px"
        }}
      >
        Admin Dashboard
      </h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <h2>₹{totalRevenue}</h2>
        </div>
      </div>

      <div className="admin-section">
        <h2>
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <br />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <br />
          <br />

          <button type="submit">
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              style={{
                marginLeft: "10px"
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-section">
        <h2>Product Management</h2>

        <br />

        {products.length === 0 ? (
          <h3>No Products Found</h3>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="admin-section"
            >
              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p>₹{product.price}</p>

              <p>
                Category:
                {" "}
                {product.category}
              </p>

              <p>
                Stock:
                {" "}
                {product.stock}
              </p>

              <button
                onClick={() =>
                  editProduct(product)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(product._id)
                }
                style={{
                  marginLeft: "10px"
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="admin-section">
        <h2>Order Management</h2>

        <br />

        {orders.length === 0 ? (
          <h3>No Orders Found</h3>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="admin-section"
            >
              <h3>
                Order ID:
                {" "}
                {order._id}
              </h3>

              <p>
                Customer:
                {" "}
                {order.user?.name}
              </p>

              <p>
                Total:
                {" "}
                ₹{order.totalPrice}
              </p>

              <p>
                Status:
                {" "}
                {order.status}
              </p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(
                    order._id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;