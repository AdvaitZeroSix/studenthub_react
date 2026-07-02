import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useTheme from '../hooks/useTheme.js'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLight, toggleTheme } = useTheme()
  const location = useLocation()

  function closeMenu() {
    setMenuOpen(false)
  }

  function navLinkClass({ isActive }) {
    return isActive ? 'Active' : ''
  }

  // "About" is a section on the Home page, so link there with a hash when
  // we're not already on Home.
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
      </div>
      <div className="nav-right">
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
