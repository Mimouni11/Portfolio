import Link from 'next/link'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className="glass rounded-full px-8 py-3 flex items-center justify-between w-[90%] max-w-7xl glow-nav relative">
        <Link
          href="/"
          className="font-display font-bold text-aquamarine tracking-tighter text-2xl glow-text-aquamarine"
        >
          OBSERVATORY
        </Link>

        <NavLinks />

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:block px-6 py-2 bg-aquamarine text-obsidian font-display font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(127,255,212,0.4)] text-sm"
          >
            Get in Touch
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
