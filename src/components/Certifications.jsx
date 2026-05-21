import { FiAward, FiCheckCircle, FiShield } from 'react-icons/fi'
import { certifications } from '../data/certifications.js'

function Certifications() {
  return (
    <section id="certifications" data-section="true" className="section" data-reveal>
      <div className="section-heading">
        <span className="eyebrow">
          <FiShield /> Certifications & Awards
        </span>
        <h2 className="section-title">Verified signals of continued backend depth.</h2>
        <p className="section-copy">
          The cards below are intentionally styled like credential artifacts, so swapping in real
          badges later takes only a few edits.
        </p>
      </div>

      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <article key={cert.name} className={`cert-card glass-card card-hover${cert.award ? ' is-award' : ''}`} data-reveal style={{ '--delay': `${index * 85}ms` }}>
            <div className="cert-ribbon">
              {cert.award ? 'Award' : 'Certificate'}
            </div>
            <div className="cert-head">
              <span className="section-icon">
                {cert.award ? <FiAward aria-hidden="true" /> : <FiCheckCircle aria-hidden="true" />}
              </span>
              <div>
                <h3>{cert.name}</h3>
                <p>
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            </div>
            <p className="cert-id">Credential ID: {cert.credentialId}</p>
            <a href={cert.verify} target="_blank" rel="noreferrer" className="button-ghost cert-button">
              Verify
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Certifications
