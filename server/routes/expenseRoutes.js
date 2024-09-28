// /routes/expenseRoutes.js
const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

const router = express.Router();

// Protect expense routes
router.get("/get-expenses", protect, getExpense); // Protected route to get expenses
router.post("/add-expenses", protect, addExpense); // Protected route to add expenses
router.delete("/delete-expenses/:id", protect, deleteExpense); // Protected route to delete expenses
router.put("/update-expenses/:id", protect, updateExpense); // Protected route to update expenses

module.exports = router;
