import { FiAward, FiBookOpen, FiCpu } from 'react-icons/fi'
import { education, learningFocus, stats } from '../data/site.js'

function About() {
  return (
    <section id="about" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiBookOpen /> About Me
        </span>
        <h2 className="section-title">Building the backbone behind polished products.</h2>
        <p className="section-copy">
          I&apos;m a backend-focused developer who enjoys designing APIs that are calm under
          pressure. My work usually starts with data modeling, auth boundaries, and clear
          service contracts, then moves into deployment, observability, and maintainability.
        </p>
      </div>

      <div className="about-layout">
        <div className="about-copy glass-card card-hover" data-reveal style={{ '--delay': '80ms' }}>
          <div className="about-text">
            {education.map((item) => (
              <div key={item.school} className="about-education">
                <span className="section-icon">
                  <FiAward aria-hidden="true" />
                </span>
                <div>
                  <p className="about-education-title">{item.degree}</p>
                  <p className="about-education-meta">
                    {item.school} • {item.year}
                  </p>
                </div>
              </div>
            ))}

            <p className="about-paragraph">
              I focus on solving practical problems with clean and scalable solutions.
               Most of my work revolves around backend development, database design, and integrating intelligent features into real-world applications.


            </p>

            <p className="about-paragraph">
              I like working on projects that combine software engineering with AI, whether it is text summarization, live prediction systems, or automation-focused platforms. I also enjoy designing structured APIs, managing databases, and creating development workflows that are simple to maintain and easy to extend.
             Beyond application development, I spend time exploring Linux environments, embedded systems with Arduino, and tools that improve development efficiency. I prefer learning by building, documenting ideas clearly, and turning complex concepts into usable products.
            </p>
           

            <div className="about-badge pill">
              <FiCpu aria-hidden="true" /> Currently Learning: {learningFocus}
            </div>
          </div>
        </div>

        <div className="about-visual" data-reveal style={{ '--delay': '180ms' }}>
          <img
            src="/prot_imag.png"
            alt="Tarun Chandra Das"
            className="about-profile-img"
          />
        </div>
      </div>

      <div className="stats-grid" data-reveal style={{ '--delay': '260ms' }}>
        {stats.map((stat, index) => (
          <article key={stat.label} className="stat-card glass-card card-hover" style={{ '--delay': `${index * 90}ms` }}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
