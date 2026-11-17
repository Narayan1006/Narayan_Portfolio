import { CHAPTERS } from '../../data/storyData'

export default function StoryStrip({ activeChapterIndex, scrollProgress, onNavigateBack, onNavigate }) {
  const handleJump = (id) => {
    const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-12 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-[#0B0C0E]/95 via-[#0B0C0E]/70 to-transparent backdrop-blur-xs">
      
      {/* LEFT: BACK TO ENTRY */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateBack}
          className="label-mono text-xs text-[#6B9A55] hover:text-[#F0EDE8] transition-colors flex items-center gap-1.5 cursor-pointer font-bold px-2 py-1 rounded hover:bg-[#121418]"
        >
          ← ENTRY
        </button>
        <span className="hidden sm:inline text-[#2A2C28]">|</span>
        <span className="md:hidden label-mono text-[10px] text-[#8E929B] font-bold truncate max-w-[140px]">
          {currentChapter.label}
        </span>
      </div>

      {/* CENTER: PERSISTENT STORY TIMELINE STRIP */}
      <div className="hidden md:flex items-center gap-5 lg:gap-6 relative px-6 py-2 rounded-full bg-[#121418]/85 border border-[#1F2228] backdrop-blur-md overflow-hidden shadow-lg">
        
        {/* TIMELINE PROGRESS LINE */}
        <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-[#1F2228] -translate-y-1/2 -z-10" />
        <div
          className="absolute top-1/2 left-6 h-[2px] bg-[#4A7A3A] -translate-y-1/2 transition-all duration-300 -z-10"
          style={{ width: `calc(${Math.min(100, Math.max(0, scrollProgress * 100))}% * 0.88)` }}
        />

        {/* CHAPTER DOTS & LABELS (CLICKABLE JUMP LINKS) */}
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex
          const isPassed = idx < activeChapterIndex

          return (
            <button
              key={ch.id}
              onClick={() => handleJump(ch.id)}
              className="flex items-center gap-1.5 relative group cursor-pointer select-none bg-transparent border-none p-0 focus:outline-none"
              title={`Jump to ${ch.number} — ${ch.label}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#6B9A55] ring-4 ring-[#4A7A3A]/40 scale-125'
                    : isPassed
                    ? 'bg-[#4A7A3A] group-hover:bg-[#6B9A55]'
                    : 'bg-[#1F2228] border border-[#5A5448] group-hover:border-[#6B9A55]'
                }`}
              />
              <span
                className={`label-mono text-[9px] tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-[#F0EDE8] font-bold'
                    : isPassed
                    ? 'text-[#8E929B] group-hover:text-[#F0EDE8]'
                    : 'text-[#5A5448] group-hover:text-[#8E929B]'
                }`}
              >
                {ch.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* RIGHT: FAST-TRACK RECRUITER PILL & CHAPTER COUNTER */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => (onNavigate ? onNavigate('recruiter') : window.location.assign('/recruiter'))}
          className="hidden sm:inline-flex items-center gap-1.5 label-mono text-[10px] px-3 py-1.5 rounded-full bg-[#121418]/90 border border-[#2E333D] hover:border-[#6B9A55] text-[#8E929B] hover:text-[#F0EDE8] transition-all cursor-pointer font-bold shadow-xs hover:scale-105"
        >
          <span>RECRUITER VIEW</span>
          <span className="text-[#6B9A55]">→</span>
        </button>

        <div className="label-mono text-xs text-[#8E929B] flex items-center gap-1.5 bg-[#121418]/70 px-2.5 py-1 rounded-md border border-[#1F2228]">
          <span className="text-[#6B9A55] font-bold">
            {currentChapter.number}
          </span>
          <span className="text-[#5A5448]">/</span>
          <span>{String(CHAPTERS.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* MOBILE MINI PROGRESS LINE */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-[#4A7A3A] transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

    </header>
  )
}
