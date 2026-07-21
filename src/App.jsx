import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollTopButton from './components/ScrollTopButton.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Notes from './pages/Notes.jsx'
import Pomodoro from './pages/Pomodoro.jsx'
import Expenses from './pages/Expenses.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import CursorGlow from "./components/CursorGlow"
import './styles/App.css'

function App() {
  return (
    <>
      <Navbar />
      <CursorGlow />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default App
