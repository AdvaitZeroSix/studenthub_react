import { API_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";

function ExpenseCard({
  expense,
  fetchExpenses,
}) {

  const { token } = useAuth();

  async function handleDelete() {

    try {

      await fetch(
        `${API_URL}/api/expenses/${expense._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  }

  const isIncome = expense.type === "income";

  return (
    <div className={`expense-card ${isIncome ? "expense-card-income" : "expense-card-expense"}`}>

      <div className="expense-info">

        <div className="expense-title">
          {expense.title}
        </div>

        <div className="expense-category">
          {expense.category}
        </div>

      </div>

      <div className="expense-right">

        <div className={`expense-amount ${isIncome ? "amount-income" : "amount-expense"}`}>
          {isIncome ? "+" : "-"}₹{expense.amount}
        </div>

        <button
          className="expense-delete"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseCard;
