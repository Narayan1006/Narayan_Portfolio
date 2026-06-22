import { motion } from 'framer-motion'
import { stagger, fadeUp, viewport } from '../lib/variants'

/**
 * Experience — Java Developer Intern.
 * Brief, honest, reflective. Not a resume entry.
 */
export default function Experience() {
  return (
    <section
      aria-label="Experience"
      className="relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 border-t border-border"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Label column */}
          <motion.div
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <span className="text-[9px] uppercase tracking-[0.35em] text-accent font-light block mb-3">
              EXPERIENCE
            </span>
            <p className="text-[10px] uppercase tracking-widest text-muted/40">
              2024 — 2025
            </p>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="md:col-span-8 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-light text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Java Developer Intern
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl font-light text-muted leading-relaxed"
            >
              Not a destination. Not a line item to flex. Another checkpoint on
              a longer path — building backend systems, learning from experienced
              minds, and moving forward.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base font-light text-muted/60 leading-relaxed"
            >
              The real product of that time wasn't the code shipped.<br />
              It was learning how professional systems actually breathe.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
