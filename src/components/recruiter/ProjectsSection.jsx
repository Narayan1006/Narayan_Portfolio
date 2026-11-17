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
        <span className="hidden sm:inline label-mono text-xs text-[#5A5448]">
          FEATURED ENGINEERING WORK
        </span>
      </div>

      {/* PROJECTS LIST */}
      <div className="space-y-10 sm:space-y-12">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 sm:p-8 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              
              {/* LEFT INFO */}
              <div className="lg:w-3/5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="label-mono text-sm text-[#4A7A3A] font-bold">
                    {proj.number}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] label-mono text-[9px] font-bold rounded-md border border-[#D0C9BA]/60">
                    {proj.category}
                  </span>
                  {proj.live && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#E8F0E4] text-[#4A7A3A] label-mono text-[9px] font-bold border border-[#D0E2CA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A] animate-pulse" />
                      DEPLOYED
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1612] font-['Space_Grotesk']">
                  {proj.name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#4A7A3A] label-mono tracking-wider">
                  {proj.tagline}
                </p>

                {proj.description && (
                  <p className="text-xs sm:text-sm text-[#4A453B] leading-relaxed">
                    {proj.description}
                  </p>
                )}

                {/* HIGHLIGHT BULLETS */}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="pt-2">
                    <p className="label-mono text-[9px] text-[#5A5448] font-bold tracking-widest uppercase mb-2">
                      KEY ARCHITECTURAL HIGHLIGHTS
                    </p>
                    <ul className="space-y-2 text-xs text-[#4A453B]">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#4A7A3A] font-bold mt-0.5 shrink-0">▸</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* TECH STACK CHIPS */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] label-mono text-[9px] font-bold rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#D0C9BA]/40">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#E5E0D5] hover:bg-[#D0C9BA] label-mono text-xs font-bold text-[#1A1612] flex items-center gap-1.5 transition-all shadow-2xs"
                    >
                      <span>GITHUB REPO</span>
                      <span>↗</span>
                    </a>
                  )}

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#4A7A3A] hover:bg-[#3B632E] label-mono text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>LIVE DEMO</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* RIGHT ARCHITECTURE FLOW OR PIPELINE */}
              {proj.pipeline && proj.pipeline.length > 0 && (
                <div className="lg:w-2/5 p-5 bg-[#F5F2EA]/90 border border-[#D0C9BA] rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-2">
                    <p className="label-mono text-[9px] text-[#5A5448] tracking-widest font-bold uppercase">
                      SYSTEM DATAFLOW PIPELINE
                    </p>
                    <span className="w-2 h-2 rounded-full bg-[#4A7A3A]" />
                  </div>

                  <div className="w-full space-y-1.5">
                    {proj.pipeline.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#D4CFC4] rounded-lg text-xs font-bold text-[#1A1612] shadow-2xs font-mono flex items-center justify-between">
                          <span className="text-[10px] text-[#4A7A3A] font-bold">0{idx + 1}</span>
                          <span className="text-center flex-1 mx-2">{step}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4CFC4]" />
                        </div>
                        {idx < proj.pipeline.length - 1 && (
                          <div className="w-px h-3 bg-[#4A7A3A]/60 my-0.5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="pt-2 border-t border-[#D0C9BA]/60 flex flex-wrap gap-1.5">
                      {proj.metrics.map((m, mi) => (
                        <span
                          key={mi}
                          className="px-2 py-0.5 rounded bg-[#EBE7DF] text-[#5A5448] label-mono text-[9px] font-bold"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
