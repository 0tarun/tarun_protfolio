import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiHome, FiUser, FiStar, FiBriefcase, FiFolder, FiAward, FiZap, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { profile } from '../data/site.js'

const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['certifications', 'Certifications'],
  ['extracurricular', 'Extracurricular'],
  ['contact', 'Contact'],
]

function Navbar({ activeSection, isScrolled }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  const scrollToSection = (id) => {
    // Delay scroll slightly to wait for drawer to close and body unlock to apply
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const headerOffset = window.innerWidth <= 860 ? 64 : 100
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 50)
    return true
  }

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}${drawerOpen ? ' drawer-open' : ''}`}>
      <div className="navbar-shell">
        <Link
          to="/#home"
          className="brand"
          aria-label={`${profile.name} home`}
          onClick={() => {
            closeDrawer()
            // Ensure smooth scroll to top/home even when route doesn't change
            scrollToSection('home')
          }}
        >
          <span className="brand-mark">{profile.alias.replace('@', '').slice(0, 2).toUpperCase()}</span>
          <span className="brand-name">
            {profile.alias}
            <span className="brand-cursor" aria-hidden="true">
              |
            </span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map(([id, label]) => (
            <Link
              key={id}
              to={`/#${id}`}
              className={`nav-link${activeSection === id ? ' is-active' : ''}`}
              onClick={() => {
                // Try to smooth scroll to section; Link will still update URL
                scrollToSection(id)
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`mobile-drawer${drawerOpen ? ' is-open' : ''}`} id="mobile-nav" role="dialog" aria-modal="true">
        <div className="mobile-links-grid">
          {navItems.map(([id, label], index) => {
            const Icon = {
              home: FiHome,
              about: FiUser,
              skills: FiStar,
              experience: FiBriefcase,
              projects: FiFolder,
              certifications: FiAward,
              extracurricular: FiZap,
              contact: FiMail,
            }[id]

            return (
              <Link
                key={id}
                to={`/#${id}`}
                className={`mobile-link${activeSection === id ? ' is-active' : ''}`}
                onClick={() => {
                  closeDrawer()
                  scrollToSection(id)
                }}
                style={{ '--link-delay': `${index * 40}ms` }}
                aria-label={label}
              >
                {Icon ? <Icon className="mobile-nav-icon" aria-hidden="true" /> : null}
                <span className="mobile-link-label">{label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {drawerOpen ? (
        <button type="button" className="drawer-backdrop" aria-label="Close menu" onClick={closeDrawer} />
      ) : null}
    </header>
  )
}

export default Navbar
