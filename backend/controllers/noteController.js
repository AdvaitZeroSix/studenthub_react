const Note = require("../models/Note");

async function getNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function createNote(req, res) {
    try {
        const { title, subject, content } = req.body;

        if (!title || !subject || !content) {
            return res.status(400).json({
                message: "Title, subject, and content are all required.",
            });
        }

        const note = await Note.create({
            title,
            subject,
            content,
            user: req.user.id,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

async function deleteNote(req, res) {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        res.json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { getNotes, createNote, deleteNote };
