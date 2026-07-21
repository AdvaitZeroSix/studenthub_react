import { useState } from "react";
import { API_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";

function NoteForm({ fetchNotes }) {

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();
        setError("");

        try {

            const response = await fetch(`${API_URL}/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, subject, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setTitle("");
            setSubject("");
            setContent("");

            fetchNotes();

        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <input
                className="expense-input"
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="expense-input"
                type="text"
                placeholder="Subject (e.g. Operating Systems)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
                className="note-textarea"
                placeholder="Write or paste your notes here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
            />

            {error && <p className="auth-error">{error}</p>}

            <button className="expense-btn" type="submit">
                Add Note
            </button>
        </form>
    );
}

export default NoteForm;
