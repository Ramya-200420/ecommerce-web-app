const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config();

// connect DB
connectDB();

const app = express();

// =======================
// MIDDLEWARES
// =======================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(morgan("dev"));

// =======================
// ROUTES
// =======================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// =======================
// TEST ROUTE
// =======================

app.get("/", (req, res) => {
  res.send("API Running...");
});

// =======================
// SERVER START
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});