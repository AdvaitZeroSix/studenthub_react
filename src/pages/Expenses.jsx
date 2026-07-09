import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

  async function fetchExpenses() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/expenses"
      );

      const data = await response.json();

      setExpenses(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <section className="hero">

        <h1>Expense Tracker</h1>

        <p>
          Track your daily expenses.
        </p>

      </section>

      <section className="expense-section">

        <ExpenseForm
          fetchExpenses={fetchExpenses}
        />

        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
        />

      </section>
    </>
  );
}

export default Expenses;