const actions = [
  {
    label: 'Share',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    label: 'Language',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'Announce',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Creative',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12h20c0-5.5-4.5-10-10-10z" />
        <line x1="12" y1="12" x2="12" y2="22" />
      </svg>
    ),
  },
]

export default function SocialSidebar() {
  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col">
      <div
        className="glass flex flex-col items-center gap-8 p-5 rounded-r-2xl border-y border-r border-aquamarine/30 shadow-[10px_0_30px_rgba(127,255,212,0.10)]"
        style={{ borderLeft: 'none' }}
      >
        {actions.map(({ label, svg }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-aquamarine/50 hover:text-aquamarine hover:translate-x-1 transition-all duration-200"
          >
            {svg}
          </a>
        ))}
      </div>
    </aside>
  )
}
