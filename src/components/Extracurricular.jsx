import { FiActivity, FiGlobe, FiUsers } from 'react-icons/fi'
import { extracurricular } from '../data/extracurricular.js'

const icons = [FiActivity, FiUsers, FiGlobe]

function Extracurricular() {
  return (
    <section id="extracurricular" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiUsers /> Extracurricular
        </span>
        <h2 className="section-title">Leadership and community work beyond the keyboard.</h2>
      </div>

      <div className="activity-list">
        {extracurricular.map((item, index) => {
          const Icon = icons[index % icons.length]

          return (
            <article key={item.title} className="activity-card glass-card card-hover" data-reveal style={{ '--delay': `${index * 90}ms` }}>
              <div className="activity-icon">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p className="activity-role">{item.role}</p>
                <h3>{item.title}</h3>
                <p className="activity-description">{item.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Extracurricular
