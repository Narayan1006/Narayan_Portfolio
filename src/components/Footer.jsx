import { motion } from 'framer-motion'
import { fadeIn, viewport } from '../lib/variants'

/**
 * Footer — closing statement with massive silence.
 * "Far from finished. Still going."
 * This is the emotional peak. No extra text.
 */
export default function Footer() {
  return (
    <footer
      aria-label="Closing statement"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 border-t border-border"
    >
      <motion.div
        className="text-center space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeIn}
        transition={{ duration: 2.5 }}
      >
        <h2
          className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-light text-foreground tracking-tighter leading-[0.9]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Far from<br />finished.
        </h2>

        <p className="text-2xl md:text-3xl font-light italic text-accent tracking-widest">
          Still going.
        </p>
      </motion.div>

      {/* Copyright */}
      <p className="absolute bottom-8 text-[9px] uppercase tracking-widest text-muted/30 text-center">
        Narayan Singh — {new Date().getFullYear()}
      </p>
    </footer>
  )
}
