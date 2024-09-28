// /server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = ["https://budgetpal-3c49.onrender.com"];

// app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Yo! </h1>");
});
app.use("/api/users", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
