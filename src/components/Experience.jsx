import { FiBriefcase } from 'react-icons/fi'
import { experience } from '../data/experience.js'

function Experience() {
  return (
    <section id="experience" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiBriefcase /> Work Experience
        </span>
        <h2 className="section-title">Timeline of systems, shipping, and steady iteration.</h2>
        <p className="section-copy">
          If you do not have formal roles yet, this timeline is structured to work equally well
          for freelance projects, internships, research work, and open source contributions.
        </p>
      </div>

      <div className="timeline">
        {experience.map((item, index) => (
          <article key={`${item.company}-${item.role}`} className={`timeline-item glass-card card-hover ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-reveal style={{ '--delay': `${index * 90}ms` }}>
            <div className="timeline-marker" aria-hidden="true">
              <span />
            </div>
            <p className="timeline-company">{item.company}</p>
            <h3>{item.role}</h3>
            <p className="timeline-meta">
              {item.duration} • {item.location}
            </p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
