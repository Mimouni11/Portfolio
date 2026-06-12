'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'HOME',     href: '/' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT',    href: '/about' },
  { label: 'CONTACT',  href: '#contact' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="hidden md:flex items-center gap-8">
      {links.map(({ label, href }) => {
        const active = pathname === href
        return (
          <li key={href}>
            <Link
              href={href}
              className={`font-display text-sm uppercase tracking-tight transition-colors duration-200 pb-1 ${
                active
                  ? 'text-white font-bold border-b-2 border-aquamarine'
                  : 'text-white/60 hover:text-aquamarine font-medium'
              }`}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
