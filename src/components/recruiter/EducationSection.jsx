import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from '../../data/recruiterData'

export default function EducationSection() {
  return (
    <section id="education" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <span className="label-mono text-xs text-[#4A7A3A] font-bold">05 /</span>
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

          <div className="p-6 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold text-[#1A1612] font-['Space_Grotesk']">
                  {EDUCATION.degree}
                </h4>
                <p className="text-sm text-[#4A7A3A] font-semibold mt-1">
                  {EDUCATION.institution} — {EDUCATION.location}
                </p>
              </div>
              <span className="label-mono text-xs text-[#7A7468]">
                {EDUCATION.period}
              </span>
            </div>

            {EDUCATION.cgpa && (
              <p className="label-mono text-xs text-[#1A1612] font-bold">
                CGPA: <span className="text-[#4A7A3A]">{EDUCATION.cgpa}</span>
              </p>
            )}

            <div className="pt-3 border-t border-[#D0C9BA]/60">
              <p className="label-mono text-[10px] text-[#7A7468] tracking-widest mb-2 font-bold uppercase">
                RELEVANT COURSEWORK
              </p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#F5F2EA] text-[#3D372E] text-xs font-medium rounded border border-[#E0D9CB]"
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
                  className="p-3.5 bg-[#FFFFFF]/70 backdrop-blur-sm border border-[#D0C9BA] rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#1A1612]">
                      {cert.name}
                    </h5>
                    <p className="text-[11px] text-[#7A7468]">
                      {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                    </p>
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-[10px] text-[#4A7A3A] font-bold hover:underline"
                    >
                      VERIFY →
                    </a>
                  ) : (
                    <span className="label-mono text-[9px] text-[#A6A092]">VERIFIED</span>
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
                  className="p-3.5 bg-[#FFFFFF]/70 backdrop-blur-sm border border-[#D0C9BA] rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#1A1612]">
                      {ach.title}
                    </h5>
                    <span className="px-2 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] label-mono text-[9px] font-bold rounded">
                      {ach.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5448] mt-1">
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
