import { PROJECTS } from '../../data/recruiterData'

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <span className="label-mono text-xs text-[#4A7A3A] font-bold">03 /</span>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk']">
            SELECTED PROJECTS
          </h2>
        </div>
        <span className="hidden sm:inline label-mono text-xs text-[#7A7468]">
          FEATURED ENGINEERING WORK
        </span>
      </div>

      {/* PROJECTS LIST */}
      <div className="space-y-12">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 sm:p-8 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              {/* LEFT INFO */}
              <div className="lg:w-3/5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="label-mono text-sm text-[#4A7A3A] font-bold">
                    {proj.number}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] label-mono text-[9px] font-bold rounded">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1612] font-['Space_Grotesk']">
                  {proj.name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#4A7A3A] label-mono">
                  {proj.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                  {proj.description || '[PLACEHOLDER: Detailed project problem & solution explanation]'}
                </p>

                {/* HIGHLIGHT BULLETS */}
                {proj.highlights && proj.highlights.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-[#5A5448] list-disc list-inside pt-2">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#9E9689] italic pt-1">
                    [PLACEHOLDER: Bullet points highlighting key technical accomplishments]
                  </p>
                )}

                {/* TECH STACK CHIPS */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] label-mono text-[9px] font-bold rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex items-center gap-4 pt-4">
                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-xs font-bold text-[#4A7A3A] hover:text-[#1A1612] flex items-center gap-1 transition-colors"
                    >
                      GITHUB REPO →
                    </a>
                  ) : (
                    <span className="label-mono text-[10px] text-[#A6A092]">
                      [PLACEHOLDER: GITHUB REPO URL]
                    </span>
                  )}

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-xs font-bold text-[#1A1612] hover:text-[#4A7A3A] flex items-center gap-1 transition-colors"
                    >
                      LIVE DEMO →
                    </a>
                  )}
                </div>
              </div>

              {/* RIGHT ARCHITECTURE FLOW OR PREVIEW (IF AVAILABLE) */}
              {proj.architecture && (
                <div className="lg:w-2/5 p-5 bg-[#F5F2EA] border border-[#D0C9BA] rounded-xl flex flex-col justify-center items-center space-y-3">
                  <p className="label-mono text-[9px] text-[#7A7468] tracking-widest font-bold uppercase">
                    SYSTEM ARCHITECTURE PIPELINE
                  </p>

                  <div className="w-full space-y-2 text-center">
                    {proj.architecture.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full py-1.5 bg-[#FFFFFF] border border-[#D0C9BA] rounded text-xs font-bold text-[#1A1612] shadow-2xs font-mono">
                          {step}
                        </div>
                        {idx < proj.architecture.length - 1 && (
                          <span className="text-xs text-[#4A7A3A] py-0.5">↓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
