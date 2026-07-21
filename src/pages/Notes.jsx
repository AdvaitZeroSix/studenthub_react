import { useEffect, useState } from "react"
import { API_URL } from "../utils/api"
import { useAuth } from "../context/AuthContext.jsx"
import NoteForm from "../components/NoteForm.jsx"
import NoteCard from "../components/NoteCard.jsx"

function Notes() {
  const { token } = useAuth()

  const [notes, setNotes] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchNotes() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        setError('Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      const data = await response.json()
      setNotes(data)
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredNotes = notes.filter((note) => {
    const q = query.toLowerCase()
    return (
      note.title.toLowerCase().includes(q) ||
      note.subject.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <section className="hero">
        <h1 className="text-5xl font-bold tracking-tight mb-4">All Your Notes in One Place</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
          Store and organize your study notes by subject.
        </p>
        <div className="upload-section">
          <h2 className="text-lg font-semibold mb-2">Add New Notes</h2>
          <p className="text-sm opacity-65 mb-4">Write a note and save it to your account.</p>
          <NoteForm fetchNotes={fetchNotes} />
        </div>
      </section>

      <section className="features py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Your Notes</h2>
        <section className="search-section">
          <input
            id="searchBar"
            className="search-bar"
            type="text"
            placeholder="Search notes by title or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>

        {loading ? (
          <p className="task-empty">Loading your notes...</p>
        ) : error ? (
          <p className="auth-error">{error}</p>
        ) : (
          <>
            <div className="feature-container mt-8">
              {filteredNotes.map((note) => (
                <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} />
              ))}
            </div>

            {notes.length === 0 && (
              <p className="no-results" style={{ display: 'block' }}>
                No notes yet. Add your first one above.
              </p>
            )}

            {notes.length > 0 && filteredNotes.length === 0 && (
              <p className="no-results" style={{ display: 'block' }}>
                No notes found matching your search.
              </p>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default Notes
