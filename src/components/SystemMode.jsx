import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { PERSONAL, PROJECTS, SKILLS, EXPERIENCE, EDUCATION, SEMESTERS } from '../lib/data'

const NAV_LINKS = ['Projects', 'Skills', 'Experience', 'Education', 'Contact']

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }
}

function StatusBadge({ type }) {
  const styles = {
    deployed: { color: 'var(--color-accent-light)', border: '1px solid var(--color-accent-light)' },
    production: { color: 'var(--color-accent)', border: '1px solid var(--color-accent)' },
    open: { color: '#4B8A6B', border: '1px solid #4B8A6B' },
  }
  const labels = { deployed: 'DEPLOYED', production: 'PRODUCTION', open: 'OPEN SOURCE' }
  return (
    <span
      className="label-mono text-[8px] px-2 py-1"
      style={styles[type] || styles.deployed}
    >
      {labels[type]}
    </span>
  )
}

function SkillCategory({ title, items, color }) {
  return (
    <div className="border border-border p-5 space-y-4 hover:border-accent/30 transition-colors">
      <h4 className="font-semibold text-sm" style={{ color }}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map(s => (
          <span key={s.name} className="text-muted-light text-sm bg-card border border-border px-2 py-1">
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SystemMode() {
  const { toggle } = useMode()
  const [activeSection, setActiveSection] = useState('projects')

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(`sys-${l.toLowerCase()}`)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id.replace('sys-', '')) })
      },
      { threshold: 0.2 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-60 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 md:px-10 pr-32 h-14">
        {/* Left: Name + role */}
        <div className="flex items-center gap-4">
          <span className="text-accent font-bold text-sm">+</span>
          <span className="font-bold text-sm tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            {PERSONAL.name}
          </span>
          <span className="label-mono text-muted/60 hidden md:block text-[10px]">{PERSONAL.currentRole}</span>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#sys-${link.toLowerCase()}`}
              className="label-mono text-[10px] transition-colors duration-200"
              style={{ color: activeSection === link.toLowerCase() ? 'var(--color-accent-light)' : 'var(--color-muted)' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Resume button */}
        <div className="flex items-center gap-3">
          <a href="#sys-resume" className="label-mono text-foreground hover:text-accent transition-colors text-[9px] hidden md:flex items-center gap-2 border border-border px-3 py-1.5 hover:border-accent/50">
            <span>↓</span> RESUME
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-14 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Hero ── */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7 space-y-4">
              <p className="label-mono text-muted/50">System Mode — Recruiter View</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">{PERSONAL.name}</h1>
              <p className="text-muted leading-relaxed max-w-lg">{PERSONAL.shortBio}</p>
            </div>
            <div className="md:col-span-5 grid grid-cols-3 gap-4 md:pt-8">
              {[
                { label: 'Location', value: PERSONAL.location },
                { label: 'Availability', value: PERSONAL.availability },
                { label: 'Open To', value: PERSONAL.openTo },
              ].map(item => (
                <div key={item.label} className="space-y-1 border-t border-border pt-4">
                  <p className="label-mono text-muted/50 text-[9px]">{item.label}</p>
                  <p className="text-foreground text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 Projects ── */}
        <section id="sys-projects" className="py-16 border-b border-border space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>01 — Projects</motion.p>
            <div className="flex items-end justify-between">
              <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Selected Work</motion.h2>
              <span className="label-mono text-muted/40 text-[10px]">{PROJECTS.length} projects</span>
            </div>
          </div>

          <div className="border border-border divide-y divide-border">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(i * 0.06)}
                className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 hover:bg-card-hover transition-colors duration-200 group"
              >
                <span className="font-semibold text-foreground w-44 shrink-0">{p.title}</span>
                <span className="text-muted text-sm leading-relaxed flex-1">{p.systemDesc}</span>
                <div className="flex items-center gap-3 shrink-0">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="text-muted/40 hover:text-foreground transition-colors text-sm opacity-0 group-hover:opacity-100">
                      ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 02 Skills ── */}
        <section id="sys-skills" className="py-16 border-b border-border space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>02 — Skills</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Technical Proficiency</motion.h2>
          </div>

          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkillCategory title="Languages" items={SKILLS.languages} color="var(--color-accent)" />
            <SkillCategory title="Backend & Infrastructure" items={SKILLS.backend} color="var(--color-accent-light)" />
            <SkillCategory title="AI / ML Engineering" items={SKILLS.ai} color="var(--color-accent-light)" />
            <SkillCategory title="Full Stack" items={SKILLS.fullstack} color="#4B8A6B" />
          </motion.div>

          {/* Currently learning */}
          <motion.div {...fadeUp(0.15)} className="border border-border p-4 flex flex-wrap items-center gap-3">
            <p className="label-mono text-muted/60 shrink-0">Currently Learning</p>
            {SKILLS.learning.map(item => (
              <span key={item} className="tech-pill">{item}</span>
            ))}
          </motion.div>
        </section>

        {/* ── 03 Experience ── */}
        <section id="sys-experience" className="py-16 border-b border-border space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>03 — Experience</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Work History</motion.h2>
          </div>

          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={exp.id} {...fadeUp(i * 0.08)}
                className="border border-border p-6 space-y-3 hover:border-accent/20 transition-colors duration-300">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    {exp.company && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-muted-light text-sm">{exp.company}</span>
                        {exp.type && (
                          <span className="label-mono text-[8px] px-2 py-0.5 border"
                            style={{ color: 'var(--color-accent-light)', borderColor: 'var(--color-accent-light)' }}>
                            {exp.type}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {exp.note && (
                  <p className="text-muted text-sm leading-relaxed flex items-start gap-2">
                    <span className="shrink-0 mt-1" style={{ color: 'var(--color-accent)' }}>—</span>
                    {exp.note}
                  </p>
                )}
                {exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.tags.map(t => <span key={t} className="tech-pill">{t}</span>)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 04 Education ── */}
        <section id="sys-education" className="py-16 border-b border-border space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>04 — Education</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Academic Background</motion.h2>
          </div>

          <motion.div {...fadeUp(0.1)} className="border-l-2 pl-6 space-y-3"
            style={{ borderColor: 'var(--color-accent-light)' }}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">{EDUCATION.institution}</h3>
                <p className="text-muted">{EDUCATION.degree}</p>
                <p className="text-muted/60 text-sm">{EDUCATION.field}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="label-mono text-muted/60">{EDUCATION.period}</p>
                <p className="label-mono text-muted/40 text-[9px]">{EDUCATION.dept}</p>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              {EDUCATION.bullets.map((b, i) => (
                <p key={i} className="text-muted text-sm flex items-start gap-2">
                  <span className="shrink-0 mt-1" style={{ color: 'var(--color-accent-light)' }}>—</span>
                  {b}
                </p>
              ))}
            </div>
            {/* SGPA grid */}
            {EDUCATION.sgpa && (
              <div className="flex gap-6 pt-3 border-t border-border">
                {EDUCATION.sgpa.map(s => (
                  <div key={s.term} className="space-y-1">
                    <p className="label-mono text-muted/40 text-[9px]">{s.term}</p>
                    <p className="font-bold text-foreground">{s.score}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Highlights */}
          <div className="space-y-3">
            <p className="label-mono text-muted/40">Highlights</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {EDUCATION.highlights.map(h => (
                <motion.div key={h.label} {...fadeUp(0.1)}
                  className="border border-border p-4 space-y-1 hover:border-accent/20 transition-colors">
                  <p className="label-mono text-[9px]" style={{ color: 'var(--color-accent)' }}>{h.label}</p>
                  <p className="text-foreground text-sm font-medium">{h.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 Resume ── */}
        <section id="sys-resume" className="py-16 border-b border-border space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>05 — Resume</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Curriculum Vitae</motion.h2>
          </div>

          <motion.div {...fadeUp(0.1)} className="border border-border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-card">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Download Full Resume</h3>
              <p className="text-muted text-sm">Comprehensive PDF detailing full work history, technical stack, and education.</p>
            </div>
            <a 
              href="/Narayan_resume.pdf" 
              download="Narayan_Singh_Resume.pdf"
              className="px-6 py-3 border border-accent/50 text-accent hover:bg-accent hover:text-background transition-all duration-300 font-mono text-sm tracking-wider whitespace-nowrap"
            >
              DOWNLOAD PDF
            </a>
          </motion.div>
        </section>

        {/* ── 06 Contact ── */}
        <section id="sys-contact" className="py-16 space-y-8">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-2" style={{ color: 'var(--color-accent)' }}>06 — Contact</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl font-bold text-foreground">Get In Touch</motion.h2>
          </div>

          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
              { label: 'GitHub', value: 'github.com/Narayan1006', href: PERSONAL.github },
              { label: 'LinkedIn', value: 'linkedin.com/in/singhnarayan', href: PERSONAL.linkedin },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="border border-border p-5 space-y-2 hover:border-accent/30 transition-colors duration-300 block group">
                <p className="label-mono text-muted/50">{c.label}</p>
                <p className="text-foreground text-sm group-hover:text-accent-light transition-colors">{c.value} ↗</p>
              </a>
            ))}
          </motion.div>

          <div className="border-t border-border pt-8 flex items-center justify-between">
            <p className="label-mono text-muted/30 text-[8px]">© 2025 Narayan Singh</p>
            <p className="label-mono text-muted/30 text-[8px]">System Mode — Recruiter View</p>
          </div>
        </section>
      </div>
    </div>
  )
}
