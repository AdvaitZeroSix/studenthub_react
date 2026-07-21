import { useState } from "react";
import { API_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";

function ExpenseForm({ fetchExpenses }) {

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [type, setType] = useState("expense");
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();
        setError("");

        try {

            const response = await fetch(`${API_URL}/api/expenses`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                    type,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setTitle("");
            setAmount("");
            setCategory("Food");
            setType("expense");

            fetchExpenses();

        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    }

    return (

        <form className="expense-form" onSubmit={handleSubmit}>

            <select
                className="expense-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            <input
                className="expense-input"
                type="text"
                placeholder="Title"
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
                Add {type === "income" ? "Income" : "Expense"}
            </button>

            {error && <p className="auth-error expense-form-error">{error}</p>}

        </form>

    );
}

export default ExpenseForm;
