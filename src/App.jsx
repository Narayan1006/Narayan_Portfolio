import { useState, useEffect, lazy, Suspense } from 'react'
import GatewayScreen from './components/GatewayScreen'

const RecruiterPage = lazy(() => import('./pages/RecruiterPage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))

const PageFallback = () => (
  <div className="fixed inset-0 z-50 bg-[#EBE7DF] flex flex-col justify-center items-center">
    <div className="w-8 h-8 border-2 border-[#4A7A3A] border-t-transparent rounded-full animate-spin" />
  </div>
)

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
    return (
      <Suspense fallback={<PageFallback />}>
        <ExplorePage
          onNavigateBack={() => handleNavigate('gateway')}
          onNavigate={handleNavigate}
        />
      </Suspense>
    )
  }

  if (currentView === 'recruiter') {
    return (
      <Suspense fallback={<PageFallback />}>
        <RecruiterPage
          onNavigateBack={() => handleNavigate('gateway')}
          onNavigate={handleNavigate}
        />
      </Suspense>
    )
  }

  return <GatewayScreen onNavigate={handleNavigate} />
}




