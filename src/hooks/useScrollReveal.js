import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const REVEAL_SELECTORS = [
  '.features > h2',
  '.features .feature-container',
  '.about h2',
  '.about p',
  '.stats > h2',
  '.stats .feature-container',
  '.task-manager > h2',
  '.task-manager .task-input-container',
  '.task-manager ul',
  '.pomodoro-section .pomo-tabs',
  '.pomodoro-section .pomo-ring-wrapper',
  '.pomodoro-section .pomo-sessions',
  '.pomodoro-section .pomo-history',
  '.expense-section',
  '.upload-section',
  '.search-section',
]

function useScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    const elements = document.querySelectorAll(REVEAL_SELECTORS.join(','))
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => {
      el.classList.add('scroll-reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])
}

export default useScrollReveal
