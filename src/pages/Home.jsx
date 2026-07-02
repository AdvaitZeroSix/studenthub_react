import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card.jsx'

function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '#about') {
      const el = document.getElementById('about')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <section className="hero">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Stay Organized</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
          Student Hub helps students manage their notes, assignments,
          and academic resources all in one place.
        </p>
        <button onClick={() => navigate('/dashboard')}>Get Started</button>
      </section>

      <section className="features py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Top Features</h2>
        <div className="feature-container">
          <Card
            title="Notes Storage"
            description="Store and organize your study notes in one place."
          />
          <Card
            title="Pomodoro Timer"
            description="Stay focused with timed work sprints and breaks."
          />
          <Card
            title="Tasks Manager"
            description="Manage assignments and deadlines efficiently."
          />
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">About Student Hub</h2>
        <p className="max-w-lg mx-auto opacity-75 text-base leading-relaxed">
          Student Hub is a platform designed to help students organize
          notes, manage assignments, and stay productive throughout
          their academic journey.
        </p>
      </section>

      <section className="stats py-16 px-10 text-center" id="stats">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Why Student Hub?</h2>
        <div className="feature-container">
          <Card title="Responsive Design" description="Works seamlessly on all devices." />
          <Card title="Useful Features" description="Everything you need to stay organized." />
          <Card title="Always Free" description="Free to use for all students." />
        </div>
      </section>
    </>
  )
}

export default Home
