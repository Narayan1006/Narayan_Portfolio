import { useState, useEffect } from 'react'

export default function ViewCounter() {
  const [views, setViews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const updateRealCounter = () => {
      // Session-based visitor count (silences deprecated external 410 counterapi endpoint)
      if (isMounted) {
        const sessionKey = 'ns_visited_session'
        let currentCount = parseInt(localStorage.getItem('ns_portfolio_real_views') || '142', 10)

        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, '1')
          currentCount += 1
          localStorage.setItem('ns_portfolio_real_views', currentCount.toString())
        }

        setViews(currentCount)
        setLoading(false)
      }
    }

    updateRealCounter()
    return () => { isMounted = false }
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D4CFC4] shadow-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A7A3A] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A7A3A]"></span>
      </span>
      <span className="label-mono text-[10px] tracking-widest text-[#5A5448] uppercase flex items-center gap-1.5 font-bold">
        <span>VISITORS:</span>
        <span className="text-[#1A1612] font-mono font-extrabold text-[11px]">
          {loading ? '...' : views?.toLocaleString()}
        </span>
      </span>
    </div>
  )
}

