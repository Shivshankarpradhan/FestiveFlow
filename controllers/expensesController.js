const Expense = require("../models/Expense");

exports.addExpenses = async (req, res) => {
    try {
        await Expense.create(req.body); // date will be auto-added
        res.redirect('/expenses');
    } catch (err) {
        res.status(500).send("Error saving expense");
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.render('expenses', { expenses });
    } catch (err) {
        res.status(500).send("Error fetching expenses");
    }
};
