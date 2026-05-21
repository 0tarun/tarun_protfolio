import { FiHeart } from 'react-icons/fi'
import { socialWork } from '../data/socialWork.js'

function SocialWork() {
  return (
    <section id="social-work" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiHeart /> Social Work
        </span>
        <h2 className="section-title">Mentorship, knowledge sharing, and peer support.</h2>
      </div>

      <div className="social-work-list">
        {socialWork.map((entry, index) => (
          <article key={entry.title} className="social-work-card glass-card card-hover" data-reveal style={{ '--delay': `${index * 85}ms` }}>
            <h3>{entry.title}</h3>
            <p className="social-work-org">{entry.organization}</p>
            <p className="social-work-description">{entry.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SocialWork
