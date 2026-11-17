import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from '../../data/recruiterData'

export default function EducationSection() {
  return (
    <section id="education" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <span className="label-mono text-xs text-[#4A7A3A] font-bold">06 /</span>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk']">
          EDUCATION, CERTIFICATIONS & ACHIEVEMENTS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: EDUCATION CARD */}
        <div className="space-y-6">
          <h3 className="label-mono text-xs font-bold text-[#4A7A3A] tracking-widest">
            ACADEMIC BACKGROUND
          </h3>

          <div className="p-6 sm:p-7 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl space-y-4 shadow-2xs">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-[#1A1612] font-['Space_Grotesk']">
                  {EDUCATION.degree}
                </h4>
                <p className="text-sm text-[#4A7A3A] font-semibold mt-1">
                  {EDUCATION.institution} — {EDUCATION.location}
                </p>
              </div>
              <span className="label-mono text-xs text-[#5A5448] font-semibold px-2.5 py-1 bg-[#E5E0D5] rounded-md shrink-0">
                {EDUCATION.period}
              </span>
            </div>

            {EDUCATION.cgpa && (
              <p className="label-mono text-xs text-[#1A1612] font-bold pt-1">
                CGPA: <span className="text-[#4A7A3A] text-sm font-black">{EDUCATION.cgpa}</span>
              </p>
            )}

            <div className="pt-3 border-t border-[#D0C9BA]/60">
              <p className="label-mono text-[10px] text-[#5A5448] tracking-widest mb-2 font-bold uppercase">
                RELEVANT COURSEWORK
              </p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#F5F2EA] text-[#3D372E] text-xs font-medium rounded-lg border border-[#E0D9CB]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CERTIFICATIONS & ACHIEVEMENTS */}
        <div className="space-y-6">
          
          {/* CERTIFICATIONS */}
          <div>
            <h3 className="label-mono text-xs font-bold text-[#4A7A3A] tracking-widest mb-4">
              VERIFIED CERTIFICATIONS
            </h3>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FFFFFF]/85 backdrop-blur-sm border border-[#D0C9BA] rounded-xl flex items-center justify-between hover:border-[#4A7A3A] transition-all shadow-2xs"
                >
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#1A1612]">
                      {cert.name}
                    </h5>
                    <p className="text-[11px] text-[#5A5448] mt-0.5">
                      {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                    </p>
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-[10px] text-[#4A7A3A] font-bold hover:underline px-2.5 py-1 rounded bg-[#E8F0E4]"
                    >
                      VERIFY →
                    </a>
                  ) : (
                    <span className="label-mono text-[9px] text-[#5A5448] px-2 py-0.5 rounded bg-[#E5E0D5]">VERIFIED</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div>
            <h3 className="label-mono text-xs font-bold text-[#4A7A3A] tracking-widest mb-4">
              HONORS & COMPETITIONS
            </h3>

            <div className="space-y-3">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FFFFFF]/85 backdrop-blur-sm border border-[#D0C9BA] rounded-xl shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-[#1A1612]">
                      {ach.title}
                    </h5>
                    <span className="px-2 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] label-mono text-[9px] font-bold rounded">
                      {ach.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A453B] mt-1.5 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
