'use client'

import { useState } from 'react'
import TransitionLink from './TransitionLink'
import { useLocale } from '@/context/LocaleContext'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { dict } = useLocale()
  const n = dict.nav

  const links = [
    { label: n.home,     href: '/' },
    { label: n.projects, href: '/projects' },
    { label: n.about,    href: '/about' },
    { label: n.contact,  href: '/contact' },
  ]

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
        <div className="absolute top-full right-0 mt-3 glass rounded-xl p-6 min-w-44 z-50">
          <ul className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <li key={href}>
                <TransitionLink
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white/60 hover:text-aquamarine text-xs tracking-widest transition-colors duration-200 block"
                >
                  {label}
                </TransitionLink>
              </li>
            ))}
            <li className="pt-2 border-t border-white/10">
              <TransitionLink
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-aquamarine text-xs tracking-widest border border-aquamarine/30 px-4 py-2 rounded-full block text-center"
              >
                {n.getInTouch}
              </TransitionLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
