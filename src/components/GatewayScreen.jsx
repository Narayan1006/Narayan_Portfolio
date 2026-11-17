import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import CinematicCanvas from './CinematicCanvas'
import ViewCounter from './ViewCounter'
import CinematicPreloader from './CinematicPreloader'

export default function GatewayScreen({ onNavigate }) {
  const [hoverState, setHoverState] = useState(null)
  // Use a ref for mouse position to avoid re-renders on every mouse move
  const mousePosRef = useRef({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [destination, setDestination] = useState('')
  const { progress } = useProgress()
  const [effectiveProgress, setEffectiveProgress] = useState(10)

  useEffect(() => {
    if (progress > effectiveProgress) {
      setEffectiveProgress(progress)
    }
  }, [progress, effectiveProgress])

  useEffect(() => {
    // Graceful ticker so preloader has a satisfying 1-2s intro even on hot cache
    const interval = setInterval(() => {
      setEffectiveProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(100, prev + Math.floor(Math.random() * 18 + 12))
      })
    }, 180)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleModelLoaded = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Keyboard navigation shortcuts: 1 / E for Explore, 2 / R for Recruiter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      if (e.key === '1' || e.key === 'e' || e.key === 'E') {
        handleNavigateClick('explore')
      } else if (e.key === '2' || e.key === 'r' || e.key === 'R') {
        handleNavigateClick('recruiter')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavigateClick = (view) => {
    setIsTransitioning(true)
    setDestination(view)
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(view)
      }
    }, 700)
  }

  return (
    <main className="relative w-full h-screen bg-[#EBE7DF] text-[#1A1612] overflow-hidden select-none font-['Inter'] flex flex-col justify-between">
      
      {/* OFF-WHITE BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#F5F2EA_0%,#EBE7DF_60%,#DDD8CD_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/6 right-1/4 w-[600px] h-[600px] bg-[#FFFFFF]/40 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 3D CANVAS — desktop only */}
      <div className="hidden md:block absolute inset-0 z-10">
        <Suspense fallback={null}>
          <CinematicCanvas
            onModelLoaded={handleModelLoaded}
          />
        </Suspense>
      </div>

      {/* MOBILE FALLBACK IMAGE — shown only on < md with artistic scrim */}
      <div className="md:hidden absolute inset-0 z-10 pointer-events-none flex items-end justify-center overflow-hidden">
        <img
          src="/model_fallback.png"
          alt="Narayan Singh"
          className="h-[65vh] w-auto object-contain object-bottom select-none opacity-30 mix-blend-multiply"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#EBE7DF] via-[#EBE7DF]/80 to-transparent" />
      </div>

      {/* CINEMATIC PRELOADER */}
      {isLoading && (
        <CinematicPreloader
          progress={effectiveProgress}
          onComplete={handleModelLoaded}
        />
      )}

      {/* PAGE TRANSITION */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#EBE7DF] flex flex-col justify-center items-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-3"
            >
              <p className="label-mono text-[#4A7A3A] tracking-[0.3em] text-xs uppercase">
                ENTERING {destination}
              </p>
              <div className="w-8 h-8 border-2 border-[#4A7A3A] border-t-transparent rounded-full animate-spin mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-14 py-6 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#4A7A3A]" />
          <span className="label-mono text-xs tracking-[0.25em] font-bold text-[#1A1612]">
            NARAYAN SINGH
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <ViewCounter />
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/75 border border-[#D4CFC4] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A] animate-pulse" />
            <span className="label-mono text-[10px] text-[#4A7A3A] tracking-wider font-bold">AVAILABLE</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT & ENTRY PATHS */}
      <div className="relative z-20 flex-1 w-full flex flex-col justify-center px-6 sm:px-14 pb-12 pointer-events-none">
        
        <div className="max-w-xl space-y-6">
          
          {/* EDITORIAL ROLE LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="w-6 h-[1.5px] bg-[#4A7A3A]" />
            <span className="label-mono text-xs text-[#4A7A3A] font-bold tracking-[0.3em]">
              SOFTWARE ENGINEER · AI / ML
            </span>
          </motion.div>

          {/* MAIN STATEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="space-y-3"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tight leading-[0.92] text-[#1A1612] font-['Space_Grotesk']">
              BUILDING<br />INTELLIGENT<br />SYSTEMS.
            </h1>
            <p className="text-sm sm:text-base text-[#5A5448] leading-relaxed max-w-md pt-2">
              Turning complex data, machine learning pipelines, and backend architectures into production software.
            </p>
          </motion.div>

          {/* TWO MINIMALIST, HIGH-END ACTION TILES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 pointer-events-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              
              {/* BUTTON 1: 3D STORY */}
              <button
                type="button"
                onClick={() => handleNavigateClick('explore')}
                className="group p-5 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#D4CFC4] hover:border-[#4A7A3A] rounded-2xl text-left transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between h-28 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[9px] text-[#4A7A3A] font-bold tracking-widest">
                    01 / STORY MODE
                  </span>
                  <span className="text-sm text-[#4A7A3A] group-hover:translate-x-1 transition-transform font-bold">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1612] font-['Space_Grotesk'] tracking-wide">
                    EXPLORE 3D
                  </h3>
                  <p className="text-[11px] text-[#7A7468] group-hover:text-[#4A453B] transition-colors mt-0.5">
                    Interactive engineering journey
                  </p>
                </div>
              </button>

              {/* BUTTON 2: RECRUITER */}
              <button
                type="button"
                onClick={() => handleNavigateClick('recruiter')}
                className="group p-5 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#D4CFC4] hover:border-[#1A1612] rounded-2xl text-left transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between h-28 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[9px] text-[#1A1612] font-bold tracking-widest">
                    02 / RECRUITER
                  </span>
                  <span className="text-sm text-[#1A1612] group-hover:translate-x-1 transition-transform font-bold">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1612] font-['Space_Grotesk'] tracking-wide">
                    VIEW RESUME
                  </h3>
                  <p className="text-[11px] text-[#7A7468] group-hover:text-[#4A453B] transition-colors mt-0.5">
                    Verified stack, DSA & metrics
                  </p>
                </div>
              </button>

            </div>

            {/* KEYBOARD SHORTCUTS HINT */}
            <div className="pt-3 hidden sm:flex items-center gap-2 label-mono text-[9px] text-[#7A7468]">
              <span>SHORTCUTS:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#E5E0D5] text-[#1A1612] font-bold border border-[#D0C9BA]">1</kbd>
              <span>STORY</span>
              <span>·</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#E5E0D5] text-[#1A1612] font-bold border border-[#D0C9BA]">2</kbd>
              <span>RESUME</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* BOTTOM FOOTER BAR MATCHING REFERENCE IMAGE EXACTLY */}
      <footer className="relative z-30 w-full bg-[#E5E0D5]/90 backdrop-blur-md border-t border-[#D0C9BA] px-8 sm:px-14 py-4 flex items-center justify-between pointer-events-auto">
        {/* Left Social Icons: GitHub, LinkedIn, Email */}
        <div className="flex items-center gap-5 text-[#3D372E]">
          {/* GitHub */}
          <a
            href="https://github.com/Narayan1006"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4A7A3A] transition-colors"
            title="GitHub"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/singhnarayan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4A7A3A] transition-colors"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <span className="text-[#A6A092] text-xs">|</span>

          {/* Email */}
          <a
            href="mailto:singhnarayan0866@gmail.com"
            className="hover:text-[#4A7A3A] transition-colors"
            title="Email"
          >
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Right Label: BUILDING INTELLIGENT SOLUTIONS ● */}
        <div className="flex items-center gap-2">
          <span className="label-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#5A5448]">
            BUILDING INTELLIGENT SOLUTIONS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A]" />
        </div>
      </footer>

    </main>
  )
}
