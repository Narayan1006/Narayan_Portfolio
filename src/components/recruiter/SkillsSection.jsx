import { SKILLS, PROBLEM_SOLVING } from '../../data/recruiterData'

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-t border-[#D0C9BA]/60">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <span className="label-mono text-xs text-[#4A7A3A] font-bold">04 /</span>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk']">
          TECHNICAL PROFICIENCY & PROBLEM SOLVING
        </h2>
      </div>

      {/* CATEGORIZED SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

      {/* PROBLEM SOLVING STRIP */}
      <div className="p-6 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-3">
          <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
            PROBLEM SOLVING & ALGORITHMIC DOMAINS
          </h3>
          <span className="label-mono text-[10px] text-[#4A7A3A] font-bold">DATA STRUCTURES & ALGORITHMS</span>
        </div>

        {/* TOPICS */}
        <div className="flex flex-wrap gap-2">
          {PROBLEM_SOLVING.topics.map((topic, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#E5E0D5] text-[#3D372E] label-mono text-[10px] font-bold rounded"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* PLATFORMS & STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
          {PROBLEM_SOLVING.platforms.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#F5F2EA] border border-[#D0C9BA] hover:border-[#4A7A3A] rounded-lg transition-colors block"
            >
              <p className="label-mono text-[10px] text-[#4A7A3A] font-bold">{p.name}</p>
              <div className="text-xs font-bold text-[#1A1612] mt-1">
                {p.stats.map((s, i) => (
                  <span key={i} className="block">{s || '[PLACEHOLDER: Stats e.g. 150+ Solved]'}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
