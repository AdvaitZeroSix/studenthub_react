import { useState } from 'react'

const notesData = [
  {
    title: 'Data Structures',
    desc: 'Linked Lists, Stacks, Queues, Trees',
    updated: 'June 15, 2026',
  },
  {
    title: 'Operating Systems',
    desc: 'Processes, Scheduling, Memory Management',
    updated: 'June 10, 2026',
  },
  {
    title: 'Database Management Systems',
    desc: 'SQL, Normalization, Transactions',
    updated: 'June 12, 2026',
  },
  {
    title: 'Computer Networks',
    desc: 'OSI Model, TCP/IP, Routing',
    updated: 'June 8, 2026',
  },
]

function Notes() {
  const [query, setQuery] = useState('')

  const filteredNotes = notesData.filter((note) => {
    const q = query.toLowerCase()
    return note.title.toLowerCase().includes(q) || note.desc.toLowerCase().includes(q)
  })

  function handleUpload() {
    alert('Upload feature coming soon!')
  }

  return (
    <>
      <section className="hero">
        <h1 className="text-5xl font-bold tracking-tight mb-4">All Your Notes in One Place</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
          Store and organize your study notes by subject.
        </p>
        <div className="upload-section">
          <h2 className="text-lg font-semibold mb-2">Add New Notes</h2>
          <p className="text-sm opacity-65 mb-4">Upload PDFs, lecture notes, or study material.</p>
          <button id="uploadBtn" onClick={handleUpload}>
            Upload Notes
          </button>
        </div>
      </section>

      <section className="features py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Your Notes</h2>
        <section className="search-section">
          <input
            id="searchBar"
            className="search-bar"
            type="text"
            placeholder="Search notes by subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>
        <div className="feature-container mt-8">
          {filteredNotes.map((note) => (
            <div className="card note-card" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.desc}</p>
              <p className="text-xs opacity-50">Last Updated: {note.updated}</p>
              <button>Open Notes</button>
            </div>
          ))}
        </div>
      </section>

      <p
        className="no-results"
        id="noResults"
        style={{ display: filteredNotes.length === 0 ? 'block' : 'none' }}
      >
        No notes found matching your search.
      </p>
    </>
  )
}

export default Notes
