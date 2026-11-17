import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCanvas from "../components/explore/StoryCanvas";
import StoryStrip from "../components/explore/StoryStrip";
import StoryChapters from "../components/explore/StoryChapters";
import { CHAPTERS } from "../data/storyData";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════
// NATURAL, CINEMATIC ANGLES (NO FAST 360 SPINS)
// Subtle, elegant rotations (<35 deg) that smoothly track content direction
// ═══════════════════════════════════════════════════════════════════════════
const PI = Math.PI;
const BASE_FRONT = PI + 0.55;  // Model facing forward directly (~3.69 rad)
const FACE_RIGHT = PI + 0.95;  // Model on LEFT, turns gracefully towards RIGHT text (~4.09 rad)
const FACE_LEFT  = PI + 0.15;  // Model on RIGHT, turns gracefully towards LEFT text (~3.29 rad)

// ═══════════════════════════════════════════════════════════════════════════
// CERTIFICATE SECTION OPACITY — dynamically derived from CHAPTERS
// ═══════════════════════════════════════════════════════════════════════════
const certIdx = CHAPTERS.findIndex((c) => c.id === "certificates");
const prevCertProgress = certIdx > 0 ? CHAPTERS[certIdx - 1].progress : 0.64;
const certProgress     = certIdx >= 0 ? CHAPTERS[certIdx].progress : 0.78;
const nextCertProgress = certIdx >= 0 && certIdx < CHAPTERS.length - 1 ? CHAPTERS[certIdx + 1].progress : 0.90;

const CERT_IN_START  = prevCertProgress + (certProgress - prevCertProgress) * 0.55;
const CERT_IN_END    = certProgress - 0.04;
const CERT_FULL_END  = certProgress + (nextCertProgress - certProgress) * 0.45;
const CERT_OUT_END   = certProgress + (nextCertProgress - certProgress) * 0.85;

function getCertOpacity(prog) {
  if (prog < CERT_IN_START || prog > CERT_OUT_END) return 0;
  if (prog <= CERT_IN_END)  return (prog - CERT_IN_START) / (CERT_IN_END - CERT_IN_START);
  if (prog <= CERT_FULL_END) return 1;
  return 1 - (prog - CERT_FULL_END) / (CERT_OUT_END - CERT_FULL_END);
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION QUOTES — one premium quote per chapter shown on model click
// ═══════════════════════════════════════════════════════════════════════════
const CHAPTER_QUOTES = [
  {
    label: "01 / INTRO",
    quote: "The beginning of everything worth doing\nstarts with a single line of code.",
    context: "The Start",
  },
  {
    label: "02 / IDENTITY",
    quote: "Curiosity is good.\nObsession is better.\nWriting clean code that solves real human\nproblems — that's the best.",
    context: "Philosophy",
  },
  {
    label: "03 / EVOLUTION",
    quote: "Same curiosity.\nDifferent versions of me.",
    context: "On Growth",
  },
  {
    label: "04 / DOMAINS",
    quote: "Ideas become architecture.\nArchitecture becomes product.\nProduct becomes impact.",
    context: "On Building",
  },
  {
    label: "05 / EVIDENCE",
    quote: "Shipped.\nNot perfect.\nReal.",
    context: "On Shipping",
  },
  {
    label: "06 / PRACTICE",
    quote: "Consistency over intensity.\nMastering data structures and systems\none problem at a time.",
    context: "On Practice",
  },
  {
    label: "07 / CREDENTIALS",
    quote: "Every certificate is a commitment —\nnot just to knowledge,\nbut to showing up.",
    context: "On Learning",
  },
  {
    label: "08 / HORIZON",
    quote: "Always one rabbit hole deeper.\nThat's where the good stuff lives.",
    context: "On Curiosity",
  },
  {
    label: "09 / FINALE",
    quote: "The best project\nis the one we haven't built yet.\n\nLet's fix that.",
    context: "On the Future",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// QUOTE OVERLAY — full-screen blur popup
// ═══════════════════════════════════════════════════════════════════════════
function QuoteOverlay({ chapterIdx, onClose }) {
  const q = CHAPTER_QUOTES[chapterIdx] || CHAPTER_QUOTES[0];
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 cursor-pointer"
      style={{
        background: "rgba(5, 5, 7, 0.85)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        animation: "quoteOverlayIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      {/* Close hint */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-[#8E929B] hover:text-[#F0EDE8] font-mono text-xs tracking-widest transition-colors select-none cursor-pointer"
      >
        [ ESC / CLICK ANYWHERE TO CLOSE ]
      </button>

      {/* Quote card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full text-center select-none p-8 sm:p-12 rounded-3xl bg-[#121418]/60 border border-[#1F2228] shadow-2xl"
        style={{ animation: "quoteCardIn 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both" }}
      >
        {/* Section label */}
        <p className="label-mono text-[11px] text-[#6B9A55] tracking-[0.4em] font-bold mb-6">
          {q.label}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-px bg-[#4A7A3A] mx-auto mb-6 opacity-60" />

        {/* Main quote */}
        <blockquote
          className="text-2xl sm:text-4xl font-black italic text-[#F0EDE8] font-['Space_Grotesk'] leading-snug tracking-tight"
          style={{ textShadow: "0 0 50px rgba(107,154,85,0.2)" }}
        >
          {q.quote.split("\n").map((line, i) => (
            <span key={i} className="block">{line || "\u00A0"}</span>
          ))}
        </blockquote>

        {/* Decorative line */}
        <div className="w-12 h-px bg-[#4A7A3A] mx-auto mt-6 opacity-60" />

        {/* Context label */}
        <p className="label-mono text-xs text-[#8E929B] tracking-[0.25em] mt-5 font-bold">
          — {q.context}
        </p>

        {/* Subtle glow behind text */}
        <div
          className="absolute inset-0 -z-10 rounded-3xl opacity-15 blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, #4A7A3A 0%, transparent 70%)" }}
        />
      </div>

      <style>{`
        @keyframes quoteOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes quoteCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function ExplorePage({ onNavigateBack, onNavigate }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress]         = useState(0);
  const [mobileBg, setMobileBg]                     = useState("#0A0A0C");
  const [quoteVisible, setQuoteVisible]             = useState(false);
  const scrollContainerRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Keyboard navigation: Escape closes quote, Arrows navigate chapters, R jumps to recruiter
  useEffect(() => {
    const onKey = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === "Escape") {
        setQuoteVisible(false);
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        if (onNavigate) onNavigate('recruiter');
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        const nextIdx = Math.min(CHAPTERS.length - 1, activeChapterIndex + 1);
        const el = document.getElementById(CHAPTERS[nextIdx].id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        const prevIdx = Math.max(0, activeChapterIndex - 1);
        const el = document.getElementById(CHAPTERS[prevIdx].id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeChapterIndex, onNavigate]);

  const handleContainerClick = useCallback((e) => {
    // If clicking an interactive button/link/card/modal, don't toggle quote
    if (e.target.closest("button, a, .cert-marquee-track, input, textarea, [data-interactive]")) {
      return;
    }
    setQuoteVisible((v) => !v);
  }, []);

  const storyStateRef = useRef({
    model: {
      posX: 0,
      posY: -0.10,
      posZ: 0,
      rotX: -0.05,
      rotY: BASE_FRONT,
      rotZ: 0,
      scale: 1.25,
    },
    camera: { posX: 0, posY: 0, posZ: 6.5 },
    lighting: {
      ambientColor: "#E2DEC6",
      ambientIntensity: 2.2,
      keyColor: "#FFFDF8",
      keyIntensity: 4.5,
      keyPosX: -3, keyPosY: 5, keyPosZ: 4,
      fillColor: "#4A7A3A",
      fillIntensity: 2.0,
      fillPosX: 3, fillPosY: -2, fillPosZ: -2,
      rimColor: "#6B9A55",
      rimIntensity: 2.5,
    },
    environment: { bgColor: "#EBE7DF" },
  });

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const state = storyStateRef.current;
      const { model, camera, lighting, environment } = state;

      // Initial state of cert track
      gsap.set(".cert-track-wrapper", {
        opacity: 0,
        pointerEvents: "none",
        visibility: "hidden",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(prog);

            // Accurate chapter index tracking
            let currIdx = 0;
            for (let i = CHAPTERS.length - 1; i >= 0; i--) {
              if (prog >= CHAPTERS[i].progress - 0.04) { currIdx = i; break; }
            }
            setActiveChapterIndex(currIdx);
            if (isMobile) setMobileBg(environment.bgColor);

            // Cert track fade in/out with pointer-events protection
            const certOp = getCertOpacity(prog);
            gsap.set(".cert-track-wrapper", {
              opacity: certOp,
              pointerEvents: certOp > 0.05 ? "auto" : "none",
              visibility: certOp > 0.001 ? "visible" : "hidden",
            });
          },
        },
      });

      // ━━ 01 INTRO → 02 IDENTITY (Smooth glide Left, subtle turn Right) ━━
      tl.to(model,    { posX: -1.8, posY: -0.10, rotY: FACE_RIGHT, rotX: -0.05, scale: 1.15, duration: 12 }, 0);
      tl.to(lighting, { keyColor: "#FFE8D6", fillColor: "#8C6239", ambientIntensity: 2.4, duration: 12 }, 0);
      tl.to(environment, { bgColor: "#C5BEB0", duration: 12 }, 0);

      // ━━ 02 IDENTITY → 03 JOURNEY (Smooth glide Right, subtle turn Left) ━━
      tl.to(model,    { posX: 1.6, posY: -0.10, rotY: FACE_LEFT, rotX: -0.05, scale: 1.15, duration: 14 }, 12);
      tl.to(lighting, { keyColor: "#BFD9A0", fillColor: "#2D4A1E", rimColor: "#6B9A55", rimIntensity: 3.0, duration: 14 }, 12);
      tl.to(environment, { bgColor: "#3A3D34", duration: 14 }, 12);

      // ━━ 03 JOURNEY → 04 WHAT I BUILD (Smooth glide Left, subtle turn Right) ━━
      tl.to(model,    { posX: -1.6, posY: -0.10, posZ: 0, rotY: FACE_RIGHT, rotX: -0.05, scale: 1.15, duration: 16 }, 26);
      tl.to(camera,   { posZ: 6.5, duration: 16 }, 26);
      tl.to(lighting, { keyColor: "#E0F2FE", fillColor: "#2DD4BF", rimColor: "#0EA5E9", rimIntensity: 3.5, duration: 16 }, 26);
      tl.to(environment, { bgColor: "#5A5448", duration: 16 }, 26);

      // ━━ 04 WHAT I BUILD → 05 PROJECTS (Smooth glide Far Right) ━━━━━━━━
      tl.to(model,    { posX: 2.2, posY: -0.10, posZ: -0.5, rotY: FACE_LEFT + 0.05, rotX: -0.05, scale: 0.90, duration: 16 }, 42);
      tl.to(camera,   { posZ: 7.2, duration: 16 }, 42);
      tl.to(lighting, { keyColor: "#F8FAFC", fillColor: "#374151", keyIntensity: 5.0, rimIntensity: 2.0, duration: 16 }, 42);
      tl.to(environment, { bgColor: "#2A2C28", duration: 16 }, 42);

      // ━━ 05 PROJECTS → 06 PRACTICE (Smooth glide Mid-Right, turn toward Left cards) ━━
      tl.to(model,    { posX: 1.65, posY: -0.10, posZ: 0, rotY: FACE_LEFT, rotX: -0.05, scale: 1.05, duration: 14 }, 58);
      tl.to(camera,   { posZ: 6.5, duration: 14 }, 58);
      tl.to(lighting, { keyColor: "#D1FAE5", fillColor: "#1E3A2F", rimColor: "#34D399", keyIntensity: 4.8, fillIntensity: 2.4, rimIntensity: 3.2, duration: 14 }, 58);
      tl.to(environment, { bgColor: "#181A1D", duration: 14 }, 58);

      // ━━ 06 PRACTICE → 07 CERTIFICATES (Smooth glide to Center, face Front) ━━
      tl.to(model,    { posX: 0, posY: 0.22, posZ: 0, rotY: BASE_FRONT, rotX: 0.0, scale: 1.02, duration: 14 }, 72);
      tl.to(camera,   { posZ: 6.5, duration: 14 }, 72);
      tl.to(lighting, {
        keyColor: "#FFF7ED", fillColor: "#854D0E",
        rimColor: "#F59E0B", rimIntensity: 5.0, keyIntensity: 5.5, duration: 14,
      }, 72);
      tl.to(environment, { bgColor: "#0B0C0E", duration: 14 }, 72);

      // ━━ 07 CERTIFICATES → 08 EXPLORING (Smooth glide Left, subtle turn Right) ━━
      tl.to(model,    { posX: -1.15, posY: -0.10, posZ: 0, rotY: FACE_RIGHT, rotX: -0.05, scale: 1.12, duration: 12 }, 86);
      tl.to(camera,   { posZ: 6.5, duration: 12 }, 86);
      tl.to(lighting, { keyColor: "#E2E8F0", fillColor: "#3B82F6", rimColor: "#10B981", rimIntensity: 2.8, duration: 12 }, 86);
      tl.to(environment, { bgColor: "#050507", duration: 12 }, 86);

      // ━━ 08 EXPLORING → 09 FINALE (Smooth glide Center, Heroic Front) ━━
      tl.to(model,    { posX: 0, posY: -0.08, posZ: 0.5, rotY: BASE_FRONT, rotX: -0.05, scale: 1.30, duration: 12 }, 98);
      tl.to(camera,   { posZ: 5.6, duration: 12 }, 98);
      tl.to(lighting, {
        keyColor: "#FEF9C3", fillColor: "#65A30D",
        rimColor: "#22C55E", rimIntensity: 4.8, keyIntensity: 5.2, duration: 12,
      }, 98);
      tl.to(environment, { bgColor: "#040404", duration: 12 }, 98);

      // Content reveals (desktop)
      if (!isMobile) {
        gsap.utils.toArray(".story-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            {
              opacity: 1, y: 0, duration: 1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "top 40%", scrub: 0.5 },
            }
          );
        });
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      className="relative text-[#F0EDE8] font-['Inter'] selection:bg-[#6B9A55] selection:text-white"
      style={{
        backgroundColor: isMobile ? mobileBg : undefined,
        transition: isMobile ? "background-color 0.4s ease" : "none",
      }}
    >
      {/* PERSISTENT 3D SCULPTURE CANVAS */}
      <div className="hidden md:block">
        <StoryCanvas storyStateRef={storyStateRef} />
      </div>

      {/* MOBILE FALLBACK */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img
          src="/model_fallback.png"
          alt=""
          draggable="false"
          className="h-[60vh] w-auto object-contain opacity-25 select-none"
          style={{ filter: "brightness(0.65)" }}
        />
      </div>

      {/* STORY STRIP HEADER */}
      <StoryStrip
        activeChapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
        onNavigateBack={onNavigateBack}
        onNavigate={onNavigate}
      />

      {/* INTERACTIVE FLOATING BUTTON / PHILOSOPHY PILL */}
      <div className="fixed bottom-6 left-6 sm:left-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuoteVisible((v) => !v)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121418]/90 border border-[#2A2E37] backdrop-blur-md cursor-pointer hover:border-[#6B9A55] text-[#8E929B] hover:text-[#F0EDE8] transition-all duration-300 shadow-lg hover:scale-105"
          title="Click to view chapter philosophy quote"
        >
          <span className="w-2 h-2 rounded-full bg-[#6B9A55] animate-pulse" />
          <span className="label-mono text-[9px] sm:text-[10px] tracking-wider font-bold">
            PHILOSOPHY ✦
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1 label-mono text-[9px] text-[#5A5448] bg-[#121418]/60 px-2.5 py-1 rounded-full border border-[#1F2228]">
          <span>NAVIGATE:</span>
          <kbd className="px-1 py-0.2 rounded bg-[#1F2228] text-[#8E929B] font-mono text-[9px]">↑</kbd>
          <kbd className="px-1 py-0.2 rounded bg-[#1F2228] text-[#8E929B] font-mono text-[9px]">↓</kbd>
          <span>KEYS</span>
        </div>
      </div>

      {/* NATURAL SCROLL CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="relative w-full cursor-default"
        onClick={handleContainerClick}
      >
        <StoryChapters onNavigateBack={onNavigateBack} onNavigate={onNavigate} />
      </div>

      {/* QUOTE OVERLAY — appears on model click, section-specific */}
      {quoteVisible && (
        <QuoteOverlay
          chapterIdx={activeChapterIndex}
          onClose={() => setQuoteVisible(false)}
        />
      )}
    </div>
  );
}
