const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    getNotes,
    createNote,
    deleteNote,
} = require("../controllers/noteController");

router.use(protect);

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

module.exports = router;
