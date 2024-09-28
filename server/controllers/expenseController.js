const Expense = require("../models/Expense");

// Get all expenses for the logged-in user
exports.getExpense = async (req, res) => {
  console.log("req.body - expenses: ", req.body);
  try {
    // Fetching only the expenses that belong to the logged-in user
    const allExpenses = await Expense.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    console.log("allExpenses: ", allExpenses);
    res.status(200).json(allExpenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expenses." });
  }
};

// Add expense (already user-specific)
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = parseFloat(amount);

    const expense = new Expense({
      title,
      amount: parsedAmount,
      category,
      description,
      date,
      user: req.user.id, // Associate expense with the logged-in user
    });

    if (!title || !category || !description || !date || isNaN(parsedAmount)) {
      return res.status(400).json({
        message: "All fields are required and amount must be a number.",
      });
    }

    if (parsedAmount < 0) {
      return res.status(400).json({ message: "Amount must be positive." });
    }

    await expense.save();
    res.status(200).json({ message: "Expense added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
};

// Update expense (only allow update if the expense belongs to the user)
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    // Find expense by ID and check if it belongs to the logged-in user
    const expense = await Expense.findById(id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized." });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Expense updated successfully.", updatedExpense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating expense." });
  }
};

// Delete expense (only allow deletion if the expense belongs to the user)
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Find expense by ID and check if it belongs to the logged-in user
    const expense = await Expense.findById(id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized." });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting expense." });
  }
};
