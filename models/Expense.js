const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    mode: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense' , ExpenseSchema);