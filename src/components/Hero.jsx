import { useEffect, useState } from 'react'
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { profile } from '../data/site.js'

const roles = ['Backend Developer', 'API Architect', 'Problem Solver', 'Open Source Contributor']

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [delayPhase, setDelayPhase] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const finishedTyping = typedRole === currentRole
    const finishedDeleting = deleting && typedRole === ''

    const timeout = window.setTimeout(
      () => {
        if (delayPhase) {
          setDelayPhase(false)
          setDeleting(true)
          return
        }

        if (!deleting && !finishedTyping) {
          setTypedRole(currentRole.slice(0, typedRole.length + 1))
          return
        }

        if (!deleting && finishedTyping) {
          setDelayPhase(true)
          return
        }

        if (deleting && !finishedDeleting) {
          setTypedRole(currentRole.slice(0, typedRole.length - 1))
          return
        }

        if (deleting && finishedDeleting) {
          setDeleting(false)
          setRoleIndex((index) => (index + 1) % roles.length)
        }
      },
      deleting ? 42 : 72,
    )

    return () => window.clearTimeout(timeout)
  }, [deleting, delayPhase, roleIndex, typedRole])

  return (
    <section id="home" data-section="true" className="hero section" data-reveal>
      <div
        className="hero-background"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(7,10,15,0.55), rgba(7,10,15,0.55)), url(${profile.heroImage})`,
        }}
      >
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-grid" />
        <span className="hero-noise" />
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker" data-reveal style={{ '--delay': '0ms' }}>
            {profile.alias} | {profile.location}
          </p>
          <p className="hero-bio" data-reveal style={{ '--delay': '100ms' }}>
            {profile.tagline} I design secure, scalable systems, build clean APIs, and
            enjoy turning complex backend requirements into resilient products.
          </p>

          <div className="hero-actions" data-reveal style={{ '--delay': '300ms' }}>
            <Link to="/#projects" className="button">
              View My Work <FiArrowRight aria-hidden="true" />
            </Link>
            <a href={profile.resume} className="button-secondary" download>
              Download Resume <FiDownload aria-hidden="true" />
            </a>
          </div>

          <div className="hero-socials" data-reveal style={{ '--delay': '400ms' }}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="social-link">
              <FiGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="social-link">
              <FiLinkedin />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile" className="social-link">
              <FaInstagram />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Send email" className="social-link">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero-panel glass-card card-hover" data-reveal style={{ '--delay': '250ms' }}>
          <div className="hero-terminal">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="terminal-window">
              <p>$ whoami</p>
              <p>{profile.name.toLowerCase().replace(/\s+/g, '_')}</p>
              <p>$ focus</p>
              <p>Reliable APIs, production systems, and developer ergonomics.</p>
              <p>$ status</p>
              <p className="terminal-highlight">Shipping resilient backend experiences.</p>
            </div>
          </div>

          <div className="hero-points">
            <span className="pill">REST APIs</span>
            <span className="pill">System Design</span>
            <span className="pill">Microservices</span>
            <span className="pill">Cloud Ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
