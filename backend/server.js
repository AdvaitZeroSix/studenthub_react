const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(" Connected to MongoDB");
    })
    .catch((err) => {
        console.log(" MongoDB Connection Error:", err);
    });

app.get("/", (req, res) => {
    res.send("StudentHub Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});