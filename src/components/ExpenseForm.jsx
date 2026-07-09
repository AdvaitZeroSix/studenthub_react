import { useState } from "react";

function ExpenseForm({ fetchExpenses }) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await fetch("http://localhost:5000/api/expenses", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                }),
            });

            setTitle("");
            setAmount("");
            setCategory("Food");

            fetchExpenses();

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <form className="expense-form" onSubmit={handleSubmit}>

            <input
                className="expense-input"
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="expense-input"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="expense-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option>Food</option>
                <option>Transport</option>
                <option>Study</option>
                <option>Shopping</option>
                <option>Other</option>
            </select>

            <button className="expense-btn">
                Add Expense
            </button>

        </form>

    );
}

export default ExpenseForm;