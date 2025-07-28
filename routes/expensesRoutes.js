require('dotenv').config();  
const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const Expense = require('../models/Expense'); // ✅ Add this

// GET all expenses
router.get('/', expensesController.getExpenses);

// POST new expense
router.post("/add", async (req, res) => {
  const { title, amount, mode, adminPin } = req.body;

  if (adminPin !== process.env.ADMIN_PIN) {
    return res.status(403).send("Unauthorized: Invalid Admin PIN");
  }

  // Validate title and amount
  if (!title || !amount || isNaN(amount)) {
    return res.status(400).send("Title and valid amount are required.");
  }

  try {
    const expense = new Expense({
      title: title.trim(),
      amount: parseFloat(amount),
      mode: mode || "cash", // default to "cash" if not provided
    });

    await expense.save();
    res.redirect("/expenses"); // or res.send("Expense added successfully")
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
