const socials = [
  {
    label: 'Website',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'Share',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    label: 'Terminal',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
]

export default function ProfileCard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Photo */}
      <div className="glass rounded-2xl overflow-hidden aspect-[3/4] relative luminous-edge">
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-obsidian flex items-center justify-center">
          {/* Replace this div with next/image when you have your photo */}
          <span className="text-aquamarine/15 font-display font-bold text-7xl select-none">AR</span>
        </div>
        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-obsidian/80 to-transparent" />
      </div>

      {/* Social icons */}
      <div className="flex items-center justify-center gap-4">
        {socials.map(({ label, svg }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-aquamarine/50 hover:text-aquamarine hover:glow-aquamarine transition-all duration-200"
          >
            {svg}
          </a>
        ))}
      </div>
    </div>
  )
}
