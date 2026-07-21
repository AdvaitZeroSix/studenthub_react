import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme.js'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLight, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  function handleLogout() {
    logout()
    closeMenu()
    navigate('/')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function navLinkClass({ isActive }) {
    return isActive ? 'Active' : ''
  }

  const aboutHref = location.pathname === '/' ? '#about' : '/#about'

  return (
    <nav>
      <h2>
        <NavLink to="/" className="nav-brand" onClick={closeMenu}>
          Student Hub
        </NavLink>
      </h2>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/dashboard" onClick={closeMenu} className={navLinkClass}>
          Dashboard
        </NavLink>
        <a href={aboutHref} onClick={closeMenu}>
          About
        </a>
        <NavLink to="/notes" onClick={closeMenu} className={navLinkClass}>
          Notes
        </NavLink>
        <NavLink to="/pomodoro" onClick={closeMenu} className={navLinkClass}>
          Pomodoro
        </NavLink>
        <NavLink to="/expenses" onClick={closeMenu} className={navLinkClass}>
          Expenses
        </NavLink>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <div className="nav-auth">
            <span className="nav-user">Hi, {user?.name?.split(' ')[0]}</span>
            <button className="nav-logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="nav-auth">
            <NavLink to="/login" onClick={closeMenu} className={navLinkClass}>
              Log In
            </NavLink>
            <NavLink to="/signup" onClick={closeMenu} className={navLinkClass}>
              Sign Up
            </NavLink>
          </div>
        )}
        <div className="theme-switch" onClick={toggleTheme}>
          <div className={`switch-knob ${isLight ? 'active' : ''}`}></div>
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
