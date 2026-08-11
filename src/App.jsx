import { useState, useEffect } from 'react'
import GatewayScreen from './components/GatewayScreen'
import RecruiterPage from './pages/RecruiterPage'
import ExplorePage from './pages/ExplorePage'

export default function App() {
  const [currentView, setCurrentView] = useState('gateway') // 'gateway' | 'explore' | 'recruiter'

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/explore') setCurrentView('explore')
    else if (path === '/recruiter') setCurrentView('recruiter')

    const handlePopState = () => {
      const p = window.location.pathname
      if (p === '/explore') setCurrentView('explore')
      else if (p === '/recruiter') setCurrentView('recruiter')
      else setCurrentView('gateway')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigate = (view) => {
    setCurrentView(view)
    const newPath = view === 'gateway' ? '/' : `/${view}`
    window.history.pushState({}, '', newPath)
  }

  if (currentView === 'explore') {
    return <ExplorePage onNavigateBack={() => handleNavigate('gateway')} />
  }

  if (currentView === 'recruiter') {
    return <RecruiterPage onNavigateBack={() => handleNavigate('gateway')} />
  }

  return <GatewayScreen onNavigate={handleNavigate} />
}


