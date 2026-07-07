import ExpenseCard from "./ExpenseCard";

function ExpenseList() {

  const expenses = [];

  return (
    <div>

      <div className="expense-summary">

        <div className="expense-total">
          Total Expenses : ₹0
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