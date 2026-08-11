import { useState, useEffect } from 'react'
import { JOURNEY_MILESTONES, DOMAINS, STORY_PROJECTS, STORY_CERTIFICATES, EXPLORING_TOPICS, SOCIAL } from '../../data/storyData'

export default function StoryChapters({ onNavigateBack }) {
  const [selectedCert, setSelectedCert] = useState(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative z-10 w-full pointer-events-none">
      
      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 01 — HELLO */}
      {/* ---------------------------------------------------------------- */}
      <section className="h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-4xl">
        <div className="story-reveal space-y-4">
          <span className="label-mono text-xs text-[#4A7A3A] tracking-[0.3em] font-bold">
            01 / STORY MODE
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tight text-[#F0EDE8] md:text-[#1A1612] font-['Space_Grotesk'] leading-none">
            SO, YOU FOUND ME.
          </h1>
          <p className="label-mono text-lg sm:text-xl text-[#F0EDE8] md:text-[#5A5448] tracking-[0.25em] font-bold">
            NARAYAN SINGH — <span className="text-[#4A7A3A]">AI · SOFTWARE · BUILDING</span>
          </p>
          <div className="pt-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4A7A3A] animate-ping" />
            <span className="label-mono text-xs text-[#8E929B] md:text-[#5A5448] tracking-widest font-bold">
              SCROLL DOWN TO BEGIN JOURNEY ↓
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 02 — WHO I AM */}
      {/* ---------------------------------------------------------------- */}
      <section className="h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-2xl">
        <div className="story-reveal space-y-6">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
            02 / IDENTITY
          </span>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            WHO AM I?
          </h2>
          <p className="text-base sm:text-lg text-[#8E929B] leading-relaxed font-sans">
            I'm a Computer Science undergraduate at ABES Engineering College who enjoys turning complex ideas into scalable software and exploring what artificial intelligence can become.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['CSE UNDERGRAD', 'AI / ML DEVELOPER', 'BACKEND ENGINEER', 'SOFTWARE BUILDER'].map((tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-[#121418]/80 border border-[#1F2228] text-[#F0EDE8] label-mono text-xs font-bold rounded-lg backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 03 — THE JOURNEY */}
      {/* ---------------------------------------------------------------- */}
      <section className="min-h-[150vh] pt-32 px-8 sm:px-16 max-w-3xl flex flex-col justify-center">
        <div className="story-reveal space-y-8">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
            03 / EVOLUTION
          </span>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            THE JOURNEY
          </h2>
          <p className="text-sm sm:text-base text-[#8E929B] font-mono">
            Academic record from school education through B.Tech CSE semesters.
          </p>

          {/* TIMELINE STEPS */}
          <div className="space-y-6 border-l-2 border-[#1F2228] pl-6 pt-4">
            {JOURNEY_MILESTONES.map((m, idx) => (
              <div key={idx} className="space-y-1 relative group">
                <span className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 ${m.active ? 'bg-[#6B9A55] border-[#6B9A55] ring-4 ring-[#4A7A3A]/30' : 'bg-[#0B0C0E] border-[#5A5448]'}`} />
                <h3 className="text-lg font-bold text-[#F0EDE8] font-['Space_Grotesk']">
                  {m.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E929B]">
                  {m.sub}
                </p>
                <span className="inline-block px-2.5 py-0.5 bg-[#121418] border border-[#1F2228] text-[#6B9A55] label-mono text-[9px] font-bold rounded mt-1">
                  {m.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 04 — WHAT I BUILD */}
      {/* ---------------------------------------------------------------- */}
      <section className="h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-4xl ml-auto text-right">
        <div className="story-reveal space-y-8">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
            04 / DOMAINS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            WHAT I BUILD
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {DOMAINS.map((d, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#121418]/80 border border-[#1F2228] rounded-xl backdrop-blur-md space-y-2 hover:border-[#4A7A3A] transition-colors"
              >
                <span className="label-mono text-xs text-[#6B9A55] font-bold">
                  {d.label}
                </span>
                <p className="text-sm font-bold text-[#F0EDE8] font-['Space_Grotesk']">
                  "{d.description}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {d.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#1F2228] text-[#8E929B] label-mono text-[9px] rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 05 — THINGS I'VE BUILT */}
      {/* ---------------------------------------------------------------- */}
      <section className="min-h-[170vh] pt-32 px-8 sm:px-16 max-w-5xl">
        <div className="story-reveal space-y-12">
          
          {/* SECTION INTRO STATEMENT */}
          <div className="space-y-3">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
              05 / EVIDENCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              LEARNING IS GOOD.<br />
              <span className="text-[#6B9A55]">BUILDING IS BETTER.</span>
            </h2>
          </div>

          {/* PROJECT CARDS */}
          <div className="space-y-10">
            {STORY_PROJECTS.map((proj) => (
              <div
                key={proj.number}
                className="p-6 sm:p-8 bg-[#121418]/85 border border-[#1F2228] rounded-2xl backdrop-blur-md space-y-4 hover:border-[#4A7A3A] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-sm text-[#6B9A55] font-bold">
                    {proj.number} / {proj.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F0EDE8] font-['Space_Grotesk']">
                    {proj.name}
                  </h3>
                </div>

                <p className="text-sm font-semibold text-[#8E929B] font-mono">
                  {proj.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#8E929B] leading-relaxed">
                  {proj.description || '[PLACEHOLDER: Project description and engineering highlights]'}
                </p>

                {/* ARCHITECTURE PIPELINE (IF AVAILABLE) */}
                {proj.pipeline && (
                  <div className="p-4 bg-[#0B0C0E] border border-[#1F2228] rounded-xl space-y-2">
                    <p className="label-mono text-[9px] text-[#6B9A55] tracking-widest font-bold">
                      ARCHITECTURE PIPELINE
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {proj.pipeline.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-[#121418] border border-[#1F2228] text-xs font-mono text-[#F0EDE8] rounded">
                            {step}
                          </span>
                          {i < proj.pipeline.length - 1 && <span className="text-xs text-[#6B9A55]">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TECH STACK CHIPS */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#1F2228] text-[#F0EDE8] label-mono text-[9px] font-bold rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* PROJECT LINKS */}
                <div className="flex flex-wrap items-center gap-4 pt-3 pointer-events-auto">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-xs font-bold text-[#6B9A55] hover:text-[#F0EDE8] flex items-center gap-1.5 transition-colors"
                    >
                      GITHUB REPO →
                    </a>
                  )}

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-xs font-bold text-[#F0EDE8] hover:text-[#6B9A55] flex items-center gap-1.5 transition-colors"
                    >
                      LIVE DEMO / APP →
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 06 — CERTIFICATES & BADGES */}
      {/* ---------------------------------------------------------------- */}
      <section className="min-h-[130vh] pt-32 pb-24 flex flex-col justify-center" style={{ maxWidth: '100vw', paddingLeft: 0, paddingRight: 0 }}>
        <div className="story-reveal space-y-14">

          {/* EDITORIAL HEADER — keep left-padded */}
          <div className="px-8 sm:px-16 space-y-3 max-w-3xl">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
              06 / CERTIFICATES
            </span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              LEARNED.<br />
              BUILT.<br />
              <span className="text-[#6B9A55]">KEPT GOING.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8E929B] label-mono">
              Hover to pause · Click any card to enlarge
            </p>
          </div>

          {/* ── INFINITE HORIZONTAL MARQUEE ── */}
          {/* Full-bleed: no px, fade edges with mask */}
          <div
            className="marquee-wrap overflow-hidden relative pointer-events-auto select-none"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            }}
          >
            <div className="marquee-track gap-5">
              {/* Original set */}
              {STORY_CERTIFICATES.map((cert) => (
                <div
                  key={`a-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  className="group cursor-pointer flex-shrink-0 w-72 sm:w-80 p-4 bg-[#121418]/90 border border-[#1F2228] hover:border-[#4A7A3A] rounded-2xl backdrop-blur-md transition-all duration-300 space-y-3 hover:-translate-y-1 shadow-xl"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-xl border border-[#1F2228] bg-[#0B0C0E] aspect-video relative flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      loading="lazy"
                      draggable="false"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 bg-[#121418]/90 text-[#F0EDE8] label-mono text-[9px] font-bold rounded-lg border border-[#4A7A3A]">
                        CLICK TO ENLARGE 🔍
                      </span>
                    </div>
                  </div>

                  {/* META */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 bg-[#1F2228] text-[#6B9A55] label-mono text-[8px] font-bold rounded">
                        {cert.type}
                      </span>
                      <span className="label-mono text-[9px] text-[#8E929B]">{cert.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#F0EDE8] font-['Space_Grotesk'] group-hover:text-[#6B9A55] transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] text-[#8E929B] font-mono">
                      {cert.issuer}
                    </p>
                    {cert.credentialId && (
                      <p className="label-mono text-[8px] text-[#6B9A55]">
                        ID: <span className="text-[#5A5A6A] font-normal">{cert.credentialId}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Duplicate set — seamless loop */}
              {STORY_CERTIFICATES.map((cert) => (
                <div
                  key={`b-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  aria-hidden="true"
                  className="group cursor-pointer flex-shrink-0 w-72 sm:w-80 p-4 bg-[#121418]/90 border border-[#1F2228] hover:border-[#4A7A3A] rounded-2xl backdrop-blur-md transition-all duration-300 space-y-3 hover:-translate-y-1 shadow-xl"
                >
                  <div className="overflow-hidden rounded-xl border border-[#1F2228] bg-[#0B0C0E] aspect-video relative flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      loading="lazy"
                      draggable="false"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 bg-[#121418]/90 text-[#F0EDE8] label-mono text-[9px] font-bold rounded-lg border border-[#4A7A3A]">
                        CLICK TO ENLARGE 🔍
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 bg-[#1F2228] text-[#6B9A55] label-mono text-[8px] font-bold rounded">
                        {cert.type}
                      </span>
                      <span className="label-mono text-[9px] text-[#8E929B]">{cert.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#F0EDE8] font-['Space_Grotesk'] group-hover:text-[#6B9A55] transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] text-[#8E929B] font-mono">
                      {cert.issuer}
                    </p>
                    {cert.credentialId && (
                      <p className="label-mono text-[8px] text-[#6B9A55]">
                        ID: <span className="text-[#5A5A6A] font-normal">{cert.credentialId}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* CERTIFICATE LIGHTBOX MODAL */}
      {/* ---------------------------------------------------------------- */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 pointer-events-auto animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#121418] border border-[#4A7A3A] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F2228] text-[#F0EDE8] hover:bg-[#4A7A3A] transition-colors flex items-center justify-center text-sm font-mono cursor-pointer"
            >
              ✕
            </button>

            {/* FULL IMAGE */}
            <div className="rounded-xl overflow-hidden bg-[#0B0C0E] border border-[#1F2228] flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.alt}
                className="max-h-[60vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* MODAL METADATA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#1F2228] text-[#6B9A55] label-mono text-xs font-bold rounded">
                  {selectedCert.type}
                </span>
                <span className="label-mono text-xs text-[#8E929B]">
                  ISSUED: {selectedCert.date}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#F0EDE8] font-['Space_Grotesk']">
                {selectedCert.title}
              </h3>

              <p className="text-sm text-[#8E929B] font-mono">
                ISSUING ORGANIZATION: <span className="text-[#F0EDE8] font-bold">{selectedCert.issuer}</span>
              </p>

              <p className="text-sm text-[#8E929B] leading-relaxed">
                {selectedCert.detail}
              </p>

              {selectedCert.credentialId && (
                <p className="label-mono text-xs text-[#6B9A55]">
                  CREDENTIAL ID: <span className="text-[#F0EDE8] font-mono">{selectedCert.credentialId}</span>
                </p>
              )}

              {selectedCert.verifyUrl && (
                <div className="pt-2">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-[#4A7A3A] hover:bg-[#3B632E] text-white label-mono text-xs font-bold rounded-lg transition-colors"
                  >
                    VERIFY DIGITAL BADGE / CREDENTIAL →
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 07 — STILL EXPLORING */}
      {/* ---------------------------------------------------------------- */}
      <section className="h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-3xl">
        <div className="story-reveal space-y-8">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
            07 / HORIZON
          </span>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            STILL EXPLORING.
          </h2>
          <p className="text-sm sm:text-base text-[#8E929B] font-mono">
            Active areas of experimentation, learning, and technical depth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPLORING_TOPICS.map((topic, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#121418]/80 border border-[#1F2228] rounded-xl backdrop-blur-md space-y-1"
              >
                <h3 className="label-mono text-xs font-bold text-[#6B9A55]">
                  {topic.label}
                </h3>
                <p className="text-xs text-[#8E929B]">
                  {topic.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAPTER 08 — SEE YOU AROUND */}
      {/* ---------------------------------------------------------------- */}
      <section className="h-[100vh] flex flex-col justify-center items-center px-8 text-center max-w-3xl mx-auto">
        <div className="story-reveal space-y-8 pointer-events-auto">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
            08 / CONCLUSION
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            THE STORY DOESN'T<br />END HERE.
          </h2>

          <div className="space-y-2">
            <p className="label-mono text-base font-bold text-[#F0EDE8] tracking-widest">
              NARAYAN SINGH
            </p>
            <p className="label-mono text-xs text-[#6B9A55] tracking-[0.2em]">
              STILL LEARNING. STILL BUILDING.
            </p>
          </div>

          {/* SOCIAL & ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#121418] hover:bg-[#1F2228] text-[#F0EDE8] border border-[#1F2228] label-mono text-xs font-bold rounded-lg transition-colors"
            >
              GITHUB →
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#121418] hover:bg-[#1F2228] text-[#F0EDE8] border border-[#1F2228] label-mono text-xs font-bold rounded-lg transition-colors"
            >
              LINKEDIN →
            </a>
            <a
              href={`mailto:${SOCIAL.email}`}
              className="px-6 py-3 bg-[#6B9A55] hover:bg-[#4A7A3A] text-white label-mono text-xs font-bold rounded-lg transition-colors"
            >
              EMAIL ME →
            </a>
          </div>

          <div className="pt-8">
            <button
              onClick={onNavigateBack}
              className="label-mono text-xs text-[#6B9A55] hover:text-[#F0EDE8] underline tracking-widest cursor-pointer transition-colors"
            >
              ← RETURN TO GATEWAY ENTRY
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
