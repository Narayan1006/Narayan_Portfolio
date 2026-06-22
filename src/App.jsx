import { AnimatePresence, motion } from 'framer-motion'
import { ModeProvider, useMode } from './context/ModeContext'
import StoryMode from './components/StoryMode'
import SystemMode from './components/SystemMode'

function ModeToggle() {
  const { mode, toggle } = useMode()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle portfolio mode"
      className="fixed top-4 right-4 z-[70] flex items-center gap-0 border border-border-light text-[10px] font-mono tracking-[0.2em] uppercase overflow-hidden"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span
        className="px-3 py-2 transition-colors duration-300"
        style={{
          color: mode === 'story' ? 'var(--color-foreground)' : 'var(--color-muted)',
          background: mode === 'story' ? 'transparent' : 'transparent',
          textDecoration: mode === 'story' ? 'line-through' : 'none',
          opacity: mode === 'story' ? 0.5 : 1,
        }}
      >
        Story
      </span>
      <span className="text-border-light px-1" style={{ color: 'var(--color-border-light)' }}>/</span>
      <span
        className="px-3 py-2 transition-colors duration-300"
        style={{
          color: mode === 'system' ? 'var(--color-foreground)' : 'var(--color-muted)',
          textDecoration: mode === 'system' ? 'line-through' : 'none',
          opacity: mode === 'system' ? 0.5 : 1,
        }}
      >
        System
      </span>
    </button>
  )
}

function PortfolioContent() {
  const { mode } = useMode()
  return (
    <>
      {/* Cinematic blue edge glow frame */}
      <div className="viewport-frame" aria-hidden="true" />

      {/* Mode Toggle — always visible top-right */}
      <ModeToggle />

      <AnimatePresence mode="wait">
        {mode === 'story' ? (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StoryMode />
          </motion.div>
        ) : (
          <motion.div
            key="system"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SystemMode />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <ModeProvider>
      <PortfolioContent />
    </ModeProvider>
  )
}
