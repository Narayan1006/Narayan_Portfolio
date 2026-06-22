import { createContext, useContext, useState } from 'react'

const ModeContext = createContext(null)

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('story') // 'story' | 'system'
  const toggle = () => setMode(m => m === 'story' ? 'system' : 'story')
  return (
    <ModeContext.Provider value={{ mode, toggle }}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
