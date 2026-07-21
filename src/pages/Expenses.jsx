import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { API_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";

function Expenses() {

  const { token } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchExpenses() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${API_URL}/api/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      setExpenses(data);

    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="hero">

        <h1>Expense Tracker</h1>

        <p>
          Track your income and expenses in one place.
        </p>

      </section>

      <section className="expense-section">

        <ExpenseForm
          fetchExpenses={fetchExpenses}
        />

        {loading ? (
          <p className="task-empty">Loading your expenses...</p>
        ) : error ? (
          <p className="auth-error">{error}</p>
        ) : (
          <ExpenseList
              expenses={expenses}
              fetchExpenses={fetchExpenses}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
          />
        )}

      </section>
    </>
  );
}

export default Expenses;
