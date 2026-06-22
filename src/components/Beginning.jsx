import { motion } from 'framer-motion'
import { stagger, fadeUp, fadeIn, viewport } from '../lib/variants'

/**
 * Beginning — narrative opening.
 * A personal journal page, not a timeline.
 * Large ghost year anchors the section; prose floats freely.
 */
export default function Beginning() {
  return (
    <section
      aria-label="The Beginning"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 border-t border-border"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

        {/* Left — Year anchor (sticky on desktop) */}
        <div className="md:col-span-4 md:sticky md:top-32 space-y-4">
          <motion.span
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={viewport}
            className="text-[9px] uppercase tracking-[0.35em] text-accent font-light block"
          >
            THE STARTING POINT
          </motion.span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={viewport}
            aria-hidden="true"
          >
            <h2
              className="text-[9rem] md:text-[11rem] font-light leading-none tracking-tighter text-foreground/[0.07] select-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              2024
            </h2>
          </motion.div>
        </div>

        {/* Right — Narrative prose */}
        <motion.div
          className="md:col-span-8 pt-4 md:pt-16 space-y-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-2xl md:text-3xl font-light italic text-foreground leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            "Picked up Java."
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light text-muted leading-relaxed"
          >
            Built small programs. Broke them.<br />
            Rebuilt them from the scattered pieces.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light text-muted leading-relaxed"
          >
            Somewhere along the way, coding stopped feeling like a subject to
            memorize and started feeling like a{' '}
            <span className="text-foreground italic">craft</span> to shape.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-2xl md:text-3xl font-light italic text-foreground leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The first line turned into many.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
