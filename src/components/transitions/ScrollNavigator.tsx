'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { usePageTransition, ROUTE_LABELS } from './TransitionProvider'

const ROUTES = ['/', '/projects', '/about', '/contact']
const THRESHOLD = 200  // px of accumulated wheel delta to trigger nav

export default function ScrollNavigator() {
  const pathname = usePathname()
  const { navigateTo, phase } = usePageTransition()
  const [progress, setProgress] = useState(0)
  const accumulated = useRef(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout>>()

  const idx = ROUTES.indexOf(pathname)
  const nextRoute = idx !== -1 ? ROUTES[(idx + 1) % ROUTES.length] : null
  const nextLabel = nextRoute ? (ROUTE_LABELS[nextRoute] ?? '') : ''

  // Reset on route change
  useEffect(() => {
    accumulated.current = 0
    setProgress(0)
  }, [pathname])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (phase !== 'idle' || !nextRoute) return

      const atBottom =
        window.innerHeight + Math.round(window.scrollY) >= document.body.scrollHeight - 24

      // Scroll upward: bleed off some accumulation, then bail
      if (e.deltaY < 0) {
        accumulated.current = Math.max(0, accumulated.current - Math.abs(e.deltaY) * 0.6)
        setProgress(accumulated.current / THRESHOLD)
        return
      }

      if (!atBottom) {
        clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => {
          accumulated.current = 0
          setProgress(0)
        }, 800)
        return
      }

      accumulated.current += e.deltaY
      const p = Math.min(accumulated.current / THRESHOLD, 1)
      setProgress(p)

      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => {
        accumulated.current = 0
        setProgress(0)
      }, 900)

      if (accumulated.current >= THRESHOLD) {
        accumulated.current = 0
        setProgress(0)
        navigateTo(nextRoute)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(resetTimer.current)
    }
  }, [pathname, phase, nextRoute, navigateTo])

  if (progress <= 0.02) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9998] flex flex-col items-center gap-2.5 pointer-events-none select-none">
      <span className="font-body text-[9px] tracking-[0.45em] uppercase text-aquamarine/50">
        {nextLabel} ↓
      </span>
      {/* Progress bar */}
      <div className="w-28 h-[2px] rounded-full overflow-hidden bg-white/8">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(to right, #7FFFD4, #20B2AA)',
            boxShadow: `0 0 8px rgba(127,255,212,${(progress * 0.7).toFixed(2)})`,
            transition: 'width 80ms linear',
          }}
        />
      </div>
    </div>
  )
}
