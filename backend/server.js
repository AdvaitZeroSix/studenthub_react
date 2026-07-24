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

let connectionPromise = null;

function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
        }).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            connectionPromise = null;
            console.error("MongoDB Connection Error:", err.message);
            throw err;
        });
    }

    return connectionPromise;
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(503).json({
            message: "Database connection failed. Please try again.",
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("StudentHub Backend is Running!");
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}

module.exports = app;