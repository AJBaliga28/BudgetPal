// /routes/incomeRoutes.js
const express = require("express");
const {
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

const router = express.Router();

// Protect income routes
router.get("/get-income", protect, getIncome); // Protected route to get income
router.post("/add-income", protect, addIncome); // Protected route to add income
router.delete("/delete-income/:id", protect, deleteIncome); // Protected route to delete income
router.put("/update-income/:id", protect, updateIncome); // Protected route to update income

module.exports = router;
