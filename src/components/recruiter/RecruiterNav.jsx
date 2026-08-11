import { useState, useEffect } from 'react'
import { PROFILE } from '../../data/recruiterData'

export default function RecruiterNav({ onNavigateBack }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'PROFILE', href: '#profile' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'CONTACT', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EBE7DF]/90 backdrop-blur-md border-b border-[#D0C9BA] py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* LEFT: RETURN & NAME */}
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateBack}
            className="label-mono text-xs text-[#4A7A3A] hover:text-[#2B2418] transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
          >
            ← ENTRY
          </button>
          <span className="hidden sm:inline text-[#B5AEA0]">|</span>
          <a href="#profile" className="label-mono text-xs font-bold tracking-[0.25em] text-[#1A1612] hover:text-[#4A7A3A] transition-colors">
            {PROFILE.name}
          </a>
        </div>

        {/* RIGHT: NAVIGATION LINKS & RESUME BUTTON */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="label-mono text-[10px] text-[#5A5448] hover:text-[#1A1612] transition-colors tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-[10px] px-3.5 py-1.5 border border-[#4A7A3A] text-[#4A7A3A] hover:bg-[#4A7A3A] hover:text-white transition-all duration-200 rounded font-bold"
          >
            RESUME ↓
          </a>
        </div>

      </div>
    </header>
  )
}
