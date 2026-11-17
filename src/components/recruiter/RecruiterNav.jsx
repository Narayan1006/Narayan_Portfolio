import { useState, useEffect } from 'react'
import { PROFILE } from '../../data/recruiterData'

export default function RecruiterNav({ onNavigateBack }) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('profile')

  const navLinks = [
    { name: 'PROFILE', href: '#profile' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'DSA', href: '#dsa' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'CONTACT', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 30)

      // Calculate scroll progress (0 - 100)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)))
      }

      // Scroll-spy: find section currently in top third of viewport
      const sectionIds = navLinks.map((l) => l.href.slice(1))
      const triggerY = scrollY + 180

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= triggerY) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#EBE7DF]/90 backdrop-blur-md border-b border-[#D0C9BA] ${
        scrolled ? 'py-2.5 shadow-sm' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* LEFT: RETURN & NAME */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onNavigateBack}
            className="label-mono text-xs text-[#4A7A3A] hover:text-[#2B2418] transition-colors flex items-center gap-1.5 cursor-pointer font-bold px-2 py-1 rounded hover:bg-[#E5E0D5]"
          >
            ← ENTRY
          </button>
          <span className="hidden sm:inline text-[#B5AEA0]">|</span>
          <a
            href="#profile"
            className="label-mono text-xs font-bold tracking-[0.25em] text-[#1A1612] hover:text-[#4A7A3A] transition-colors flex items-center gap-2"
          >
            <span>{PROFILE.name}</span>
            <span className="hidden lg:inline text-[9px] px-2 py-0.5 rounded bg-[#E5E0D5] text-[#5A5448] font-normal">
              RESUME VIEW
            </span>
          </a>
        </div>

        {/* RIGHT: NAVIGATION LINKS & RESUME BUTTON */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative label-mono text-[10px] tracking-widest transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-[#4A7A3A] font-bold'
                      : 'text-[#5A5448] hover:text-[#1A1612]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#4A7A3A] rounded-full" />
                  )}
                </a>
              )
            })}
          </nav>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-[10px] px-3.5 py-1.5 bg-[#4A7A3A] text-white hover:bg-[#3B632E] transition-all duration-200 rounded-lg font-bold shadow-xs flex items-center gap-1"
          >
            <span>RESUME</span>
            <span>↓</span>
          </a>
        </div>

      </div>

      {/* MOBILE HORIZONTAL PILL STRIP */}
      <div className="md:hidden flex items-center gap-2 px-6 pt-2 pb-1 overflow-x-auto no-scrollbar border-t border-[#D0C9BA]/40">
        {navLinks.map((link) => {
          const id = link.href.slice(1)
          const isActive = activeSection === id
          return (
            <a
              key={link.name}
              href={link.href}
              className={`shrink-0 label-mono text-[9px] px-2.5 py-1 rounded-full transition-colors ${
                isActive
                  ? 'bg-[#4A7A3A] text-white font-bold'
                  : 'bg-[#E5E0D5]/70 text-[#5A5448] hover:text-[#1A1612]'
              }`}
            >
              {link.name}
            </a>
          )
        })}
      </div>

      {/* READING PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-[#4A7A3A] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  )
}
