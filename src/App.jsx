import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Extracurricular from './components/Extracurricular.jsx'
import SocialWork from './components/SocialWork.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const sectionOrder = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'extracurricular',
  'social-work',
  'contact',
]

function App() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const orderedSections = useMemo(() => sectionOrder, [])

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 18)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = orderedSections
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting)
        if (!visibleSections.length) return

        visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        setActiveSection(visibleSections[0].target.id)
      },
      {
        threshold: [0.18, 0.35, 0.55],
        rootMargin: '-18% 0px -55% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [orderedSections])

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return undefined

    const target = document.getElementById(hash)
    if (!target) return undefined

    const timeoutId = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [location.hash])

  return (
    <div className="app-shell">
      <Navbar activeSection={activeSection} isScrolled={isScrolled} />
      <main className="site-main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Extracurricular />
        <SocialWork />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
