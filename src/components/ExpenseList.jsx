import ExpenseCard from "./ExpenseCard";

function ExpenseList({
    expenses,
    fetchExpenses,
    selectedCategory,
    setSelectedCategory,
})
{
    const filteredExpenses =
    selectedCategory === "All"
        ? expenses
        : expenses.filter(
              (expense) =>
                  expense.category === selectedCategory
          );
    const totalExpense = filteredExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

  return (
    <>
      <div className="expense-summary">
        <div className="expense-total">
          Total Expenses : ₹{totalExpense}
        </div>

        <select
            className="expense-select"
            value={selectedCategory}
            onChange={(e) =>
                setSelectedCategory(e.target.value)
            }
        >
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
          filteredExpenses.map((expense) => (
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