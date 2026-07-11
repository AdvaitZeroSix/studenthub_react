# StudentHub

StudentHub is a personal campus productivity hub built over the course of the ISTE Summer School 2026 Web Dev bootcamp. It started as a static landing page and has grown week by week into a full-stack application with a React frontend, client-side routing, persistent local storage, and an Express + MongoDB backend powering a live Expense Tracker.

> Built by **Advait Saxena** as part of ISTE Summer School 2026 – WebDev Domain.

## Project Timeline

| Week | Milestone | Status |
|------|-----------|--------|
| Week 1 | Responsive static landing page (Navbar, Hero, extra section), deployed on GitHub Pages | Done |
| Week 2 | Interactive dashboard (2+ components) with `localStorage` persistence, styled with Tailwind, Figma wireframe | Done |
| Week 3 | Migrated to React (Vite), 3+ components, React Router, `useState`/`useEffect`, deployed on Vercel | Done |
| Week 4 | Express + MongoDB backend, full REST API, Expense Tracker connected end-to-end | Done |
| Week 5 | JWT-based authentication and cloud deployment | ⏳ Upcoming |
| Week 6 | Dockerization, CI/CD, and final live demo | ⏳ Upcoming |

## Features

- **Home** — Responsive landing page with navbar, hero section, and highlights, carried over and restyled from Week 1.
- **Dashboard** — Interactive productivity widgets (e.g. Task Manager, Sticky Notes, Habit Tracker, etc.) originally built with `localStorage` in Week 2, now rebuilt as React components using hooks.
- **Notes** — Sticky-note style component for quick jotting, backed by persistent state.
- **Pomodoro** — 25/5 focus timer with Start, Pause, and Reset controls; tracks and persists daily completed sessions.
- **Expense Tracker** — Full CRUD flow wired to a live backend:
  - Add an expense (title, amount, category) via a form
  - View all expenses fetched from MongoDB on load
  - Delete an expense, synced instantly with the database
  - Running total that updates automatically
  - Filter expenses by category on the frontend

## Tech Stack

**Frontend**
- React + Vite
- `react-router-dom` for client-side routing (`/`, `/dashboard`, `/notes`, `/pomodoro`)
- Tailwind CSS for styling
- Fetch API / Axios for backend communication

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- REST API with `cors` and `dotenv`

## Project Structure

```
studenthub_yourname/
├── src/
│   ├── pages/          # One component per page (Home, Dashboard, Notes, Pomodoro)
│   ├── components/     # Shared UI: Navbar, Footer, ScrollTopButton, Card
│   ├── hooks/           # Stateful logic: useTheme, useScrollTop, useTasks, usePomodoro
│   └── styles/          # index.css (resets/variables/keyframes), App.css (component styles)
├── backend/
│   ├── server.js        # Express app entry point
│   ├── models/          # Mongoose schemas (e.g. Expense)
│   ├── routes/          # REST API routes (/api/expenses)
│   └── .env             # MongoDB connection string (not committed)
└── README.md
```

## REST API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/expenses` | Returns all expense records from MongoDB |
| POST | `/api/expenses` | Creates a new expense (`title`, `amount`, `category`) |
| DELETE | `/api/expenses/:id` | Deletes an expense by ID |

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

### Build

```bash
npm run build
npm run preview
```

### Backend

```bash
cd backend
npm install
npm run dev   # or: node server.js / nodemon server.js
```

Create a `.env` file inside `/backend` with:

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

## Deployment

- **Frontend (Vercel):** [https://studenthub-yourname.vercel.app](https://studenthub-yourname.vercel.app)
- **Backend:** Running locally during Week 4 (`localhost:5000`); cloud deployment planned for Week 5.
- **Week 1 static version (GitHub Pages):** [https://yourusername.github.io/studenthub](https://yourusername.github.io/studenthub)

## Roadmap

- [ ] JWT-based authentication (Week 5)
- [ ] Deploy backend to the cloud (Week 5)
- [ ] Dockerize frontend and backend (Week 6)
- [ ] Set up CI/CD pipeline (Week 6)
- [ ] Final live demo (Week 6)