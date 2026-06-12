import type { ProjectResult } from '@/data/projects'

export default function ResultsGrid({ results }: { results: ProjectResult[] }) {
  return (
    <section className="mt-32 relative">
      <div className="mb-12 text-center">
        <h2 className="text-xs font-bold tracking-[0.4em] text-aquamarine uppercase mb-4 font-body">
          The Impact
        </h2>
        <p className="text-5xl font-display font-bold text-white glow-text-aquamarine">
          Measured Performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((r) => {
          const isPrimary = r.accent === 'primary'
          return (
            <div
              key={r.label}
              className={`glass p-8 rounded-xl border transition-all group ${
                isPrimary
                  ? 'border-aquamarine/30 hover:border-aquamarine/60 bg-aquamarine/5 luminous-edge'
                  : 'border-seafoam/30 hover:border-seafoam/60 bg-seafoam/5'
              }`}
            >
              <div
                className={`font-display text-5xl font-bold mb-2 group-hover:scale-110 transition-transform origin-left ${
                  isPrimary ? 'text-aquamarine glow-text-aquamarine' : 'text-seafoam'
                }`}
              >
                {r.value}
              </div>
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase font-body mb-4">
                {r.label}
              </p>
              <div className={`h-1.5 w-full rounded-full mb-4 ${isPrimary ? 'bg-aquamarine/10' : 'bg-seafoam/10'}`}>
                <div
                  className={`h-full rounded-full ${
                    isPrimary
                      ? 'bg-aquamarine shadow-[0_0_10px_rgba(127,255,212,0.6)]'
                      : 'bg-seafoam shadow-[0_0_10px_rgba(32,178,170,0.6)]'
                  }`}
                  style={{ width: `${r.progress}%` }}
                />
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{r.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
