import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicCanvas from './CinematicCanvas'

export default function GatewayScreen({ onNavigate }) {
  const [hoverState, setHoverState] = useState(null)
  // Use a ref for mouse position to avoid re-renders on every mouse move
  const mousePosRef = useRef({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [destination, setDestination] = useState('')

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
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
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        <Suspense fallback={null}>
          <CinematicCanvas
            onModelLoaded={handleModelLoaded}
          />
        </Suspense>
      </div>

      {/* MOBILE FALLBACK IMAGE — shown only on < md */}
      <div className="md:hidden absolute inset-0 z-10 pointer-events-none flex items-end justify-center">
        <img
          src="/model_fallback.png"
          alt="Narayan Singh"
          className="h-[75vh] w-auto object-contain object-bottom select-none"
          draggable="false"
        />
      </div>

      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#EBE7DF] flex flex-col justify-center items-center px-6 pointer-events-none"
          >
            <div className="space-y-4 text-center max-w-xs">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4A7A3A] animate-pulse" />
                <span className="label-mono text-[#4A7A3A] tracking-[0.3em] text-[10px]">
                  NARAYAN SINGH
                </span>
              </div>
              <div className="w-36 h-[2px] bg-[#D4CFC4] mx-auto relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#4A7A3A]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
              <p className="label-mono text-[#7A7468] text-[9px] tracking-[0.25em] hidden md:block">
                LOADING 3D ASSETS...
              </p>
              <p className="label-mono text-[#7A7468] text-[9px] tracking-[0.25em] md:hidden">
                WELCOME
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <header className="relative z-30 flex items-center justify-between px-8 sm:px-14 py-7 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#4A7A3A]" />
          <span className="label-mono text-xs tracking-[0.25em] font-bold text-[#1A1612]">
            NARAYAN SINGH
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A]" />
            <span className="label-mono text-[10px] text-[#5A5448] tracking-widest">ONLINE</span>
          </div>
          <span className="label-mono text-[10px] text-[#7A7468] tracking-widest">
            01 / ENTRY
          </span>
        </div>
      </header>

      {/* MAIN CONTENT & CARDS */}
      <div className="relative z-20 flex-1 w-full flex flex-col justify-between px-8 sm:px-14 pt-12 pb-6 pointer-events-none">
        
        {/* LEFT TYPOGRAPHY */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tight leading-none text-[#1A1612] font-['Space_Grotesk'] whitespace-nowrap">
              HEY, THERE
            </h1>
            <span className="text-4xl sm:text-5xl lg:text-6xl animate-bounce">👋</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="label-mono text-sm sm:text-base tracking-[0.3em] text-[#5A5448]"
          >
            I'M <span className="text-[#4A7A3A] font-bold">NARAYAN SINGH</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="label-mono text-[11px] sm:text-xs text-[#7A7468] tracking-[0.3em]"
          >
            WELCOME TO MY DIGITAL SPACE
          </motion.p>

          <div className="w-16 h-[2px] bg-[#4A7A3A]/40 pt-1" />
        </div>

        {/* CARDS CONTAINER */}
        <div className="w-full flex flex-col items-start pointer-events-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
            
            {/* CARD 1: VIEW */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onMouseEnter={() => setHoverState('view')}
              onMouseLeave={() => setHoverState(null)}
              onClick={() => handleNavigateClick('explore')}
              className="group text-left cursor-pointer p-5 bg-[#FFFFFF]/70 backdrop-blur-md border border-[#D4CFC4] hover:border-[#4A7A3A] shadow-sm hover:shadow-md transition-all duration-300 rounded-xl w-full"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A7A3A] mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk'] mb-1">
                VIEW
              </h3>
              <p className="text-xs text-[#5A5448] group-hover:text-[#1A1612] transition-colors mb-4">
                Explore my work
              </p>

              <div className="text-[#4A7A3A] group-hover:translate-x-2 transition-transform duration-300 text-lg">
                →
              </div>
            </motion.button>

            {/* CARD 2: RECRUIT */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              onMouseEnter={() => setHoverState('recruit')}
              onMouseLeave={() => setHoverState(null)}
              onClick={() => handleNavigateClick('recruiter')}
              className="group text-left cursor-pointer p-5 bg-[#FFFFFF]/70 backdrop-blur-md border border-[#D4CFC4] hover:border-[#2B2418] shadow-sm hover:shadow-md transition-all duration-300 rounded-xl w-full"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2B2418] mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk'] mb-1">
                RECRUIT
              </h3>
              <p className="text-xs text-[#5A5448] group-hover:text-[#1A1612] transition-colors mb-4">
                For recruiters
              </p>

              <div className="text-[#2B2418] group-hover:translate-x-2 transition-transform duration-300 text-lg">
                →
              </div>
            </motion.button>

          </div>

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
