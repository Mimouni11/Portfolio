'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TransitionLink from './TransitionLink'
import { useLocale } from '@/context/LocaleContext'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { dict, lang } = useLocale()
  const n = dict.nav
  const router = useRouter()

  const links = [
    { label: n.home,     href: '/' },
    { label: n.projects, href: '/projects' },
    { label: n.about,    href: '/about' },
    { label: n.contact,  href: '/contact' },
  ]

  const switchLang = (code: string) => {
    const bare = window.location.pathname.replace(/^\/(en|fr|ar)(\/|$)/, '/')
    const target = bare === '/' ? `/${code}` : `/${code}${bare}`
    router.push(target)
    setOpen(false)
  }

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        className="flex flex-col gap-1 p-1 text-white"
      >
        <span className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
        <span className={`block w-5 h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-3 rounded-xl p-6 min-w-48 z-50 border border-white/10"
          style={{ backgroundColor: 'rgba(2, 13, 13, 0.97)', backdropFilter: 'blur(20px)' }}
        >
          <ul className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <li key={href}>
                <TransitionLink
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-aquamarine text-xs tracking-widest transition-colors duration-200 block font-body uppercase"
                >
                  {label}
                </TransitionLink>
              </li>
            ))}

            <li className="pt-2 border-t border-white/10">
              <TransitionLink
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-aquamarine text-xs tracking-widest border border-aquamarine/30 px-4 py-2 rounded-full block text-center font-body"
              >
                {n.getInTouch}
              </TransitionLink>
            </li>

            <li className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                {LOCALES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => switchLang(code)}
                    className={`px-3 py-1 rounded-full text-xs font-bold font-body transition-all duration-200 ${
                      lang === code
                        ? 'bg-aquamarine text-obsidian'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
