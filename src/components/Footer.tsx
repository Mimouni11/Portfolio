import Link from 'next/link'

const links = [
  { label: 'SITEMAP',          href: '/sitemap' },
  { label: 'PRIVACY POLICY',   href: '/privacy' },
  { label: 'TERMS OF SERVICE', href: '/terms' },
  { label: 'CREDITS',          href: '/credits' },
]

export default function Footer() {
  return (
    <footer className="w-full mt-20 bg-obsidian/90 backdrop-blur-[32px] border-t border-aquamarine/30 shadow-[0_-20px_50px_rgba(127,255,212,0.05)]">
      <div className="w-full py-16 px-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">

        <div className="text-center md:text-left">
          <p className="font-display text-2xl font-black text-aquamarine mb-2 glow-text-aquamarine">
            OBSERVATORY
          </p>
          <p className="font-body text-xs tracking-widest uppercase text-aquamarine/60 font-bold">
            © 2024 THE AQUATIC OBSERVATORY. ALL RIGHTS RESERVED.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-xs tracking-widest uppercase text-white/70 hover:text-aquamarine transition-colors duration-200 font-bold"
            >
              {label}
            </Link>
          ))}
        </nav>

      </div>
    </footer>
  )
}
