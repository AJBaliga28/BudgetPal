const Income = require("../models/Income");

// Get all incomes for the logged-in user
exports.getIncome = async (req, res) => {
  console.log("req.body - income: ", req.body);
  try {
    // Fetching only the incomes that belong to the logged-in user
    const allIncomes = await Income.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    console.log("allIncomes: ", allIncomes);
    res.status(200).json(allIncomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch incomes." });
  }
};

// Add income (already user-specific)
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = parseFloat(amount);

    const income = new Income({
      title,
      amount: parsedAmount,
      category,
      description,
      date,
      user: req.user.id, // Associate income with the logged-in user
    });

    if (!title || !category || !description || !date || isNaN(parsedAmount)) {
      return res.status(400).json({
        message: "All fields are required and amount must be a number.",
      });
    }

    if (parsedAmount < 0) {
      return res.status(400).json({ message: "Amount must be positive." });
    }

    await income.save();
    res.status(200).json({ message: "Income added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
};

// Update income (only allow update if the income belongs to the user)
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    // Find income by ID and check if it belongs to the logged-in user
    const income = await Income.findById(id);
    if (!income || income.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Income not found or unauthorized." });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Income updated successfully.", updatedIncome });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating income." });
  }
};

// Delete income (only allow deletion if the income belongs to the user)
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // Find income by ID and check if it belongs to the logged-in user
    const income = await Income.findById(id);
    if (!income || income.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Income not found or unauthorized." });
    }

    await income.remove();
    res.status(200).json({ message: "Income deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting income." });
  }
};
