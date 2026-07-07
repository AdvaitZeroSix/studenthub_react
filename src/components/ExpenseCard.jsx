function ExpenseCard({ expense }) {
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

        <button className="expense-delete">
          Delete
        </button>
      </div>
    </div>
  )
}

export default ExpenseCard