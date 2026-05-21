import { FiExternalLink, FiGithub, FiPackage } from 'react-icons/fi'
import { projects } from '../data/projects.js'

function Projects() {
  return (
    <section id="projects" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiPackage /> Projects
        </span>
        <h2 className="section-title">Prominent backend work with practical outcomes.</h2>
        <p className="section-copy">
          Each project below is written as a realistic placeholder you can swap out quickly with
          production work, case-study details, or live shipped products.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={project.id} className={`project-card glass-card card-hover${project.featured ? ' is-featured' : ''}`} data-reveal style={{ '--delay': `${index * 85}ms` }}>
            <div className="project-topline">
              <p className="project-title">{project.title}</p>
              {project.featured ? <span className="project-badge">Featured</span> : null}
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="pill project-pill">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                <FiGithub aria-hidden="true" /> GitHub
              </a>
              <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
                <FiExternalLink aria-hidden="true" /> Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
