import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COMMANDS = {
  help: `AVAILABLE COMMANDS:
  about      - Identity protocol
  journey    - Decode the four chapters
  theme      - Visual symbolism & color evolution
  projects   - The constraint/breakthrough methodology
  future     - Current trajectory & focus
  philosophy - Core engineering beliefs
  resume     - Download curriculum vitae
  clear      - Clear terminal
  exit       - Terminate session`,
  
  about: `IDENTITY PROTOCOL:
Name: Narayan Singh
Role: Backend Engineer & AI Builder
Focus: Intelligent systems where backend engineering meets AI.
Current Status: Java Developer Intern at Yukti Software`,

  journey: `THE FOUR CHAPTERS:
[I] THE WALLS  - The starting point. Cold, constrained, limited.
[II] THE BREACH - Breaking through limitations. Red, aggressive, transformative.
[III] THE VOYAGE - Growth, skill acquisition, expanding boundaries. Bronze, warm.
[IV] THE HORIZON - Arrival and mastery. Gold, glowing, infinite potential.`,

  theme: `VISUAL SYMBOLISM:
The dark background represents the void of the unknown.
The narrative spine interpolates from Iron to Gold, physically tracking progress from constraint to mastery.
As you scroll, the environment becomes brighter, symbolizing clarity gained through experience.`,

  projects: `THE METHODOLOGY:
Projects are not presented as features. They are presented as constraints.
True engineering is the act of breaking a constraint.
What matters is not what was built, but the reasoning and the breakthrough that made it possible.`,

  future: `CURRENT TRAJECTORY:
> Backend Engineering (Java, Spring Boot)
> AI Systems (Offline-first, LLMs)
> RAG Architectures
> Machine Learning & Scalable Systems`,

  philosophy: `CORE BELIEF:
Technology is not the destination. 
The ability to solve meaningful problems is.
Code is just the mechanism by which we impose order on chaos.`,

  resume: `DOWNLOADING RESUME...
Initializing transfer... Done.`,
}

const BOOT_SEQUENCE = [
  "INITIALIZING CLASSIFIED LORE TERMINAL v1.0.0...",
  "ESTABLISHING SECURE CONNECTION...",
  "DECRYPTING NARRATIVE SPINE...",
  "ACCESS GRANTED.",
  "",
  "Type 'help' to see available commands."
]

export default function DecodeTerminal({ onClose }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Boot sequence effect
  useEffect(() => {
    let timeoutIds = []
    
    const runBoot = async () => {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        await new Promise(resolve => {
          const id = setTimeout(() => {
            setHistory(prev => [...prev, { type: 'system', text: BOOT_SEQUENCE[i] }])
            resolve()
          }, i === 0 ? 500 : Math.random() * 400 + 200)
          timeoutIds.push(id)
        })
      }
      setIsBooting(false)
    }

    runBoot()

    return () => timeoutIds.forEach(clearTimeout)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history, isBooting])

  // Auto-focus input
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooting])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    
    if (!trimmed) return

    const newHistory = [...history, { type: 'input', text: \`guest@narayan-os:~$ \${cmd}\` }]

    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (trimmed === 'exit') {
      onClose()
      return
    }

    if (COMMANDS[trimmed]) {
      newHistory.push({ type: 'output', text: COMMANDS[trimmed] })
      if (trimmed === 'resume') {
        const a = document.createElement('a')
        a.href = '/Narayan_resume.pdf'
        a.download = 'Narayan_Singh_Resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    } else {
      newHistory.push({ type: 'error', text: \`Command not found: \${trimmed}. Type 'help' for available commands.\` })
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'c' && e.ctrlKey) {
      setInput('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-4 md:p-8 font-mono text-sm md:text-base flex flex-col"
      style={{ color: '#22c55e' }} // Classic terminal green
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto flex flex-col gap-1 pb-4"
      >
        {history.map((item, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {item.type === 'error' && <span className="text-red-500">{item.text}</span>}
            {item.type !== 'error' && item.text}
          </div>
        ))}
        
        {!isBooting && (
          <div className="flex items-center gap-2 mt-2">
            <span>guest@narayan-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-[#22c55e] caret-[#22c55e]"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
        )}
      </div>
      
      {/* Overlay CRT scanline effect (optional subtle touch) */}
      <div className="pointer-events-none fixed inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50"></div>
    </motion.div>
  )
}
