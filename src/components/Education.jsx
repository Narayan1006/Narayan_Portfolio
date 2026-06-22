import { motion } from 'framer-motion'
import { stagger, fadeUp, slideLeft, slideRight, viewport } from '../lib/variants'
import { SEMESTERS } from '../lib/data'

/**
 * Education — The Classroom.
 * Two-column layout: institution info left, GPA ledger table right.
 * Ledger table gives academic precision without being a resume.
 */
export default function Education() {
  return (
    <section
      aria-label="Education"
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
            ACADEMICS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Classroom
          </motion.h2>
        </motion.div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Left — institution */}
          <motion.div
            className="md:col-span-5 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideLeft}
          >
            <h3
              className="text-2xl md:text-3xl font-light text-foreground leading-snug"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ABES Engineering College
            </h3>
            <div className="space-y-1 text-lg font-light text-muted">
              <p>Bachelor of Technology</p>
              <p>Computer Science Engineering</p>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted/50">
              2024 — Present
            </p>
          </motion.div>

          {/* Right — GPA ledger */}
          <motion.div
            className="md:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideRight}
          >
            <table className="w-full border-collapse" aria-label="Semester scores">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="pb-4 text-left text-[10px] uppercase tracking-widest font-light text-muted/60">
                    Term
                  </th>
                  <th className="pb-4 text-right text-[10px] uppercase tracking-widest font-light text-muted/60">
                    Academic Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {SEMESTERS.map(({ term, score }) => (
                  <tr key={term}>
                    <td className="py-5 text-lg font-light text-foreground/80">
                      {term}
                    </td>
                    <td className="py-5 text-right font-mono text-xl text-accent tracking-widest">
                      {score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Closing note */}
            <p className="mt-10 text-sm font-light italic text-muted/60 text-center leading-relaxed">
              Some semesters went better than others.<br />
              The learning never stopped.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
