const Expense = require("../models/Expense");

async function getExpenses(req, res) {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function createExpense(req, res) {
    try {
        const { title, amount, category, type } = req.body;

        if (!title || amount === undefined || !category) {
            return res.status(400).json({
                message: "Title, amount, and category are required.",
            });
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            type: type === "income" ? "income" : "expense",
            user: req.user.id,
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

async function deleteExpense(req, res) {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { getExpenses, createExpense, deleteExpense };
