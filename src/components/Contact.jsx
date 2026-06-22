import { motion } from 'framer-motion'
import { stagger, fadeUp, viewport } from '../lib/variants'
import { CONTACT } from '../lib/data'

/**
 * Contact — an open door, not a CTA.
 * Quiet. Sparse. Inviting.
 */
export default function Contact() {
  return (
    <section
      aria-label="Contact"
      className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 border-t border-border"
    >
      <motion.div
        className="max-w-3xl mx-auto w-full text-center space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.span
          variants={fadeUp}
          className="text-[9px] uppercase tracking-[0.35em] text-accent font-light block"
        >
          GET IN TOUCH
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-light text-foreground leading-snug"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          If our paths align,<br />the door is open.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="w-20 h-px bg-border mx-auto"
          aria-hidden="true"
        />

        {/* Email */}
        <motion.div variants={fadeUp}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-lg md:text-xl font-light text-muted hover:text-foreground transition-colors duration-300 tracking-wide border-b border-transparent hover:border-foreground pb-0.5"
          >
            {CONTACT.email}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center gap-10"
        >
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-muted/60 hover:text-foreground transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-muted/60 hover:text-foreground transition-colors duration-300"
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
