const stats = [
  { category: 'EXPERIENCE',   value: '08+', detail: 'YEARS IN INDUSTRY' },
  { category: 'SCALE',        value: '124', detail: 'PROJECTS DELIVERED' },
  { category: 'GLOBAL REACH', value: '14',  detail: 'COUNTRIES REACHED' },
  { category: 'TECH STACK',   value: 'TS',  detail: 'CORE ECOSYSTEM' },
]

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-12 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map(({ category, value, detail }) => (
        <div
          key={category}
          className="relative glass border border-aquamarine/30 p-8 rounded-xl group hover:bg-aquamarine/10 hover:border-aquamarine/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(127,255,212,0.15)] cursor-default overflow-hidden"
        >
          {/* Shimmer sweep on hover */}
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-aquamarine/8 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ animation: 'shimmer-x 1.4s ease-in-out infinite' }}
          />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aquamarine/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-aquamarine animate-pulse" />
            <span className="font-body text-[10px] uppercase tracking-widest text-aquamarine font-bold">
              {category}
            </span>
          </div>

          <div className="font-display text-5xl font-bold text-white mb-1 group-hover:text-aquamarine group-hover:glow-text-aquamarine transition-colors duration-300">
            {value}
          </div>
          <div className="text-xs text-aquamarine/60 font-bold uppercase tracking-tighter">
            {detail}
          </div>
        </div>
      ))}
    </section>
  )
}
