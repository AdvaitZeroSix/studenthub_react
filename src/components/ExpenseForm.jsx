function ExpenseForm() {
  return (
    <div className="expense-form">
      <input
        type="text"
        placeholder="Expense Title"
        className="expense-input"
      />

      <input
        type="number"
        placeholder="Amount"
        className="expense-input"
      />

      <select className="expense-select">
        <option>Food</option>
        <option>Transport</option>
        <option>Study</option>
        <option>Shopping</option>
        <option>Other</option>
      </select>

      <button className="expense-btn">
        Add Expense
      </button>
    </div>
  )
}

export default ExpenseForm