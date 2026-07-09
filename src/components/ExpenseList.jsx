import ExpenseCard from "./ExpenseCard";

function ExpenseList({
  expenses,
  fetchExpenses,
}) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <>
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
              fetchExpenses={fetchExpenses}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ExpenseList;