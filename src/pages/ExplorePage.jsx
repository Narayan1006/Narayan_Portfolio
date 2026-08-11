import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StoryCanvas from '../components/explore/StoryCanvas'
import StoryStrip from '../components/explore/StoryStrip'
import StoryChapters from '../components/explore/StoryChapters'
import { CHAPTERS } from '../data/storyData'

gsap.registerPlugin(ScrollTrigger)

// Target angle definitions
const TARGET_ROT_Y = Math.PI + 0.55
const TARGET_ROT_X = -0.28

export default function ExplorePage({ onNavigateBack }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileBg, setMobileBg] = useState('#EBE7DF')
  const scrollContainerRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Master animated 3D story state ref (read by Three.js useFrame every frame)
  const storyStateRef = useRef({
    modelPosX: 0.25,
    modelPosY: 0,
    modelRotY: TARGET_ROT_Y,
    modelRotX: TARGET_ROT_X,
    modelScale: 1.1,
    cameraZ: 7,
    bgColor: '#EBE7DF', // Starts exact same warm off-white as Gateway / Home screen
  })

  useEffect(() => {
    if (!scrollContainerRef.current) return

    // Create master GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const state = storyStateRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const prog = self.progress
            setScrollProgress(prog)

            // Determine active chapter index
            let currIdx = 0
            for (let i = CHAPTERS.length - 1; i >= 0; i--) {
              if (prog >= CHAPTERS[i].progress - 0.05) {
                currIdx = i
                break
              }
            }
            setActiveChapterIndex(currIdx)

            // On mobile: sync background color via React state (no canvas)
            if (isMobile) setMobileBg(storyStateRef.current.bgColor)
          },
        },
      })

      // Master 3D animation keyframes synchronized across scroll length (bgColor gradually darkens from #EBE7DF down to pitch black #040404)
      // 01 -> HELLO: Starts warm off-white #EBE7DF, transitions into soft taupe/beige #C5BEB0
      tl.to(state, { modelPosX: 0.25, modelRotY: TARGET_ROT_Y, cameraZ: 7, bgColor: '#C5BEB0', duration: 2 }, 0)
      
      // 02 -> WHO I AM: Transitions into muted slate/charcoal #5A5448
      tl.to(state, { modelPosX: -0.05, modelRotY: TARGET_ROT_Y + 0.2, cameraZ: 6.2, bgColor: '#5A5448', duration: 2.5 }, 2)
      
      // 03 -> THE JOURNEY: Transitions into dark forest charcoal #2A2C28
      tl.to(state, { modelPosX: -0.35, modelRotY: TARGET_ROT_Y - 0.3, cameraZ: 7.5, bgColor: '#2A2C28', duration: 3.5 }, 4.5)
      
      // 04 -> WHAT I BUILD: Transitions into deep shadow charcoal #16181A
      tl.to(state, { modelPosX: 0.45, modelRotY: TARGET_ROT_Y + 0.15, cameraZ: 8.0, bgColor: '#16181A', duration: 3 }, 8)
      
      // 05 -> PROJECTS: Transitions into pitch dark #0B0C0E (Model pushed back-right)
      tl.to(state, { modelPosX: 0.65, modelRotY: TARGET_ROT_Y + 0.3, cameraZ: 9.0, bgColor: '#0B0C0E', duration: 4 }, 11)
      
      // 06 -> CERTIFICATES: Transitions into dark obsidian #08080A (Model moves left to leave room for visual certificate gallery)
      tl.to(state, { modelPosX: -0.65, modelRotY: TARGET_ROT_Y - 0.25, cameraZ: 8.5, bgColor: '#08080A', duration: 4.5 }, 15)
      
      // 07 -> STILL EXPLORING: Near pure black #050507 (Model returns toward center)
      tl.to(state, { modelPosX: -0.1, modelRotY: TARGET_ROT_Y - 0.1, cameraZ: 7.5, bgColor: '#050507', duration: 3 }, 19.5)
      
      // 08 -> ENDING: Pure pitch black #040404 at the very bottom
      tl.to(state, { modelPosX: 0.2, modelRotY: TARGET_ROT_Y, cameraZ: 7.0, bgColor: '#040404', duration: 2.5 }, 22.5)

      // Animate text reveal triggers for story-reveal elements
      const reveals = gsap.utils.toArray('.story-reveal')
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.5,
            },
          }
        )
      })
    }, scrollContainerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="relative text-[#F0EDE8] font-['Inter'] selection:bg-[#6B9A55] selection:text-white"
      style={isMobile ? { backgroundColor: mobileBg, transition: 'background-color 0.4s ease' } : { backgroundColor: '#0D0B09' }}
    >
      
      {/* PERSISTENT 3D CANVAS — desktop only */}
      <div className="hidden md:block">
        <StoryCanvas storyStateRef={storyStateRef} />
      </div>

      {/* MOBILE FALLBACK — fixed character image, fades with scroll darkness */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none flex items-end justify-end pr-0">
        <img
          src="/model_fallback.png"
          alt=""
          draggable="false"
          className="h-[65vh] w-auto object-contain object-bottom opacity-30 select-none"
          style={{ filter: 'brightness(0.7)' }}
        />
      </div>

      {/* PERSISTENT STORY STRIP HEADER */}
      <StoryStrip
        activeChapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
        onNavigateBack={onNavigateBack}
      />

      {/* LONG SCROLL CONTAINER (900vh) */}
      <div ref={scrollContainerRef} className="relative w-full h-[900vh]">
        <StoryChapters onNavigateBack={onNavigateBack} />
      </div>

    </div>
  )
}
