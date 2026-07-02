import { useState, useEffect } from 'react'

function useTheme() {
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light')

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight)
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }, [isLight])

  function toggleTheme() {
    setIsLight((prev) => !prev)
  }

  return { isLight, toggleTheme }
}

export default useTheme
