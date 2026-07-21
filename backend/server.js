const express = require("express");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        "http://localhost:5173",
    ],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
    console.error("MongoDB Connection Error:");
    console.error(err);
    console.error(err.message);
    console.error(err.reason);
    });

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("StudentHub Backend is Running!");
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
