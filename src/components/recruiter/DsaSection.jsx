import { useState } from 'react'
import { dsa } from '../../data/dsa'

export default function DsaSection() {
  const [hoveredSegment, setHoveredSegment] = useState(null)

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
        <span className="hidden sm:inline label-mono text-xs text-[#5A5448]">
          PROBLEM SOLVING & CONTEST PROFILES
        </span>
      </div>

      {/* 1. TOP SUMMARY STRIP (3 STATS) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 sm:p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] transition-all hover:shadow-sm">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            TOTAL SOLVED
          </p>
          <div className="text-3xl sm:text-4xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.solved}
          </div>
          <p className="text-xs text-[#5A5448] mt-1.5 font-mono">
            181 DSA · 119 CP · 43 Fundamentals
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] transition-all hover:shadow-sm">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            CONTESTS PARTICIPATED
          </p>
          <div className="text-3xl sm:text-4xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.contests}
          </div>
          <p className="text-xs text-[#5A5448] mt-1.5 font-mono">
            CodeChef (13) · Codeforces (8) · AtCoder (4)
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] transition-all hover:shadow-sm">
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1">
            ACTIVE PRACTICE DAYS
          </p>
          <div className="text-3xl sm:text-4xl font-black text-[#1A1612] font-['Space_Grotesk']">
            {dsa.totals.activeDays}
          </div>
          <p className="text-xs text-[#5A5448] mt-1.5 font-mono">
            Max streak: {dsa.totals.maxStreak} consecutive days
          </p>
        </div>
      </div>

      {/* 2. RATINGS TABLE & TOPICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* LEFT: RATINGS TABLE */}
        <div className="p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-3">
            <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
              CONTEST RATINGS
            </h3>
            <span className="label-mono text-[10px] text-[#4A7A3A] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A] animate-pulse" />
              VERIFIED PROFILES
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E0D9CB] text-[10px] label-mono text-[#5A5448]">
                  <th className="py-2.5 pr-4 font-bold">PLATFORM</th>
                  <th className="py-2.5 px-4 font-bold">RATING</th>
                  <th className="py-2.5 px-4 font-bold">MAX</th>
                  <th className="py-2.5 px-4 font-bold">CONTESTS</th>
                  <th className="py-2.5 pl-4 font-bold text-right">TIER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5D9]">
                {dsa.ratings.map((r) => {
                  const isHighlight = r.platform === 'CodeChef' || r.platform === 'Codeforces'
                  return (
                    <tr key={r.platform} className="hover:bg-[#F5F2EA]/80 transition-colors">
                      <td className="py-3.5 pr-4 font-bold text-sm text-[#1A1612]">
                        {r.platform}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className={isHighlight ? 'text-base font-bold text-[#4A7A3A]' : 'text-sm font-semibold text-[#1A1612]'}>
                          {r.rating}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[#5A5448]">
                        {r.max}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[#5A5448]">
                        {r.contests}
                      </td>
                      <td className="py-3.5 pl-4 text-right">
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
          <div className="pt-3 border-t border-[#D0C9BA]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="label-mono text-[10px] text-[#5A5448] font-bold">
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

          {/* EDITORIAL SEGMENTED DIFFICULTY CARD */}
          <div className="p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
                  DIFFICULTY DISTRIBUTION
                </h3>
                <p className="text-[11px] text-[#5A5448] mt-0.5">
                  Over 65% in Medium & Hard interview problems
                </p>
              </div>
              <span className="label-mono text-xs font-bold px-2.5 py-1 rounded bg-[#E5E0D5] text-[#1A1612]">
                {dsaTotal} SOLVED
              </span>
            </div>

            {/* SEGMENTED PROGRESS BAR */}
            <div className="h-4 w-full bg-[#E5E0D5] rounded-full overflow-hidden flex gap-1 p-0.5 border border-[#D0C9BA]">
              <div
                onMouseEnter={() => setHoveredSegment('easy')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`h-full bg-[#4A7A3A] rounded-full transition-all duration-200 cursor-pointer ${
                  hoveredSegment === 'easy' ? 'brightness-110 scale-y-110' : ''
                }`}
                style={{ width: `${easyPct}%` }}
                title={`Easy: ${easyCount} (${easyPct}%)`}
              />
              <div
                onMouseEnter={() => setHoveredSegment('medium')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`h-full bg-[#D9A45C] rounded-full transition-all duration-200 cursor-pointer ${
                  hoveredSegment === 'medium' ? 'brightness-110 scale-y-110' : ''
                }`}
                style={{ width: `${medPct}%` }}
                title={`Medium: ${medCount} (${medPct}%)`}
              />
              <div
                onMouseEnter={() => setHoveredSegment('hard')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`h-full bg-[#A84438] rounded-full transition-all duration-200 cursor-pointer ${
                  hoveredSegment === 'hard' ? 'brightness-110 scale-y-110' : ''
                }`}
                style={{ width: `${hardPct}%` }}
                title={`Hard: ${hardCount} (${hardPct}%)`}
              />
            </div>

            {/* 3 DIFFICULTY DETAIL CARDS */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {/* EASY */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  hoveredSegment === 'easy'
                    ? 'border-[#4A7A3A] bg-[#F2F7F0]'
                    : 'border-[#E0D9CB] bg-[#FBF9F5]'
                }`}
              >
                <div className="flex items-center gap-1.5 label-mono text-[10px] text-[#4A7A3A] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#4A7A3A]" />
                  <span>EASY</span>
                </div>
                <div className="text-xl font-black text-[#1A1612] font-['Space_Grotesk'] mt-1">
                  {easyCount}
                </div>
                <div className="text-[10px] text-[#5A5448] font-mono">
                  {easyPct}% of DSA
                </div>
              </div>

              {/* MEDIUM */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  hoveredSegment === 'medium'
                    ? 'border-[#D9A45C] bg-[#FAF5EC]'
                    : 'border-[#E0D9CB] bg-[#FBF9F5]'
                }`}
              >
                <div className="flex items-center gap-1.5 label-mono text-[10px] text-[#B87D2E] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#D9A45C]" />
                  <span>MEDIUM</span>
                </div>
                <div className="text-xl font-black text-[#1A1612] font-['Space_Grotesk'] mt-1">
                  {medCount}
                </div>
                <div className="text-[10px] text-[#5A5448] font-mono">
                  {medPct}% of DSA
                </div>
              </div>

              {/* HARD */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  hoveredSegment === 'hard'
                    ? 'border-[#A84438] bg-[#F8EEEE]'
                    : 'border-[#E0D9CB] bg-[#FBF9F5]'
                }`}
              >
                <div className="flex items-center gap-1.5 label-mono text-[10px] text-[#A84438] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#A84438]" />
                  <span>HARD</span>
                </div>
                <div className="text-xl font-black text-[#1A1612] font-['Space_Grotesk'] mt-1">
                  {hardCount}
                </div>
                <div className="text-[10px] text-[#5A5448] font-mono">
                  {hardPct}% of DSA
                </div>
              </div>
            </div>
          </div>

          {/* TOP TOPICS CARD */}
          <div className="p-6 bg-[#FFFFFF]/85 backdrop-blur-md border border-[#D0C9BA] rounded-2xl space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#D0C9BA]/60 pb-2">
              <h3 className="label-mono text-xs font-bold text-[#1A1612] tracking-widest">
                CORE ALGORITHMIC DOMAINS
              </h3>
              <span className="label-mono text-[10px] text-[#5A5448]">
                TOP TOPICS BY PROBLEM COUNT
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {dsa.topTopics.map((topic) => (
                <span
                  key={topic.name}
                  className="px-3 py-1.5 bg-[#F5F2EA] border border-[#D0C9BA] text-[#1A1612] text-xs font-medium rounded-lg flex items-center gap-2 hover:border-[#4A7A3A] transition-colors"
                >
                  <span>{topic.name}</span>
                  <span className="px-1.5 py-0.5 bg-[#E5E0D5] text-[#4A7A3A] font-mono text-[10px] font-bold rounded">
                    {topic.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. FOOTER STRIP */}
      <div className="p-4 sm:p-5 bg-[#FFFFFF]/70 border border-[#D0C9BA] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <span className="label-mono text-xs text-[#5A5448]">
          Updated {dsa.lastUpdated} · Verified from competitive profiles & Codolio
        </span>

        <a
          href={dsa.links.codolio}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono text-xs font-bold text-[#4A7A3A] hover:text-[#1A1612] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5E0D5] hover:bg-[#D0C9BA]"
        >
          <span>VIEW CODOLIO PROFILE</span>
          <span>→</span>
        </a>
      </div>

    </section>
  )
}
