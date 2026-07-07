const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;