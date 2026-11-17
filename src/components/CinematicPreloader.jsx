import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CinematicPreloader({ progress = 0, onComplete }) {
  const [displayCount, setDisplayCount] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'ready' | 'revealed'
  const countRef = useRef(0)

  // Smooth number interpolation up to current progress
  useEffect(() => {
    let animId
    const target = Math.max(0, Math.min(100, Math.round(progress)))

    const step = () => {
      if (countRef.current < target) {
        // Smoothly accelerate toward target
        const diff = target - countRef.current
        const increment = Math.max(1, Math.ceil(diff * 0.12))
        countRef.current = Math.min(target, countRef.current + increment)
        setDisplayCount(countRef.current)
        animId = requestAnimationFrame(step)
      } else if (target === 100 && phase === 'loading') {
        setPhase('ready')
      }
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [progress, phase])

  // When ready (100%), hold for 400ms then trigger the cinematic reveal
  useEffect(() => {
    if (phase === 'ready') {
      const timer = setTimeout(() => {
        setPhase('revealed')
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 750)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  // Click anywhere to immediately skip intro
  const handleInstantSkip = () => {
    setPhase('revealed')
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 400)
  }

  // Telemetry status message based on percentage
  const getStatusMessage = () => {
    if (displayCount < 30) return '01/03 · COMPILING 3D VERTICES & SHADERS'
    if (displayCount < 75) return '02/03 · INITIALIZING SYSTEM ARCHITECTURES'
    if (displayCount < 100) return '03/03 · CALIBRATING CAMERA & LIGHTING'
    return '✦ INITIALIZATION COMPLETE · ENTERING SPACE'
  }

  if (phase === 'revealed') {
    return (
      <div
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* TOP CURTAIN SHUTTER */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#0C0D10] border-b border-[#2A2E37]"
        />

        {/* BOTTOM CURTAIN SHUTTER */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0C0D10] border-t border-[#2A2E37]"
        />

        {/* CENTRAL EMERALD LIGHT SLIT */}
        <motion.div
          initial={{ opacity: 1, scaleY: 1 }}
          animate={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#6B9A55] -translate-y-1/2 shadow-[0_0_20px_#6B9A55]"
        />
      </div>
    )
  }

  return (
    <div
      onClick={handleInstantSkip}
      className="fixed inset-0 z-50 bg-[#0C0D10] text-[#F0EDE8] flex flex-col justify-between p-8 sm:p-14 select-none cursor-pointer overflow-hidden font-['Inter']"
    >
      {/* BACKGROUND SUBTLE RADIAL GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A7A3A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP STATUS STRIP */}
      <div className="relative z-10 flex items-center justify-between text-xs label-mono text-[#8E929B]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#6B9A55] animate-pulse" />
          <span className="text-[#F0EDE8] font-bold tracking-[0.25em]">NARAYAN SINGH</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[10px]">
          <span>SYSTEM INITIALIZATION</span>
          <span>// 2026</span>
        </div>
      </div>

      {/* CENTERPIECE: MASSIVE TACHOMETER COUNTER */}
      <div className="relative z-10 my-auto text-center space-y-4">
        
        {/* BIG NUMERIC PERCENTAGE */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline justify-center font-['Space_Grotesk'] font-black italic tracking-tighter"
          >
            <span className="text-8xl sm:text-9xl lg:text-[14rem] leading-none text-[#F0EDE8] tabular-nums">
              {String(displayCount).padStart(2, '0')}
            </span>
            <span className="text-3xl sm:text-5xl lg:text-7xl text-[#6B9A55] font-light ml-2">
              %
            </span>
          </motion.div>
        </div>

        {/* PROGRESS LINE */}
        <div className="w-48 sm:w-64 h-[2px] bg-[#1F2228] mx-auto relative overflow-hidden rounded-full">
          <div
            className="h-full bg-[#6B9A55] transition-all duration-150 ease-out shadow-[0_0_8px_#6B9A55]"
            style={{ width: `${displayCount}%` }}
          />
        </div>

        {/* TELEMETRY MESSAGE */}
        <p className="label-mono text-[10px] sm:text-xs text-[#8E929B] tracking-[0.25em] font-medium pt-2">
          {getStatusMessage()}
        </p>

      </div>

      {/* BOTTOM SKIP HINT */}
      <div className="relative z-10 flex items-center justify-between text-[10px] label-mono text-[#5A5448]">
        <span>CREATIVE ENGINEERING // WEBGL PBR</span>
        <span className="hover:text-[#F0EDE8] transition-colors">
          [ CLICK ANYWHERE TO ENTER SPACE ↵ ]
        </span>
      </div>

    </div>
  )
}

