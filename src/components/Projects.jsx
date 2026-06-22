import { motion } from 'framer-motion'
import { stagger, fadeUp, viewport } from '../lib/variants'
import { PROJECTS } from '../lib/data'

/**
 * Single project entry — editorial milestone layout.
 * No cards, no borders on content. Index number is the only decoration.
 */
function ProjectEntry({ project }) {
  return (
    <motion.article
      aria-label={project.title}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start group"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      {/* Index + subtitle — 3 cols */}
      <div className="md:col-span-3 space-y-2 pt-1">
        <motion.span
          variants={fadeUp}
          className="block text-5xl md:text-6xl font-extralight text-muted/15 font-mono select-none leading-none"
        >
          {project.index}
        </motion.span>
        <motion.span
          variants={fadeUp}
          className="block text-[9px] uppercase tracking-widest text-accent font-light mt-3"
        >
          {project.subtitle}
        </motion.span>
      </div>

      {/* Title + description — 6 cols */}
      <div className="md:col-span-6 space-y-5">
        <motion.h3
          variants={fadeUp}
          className="text-3xl md:text-5xl font-light text-foreground group-hover:text-foreground/90 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-light text-muted leading-relaxed"
        >
          {project.description}
        </motion.p>
      </div>

      {/* Links — 3 cols */}
      <motion.div
        variants={fadeUp}
        className="md:col-span-3 md:text-right flex md:flex-col gap-5 pt-2"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground pb-0.5"
          >
            Source Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-accent hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground pb-0.5"
          >
            Live Demo
          </a>
        )}
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section
      aria-label="Projects"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 border-t border-border"
    >
      <div className="max-w-5xl mx-auto w-full space-y-28">

        {/* Section header */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="text-[9px] uppercase tracking-[0.35em] text-accent font-light block"
          >
            SELECTED WORKS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Milestones
          </motion.h2>
        </motion.div>

        {/* Project list */}
        <div className="divide-y divide-border">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className={i === 0 ? 'pb-20' : 'py-20'}>
              <ProjectEntry project={project} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
