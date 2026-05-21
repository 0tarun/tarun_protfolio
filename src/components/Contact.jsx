import { useState, useRef, useEffect } from 'react'
import { FiCheckCircle, FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa6'
import { contactMethods, profile } from '../data/site.js'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const timeoutRef = useRef(null)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (!form.message.trim()) nextErrors.message = 'Please add a message.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      return
    }

    setStatus('loading')
    timeoutRef.current = window.setTimeout(() => {
      setStatus('success')
      setForm(initialForm)
      setErrors({})
    }, 1200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section id="contact" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiMail /> Contact
        </span>
        <h2 className="section-title">Let&apos;s build something sturdy and useful.</h2>
        <p className="section-copy">
          The form below includes basic validation and a simulated success state, so it already
          feels like a production contact surface even before wiring it to a backend.
        </p>
      </div>

      <div className="contact-layout">
        <aside className="contact-info glass-card card-hover" data-reveal style={{ '--delay': '90ms' }}>
          <h3>Direct channels</h3>
          <p>
            If you want to talk architecture, backend performance, or a collaboration idea,
            reach out through any of the links below.
          </p>

          <div className="contact-methods">
            {contactMethods.map((method) => (
              <a key={method.label} href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-method">
                <span>{method.label}</span>
                <strong>{method.value}</strong>
              </a>
            ))}
          </div>

          <div className="contact-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link social-link-inline">
              <FiGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link social-link-inline">
              <FiLinkedin />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link social-link-inline">
              <FaInstagram />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="social-link social-link-inline">
              <FiMail />
            </a>
          </div>
        </aside>

        <form className="contact-form glass-card card-hover" onSubmit={handleSubmit} noValidate data-reveal style={{ '--delay': '180ms' }}>
          <div className="field-grid">
            {[
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'subject', label: 'Subject', type: 'text' },
            ].map((field) => (
              <div key={field.name} className={`floating-field${errors[field.name] ? ' has-error' : ''}`}>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={updateField}
                  placeholder=" "
                  autoComplete={field.name === 'email' ? 'email' : 'off'}
                />
                <label htmlFor={field.name}>{field.label}</label>
                {errors[field.name] ? <span className="field-error">{errors[field.name]}</span> : null}
              </div>
            ))}

            <div className={`floating-field floating-field-message${errors.message ? ' has-error' : ''}`}>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder=" "
                rows="6"
              />
              <label htmlFor="message">Message</label>
              {errors.message ? <span className="field-error">{errors.message}</span> : null}
            </div>
          </div>

          <button type="submit" className="button contact-submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <span className="button-spinner" aria-hidden="true" />
            ) : status === 'success' ? (
              <FiCheckCircle aria-hidden="true" />
            ) : (
              <FiSend aria-hidden="true" />
            )}
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
          </button>

          <p className={`form-status${status === 'success' ? ' is-success' : ''}`} role="status" aria-live="polite">
            {status === 'success'
              ? 'Thanks. Your message has been prepared for delivery.'
              : 'Basic validation is enabled. Hook this form to a service or API when you are ready.'}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Contact
