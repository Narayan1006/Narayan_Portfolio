import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { PERSONAL, PROJECTS, SKILL_ZONES, EXPERIENCE, EDUCATION } from '../lib/data'
import DecodeTerminal from './DecodeTerminal'

const CHAPTERS = [
  { id: 'c1', num: 'I', name: 'THE WALLS' },
  { id: 'c2', num: 'II', name: 'THE BREACH' },
  { id: 'c3', num: 'III', name: 'THE VOYAGE' },
  { id: 'c4', num: 'IV', name: 'THE HORIZON' },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }
}

// Fixed narrative spine on the left matching the exact reference
function NarrativeSpine() {
  const { scrollYProgress } = useScroll()

  // Smooth progress to make the organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Color interpolations: Iron -> Ember -> Bronze -> Gold
  const color = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    ['#3D4A47', '#B8452F', '#A27A48', '#D9A45C']
  )
  
  // The height of the filled line
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // Current active chapter based on scroll (roughly)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange(v => {
      if (v < 0.25) setActiveIndex(0)
      else if (v < 0.5) setActiveIndex(1)
      else if (v < 0.85) setActiveIndex(2)
      else setActiveIndex(3)
    })
  }, [scrollYProgress])

  return (
    <div className="fixed left-[24px] top-0 bottom-0 z-50 pointer-events-none flex flex-col justify-center w-[12px]">
      
      {/* Background Line (Dark Iron) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#3D4A47]/30" />

      {/* Foreground Filled Line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] transition-colors duration-100"
        style={{
          height: lineHeight,
          background: color,
          boxShadow: '0 0 10px var(--color-accent)'
        }}
      />

      {/* Nodes */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-[15vh]">
        {[0, 1, 2, 3].map((i) => {
          const isActive = activeIndex >= i;
          return (
            <div key={i} className="relative flex items-center justify-center">
              <motion.div
                className="w-2 h-2 rounded-full z-10 transition-colors duration-500"
                style={{
                  background: isActive ? color : '#1A1A1A',
                  border: `1.5px solid ${isActive ? 'transparent' : '#3D4A47'}`,
                  boxShadow: isActive ? '0 0 8px var(--color-accent)' : 'none'
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Vertical Chapter Label */}
      <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4">
        <p 
          className="label-mono text-[10px] tracking-[0.3em] opacity-40 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          CHAPTER {['I', 'II', 'III', 'IV'][activeIndex]}
        </p>
      </div>
    </div>
  )
}


// Status badge
function StatusBadge({ type }) {
  const cls = type === 'deployed' ? 'badge-deployed' : type === 'production' ? 'badge-production' : 'badge-open'
  const text = type === 'deployed' ? 'Deployed' : type === 'production' ? 'Production' : 'Open Source'
  return <span className={cls}>{text}</span>
}

// Cinematic project layout (no dashboard cards)
function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(null)
  const toggle = (key) => setOpen(prev => prev === key ? null : key)

  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="flex flex-col gap-8 py-12 border-b border-border/30 last:border-0"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="label-mono mb-4" style={{ color: 'var(--color-accent)' }}>PROJECT {project.index}</p>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            {project.title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="text-xl md:text-2xl text-muted-light font-light italic leading-relaxed mb-6">
            {project.constraint}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => <span key={t} className="tech-pill bg-background/50">{t}</span>)}
          </div>
        </div>
        
        <div className="md:col-span-7 space-y-4">
          {[
            { key: 'reasoning', label: 'The Reasoning', content: project.reasoning },
            { key: 'breakthrough', label: 'The Breakthrough', content: project.breakthrough },
          ].map(({ key, label, content }) => (
            <div key={key} className="border-t border-border pt-4">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="label-mono text-muted group-hover:text-foreground transition-colors duration-300">
                  {label}
                </span>
                <span className="text-muted text-xl">{open === key ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {open === key && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="text-muted-light text-base leading-relaxed mt-4 overflow-hidden"
                  >
                    {content}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Interactive Floating Knowledge Map
function InteractiveKnowledgeMap() {
  const containerRef = useRef(null)
  
  return (
    <div ref={containerRef} className="relative w-full h-[60vh] border border-border/20 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a24] to-background">
      <p className="absolute top-4 left-4 label-mono text-muted/30">Drag nodes to explore</p>
      {SKILL_ZONES.map((zone, i) => {
        // Pseudo-random initial positions based on index
        const top = 15 + (i * 15) + (i % 2 === 0 ? 0 : 20) + '%'
        const left = 10 + (i * 20) + (i % 3 === 0 ? 10 : 0) + '%'
        
        return (
          <motion.div
            key={zone.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 10 }}
            className="absolute p-4 flex flex-col gap-2 cursor-grab bg-background/80 backdrop-blur-md border border-border shadow-2xl"
            style={{ top, left }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
              <p className="label-mono text-[9px] text-foreground">{zone.label}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-[200px]">
              {zone.items.map(item => (
                <span key={item} className="text-[10px] text-muted-light bg-card px-1.5 py-0.5 border border-border/50">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// Diamond icon for experience
function Diamond({ solid }) {
  return (
    <span
      className="inline-block w-3 h-3 rotate-45 shrink-0 mt-1"
      style={{
        background: solid ? 'var(--color-accent)' : 'transparent',
        border: solid ? 'none' : '1.5px solid var(--color-accent-light)',
      }}
    />
  )
}

/**
 * ScatterText — letters explode to random positions then snap back, on loop.
 */
function ScatterText({ text, className, style }) {
  const chars = useMemo(() => text.split(''), [text])

  // Stable random offsets seeded once per mount
  const offsets = useMemo(
    () =>
      chars.map(() => ({
        x: (Math.random() - 0.5) * 700,
        y: (Math.random() - 0.5) * 500,
        rotate: (Math.random() - 0.5) * 180,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // 'scattered' | 'assembled'
  const [phase, setPhase] = useState('scattered')

  useEffect(() => {
    let t1, t2
    const cycle = () => {
      // Wait assembled for 5 s, then scatter
      t1 = setTimeout(() => {
        setPhase('scattered')
        // After 0.9 s scattered, reassemble
        t2 = setTimeout(() => {
          setPhase('assembled')
          cycle()
        }, 900)
      }, 5000)
    }
    // Initial assemble on mount
    const init = setTimeout(() => {
      setPhase('assembled')
      cycle()
    }, 120)
    return () => {
      clearTimeout(init)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const isScattered = phase === 'scattered'

  return (
    <span className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          animate={
            isScattered
              ? { x: offsets[i].x, y: offsets[i].y, rotate: offsets[i].rotate, opacity: 0, scale: 0.4 }
              : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
          }
          transition={{
            duration: isScattered ? 0.55 : 0.85,
            delay: isScattered ? i * 0.018 : i * 0.038,
            ease: isScattered ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function StoryMode() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [activeChapter, setActiveChapter] = useState('c1')
  const refs = useRef({})

  useEffect(() => {
    const observers = CHAPTERS.map(ch => {
      const el = document.getElementById(ch.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(ch.id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="relative bg-background text-foreground">
      {/* Chapter nav */}
      <NarrativeSpine />

      {/* ── CHAPTER I — THE WALLS ── */}
      <section id="c1" className="relative min-h-screen flex flex-col justify-center items-center px-8 md:px-16">
        {/* Chapter label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <p className="label-mono text-muted/50">Chapter I</p>
        </div>

        {/* Giant name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 w-full max-w-7xl"
        >
          <h1
            className="whitespace-nowrap text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] font-bold uppercase leading-none tracking-tighter text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <ScatterText text={PERSONAL.name} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="label-mono tracking-[0.3em] text-[11px]"
            style={{ color: 'var(--color-accent)' }}
          >
            {PERSONAL.roles.join(' · ')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted text-lg md:text-xl font-light"
          >
            {PERSONAL.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <p className="label-mono text-muted/40">Scroll to break through</p>
          <span className="animate-bounce-y text-muted/40 text-xl">↓</span>
        </motion.div>

        {/* Bottom chapter label */}
        <div className="absolute bottom-6 left-8">
          <p className="label-mono text-muted/20 text-[8px]">{CHAPTERS[0].name}</p>
        </div>
      </section>

      {/* ── CHAPTER II — THE BREACH ── */}
      <section id="c2" className="min-h-screen px-8 md:px-16 lg:px-24 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-16">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-4" style={{ color: 'var(--color-accent)' }}>
              Chapter II
            </motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6">
              The Breach
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-muted max-w-xl leading-relaxed">
              Every project began as an impossible constraint. What follows is not a portfolio of solutions — it is a record of walls that were broken.
            </motion.p>
          </div>

          {/* Stacked project flow */}
          <div className="flex flex-col gap-0 mt-20">
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CHAPTER III — THE VOYAGE ── */}
      <section id="c3" className="min-h-screen px-8 md:px-16 lg:px-24 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-20">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-4" style={{ color: 'var(--color-accent)' }}>
              Chapter III
            </motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-foreground">
              The Voyage
            </motion.h2>
          </div>

          {/* Interactive floating map */}
          <motion.div {...fadeUp(0.1)} className="pt-8 pb-16">
            <InteractiveKnowledgeMap />
          </motion.div>

          {/* Education milestone */}
          <div className="space-y-8">
            <motion.p {...fadeUp(0)} className="label-mono tracking-widest" style={{ color: 'var(--color-muted)' }}>
              Milestones — Education Path
            </motion.p>
            <motion.div {...fadeUp(0.1)} className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: 'var(--color-accent-light)', boxShadow: '0 0 8px var(--color-accent-light)' }}
                />
                <div className="w-px flex-1 mt-2" style={{ background: 'var(--color-border-light)', minHeight: '60px' }} />
              </div>
              <div className="pb-8 space-y-1">
                <p className="label-mono" style={{ color: 'var(--color-accent-light)' }}>{EDUCATION.period}</p>
                <h3 className="text-2xl font-bold text-foreground">{EDUCATION.institution}</h3>
                <p className="text-muted">{EDUCATION.degree}</p>
                <p className="text-muted/80">{EDUCATION.specialization}</p>
                <p className="text-muted/50 italic text-sm mt-2">{EDUCATION.focus}</p>
                {EDUCATION.sgpa && (
                  <div className="flex gap-4 pt-4 mt-2 border-t border-border/50">
                    {EDUCATION.sgpa.map(s => (
                      <div key={s.term}>
                        <p className="label-mono text-muted/40 text-[9px] mb-1">{s.term}</p>
                        <p className="text-foreground text-sm font-bold">{s.score}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER IV — THE HORIZON ── */}
      <section id="c4" className="min-h-screen px-8 md:px-16 lg:px-24 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-16">
          <div>
            <motion.p {...fadeUp(0)} className="label-mono mb-4" style={{ color: 'var(--color-accent)' }}>
              Chapter IV
            </motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-foreground">
              The Horizon
            </motion.h2>
          </div>

          {/* Experience flow */}
          <div className="flex flex-col gap-0 mt-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                {...fadeUp(i * 0.08)}
                className="py-12 border-b border-border/30 last:border-0 group"
              >
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors duration-500">{exp.title}</h3>
                  {exp.company && (
                    <div className="flex items-center gap-3">
                      <span className="text-muted-light font-medium tracking-wide">{exp.company}</span>
                      {exp.type && (
                        <span className="label-mono text-[9px] px-2 py-0.5 bg-border/40 text-muted">
                          {exp.type}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-muted-light text-lg font-light leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-8 pt-8 border-t border-border">
            <motion.p {...fadeUp(0)} className="label-mono" style={{ color: 'var(--color-accent)' }}>
              The Next Journey
            </motion.p>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-2xl leading-tight">
              Every great expedition starts with a message.
            </motion.h2>
            <motion.p {...fadeUp(0.15)} className="text-muted max-w-md leading-relaxed">
              I am currently open to full-time roles and select freelance collaborations.
              If you are building something that matters, I want to hear about it.
            </motion.p>
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-8">
              {[
                { label: '→', text: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
                { label: '→', text: 'github.com/Narayan1006', href: PERSONAL.github },
                { label: '→', text: 'linkedin.com/in/singhnarayan', href: PERSONAL.linkedin },
              ].map(link => (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-muted hover:text-foreground transition-colors duration-300 text-[10px]"
                >
                  {link.label} {link.text}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Footer bar */}
          <div className="border-t border-border pt-8 flex items-center justify-between">
            <p className="label-mono text-muted/30 text-[8px]">© 2025 Narayan Singh</p>
            <p className="label-mono text-muted/30 text-[8px]">The Journey</p>
          </div>
          <div className="pt-24 pb-12 flex justify-center border-t border-border mt-24">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="label-mono text-accent hover:text-[#0b0b0e] hover:bg-accent transition-all duration-500 tracking-[0.3em] border border-accent/50 px-8 py-4 shadow-[0_0_20px_rgba(217,164,92,0.15)] hover:shadow-[0_0_40px_rgba(217,164,92,0.6)] bg-black/40 backdrop-blur-sm"
            >
              [ DECODE THE JOURNEY ]
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isTerminalOpen && <DecodeTerminal onClose={() => setIsTerminalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
