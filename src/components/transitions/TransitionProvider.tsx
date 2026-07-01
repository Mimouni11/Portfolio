'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ScrollNavigator from './ScrollNavigator'

type Phase = 'idle' | 'exiting' | 'covering' | 'entering'

interface TransitionCtx {
  navigateTo: (href: string) => void
  phase: Phase
}

const Ctx = createContext<TransitionCtx>({ navigateTo: () => {}, phase: 'idle' })
export const usePageTransition = () => useContext(Ctx)

export const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/about': 'About',
  '/contact': 'Contact',
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [destLabel, setDestLabel] = useState('')
  const prevPath = useRef(pathname)

  // Detect route change → start enter animation
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      if (phase === 'covering' || phase === 'exiting') {
        setPhase('entering')
        const t = setTimeout(() => setPhase('idle'), 650)
        return () => clearTimeout(t)
      }
    }
  }, [pathname, phase])

  const navigateTo = useCallback((href: string) => {
    if (phase !== 'idle') return
    setDestLabel(ROUTE_LABELS[href] ?? 'Loading')
    setPhase('exiting')
    const t = setTimeout(() => {
      setPhase('covering')
      router.push(href)
    }, 650)
    return () => clearTimeout(t)
  }, [phase, router])

  const overlayStyle: React.CSSProperties =
    phase === 'idle'
      ? { transform: 'translateY(100%)', pointerEvents: 'none' }
      : phase === 'exiting'
      ? { animation: 'overlay-rise 650ms cubic-bezier(0.76,0,0.24,1) forwards' }
      : phase === 'covering'
      ? { transform: 'translateY(0)' }
      : { animation: 'overlay-fall-away 650ms cubic-bezier(0.76,0,0.24,1) forwards' }

  return (
    <Ctx.Provider value={{ navigateTo, phase }}>
      {children}
      <ScrollNavigator />

      {/* ── Page transition overlay ── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#050B0F', ...overlayStyle }}
        aria-hidden="true"
      >
        {/* Vertical data streams */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${8 + i * 12}%`,
              opacity: 0.18,
              background: 'linear-gradient(to bottom, transparent 0%, #7FFFD4 50%, transparent 100%)',
              animation: `data-stream ${1.4 + i * 0.25}s linear infinite`,
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Spinner ring */}
          <div
            className="w-12 h-12 rounded-full border border-aquamarine/20 animate-spin"
            style={{ borderTopColor: '#7FFFD4' }}
          />
          {/* Destination label */}
          <div className="text-center">
            <p className="font-body text-[9px] tracking-[0.5em] uppercase text-aquamarine/40 mb-2">
              Navigating to
            </p>
            <p className="font-display text-2xl font-bold tracking-tight text-white">
              {destLabel}
            </p>
          </div>
          {/* Pulsing dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-aquamarine/50 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Ctx.Provider>
  )
}
