'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import ScrollNavigator from './ScrollNavigator'

type Phase = 'idle' | 'exiting' | 'covering' | 'entering'

interface TransitionCtx {
  navigateTo: (href: string) => void
  phase: Phase
}

const Ctx = createContext<TransitionCtx>({ navigateTo: () => {}, phase: 'idle' })
export const usePageTransition = () => useContext(Ctx)

const LOCALES = ['en', 'fr', 'ar']

export const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/about': 'About',
  '/contact': 'Contact',
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const lang = (params?.lang as string) ?? 'en'

  const [phase, setPhase] = useState<Phase>('idle')
  const [destLabel, setDestLabel] = useState('')
  const prevPath = useRef(pathname)
  const phaseRef = useRef<Phase>('idle')
  const navTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  phaseRef.current = phase

  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    if (phaseRef.current === 'covering' || phaseRef.current === 'exiting') {
      setPhase('entering')
      clearTimeout(enterTimer.current)
      enterTimer.current = setTimeout(() => setPhase('idle'), 650)
    }
  }, [pathname])

  const navigateTo = useCallback((href: string) => {
    if (phaseRef.current !== 'idle') return

    // If href already has a locale prefix, use it as-is; otherwise prepend current lang
    const localized = LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`))
      ? href
      : href === '/'
      ? `/${lang}`
      : `/${lang}${href}`

    // Strip locale prefix for label lookup
    const bare = localized.replace(new RegExp(`^/(${LOCALES.join('|')})`), '') || '/'
    setDestLabel(ROUTE_LABELS[bare] ?? 'Loading')

    setPhase('exiting')
    clearTimeout(navTimer.current)
    navTimer.current = setTimeout(() => {
      setPhase('covering')
      router.push(localized)
    }, 650)
  }, [router, lang])

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

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#050B0F', ...overlayStyle }}
        aria-hidden="true"
      >
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
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div
            className="w-12 h-12 rounded-full border border-aquamarine/20 animate-spin"
            style={{ borderTopColor: '#7FFFD4' }}
          />
          <div className="text-center">
            <p className="font-body text-[9px] tracking-[0.5em] uppercase text-aquamarine/40 mb-2">
              Navigating to
            </p>
            <p className="font-display text-2xl font-bold tracking-tight text-white">
              {destLabel}
            </p>
          </div>
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
