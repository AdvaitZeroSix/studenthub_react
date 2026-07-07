import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Expenses() {
    return (
        <>
            <section className="hero">
                <h1 className="text-5xl font-bold tracking-tight mb-4">
                    Expense Tracker
                </h1>

                <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
                    Track your daily expenses with a MongoDB powered backend.
                </p>
            </section>

            <section className="expense-section">
                <h2 className="text-2xl font-bold mb-8 tracking-tight">
                    Manage Expenses
                </h2>

                <ExpenseForm />

                <ExpenseList />
            </section>
        </>
    );
}

export default Expenses;