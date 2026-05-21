'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'HOME', href: '/' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        className="flex flex-col gap-1 p-1 text-white"
      >
        <span
          className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${
            open ? 'rotate-45 translate-y-[6px]' : ''
          }`}
        />
        <span
          className={`block w-5 h-px bg-current transition-all duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${
            open ? '-rotate-45 -translate-y-[6px]' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-3 glass rounded-xl p-6 min-w-44 z-50">
          <ul className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white/60 hover:text-aquamarine text-xs tracking-widest transition-colors duration-200 block"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-aquamarine text-xs tracking-widest border border-aquamarine/30 px-4 py-2 rounded-full block text-center"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
