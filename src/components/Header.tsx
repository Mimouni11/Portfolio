'use client'

import TransitionLink from './TransitionLink'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import { useLocale } from '@/context/LocaleContext'
import { usePageTransition } from './transitions/TransitionProvider'
import { useRouter } from 'next/navigation'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
]

function LangSwitcher() {
  const { lang } = useLocale()
  const { navigateTo } = usePageTransition()
  const router = useRouter()

  const switchLang = (code: string) => {
    // Use router directly for lang switches — avoids locale-prefix logic confusion
    const currentPath = window.location.pathname
    const bare = currentPath.replace(/^\/(en|fr|ar)(\/|$)/, '/')
    const target = bare === '/' ? `/${code}` : `/${code}${bare}`
    router.push(target)
  }

  return (
    <div className="hidden md:flex items-center gap-1 border border-white/10 rounded-full px-1 py-0.5">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-200 ${
            lang === code
              ? 'bg-aquamarine text-obsidian'
              : 'text-white/40 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const { dict } = useLocale()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className="glass rounded-full px-8 py-3 flex items-center justify-between w-[90%] max-w-7xl glow-nav relative">
        <TransitionLink
          href="/"
          className="font-display font-bold text-aquamarine tracking-tighter text-2xl glow-text-aquamarine"
        >
          OBSERVATORY
        </TransitionLink>

        <NavLinks />

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <TransitionLink
            href="/contact"
            className="hidden md:block px-6 py-2 bg-aquamarine text-obsidian font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(127,255,212,0.4)] text-sm"
          >
            {dict.nav.getInTouch}
          </TransitionLink>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
