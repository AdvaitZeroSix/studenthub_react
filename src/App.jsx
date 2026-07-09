import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollTopButton from './components/ScrollTopButton.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Notes from './pages/Notes.jsx'
import Pomodoro from './pages/Pomodoro.jsx'
import Expenses from './pages/Expenses.jsx'
import CursorGlow from "./components/CursorGlow"
import './styles/App.css'

function App() {
  return (
    <>
      <Navbar />
      <CursorGlow />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>

      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default App
