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
          className="glass border border-aquamarine/30 p-8 rounded-xl group hover:bg-aquamarine/10 transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.15)] cursor-default"
        >
          <span className="font-body text-[10px] uppercase tracking-widest text-aquamarine mb-4 block font-bold">
            {category}
          </span>
          <div className="font-display text-5xl font-bold text-white mb-1 group-hover:text-aquamarine transition-colors duration-300">
            {value}
          </div>
          <div className="text-xs text-aquamarine/70 font-bold uppercase tracking-tighter">
            {detail}
          </div>
        </div>
      ))}
    </section>
  )
}
