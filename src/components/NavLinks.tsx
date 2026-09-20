'use client'

import { usePathname } from 'next/navigation'
import TransitionLink from './TransitionLink'
import { useLocale } from '@/context/LocaleContext'

export default function NavLinks() {
  const pathname = usePathname()
  const { dict, lang } = useLocale()
  const n = dict.nav

  const links = [
    { label: n.home,     href: '/' },
    { label: n.projects, href: '/projects' },
    { label: n.about,    href: '/about' },
    { label: n.contact,  href: '/contact' },
  ]

  return (
    <ul className="hidden md:flex items-center gap-8">
      {links.map(({ label, href }) => {
        const fullHref = href === '/' ? `/${lang}` : `/${lang}${href}`
        const active = pathname === fullHref
        return (
          <li key={href}>
            <TransitionLink
              href={href}
              className={`font-display text-sm uppercase tracking-tight transition-colors duration-200 pb-1 ${
                active
                  ? 'text-white font-bold border-b-2 border-aquamarine'
                  : 'text-white/60 hover:text-aquamarine font-medium'
              }`}
            >
              {label}
            </TransitionLink>
          </li>
        )
      })}
    </ul>
  )
}
