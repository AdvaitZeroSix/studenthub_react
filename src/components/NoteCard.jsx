import { API_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";

function NoteCard({ note, fetchNotes }) {

  const { token } = useAuth();

  async function handleDelete() {
    try {
      await fetch(`${API_URL}/api/notes/${note._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }

  const updatedLabel = new Date(note.updatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card note-card">
      <h3>{note.title}</h3>
      <p className="note-subject">{note.subject}</p>
      <p className="note-content">{note.content}</p>
      <p className="text-xs opacity-50">Last Updated: {updatedLabel}</p>
      <button className="note-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default NoteCard;
