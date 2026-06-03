import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px"
      }}
    >
      <h1 className="page-title">
        Our Products
      </h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;