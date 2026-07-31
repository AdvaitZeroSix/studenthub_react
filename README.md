# StudentHub

StudentHub is a full-stack productivity app for students. It brings together a task manager, notes, a Pomodoro focus timer, and an income/expense tracker in one place, behind a JWT-authenticated account system.

## Features

- **Authentication** - signup and login with JWT. Passwords are hashed with bcrypt. Protected routes redirect to login when the user isn't authenticated. Inline error messages for wrong password, unknown email, duplicate signup, and empty fields (no raw console errors shown to the user).
- **Dashboard** - central hub with quick links to every feature, plus a task manager (add, complete, delete, clear completed, priority levels) persisted in the browser via `localStorage`.
- **Notes** - full CRUD backed by MongoDB, scoped to the logged-in user. Add a note with a title, subject, and content; search across all three; delete notes.
- **Expense Tracker** - full CRUD wired to MongoDB, scoped to the logged-in user. Add an income or expense entry with a title, amount, and category. A balance card shows total income, total expenses, and net balance. Entries are color-coded (green for income, red for expenses) and can be filtered by type (All / Income / Expenses) and by category.
- **Pomodoro Timer** - 25/5 focus and break timer with start, pause, and reset controls, a circular progress ring, and a running log of completed sessions for the day.
- **Theme toggle** - light/dark mode switch in the navbar.
- **Responsive design** - collapsible navbar on mobile, responsive layout throughout.

## Tech Stack

**Frontend**
- React (Vite)
- `react-router-dom` for client-side routing
- Plain CSS with CSS custom properties for theming (light/dark mode)
- React Context for auth state
- Fetch API for backend communication

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT (`jsonwebtoken`) for authentication
- `bcryptjs` for password hashing
- `cors` and `dotenv`

## File Structure

```
studenthub-react/
├── src/
│   ├── pages/              # Home, Login, Signup, Dashboard, Notes, Pomodoro, Expenses
│   ├── components/         # Navbar, Footer, ScrollTopButton, Card, ProtectedRoute,
│   │                        # CursorGlow, ExpenseForm, ExpenseCard, ExpenseList, NoteForm, NoteCard
│   ├── context/             # AuthContext (login, signup, logout, token, user)
│   ├── hooks/                # useTheme, useScrollTop, useScrollReveal, useTasks, usePomodoro
│   ├── utils/                 # api.js (backend base URL)
│   ├── styles/                 # index.css (resets, variables, keyframes), App.css (component styles)
│   ├── assets/                  # fonts, icons, images
│   ├── App.jsx
│   └── main.jsx
├── public/                # favicon.svg, icons.svg
├── backend/
│   ├── server.js           # Express app entry point
│   ├── models/              # User, Expense, Note (Mongoose schemas)
│   ├── controllers/          # authController, expenseController, noteController
│   ├── routes/                 # /api/auth, /api/expenses, /api/notes
│   ├── middleware/              # authMiddleware (JWT verification)
│   └── vercel.json
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

## REST API

| Method | Route | Auth required | Description |
|--------|-------|----------------|-------------|
| POST | `/api/auth/signup` | No | Creates a new user, returns a JWT |
| POST | `/api/auth/login` | No | Verifies credentials, returns a JWT |
| GET | `/api/expenses` | Yes | Returns the logged-in user's expenses |
| POST | `/api/expenses` | Yes | Creates a new income or expense entry |
| DELETE | `/api/expenses/:id` | Yes | Deletes an entry by ID |
| GET | `/api/notes` | Yes | Returns the logged-in user's notes |
| POST | `/api/notes` | Yes | Creates a new note |
| DELETE | `/api/notes/:id` | Yes | Deletes a note by ID |

## Running Locally

### Frontend

```bash
npm install
npm run dev
```

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:5000
```

Other available scripts:

```bash
npm run build      # production build
npm run preview    # preview the production build locally
npm run lint        # run ESLint
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `/backend` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
FRONTEND_URL=http://localhost:5173
PORT=5000
```

- `MONGO_URI` — connects the backend to your MongoDB database.
- `JWT_SECRET` — signs and verifies login tokens. Use a long random string, never commit the real value.
- `FRONTEND_URL` — used for the CORS allowlist so the frontend is permitted to call the backend.
- `PORT` — used for local development only.

## Live Deployment

- **Frontend:** [https://studenthub-react.vercel.app](https://studenthub-react.vercel.app/)
- **Backend:** [https://studenthub-react-backend.vercel.app](https://studenthub-react-backend.vercel.app/)

Both are deployed separately on Vercel.

- **Frontend** — set `VITE_API_URL` in the Vercel project's environment variables, pointing to the deployed backend URL.
- **Backend** — set `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL` in the Vercel project's environment variables, pointing to the deployed frontend URL.

Neither `.env` file is committed to the repository.
