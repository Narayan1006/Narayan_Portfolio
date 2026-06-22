import { motion } from 'framer-motion'
import { stagger, fadeUp, slideLeft, slideRight, viewport } from '../lib/variants'
import { FOUNDATIONS, FRONTIERS } from '../lib/data'

/**
 * Foundations & Frontiers — technology vocabulary.
 * Clean two-column layout; no icons, no lists, no cards.
 * Just type — large, spaced, readable.
 */
function TechColumn({ title, subtitle, items, variants }) {
  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
    >
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <h3
          className="text-3xl md:text-4xl font-light text-foreground"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        <p className="text-[10px] uppercase tracking-widest text-muted/60">
          {subtitle}
        </p>
      </div>

      {/* Tech words */}
      <div className="flex flex-wrap gap-x-8 gap-y-5">
        {items.map((tech) => (
          <span
            key={tech}
            className="text-lg md:text-xl font-light text-muted hover:text-foreground transition-colors duration-300 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Foundations() {
  return (
    <section
      aria-label="Foundations and Frontiers"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 border-t border-border"
    >
      <div className="max-w-5xl mx-auto w-full space-y-24">

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
            THE TOOLKIT
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Foundations &amp; Frontiers
          </motion.h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <TechColumn
            title="Foundations"
            subtitle="Core architectural blocks"
            items={FOUNDATIONS}
            variants={slideLeft}
          />
          <TechColumn
            title="Frontiers"
            subtitle="Active exploration & systems"
            items={FRONTIERS}
            variants={slideRight}
          />
        </div>

      </div>
    </section>
  )
}
