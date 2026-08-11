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
            className="p-6 bg-[#FFFFFF]/70 backdrop-blur-md border border-[#D0C9BA] rounded-xl hover:border-[#4A7A3A] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest uppercase">
                  {exp.type} {exp.company ? `— ${exp.company}` : '[PLACEHOLDER: COMPANY NAME]'}
                </span>
                <h3 className="text-xl font-bold text-[#1A1612] font-['Space_Grotesk'] mt-0.5">
                  {exp.role || '[PLACEHOLDER: ROLE / TITLE]'}
                </h3>
              </div>

              <div className="label-mono text-xs text-[#7A7468]">
                {exp.period || '[PLACEHOLDER: DATES]'}
              </div>
            </div>

            {/* TECH TAGS */}
            {exp.tech && exp.tech.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#E5E0D5] text-[#1A1612] label-mono text-[9px] rounded font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#9E9689] italic mb-4">
                [PLACEHOLDER: Technologies used e.g. React, Spring Boot, JPA, REST APIs]
              </p>
            )}

            {/* BULLETS */}
            {exp.bullets && exp.bullets.length > 0 ? (
              <ul className="space-y-2 text-xs sm:text-sm text-[#5A5448] list-disc list-inside">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-[#F5F2EA] border border-dashed border-[#C5BEB0] rounded text-xs text-[#7A7468] space-y-1">
                <p className="font-bold text-[#4A7A3A] label-mono text-[10px]">
                  [PLACEHOLDER: INTERNSHIP DETAILS NEEDED]
                </p>
                <p>• Developed backend modules and RESTful API endpoints...</p>
                <p>• Integrated frontend components with Spring Boot / JPA persistence layer...</p>
                <p>• Implemented role-based authorization and user management workflows...</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}
