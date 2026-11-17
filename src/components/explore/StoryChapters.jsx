import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_MILESTONES, DOMAINS, STORY_PROJECTS, STORY_CERTIFICATES, EXPLORING_TOPICS, SOCIAL } from "../../data/storyData";
import { dsa } from "../../data/dsa";

gsap.registerPlugin(ScrollTrigger);

// ─── AMBIENT STYLES ──────────────────────────────────────────────────────────
const AMBIENT_CSS = `
/* Marquee */
@keyframes cert-spin {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.cert-marquee-track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
  animation: cert-spin 28s linear infinite;
  will-change: transform;
}
.cert-marquee-track:hover { animation-play-state: paused; }

/* Leaf float animations */
@keyframes leaf-drift-1 {
  0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.55; }
  30%  { transform: translateY(-18px) translateX(8px) rotate(12deg); }
  60%  { transform: translateY(-6px) translateX(-5px) rotate(-6deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.55; }
}
@keyframes leaf-drift-2 {
  0%   { transform: translateY(0px) translateX(0px) rotate(-5deg); opacity: 0.4; }
  40%  { transform: translateY(-22px) translateX(-10px) rotate(8deg); }
  70%  { transform: translateY(-8px) translateX(6px) rotate(-14deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(-5deg); opacity: 0.4; }
}
@keyframes leaf-drift-3 {
  0%   { transform: translateY(0px) translateX(0px) rotate(15deg); opacity: 0.3; }
  50%  { transform: translateY(-14px) translateX(12px) rotate(28deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(15deg); opacity: 0.3; }
}
@keyframes leaf-drift-4 {
  0%   { transform: translateY(0px) rotate(-10deg); opacity: 0.5; }
  35%  { transform: translateY(-20px) translateX(-8px) rotate(5deg); }
  65%  { transform: translateY(-10px) translateX(4px) rotate(-18deg); }
  100% { transform: translateY(0px) rotate(-10deg); opacity: 0.5; }
}
@keyframes leaf-drift-5 {
  0%   { transform: translateY(0px) translateX(0px) rotate(20deg); opacity: 0.35; }
  45%  { transform: translateY(-16px) translateX(-6px) rotate(35deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(20deg); opacity: 0.35; }
}

.leaf-1 { animation: leaf-drift-1 6.5s ease-in-out infinite; }
.leaf-2 { animation: leaf-drift-2 8.2s ease-in-out infinite; animation-delay: -2.1s; }
.leaf-3 { animation: leaf-drift-3 7.0s ease-in-out infinite; animation-delay: -4.3s; }
.leaf-4 { animation: leaf-drift-4 9.1s ease-in-out infinite; animation-delay: -1.7s; }
.leaf-5 { animation: leaf-drift-5 5.8s ease-in-out infinite; animation-delay: -3.5s; }
.leaf-6 { animation: leaf-drift-1 10.2s ease-in-out infinite; animation-delay: -5.9s; }
.leaf-7 { animation: leaf-drift-3 7.6s ease-in-out infinite; animation-delay: -0.8s; }
`;

// ─── LEAF SVG ─────────────────────────────────────────────────────────────────
function Leaf({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 40 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      style={style}
    >
      <path
        d="M20 2C20 2 38 14 36 32C34 46 20 52 20 52C20 52 6 46 4 32C2 14 20 2 20 2Z"
        fill="#3B5E2A"
        opacity="0.85"
      />
      <path
        d="M20 2C20 2 28 14 27 30C26 42 20 52 20 52"
        stroke="#4A7A3A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M20 18C20 18 26 24 25 32" stroke="#5A9040" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <path d="M20 22C20 22 15 28 16 35" stroke="#5A9040" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// ─── AMBIENT QUOTE (scattered italic text) ────────────────────────────────────
function AmbientQuote({ text, className = "" }) {
  return (
    <p
      className={`absolute pointer-events-none select-none font-['Space_Grotesk'] italic text-[#4A7A3A]/50 text-[10px] sm:text-xs leading-snug tracking-wider uppercase ${className}`}
      style={{ fontStyle: "italic" }}
    >
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">{line}</span>
      ))}
    </p>
  );
}

// ─── PER-CHAPTER AMBIENT CONFIGS ─────────────────────────────────────────────
// Only floating leaves remain here. Quotes are shown via click popup (ExplorePage).
const AMBIENT = {
  intro: {
    leaves: [
      { cls: "leaf-1 w-8 h-10", style: { top: "12%", left: "8%" } },
      { cls: "leaf-2 w-6 h-8",  style: { top: "25%", right: "6%" } },
      { cls: "leaf-3 w-10 h-12",style: { bottom: "20%", left: "15%" } },
      { cls: "leaf-5 w-7 h-9",  style: { top: "60%", right: "12%" } },
    ],
  },
  about: {
    leaves: [
      { cls: "leaf-2 w-7 h-9",  style: { top: "10%", left: "4%" } },
      { cls: "leaf-4 w-9 h-11", style: { top: "45%", left: "2%" } },
      { cls: "leaf-1 w-5 h-7",  style: { bottom: "15%", left: "8%" } },
      { cls: "leaf-6 w-6 h-8",  style: { top: "20%", right: "3%" } },
    ],
  },
  journey: {
    leaves: [
      { cls: "leaf-1 w-8 h-10", style: { top: "8%",  right: "8%" } },
      { cls: "leaf-3 w-10 h-12",style: { top: "35%", right: "4%" } },
      { cls: "leaf-2 w-6 h-8",  style: { bottom: "25%", right: "10%" } },
      { cls: "leaf-5 w-7 h-9",  style: { top: "60%", right: "2%" } },
      { cls: "leaf-7 w-5 h-7",  style: { bottom: "12%", right: "6%" } },
    ],
  },
  whatibuild: {
    leaves: [
      { cls: "leaf-4 w-8 h-10", style: { top: "15%", left: "5%" } },
      { cls: "leaf-1 w-6 h-8",  style: { top: "50%", left: "2%" } },
      { cls: "leaf-3 w-9 h-11", style: { bottom: "18%", left: "8%" } },
      { cls: "leaf-6 w-5 h-7",  style: { top: "30%", right: "4%" } },
    ],
  },
  projects: {
    leaves: [
      { cls: "leaf-2 w-7 h-9",  style: { top: "6%",  right: "4%" } },
      { cls: "leaf-5 w-9 h-11", style: { top: "30%", right: "2%" } },
      { cls: "leaf-1 w-6 h-8",  style: { top: "55%", right: "6%" } },
      { cls: "leaf-4 w-8 h-10", style: { bottom: "10%", right: "3%" } },
    ],
  },
  practice: {
    leaves: [
      { cls: "leaf-1 w-8 h-10", style: { top: "10%", right: "6%" } },
      { cls: "leaf-4 w-7 h-9",  style: { top: "35%", right: "2%" } },
      { cls: "leaf-2 w-9 h-11", style: { bottom: "20%", right: "8%" } },
      { cls: "leaf-5 w-6 h-8",  style: { bottom: "8%", right: "4%" } },
    ],
  },
  certificates: {
    leaves: [
      { cls: "leaf-3 w-8 h-10", style: { top: "8%",  left: "5%" } },
      { cls: "leaf-6 w-6 h-8",  style: { top: "25%", right: "5%" } },
      { cls: "leaf-1 w-9 h-11", style: { bottom: "22%", left: "4%" } },
      { cls: "leaf-4 w-5 h-7",  style: { bottom: "10%", right: "6%" } },
    ],
  },
  exploring: {
    leaves: [
      { cls: "leaf-2 w-9 h-11", style: { top: "10%", left: "4%" } },
      { cls: "leaf-5 w-7 h-9",  style: { top: "38%", left: "2%" } },
      { cls: "leaf-3 w-6 h-8",  style: { bottom: "20%", left: "6%" } },
      { cls: "leaf-1 w-8 h-10", style: { top: "65%", right: "5%" } },
    ],
  },
  ending: {
    leaves: [
      { cls: "leaf-1 w-8 h-10", style: { top: "12%", left: "6%" } },
      { cls: "leaf-4 w-6 h-8",  style: { top: "12%", right: "6%" } },
      { cls: "leaf-2 w-10 h-12",style: { bottom: "18%", left: "5%" } },
      { cls: "leaf-6 w-7 h-9",  style: { bottom: "18%", right: "5%" } },
      { cls: "leaf-3 w-5 h-7",  style: { top: "50%", left: "3%" } },
      { cls: "leaf-5 w-5 h-7",  style: { top: "50%", right: "3%" } },
    ],
  },
};

// ─── AMBIENT LAYER (leaves only — quotes moved to click popup) ─────────────────────
function AmbientLayer({ section }) {
  const config = AMBIENT[section];
  if (!config) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {config.leaves.map((l, i) => (
        <Leaf key={`leaf-${i}`} className={l.cls} style={{ position: "absolute", ...l.style }} />
      ))}
    </div>
  );
}

// ─── EVIDENCE / PROJECTS SECTION (CHAPTER 05) ─────────────────────────────────
function ProjectsExploreSection() {
  const [page, setPage] = useState(0); // 0: projects 0 & 1; 1: projects 2 & 3; 2: projects 4 & 5
  const touchStartX = useRef(null);

  const totalPages = Math.ceil(STORY_PROJECTS.length / 2); // 3 pages (2 cards per page)
  const currentPair = STORY_PROJECTS.slice(page * 2, page * 2 + 2);

  const handlePrev = () => setPage((p) => (p > 0 ? p - 1 : totalPages - 1));
  const handleNext = () => setPage((p) => (p < totalPages - 1 ? p + 1 : 0));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const pairLabels = [
    '01–02 / AI & RANKING',
    '03–04 / DIGITAL TWINS',
    '05–06 / EDGE & WORKFLOWS',
  ];

  return (
    <div className="relative z-10 story-reveal space-y-6" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">05 / EVIDENCE</span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
            LEARNING IS GOOD.<br />
            <span className="text-[#6B9A55]">BUILDING IS BETTER.</span>
          </h2>
        </div>

        {/* Controls: Prev / Next & Pair Indicator */}
        <div className="flex items-center gap-2 pointer-events-auto shrink-0">
          <button
            onClick={handlePrev}
            aria-label="Previous projects"
            className="px-3 py-1.5 rounded-lg bg-[#121418] border border-[#1F2228] text-xs font-mono text-[#8E929B] hover:text-[#F0EDE8] hover:border-[#4A7A3A] transition-all cursor-pointer select-none"
          >
            ← PREV
          </button>
          <span className="label-mono text-[10px] text-[#6B9A55] font-bold px-1.5 whitespace-nowrap">
            {pairLabels[page]}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next projects"
            className="px-3 py-1.5 rounded-lg bg-[#121418] border border-[#1F2228] text-xs font-mono text-[#8E929B] hover:text-[#F0EDE8] hover:border-[#4A7A3A] transition-all cursor-pointer select-none"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* 2 Visible Project Cards */}
      <div className="space-y-6 min-h-[560px]">
        {currentPair.map((proj) => (
          <div
            key={proj.id || proj.number}
            className="p-5 sm:p-6 bg-[#121418]/90 border border-[#1F2228] rounded-2xl backdrop-blur-md space-y-3.5 hover:border-[#4A7A3A] transition-all duration-300 pointer-events-auto shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="label-mono text-xs text-[#6B9A55] font-bold shrink-0">
                {proj.number} / {proj.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F0EDE8] font-['Space_Grotesk'] text-right">
                {proj.name}
              </h3>
            </div>

            <p className="text-xs font-semibold text-[#8E929B] font-mono">{proj.tagline}</p>

            {/* Verified Metrics Line */}
            {Array.isArray(proj.metrics) && proj.metrics.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 bg-[#0B0C0E] border border-[#1F2228] rounded-lg">
                <span className="label-mono text-[9px] text-[#8E929B] font-bold uppercase tracking-wider">
                  METRICS:
                </span>
                <span className="label-mono text-[10px] text-[#6B9A55] font-semibold">
                  {proj.metrics.join(" · ")}
                </span>
              </div>
            )}

            <p className="text-xs text-[#8E929B] leading-relaxed">{proj.description || ""}</p>

            {/* Pipeline Box */}
            {Array.isArray(proj.pipeline) && proj.pipeline.length > 0 && (
              <div className="p-3 bg-[#0B0C0E] border border-[#1F2228] rounded-xl space-y-1.5">
                <p className="label-mono text-[8px] text-[#6B9A55] tracking-widest font-bold">PIPELINE</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {proj.pipeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#121418] border border-[#1F2228] text-[10px] font-mono text-[#F0EDE8] rounded">
                        {step}
                      </span>
                      {i < proj.pipeline.length - 1 && <span className="text-[10px] text-[#6B9A55]">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {Array.isArray(proj.tech) && proj.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#1F2228] text-[#6B9A55] label-mono text-[10px] rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4 pt-2 border-t border-[#1F2228]/50">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[10px] text-[#6B9A55] hover:text-[#F0EDE8] transition-colors font-bold"
                >
                  GITHUB REPO →
                </a>
              )}
              {proj.live && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[10px] text-[#6B9A55] hover:text-[#F0EDE8] transition-colors font-bold"
                >
                  LIVE DEMO →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 pt-1 pointer-events-auto">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            aria-label={`Go to project pair ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              page === idx ? "w-8 bg-[#6B9A55]" : "w-2 bg-[#1F2228] hover:bg-[#5A5448]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PRACTICE & PROBLEM SOLVING SECTION (CHAPTER 06) ─────────────────────────
function PracticeSection() {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState({
    codechef: 0,
    codeforces: 0,
    atcoder: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ccTarget = dsa.ratings.find((r) => r.platform === "CodeChef")?.rating || 1438;
    const cfTarget = dsa.ratings.find((r) => r.platform === "Codeforces")?.rating || 1130;
    const acTarget = dsa.ratings.find((r) => r.platform === "AtCoder")?.rating || 575;

    if (prefersReducedMotion) {
      setCounts({
        codechef: ccTarget,
        codeforces: cfTarget,
        atcoder: acTarget,
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const obj = { cc: 0, cf: 0, ac: 0 };
          gsap.to(obj, {
            cc: ccTarget,
            cf: cfTarget,
            ac: acTarget,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              setCounts({
                codechef: Math.round(obj.cc),
                codeforces: Math.round(obj.cf),
                atcoder: Math.round(obj.ac),
              });
            },
          });

          gsap.fromTo(
            ".dsa-topic-bar-fill",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "power2.out", stagger: 0.06, transformOrigin: "left" }
          );

          gsap.fromTo(
            ".dsa-split-seg",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "power2.out", stagger: 0.1, transformOrigin: "left" }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const easyCount = dsa.breakdown.dsa.easy;
  const medCount  = dsa.breakdown.dsa.medium;
  const hardCount = dsa.breakdown.dsa.hard;
  const dsaTotal  = dsa.breakdown.dsa.total; // 181

  const easyPct = ((easyCount / dsaTotal) * 100).toFixed(1);
  const medPct  = ((medCount / dsaTotal) * 100).toFixed(1);
  const hardPct = ((hardCount / dsaTotal) * 100).toFixed(1);

  const codechef   = dsa.ratings.find((r) => r.platform === "CodeChef");
  const codeforces = dsa.ratings.find((r) => r.platform === "Codeforces");
  const atcoder    = dsa.ratings.find((r) => r.platform === "AtCoder");

  return (
    <div ref={containerRef} className="relative z-10 story-reveal space-y-6">
      {/* 1. Header */}
      <div className="space-y-2">
        <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">
          06 / PRACTICE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
          PROBLEM SOLVING.
        </h2>
        <p className="text-xs sm:text-sm text-[#A0A6B2] font-mono leading-relaxed pt-1">
          Learning is good. Building is better. Practice is the proof.
        </p>
      </div>

      {/* 2. Rating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pointer-events-auto">
        {/* CodeChef */}
        <div className="p-4 bg-[#121418]/90 border border-[#1F2228] hover:border-[#4A7A3A] rounded-2xl backdrop-blur-md transition-all duration-300 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="label-mono text-[10px] text-[#6B9A55] font-bold tracking-widest">
              CODECHEF
            </span>
            <span className="label-mono text-[9px] text-[#A0A6B2] font-semibold">
              {codechef?.note}
            </span>
          </div>
          <div className="font-['Space_Grotesk'] font-black text-3xl sm:text-4xl text-[#F0EDE8] tracking-tight">
            {counts.codechef}
          </div>
          <div className="flex items-center justify-between text-[10px] label-mono text-[#8E929B] pt-1 border-t border-[#1F2228]">
            <span>MAX: {codechef?.max}</span>
            <span>{codechef?.contests} CONTESTS</span>
          </div>
        </div>

        {/* Codeforces */}
        <div className="p-4 bg-[#121418]/90 border border-[#1F2228] hover:border-[#4A7A3A] rounded-2xl backdrop-blur-md transition-all duration-300 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="label-mono text-[10px] text-[#6B9A55] font-bold tracking-widest">
              CODEFORCES
            </span>
            <span className="label-mono text-[9px] text-[#A0A6B2] font-semibold">
              {codeforces?.note}
            </span>
          </div>
          <div className="font-['Space_Grotesk'] font-black text-3xl sm:text-4xl text-[#F0EDE8] tracking-tight">
            {counts.codeforces}
          </div>
          <div className="flex items-center justify-between text-[10px] label-mono text-[#8E929B] pt-1 border-t border-[#1F2228]">
            <span>MAX: {codeforces?.max}</span>
            <span>{codeforces?.contests} CONTESTS</span>
          </div>
        </div>

        {/* AtCoder */}
        <div className="p-4 bg-[#121418]/90 border border-[#1F2228] hover:border-[#4A7A3A] rounded-2xl backdrop-blur-md transition-all duration-300 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="label-mono text-[10px] text-[#6B9A55] font-bold tracking-widest">
              ATCODER
            </span>
            <span className="label-mono text-[9px] text-[#A0A6B2] font-semibold">
              RATING
            </span>
          </div>
          <div className="font-['Space_Grotesk'] font-black text-3xl sm:text-4xl text-[#F0EDE8] tracking-tight">
            {counts.atcoder}
          </div>
          <div className="flex items-center justify-between text-[10px] label-mono text-[#8E929B] pt-1 border-t border-[#1F2228]">
            <span>MAX: {atcoder?.max}</span>
            <span>{atcoder?.contests} CONTESTS</span>
          </div>
        </div>
      </div>

      {/* 3. Difficulty Split */}
      <div className="p-4 sm:p-5 bg-[#121418]/90 border border-[#1F2228] rounded-2xl backdrop-blur-md space-y-3 pointer-events-auto">
        <div className="flex items-center justify-between text-xs label-mono">
          <span className="text-[#F0EDE8] font-bold tracking-wider">DIFFICULTY BREAKDOWN</span>
          <span className="text-[#6B9A55] font-bold">{dsaTotal} DSA SOLVED</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-[#0B0C0E] rounded-full overflow-hidden flex gap-1 p-0.5 border border-[#1F2228]">
          <div
            className="dsa-split-seg h-full bg-[#22C55E] rounded-sm"
            style={{ width: `${easyPct}%` }}
            title={`Easy: ${easyCount}`}
          />
          <div
            className="dsa-split-seg h-full bg-[#EAB308] rounded-sm"
            style={{ width: `${medPct}%` }}
            title={`Medium: ${medCount}`}
          />
          <div
            className="dsa-split-seg h-full bg-[#EF4444] rounded-sm"
            style={{ width: `${hardPct}%` }}
            title={`Hard: ${hardCount}`}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[10px] label-mono pt-1">
          <div className="flex items-center gap-1.5 text-[#F0EDE8]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>EASY <strong className="text-[#22C55E]">{easyCount}</strong> ({easyPct}%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F0EDE8]">
            <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
            <span>MEDIUM <strong className="text-[#EAB308]">{medCount}</strong> ({medPct}%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F0EDE8]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span>HARD <strong className="text-[#EF4444]">{hardCount}</strong> ({hardPct}%)</span>
          </div>
        </div>
      </div>

      {/* 4. Top Topics */}
      <div className="p-4 sm:p-5 bg-[#121418]/90 border border-[#1F2228] rounded-2xl backdrop-blur-md space-y-3 pointer-events-auto">
        <div className="flex items-center justify-between text-xs label-mono">
          <span className="text-[#F0EDE8] font-bold tracking-wider">CORE ALGORITHMIC TOPICS</span>
          <span className="text-[#8E929B] text-[10px]">LEADERBOARD TOPICS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
          {dsa.topTopics.map((topic, idx) => {
            const pct = Math.round((topic.count / 89) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Space_Grotesk'] text-[#F0EDE8] font-semibold text-[11px] truncate">
                    {topic.name}
                  </span>
                  <span className="label-mono text-[10px] text-[#6B9A55] font-bold">
                    {topic.count}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#0B0C0E] rounded-full overflow-hidden border border-[#1F2228]/50">
                  <div
                    className="dsa-topic-bar-fill h-full bg-gradient-to-r from-[#4A7A3A] to-[#6B9A55] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Footer Line & Codolio Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1F2228] pointer-events-auto">
        <div className="label-mono text-[11px] text-[#A0A6B2]">
          {dsa.totals.solved} solved · {dsa.totals.contests} contests · updated {dsa.lastUpdated}
        </div>
        <a
          href={dsa.links.codolio}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono text-xs text-[#6B9A55] hover:text-[#F0EDE8] transition-colors font-bold inline-flex items-center gap-1.5"
        >
          CODOLIO PROFILE →
        </a>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function StoryChapters({ onNavigateBack, onNavigate }) {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const doubleCerts = [...STORY_CERTIFICATES, ...STORY_CERTIFICATES];

  return (
    <>
      <style>{AMBIENT_CSS}</style>
      <div className="relative z-10 w-full pointer-events-none">

        {/* ================================================================ */}
        {/* CHAPTER 01 — INTRO                                               */}
        {/* ================================================================ */}
        <section
          id="hello"
          data-section="intro"
          className="relative h-[100vh] w-full grid overflow-hidden"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          <AmbientLayer section="intro" />

          {/* LEFT — "NARAYAN" */}
          <div className="relative z-10 flex flex-col justify-center items-end pr-6 sm:pr-10 lg:pr-14 pl-8">
            <div className="text-right space-y-4">
              <span className="label-mono text-[10px] sm:text-xs text-[#2D4A1E] tracking-[0.35em] font-bold block">
                01 / INTRO
              </span>
              <h1
                className="font-black italic tracking-tighter text-[#1A1612] font-['Space_Grotesk'] leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
              >
                NARAYAN
              </h1>
              <p className="label-mono text-xs sm:text-sm text-[#444038] tracking-[0.25em] font-bold">BUILDING.</p>
              <p className="label-mono text-xs sm:text-sm text-[#5A5448] tracking-[0.2em] font-semibold">LEARNING.</p>
            </div>
          </div>

          {/* CENTER GAP */}
          <div className="w-[28vw] lg:w-[32vw]" />

          {/* RIGHT — "SINGH" */}
          <div className="relative z-10 flex flex-col justify-center items-start pl-6 sm:pl-10 lg:pl-14 pr-8">
            <div className="text-left space-y-4">
              <span className="label-mono text-[10px] sm:text-xs text-[#2D4A1E] tracking-[0.35em] font-bold block">
                SCULPTURE & CODE
              </span>
              <h1
                className="font-black italic tracking-tighter text-[#1A1612] font-['Space_Grotesk'] leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
              >
                SINGH
              </h1>
              <p className="label-mono text-xs sm:text-sm text-[#444038] tracking-[0.25em] font-bold">EVOLVING.</p>
              <p className="text-xs text-[#2D4A1E] font-mono tracking-widest font-bold animate-pulse pt-2">↓ SCROLL</p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 02 — IDENTITY                                            */}
        {/* ================================================================ */}
        <section id="whoami" data-section="about" className="relative h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-xl ml-auto overflow-hidden">
          <AmbientLayer section="about" />
          <div className="relative z-10 story-reveal space-y-6">
            <span className="label-mono text-xs text-[#2D4A1E] tracking-[0.3em] font-bold">02 / IDENTITY</span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#1A1612] font-['Space_Grotesk'] leading-tight">
              I'M A COMPUTER SCIENCE STUDENT.
            </h2>
            <p className="text-base sm:text-lg text-[#332F28] font-medium leading-relaxed">
              Passionate about Full-Stack Engineering, Machine Learning, and Cloud Systems.
            </p>
            <div className="p-5 bg-[#121418]/90 border border-[#1F2228] rounded-2xl backdrop-blur-md space-y-2 shadow-xl">
              <p className="label-mono text-xs text-[#6B9A55] font-bold tracking-wider">PHILOSOPHY</p>
              <p className="text-sm text-[#F0EDE8] leading-relaxed">
                "Curiosity is good. Obsession is better. Writing clean code that solves real human problems is the best."
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 03 — THE JOURNEY                                         */}
        {/* ================================================================ */}
        <section id="journey" data-section="journey" className="relative min-h-[110vh] pt-20 pb-12 px-8 sm:px-16 max-w-xl flex flex-col justify-center overflow-hidden">
          <AmbientLayer section="journey" />
          <div className="relative z-10 story-reveal space-y-6">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">03 / EVOLUTION</span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              THE JOURNEY.
            </h2>
            <p className="text-sm sm:text-base text-[#8E929B] font-mono">
              Academic record from secondary education through B.Tech CSE semesters.
            </p>
            <div className="space-y-5 relative border-l-2 border-[#1F2228] pl-6 ml-2">
              {JOURNEY_MILESTONES.map((item, idx) => (
                <div key={idx} className="relative group space-y-1">
                  <div
                    className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 ${
                      item.active
                        ? "bg-[#6B9A55] border-[#6B9A55] ring-4 ring-[#4A7A3A]/30"
                        : "bg-[#0B0C0E] border-[#5A5448]"
                    }`}
                  />
                  <h3 className="text-base sm:text-lg font-bold text-[#F0EDE8] font-['Space_Grotesk']">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-[#8E929B]">{item.sub}</p>
                  <span className="inline-block px-2.5 py-0.5 bg-[#121418] border border-[#1F2228] text-[#6B9A55] label-mono text-[9px] font-bold rounded mt-1">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 04 — WHAT I BUILD                                        */}
        {/* ================================================================ */}
        <section id="whatibuild" data-section="whatibuild" className="relative h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-2xl ml-auto text-right overflow-hidden">
          <AmbientLayer section="whatibuild" />
          <div className="relative z-10 story-reveal space-y-8">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">04 / DOMAINS</span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              WHAT I BUILD
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {DOMAINS.map((d, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#121418]/80 border border-[#1F2228] rounded-xl backdrop-blur-md space-y-2 hover:border-[#4A7A3A] transition-colors pointer-events-auto"
                >
                  <span className="label-mono text-xs text-[#6B9A55] font-bold">{d.label}</span>
                  <p className="text-sm font-bold text-[#F0EDE8] font-['Space_Grotesk']">"{d.description}"</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(d.tech || []).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#1F2228] text-[#8E929B] label-mono text-[9px] rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 05 — PROJECTS                                            */}
        {/* ================================================================ */}
        <section id="projects" data-section="projects" className="relative min-h-[135vh] pt-20 pb-12 px-8 sm:px-16 overflow-hidden w-full md:max-w-[54vw]">
          <AmbientLayer section="projects" />
          <ProjectsExploreSection />
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 06 — PRACTICE (PROBLEM SOLVING)                           */}
        {/* ================================================================ */}
        <section
          id="practice"
          data-section="practice"
          className="relative min-h-[115vh] pt-20 pb-16 px-8 sm:px-16 overflow-hidden flex flex-col justify-center w-full md:max-w-[56vw]"
        >
          <AmbientLayer section="practice" />
          <PracticeSection />
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 07 — CERTIFICATES                                        */}
        {/* Layout: heading TOP | 3D model CENTERED (canvas) | certs BOTTOM  */}
        {/* ================================================================ */}
        <section id="certificates" data-section="certificates" className="relative h-[100vh] flex flex-col justify-between items-center px-4 sm:px-8 pt-20 pb-8 overflow-hidden">
          <AmbientLayer section="certificates" />

          {/* TOP — chapter label + title */}
          <div className="relative z-10 story-reveal text-center space-y-2">
            <span className="label-mono text-xs text-[#F59E0B] tracking-[0.35em] font-bold">07 / CREDENTIALS</span>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              PROVEN EXPERTISE.
            </h2>
            <p className="text-[11px] sm:text-xs text-[#8E929B] font-mono">
              Hover to pause • Click card for credential details
            </p>
          </div>

          {/* MIDDLE — transparent, 3D canvas model shows through here */}
          <div className="flex-1 min-h-[120px]" />

          {/* BOTTOM — cert marquee, driven by GSAP */}
          <div
            className="cert-track-wrapper relative z-10 w-full overflow-hidden pb-2"
            style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
          >
            <div className="cert-marquee-track">
              {doubleCerts.map((cert, idx) => (
                <div
                  key={`${cert.id}-${idx}`}
                  onClick={() => setSelectedCert(cert)}
                  className="w-[260px] sm:w-[300px] bg-[#121418]/90 border border-[#1F2228] hover:border-[#F59E0B] rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.03] backdrop-blur-md shadow-xl shrink-0 group flex flex-col gap-3 pointer-events-auto"
                >
                  <div className="w-full h-32 bg-[#0B0C0E] rounded-xl overflow-hidden border border-[#1F2228] flex items-center justify-center p-2 relative">
                    <img src={cert.image} alt={cert.alt} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="label-mono text-xs text-[#F59E0B] font-bold bg-[#121418]/90 px-3 py-1.5 rounded-full border border-[#F59E0B]">VIEW DETAILS ↗</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[#1F2228] text-[#F59E0B] label-mono text-[9px] font-bold rounded">{cert.type}</span>
                      <span className="label-mono text-[9px] text-[#8E929B]">{cert.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#F0EDE8] font-['Space_Grotesk'] group-hover:text-[#F59E0B] transition-colors leading-snug line-clamp-2">{cert.title}</h3>
                    <p className="text-[10px] text-[#8E929B] font-mono">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="label-mono text-[8px] text-[#6B9A55]">ID: <span className="text-[#5A5A6A] font-normal">{cert.credentialId}</span></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CERTIFICATE MODAL */}
        {selectedCert && (
          <div onClick={() => setSelectedCert(null)} className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 pointer-events-auto">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#121418] border border-[#F59E0B] rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
              <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F2228] text-[#F0EDE8] hover:bg-[#F59E0B] hover:text-black transition-colors flex items-center justify-center text-sm font-mono cursor-pointer">✕</button>
              <div className="rounded-xl overflow-hidden bg-[#0B0C0E] border border-[#1F2228] flex items-center justify-center p-2">
                <img src={selectedCert.image} alt={selectedCert.alt} className="max-h-[50vh] w-auto object-contain rounded-lg" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#1F2228] text-[#F59E0B] label-mono text-xs font-bold rounded">{selectedCert.type}</span>
                  <span className="label-mono text-xs text-[#8E929B]">ISSUED: {selectedCert.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F0EDE8] font-['Space_Grotesk']">{selectedCert.title}</h3>
                <p className="text-sm text-[#8E929B] font-mono">ISSUING ORGANIZATION: <span className="text-[#F0EDE8] font-bold">{selectedCert.issuer}</span></p>
                <p className="text-sm text-[#8E929B] leading-relaxed">{selectedCert.detail}</p>
                {selectedCert.credentialId && (
                  <p className="label-mono text-xs text-[#6B9A55]">CREDENTIAL ID: <span className="text-[#F0EDE8] font-mono">{selectedCert.credentialId}</span></p>
                )}
                {selectedCert.verifyUrl && (
                  <div className="pt-2">
                    <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 bg-[#4A7A3A] hover:bg-[#3B632E] text-white label-mono text-xs font-bold rounded-lg transition-colors">VERIFY CREDENTIAL →</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* CHAPTER 08 — STILL EXPLORING                                     */}
        {/* ================================================================ */}
        <section id="exploring" data-section="exploring" className="relative h-[100vh] flex flex-col justify-center px-8 sm:px-16 max-w-xl ml-auto overflow-hidden">
          <AmbientLayer section="exploring" />
          <div className="relative z-10 story-reveal space-y-6">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.3em] font-bold">08 / HORIZON</span>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tight text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              STILL EXPLORING.
            </h2>
            <p className="text-sm text-[#8E929B] font-mono">Active areas of experimentation and engineering depth.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pointer-events-auto">
              {EXPLORING_TOPICS.map((topic, idx) => (
                <div key={idx} className="p-4 bg-[#121418]/80 border border-[#1F2228] rounded-xl backdrop-blur-md space-y-1 hover:border-[#4A7A3A] transition-colors">
                  <h3 className="label-mono text-xs font-bold text-[#6B9A55]">{topic.label}</h3>
                  <p className="text-xs text-[#8E929B]">{topic.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CHAPTER 09 — FINALE                                              */}
        {/* ================================================================ */}
        <section id="ending" data-section="ending" className="relative h-[100vh] flex flex-col justify-center items-center px-8 text-center max-w-2xl mx-auto overflow-hidden">
          <AmbientLayer section="ending" />
          <div className="relative z-10 story-reveal space-y-8 pointer-events-auto">
            <span className="label-mono text-xs text-[#6B9A55] tracking-[0.35em] font-bold">09 / FINALE</span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-[#F0EDE8] font-['Space_Grotesk'] leading-none">
              LET'S BUILD<br />SOMETHING.
            </h2>
            <div className="space-y-2">
              <p className="label-mono text-base font-bold text-[#F0EDE8] tracking-widest">NARAYAN SINGH</p>
              <p className="label-mono text-xs text-[#6B9A55] tracking-[0.25em]">COMPUTER SCIENCE • ML & FULL STACK</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => (onNavigate ? onNavigate('recruiter') : window.location.assign('/recruiter'))}
                className="px-6 py-3 bg-[#EBE7DF] hover:bg-[#FFFFFF] text-[#1A1612] label-mono text-xs font-bold rounded-lg transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                RECRUITER VIEW & RESUME →
              </button>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#121418] hover:bg-[#1F2228] text-[#F0EDE8] border border-[#1F2228] label-mono text-xs font-bold rounded-lg transition-colors">GITHUB →</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#121418] hover:bg-[#1F2228] text-[#F0EDE8] border border-[#1F2228] label-mono text-xs font-bold rounded-lg transition-colors">LINKEDIN →</a>
              <a href={`mailto:${SOCIAL.email}`} className="px-6 py-3 bg-[#6B9A55] hover:bg-[#4A7A3A] text-white label-mono text-xs font-bold rounded-lg transition-colors shadow-lg shadow-[#6B9A55]/20">EMAIL ME →</a>
            </div>
            <div className="pt-4">
              <button onClick={onNavigateBack} className="label-mono text-xs text-[#6B9A55] hover:text-[#F0EDE8] underline tracking-widest cursor-pointer transition-colors">← RETURN TO GATEWAY ENTRY</button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
