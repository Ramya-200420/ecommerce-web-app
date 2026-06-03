import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Product Added To Cart");
    window.location.reload();
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">
        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-category">
          {product.category}
        </p>

        <div className="price-badge">
          ₹{product.price}
        </div>

        <p className="stock-text">
          Stock Available: {product.stock}
        </p>

        <button
          className="cart-btn"
          onClick={addToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;