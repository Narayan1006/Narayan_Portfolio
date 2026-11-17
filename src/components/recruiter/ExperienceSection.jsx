import { EXPERIENCE } from '../../data/recruiterData'

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <span className="label-mono text-xs text-[#4A7A3A] font-bold">02 /</span>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk']">
          PROFESSIONAL EXPERIENCE
        </h2>
      </div>

      <div className="space-y-8">
        {EXPERIENCE.map((exp) => (
          <div
            key={exp.id}
            className="p-6 sm:p-8 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest uppercase">
                  {exp.type} {exp.company && `— ${exp.company}`}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1612] font-['Space_Grotesk'] mt-0.5">
                  {exp.role}
                </h3>
                {exp.location && (
                  <p className="text-xs text-[#5A5448] font-mono mt-0.5">
                    {exp.location}
                  </p>
                )}
              </div>

              <div className="label-mono text-xs text-[#5A5448] font-semibold px-3 py-1 bg-[#E5E0D5] rounded-md self-start sm:self-auto">
                {exp.period}
              </div>
            </div>

            {/* TECH TAGS */}
            {exp.tech && exp.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {exp.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] label-mono text-[9px] rounded-md font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* BULLETS */}
            {exp.bullets && exp.bullets.length > 0 && (
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A453B]">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#4A7A3A] font-bold mt-0.5 shrink-0">▸</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}
