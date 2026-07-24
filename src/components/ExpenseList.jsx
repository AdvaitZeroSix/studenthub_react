import ExpenseCard from "./ExpenseCard";

const CATEGORIES = ["All", "Food", "Transport", "Study", "Shopping", "Other"];

function escapeCSVField(value) {
  const stringValue = String(value);
  if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, "\"\"")}"`;
  }
  return stringValue;
}

function downloadExpensesCSV(expenses) {
  const headers = ["Title", "Amount", "Category", "Type", "Date"];

  const rows = expenses.map((expense) => [
    expense.title,
    expense.amount,
    expense.category,
    expense.type,
    new Date(expense.date).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCSVField).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expenses.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function ExpenseList({
  expenses,
  fetchExpenses,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
}) {

  const totalIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Income" && expense.type === "income") ||
      (selectedType === "Expenses" && expense.type === "expense");

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    return matchesType && matchesCategory;
  });

  return (

    <>

      <div className="balance-card">

        <div className="balance-item">
          <div className="balance-label">Total Income</div>
          <div className="balance-value amount-income">+₹{totalIncome}</div>
        </div>

        <div className="balance-item balance-net">
          <div className="balance-label">Net Balance</div>
          <div className="balance-value">₹{netBalance}</div>
        </div>

        <div className="balance-item">
          <div className="balance-label">Total Expenses</div>
          <div className="balance-value amount-expense">-₹{totalExpense}</div>
        </div>

      </div>

      <div className="filter-group">

        {["All", "Income", "Expenses"].map((type) => (
          <button
            key={type}
            className={`filter-btn ${selectedType === type ? "filter-btn-active" : ""}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}

        <select
          className="expense-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          className="export-btn"
          onClick={() => downloadExpensesCSV(filteredExpenses)}
          disabled={filteredExpenses.length === 0}
        >
          Export CSV
        </button>

      </div>

      {filteredExpenses.length === 0 ? (
        <p className="task-empty">No entries match this filter yet.</p>
      ) : (
        <div className="expense-list">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              fetchExpenses={fetchExpenses}
            />
          ))}
        </div>
      )}

    </>

  );
}

export default ExpenseList;