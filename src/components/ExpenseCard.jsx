function ExpenseCard({
  expense,
  fetchExpenses,
}) {

  async function handleDelete() {

    try {

      await fetch(
        `http://localhost:5000/api/expenses/${expense._id}`,
        {
          method: "DELETE",
        }
      );

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="expense-card">

      <div className="expense-info">

        <div className="expense-title">
          {expense.title}
        </div>

        <div className="expense-category">
          {expense.category}
        </div>

      </div>

      <div className="expense-right">

        <div className="expense-amount">
          ₹{expense.amount}
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