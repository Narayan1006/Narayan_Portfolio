import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { stagger, fadeUp, viewport } from '../lib/variants'

/**
 * Hero — full-viewport opening section.
 * Features:
 *   - Giant ghost "PROBABLY" word with scroll-driven opacity (max 8%)
 *   - Editorial 12-col grid layout
 *   - Animated scan-line scroll indicator
 *   - Live system clock (atmospheric detail)
 */
export default function Hero() {
  const [time, setTime] = useState('')

  const { scrollY } = useScroll()
  const probablyOpacity = useTransform(scrollY, [0, 300], [0.015, 0.07])
  const probablyY = useTransform(scrollY, [0, 600], [0, -80])

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 pt-24 pb-16"
    >
      {/* Ghost word — scroll-driven, discovered not forced */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ opacity: probablyOpacity, y: probablyY }}
      >
        <span
          className="text-[22vw] font-light uppercase tracking-[0.2em] text-foreground leading-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          PROBABLY
        </span>
      </motion.div>

      {/* Status bar — top */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-14 md:h-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted/60 font-light">
          NARAYAN SINGH — PORTFOLIO
        </span>
        <span className="hidden md:block text-[10px] font-mono tracking-widest text-muted/40">
          {time}
        </span>
      </div>

      {/* Main content grid */}
      <motion.div
        className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Name block — takes 8 cols */}
        <div className="md:col-span-8 space-y-6">
          <motion.p
            variants={fadeUp}
            className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-accent font-light"
          >
            JUST ANOTHER COMPUTER SCIENCE STUDENT.
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-light tracking-tighter leading-[0.88] text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Narayan<br />Singh
          </motion.h1>
        </div>

        {/* Tagline block — takes 4 cols */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-4 md:border-l border-border md:pl-8 space-y-4 pb-2"
        >
          <p className="text-lg md:text-xl font-light leading-relaxed text-muted">
            Building intelligent systems,<br />one layer at a time.
          </p>
          <div className="w-10 h-px bg-accent/50" />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3 z-10">
        <span className="text-[9px] uppercase tracking-[0.35em] text-muted/40">
          Continue
        </span>
        <div className="w-14 h-px bg-foreground/10 relative overflow-hidden">
          <div className="absolute inset-y-0 w-6 bg-accent animate-slide-indicator" />
        </div>
      </div>
    </section>
  )
}
