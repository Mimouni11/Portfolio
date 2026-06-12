const stack = [
  {
    name: 'React.js',
    role: 'Interface Layer',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'Rust',
    role: 'Memory Safety',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    role: 'Orchestration',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    role: 'Persistence',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
  },
  {
    name: 'Golang',
    role: 'Microservices',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    role: 'Query Fabric',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function TechStack() {
  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-aquamarine/50" />
        <span className="font-body text-xs tracking-widest uppercase text-aquamarine/70 font-bold">
          Core Stack
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stack.map(({ name, role, svg }) => (
          <div
            key={name}
            className="glass border border-aquamarine/20 rounded-xl p-4 group hover:border-aquamarine/50 hover:bg-aquamarine/10 transition-all duration-300 cursor-default"
          >
            <span className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-200 block mb-3">
              {svg}
            </span>
            <p className="font-display font-bold text-white text-sm mb-0.5">{name}</p>
            <p className="font-body text-[10px] tracking-widest uppercase text-aquamarine/50">{role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
