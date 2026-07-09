import { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard";

function ExpenseList() {

const [expenses, setExpenses] = useState([]);
const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
);

useEffect(() => {
    fetchExpenses();
}, []);

async function fetchExpenses() {
    try {
        const response = await fetch("http://localhost:5000/api/expenses");

        const data = await response.json();

        setExpenses(data);

    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>

      <div className="expense-summary">

        <div className="expense-total">
            Total Expenses : ₹{totalExpense}
        </div>

        <select className="expense-select">
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Study</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

      </div>

      <div className="expense-list">

        {expenses.length === 0 ? (

          <p className="task-empty">
            No expenses added yet.
          </p>

        ) : (

          expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
            />
          ))

        )}

      </div>

    </div>
  )
}

export default ExpenseList