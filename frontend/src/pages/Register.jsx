import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        formData
      );

      alert(
        "Registration Successful. Please Login."
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;