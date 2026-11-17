import { SKILLS } from '../../data/recruiterData'

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <span className="label-mono text-xs text-[#4A7A3A] font-bold">05 /</span>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk']">
          TECHNICAL PROFICIENCY & TOOLING
        </h2>
      </div>

      {/* CATEGORIZED SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl space-y-3.5 shadow-2xs hover:border-[#4A7A3A] transition-all"
          >
            <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-2.5">
              <h3 className="label-mono text-xs font-bold text-[#4A7A3A] tracking-widest">
                {category}
              </h3>
              <span className="label-mono text-[9px] text-[#5A5448] font-bold">
                {items.length} TECHNOLOGIES
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {items.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F5F2EA] border border-[#E0D9CB] text-[#1A1612] text-xs font-semibold rounded-lg hover:border-[#4A7A3A] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
