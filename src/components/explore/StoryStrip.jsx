import { CHAPTERS } from '../../data/storyData'

export default function StoryStrip({ activeChapterIndex, scrollProgress, onNavigateBack }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-12 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-[#0D0B09]/80 to-transparent backdrop-blur-xs">
      
      {/* LEFT: BACK TO ENTRY */}
      <button
        onClick={onNavigateBack}
        className="label-mono text-xs text-[#6B9A55] hover:text-[#F0EDE8] transition-colors flex items-center gap-2 cursor-pointer font-bold"
      >
        ← ENTRY
      </button>

      {/* CENTER: PERSISTENT STORY TIMELINE STRIP */}
      <div className="hidden md:flex items-center gap-6 relative px-6 py-2 rounded-full bg-[#121418]/80 border border-[#1F2228] backdrop-blur-md overflow-hidden">
        
        {/* TIMELINE PROGRESS LINE */}
        <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-[#1F2228] -translate-y-1/2 -z-10" />
        <div
          className="absolute top-1/2 left-6 h-[2px] bg-[#4A7A3A] -translate-y-1/2 transition-all duration-300 -z-10"
          style={{ width: `calc(${Math.min(100, Math.max(0, scrollProgress * 100))}% * 0.85)` }}
        />

        {/* CHAPTER DOTS & LABELS */}
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex
          const isPassed = idx < activeChapterIndex

          return (
            <div key={ch.id} className="flex items-center gap-2 relative group">
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#6B9A55] ring-4 ring-[#4A7A3A]/30 scale-125'
                    : isPassed
                    ? 'bg-[#4A7A3A]'
                    : 'bg-[#1F2228] border border-[#5A5448]'
                }`}
              />
              <span
                className={`label-mono text-[9px] tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-[#F0EDE8] font-bold'
                    : isPassed
                    ? 'text-[#8E929B]'
                    : 'text-[#5A5448]'
                }`}
              >
                {ch.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* RIGHT: CURRENT CHAPTER NUMBER MOBILE & DESKTOP */}
      <div className="label-mono text-xs text-[#8E929B] flex items-center gap-2">
        <span className="text-[#6B9A55] font-bold">
          {CHAPTERS[activeChapterIndex]?.number || '01'}
        </span>
        <span>/ 08</span>
      </div>

    </header>
  )
}
