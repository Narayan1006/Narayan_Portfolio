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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="p-5 bg-[#FFFFFF]/70 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-3"
          >
            <h3 className="label-mono text-xs font-bold text-[#4A7A3A] tracking-widest border-b border-[#D0C9BA]/60 pb-2">
              {category}
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {items.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F5F2EA] border border-[#E0D9CB] text-[#1A1612] text-xs font-semibold rounded-md"
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
