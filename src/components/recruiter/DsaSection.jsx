import { dsa } from '../../data/dsa'

export default function DsaSection() {
  const easyCount = dsa.breakdown.dsa.easy
  const medCount = dsa.breakdown.dsa.medium
  const hardCount = dsa.breakdown.dsa.hard
  const dsaTotal = dsa.breakdown.dsa.total

  const easyPct = ((easyCount / dsaTotal) * 100).toFixed(1)
  const medPct = ((medCount / dsaTotal) * 100).toFixed(1)
  const hardPct = ((hardCount / dsaTotal) * 100).toFixed(1)

  return (
    <section id="dsa" className="py-16 border-t border-[#D0C9BA]/60">

      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-10">
        <div className="flex items-start sm:items-center gap-3">
          <span className="label-mono text-xs text-[#4A7A3A] font-bold shrink-0 mt-1 sm:mt-0">
            04 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#1A1612] font-['Space_Grotesk'] leading-tight">
            DSA & COMPETITIVE PROGRAMMING
          </h2>
        </div>
        <span className="hidden sm:inline label-mono text-xs text-[#7A7468]">
          PROBLEM SOLVING & CONTEST PROFILES
        </span>
      </div>

      {/* 1. TOP SUMMARY STRIP (3 STATS) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl hover:border-[#4A7A3A] transition-colors">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            TOTAL SOLVED
          </p>
          <div className="text-3xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.solved}
          </div>
          <p className="text-xs text-[#7A7468] mt-1 font-mono">
            181 DSA · 119 CP · 43 Fundamentals
          </p>
        </div>

        <div className="p-5 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl hover:border-[#4A7A3A] transition-colors">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            CONTESTS PARTICIPATED
          </p>
          <div className="text-3xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.contests}
          </div>
          <p className="text-xs text-[#7A7468] mt-1 font-mono">
            CodeChef (13) · Codeforces (8) · AtCoder (4)
          </p>
        </div>

        <div className="p-5 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl hover:border-[#4A7A3A] transition-colors">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            ACTIVE PRACTICE DAYS
          </p>
          <div className="text-3xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.activeDays}
          </div>
          <p className="text-xs text-[#7A7468] mt-1 font-mono">
            Max streak: {dsa.totals.maxStreak} days
          </p>
        </div>
      </div>

      {/* 2. RATINGS TABLE & TOPICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* LEFT: RATINGS TABLE */}
        <div className="p-6 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-3">
            <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
              CONTEST RATINGS
            </h3>
            <span className="label-mono text-[10px] text-[#4A7A3A] font-bold">
              VERIFIED PROFILES
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E0D9CB] text-[10px] label-mono text-[#7A7468]">
                  <th className="py-2 pr-4 font-bold">PLATFORM</th>
                  <th className="py-2 px-4 font-bold">RATING</th>
                  <th className="py-2 px-4 font-bold">MAX</th>
                  <th className="py-2 px-4 font-bold">CONTESTS</th>
                  <th className="py-2 pl-4 font-bold text-right">NOTE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5D9]">
                {dsa.ratings.map((r) => {
                  const isHighlight = r.platform === 'CodeChef' || r.platform === 'Codeforces'
                  return (
                    <tr key={r.platform} className="hover:bg-[#F5F2EA]/60 transition-colors">
                      <td className="py-3 pr-4 font-bold text-sm text-[#1A1612]">
                        {r.platform}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className={isHighlight ? 'text-base sm:text-lg font-bold text-[#4A7A3A]' : 'text-sm font-semibold text-[#1A1612]'}>
                          {r.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-[#5A5448]">
                        {r.max}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-[#5A5448]">
                        {r.contests}
                      </td>
                      <td className="py-3 pl-4 text-right">
                        {r.note ? (
                          <span className="px-2 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] label-mono text-[9px] font-bold rounded">
                            {r.note}
                          </span>
                        ) : (
                          <span className="text-[#B5AEA0] text-xs font-mono">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* HACKERRANK BADGES */}
          <div className="pt-3 border-t border-[#D0C9BA]/60 flex items-center justify-between text-xs">
            <span className="label-mono text-[10px] text-[#7A7468] font-bold">
              HACKERRANK CERTIFICATIONS:
            </span>
            <div className="flex items-center gap-2">
              {dsa.hackerrank.map((h) => (
                <span
                  key={h.skill}
                  className="px-2.5 py-1 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] label-mono text-[10px] font-bold rounded"
                >
                  {h.stars}★ IN {h.skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: DIFFICULTY SPLIT & TOP TOPICS */}
        <div className="space-y-6">

          {/* DIFFICULTY SPLIT CARD */}
          <div className="p-6 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
                DIFFICULTY DISTRIBUTION
              </h3>
              <span className="label-mono text-[10px] text-[#4A7A3A] font-bold">
                {dsaTotal} SOLVED
              </span>
            </div>

            {/* STATIC THIN STACKED BAR */}
            <div className="h-2.5 w-full bg-[#E5E0D5] rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-[#D0C9BA]">
              <div
                className="h-full bg-[#22C55E] rounded-sm"
                style={{ width: `${easyPct}%` }}
                title={`Easy: ${easyCount}`}
              />
              <div
                className="h-full bg-[#EAB308] rounded-sm"
                style={{ width: `${medPct}%` }}
                title={`Medium: ${medCount}`}
              />
              <div
                className="h-full bg-[#EF4444] rounded-sm"
                style={{ width: `${hardPct}%` }}
                title={`Hard: ${hardCount}`}
              />
            </div>

            {/* LEGEND */}
            <div className="flex items-center justify-between text-xs label-mono pt-1">
              <div className="flex items-center gap-1.5 text-[#1A1612]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span>EASY <strong className="text-[#1A1612]">{easyCount}</strong> ({easyPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#1A1612]">
                <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                <span>MEDIUM <strong className="text-[#1A1612]">{medCount}</strong> ({medPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#1A1612]">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>HARD <strong className="text-[#1A1612]">{hardCount}</strong> ({hardPct}%)</span>
              </div>
            </div>
          </div>

          {/* TOP TOPICS CARD */}
          <div className="p-6 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-2">
              <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
                CORE ALGORITHMIC DOMAINS
              </h3>
              <span className="label-mono text-[10px] text-[#7A7468]">
                TOP TOPICS BY PROBLEM COUNT
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {dsa.topTopics.map((topic) => (
                <span
                  key={topic.name}
                  className="px-3 py-1.5 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] text-xs font-medium rounded-md flex items-center gap-2"
                >
                  <span>{topic.name}</span>
                  <span className="px-1.5 py-0.2 bg-[#E5E0D5] text-[#4A7A3A] font-mono text-[10px] font-bold rounded">
                    {topic.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. FOOTER STRIP */}
      <div className="p-4 bg-[#FFFFFF]/60 border border-[#D0C9BA] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="label-mono text-xs text-[#7A7468]">
          Updated {dsa.lastUpdated} · Verified from competitive profiles & Codolio
        </span>

        <a
          href={dsa.links.codolio}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono text-xs font-bold text-[#4A7A3A] hover:text-[#1A1612] transition-colors flex items-center gap-1"
        >
          Codolio Profile →
        </a>
      </div>

    </section>
  )
}
