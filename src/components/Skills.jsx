import { FiCode, FiDatabase, FiLayers, FiTool, FiZap } from 'react-icons/fi'
import { skills } from '../data/skills.js'

const categoryMeta = {
  languages: { title: 'Languages', icon: FiCode },
  frameworks: { title: 'Frameworks', icon: FiLayers },
  databases: { title: 'Databases', icon: FiDatabase },
  tools: { title: 'DevOps & Tools', icon: FiTool },
  concepts: { title: 'Concepts', icon: FiZap },
}

function Skills() {
  return (
    <section id="skills" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiCode /> Skills & Expertise
        </span>
        <h2 className="section-title">A backend stack tuned for production reality.</h2>
        <p className="section-copy">
          These are the tools and ideas I reach for when the goal is not just to build a demo,
          but to deliver software that stays understandable once people are depending on it.
        </p>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([key, items], index) => {
          const meta = categoryMeta[key]
          const Icon = meta.icon

          return (
            <article key={key} className="skill-card glass-card card-hover" data-reveal style={{ '--delay': `${index * 90}ms` }}>
              <div className="skill-header">
                <span className="section-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{meta.title}</h3>
              </div>

              <div className="skill-pills">
                {items.map((item, pillIndex) => (
                  <span
                    key={item}
                    className="pill skill-pill"
                    style={{ '--delay': `${pillIndex * 70}ms` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
