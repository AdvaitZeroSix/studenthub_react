# StudentHub

Last updated: July 21, 2026

StudentHub is a personal campus productivity hub built over the course of the ISTE Summer School 2026 Web Dev bootcamp. It started as a static landing page and has grown week by week into a full-stack application with a React frontend, JWT authentication, and an Express + MongoDB backend powering the Expense Tracker and Notes features.

> Built by **Advait Saxena** as part of ISTE Summer School 2026, WebDev Domain.

## Project Timeline

| Week | Milestone | Status |
|------|-----------|--------|
| Week 1 | Responsive static landing page (Navbar, Hero, extra section), deployed on GitHub Pages | Done |
| Week 2 | Interactive dashboard (2+ components) with `localStorage` persistence, styled with Tailwind, Figma wireframe | Done |
| Week 3 | Migrated to React (Vite), 3+ components, React Router, `useState`/`useEffect`, deployed on Vercel | Done |
| Week 4 | Express + MongoDB backend, full REST API, Expense Tracker connected end to end | Done |
| Week 5 | JWT based authentication and cloud deployment | Done |
| Week 6 | Polish, CI/CD basics, final README, and live demo | Done |

## Features

- **Home**: Responsive landing page with navbar, hero section, and highlights.
- **Auth**: Signup and login with JWT. Protected routes redirect to login when logged out. Clear on page error messages for wrong password, unknown email, duplicate signup, and empty fields.
- **Dashboard**: Task Manager built with `localStorage`, plus quick links to the other features. Protected route.
- **Notes**: Full CRUD backed by MongoDB, scoped to the logged in user. Add a note with a title, subject, and content, search across all three, and delete notes. Protected route.
- **Pomodoro**: 25/5 focus timer with Start, Pause, and Reset controls; tracks and persists daily completed sessions.
- **Expense Tracker**: Full CRUD flow wired to a live backend, scoped to the logged in user:
  - Add an income or expense entry (title, amount, category, type)
  - Balance card showing total income, total expenses, and net balance
  - Color coded entries (green for income, red for expenses)
  - Filter by type (All, Income, Expenses) and by category
  - Delete an entry, synced instantly with the database

## Tech Stack

**Frontend**
- React + Vite
- `react-router-dom` for client-side routing
- Tailwind CSS for styling
- Fetch API for backend communication
- React Context for auth state

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (`jsonwebtoken`) for authentication
- `bcryptjs` for password hashing
- REST API with `cors` and `dotenv`

## Project Structure

```
studenthub_yourname/
├── src/
│   ├── pages/          # Home, Login, Signup, Dashboard, Notes, Pomodoro, Expenses
│   ├── components/     # Navbar, Footer, ScrollTopButton, Card, ProtectedRoute,
│   │                    # ExpenseForm, ExpenseCard, ExpenseList, NoteForm, NoteCard
│   ├── context/         # AuthContext (login, signup, logout, token, user)
│   ├── hooks/           # useTheme, useScrollTop, useTasks, usePomodoro
│   ├── utils/            # api.js (backend base URL)
│   └── styles/          # index.css (resets/variables/keyframes), App.css (component styles)
├── backend/
│   ├── server.js        # Express app entry point
│   ├── models/          # Mongoose schemas (User, Expense, Note)
│   ├── controllers/     # Route logic (authController, expenseController, noteController)
│   ├── routes/          # REST API routes (/api/auth, /api/expenses, /api/notes)
│   ├── middleware/      # authMiddleware (JWT verification)
│   └── .env             # MongoDB URI, JWT secret (not committed)
└── README.md
```

## REST API

| Method | Route | Auth required | Description |
|--------|-------|----------------|-------------|
| POST | `/api/auth/signup` | No | Creates a new user, returns a JWT |
| POST | `/api/auth/login` | No | Verifies credentials, returns a JWT |
| GET | `/api/expenses` | Yes | Returns the logged in user's expenses |
| POST | `/api/expenses` | Yes | Creates a new income or expense entry |
| DELETE | `/api/expenses/:id` | Yes | Deletes an entry by ID |
| GET | `/api/notes` | Yes | Returns the logged in user's notes |
| POST | `/api/notes` | Yes | Creates a new note |
| DELETE | `/api/notes/:id` | Yes | Deletes a note by ID |

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser. Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:5000
```

### Build

```bash
npm run build
npm run preview
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `/backend` with:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_string
FRONTEND_URL=http://localhost:5173
PORT=5000
```

- `MONGO_URI` connects the backend to your MongoDB Atlas cluster.
- `JWT_SECRET` signs and verifies login tokens. Use a long random string, never commit the real value.
- `FRONTEND_URL` is used for the CORS allowlist so the deployed frontend can call the deployed backend.
- `PORT` is only used for local development; Vercel ignores it.

## Deployment

- **Frontend (Vercel):** https://studenthub-yourname.vercel.app
- **Backend (Vercel):** https://studenthub-api.vercel.app
- **Week 1 static version (GitHub Pages):** https://yourusername.github.io/studenthub

On Vercel, set `VITE_API_URL` on the frontend project and `MONGO_URI` / `JWT_SECRET` / `FRONTEND_URL` on the backend project under Environment Variables.

## Roadmap

- [x] JWT based authentication
- [x] Expense Tracker income/expense and balance
- [x] Notes as a full-stack feature
- [ ] Wildcard feature (analytics charts or AI insights)
- [ ] Final live demo
