import type { Project } from '@/data/projects'

function highlightAccent(text: string, accentWord: string) {
  const idx = text.indexOf(accentWord)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-aquamarine">{accentWord}</span>
      {text.slice(idx + accentWord.length)}
    </>
  )
}

export function ChallengeSection({ challenge }: { challenge: Project['challenge'] }) {
  return (
    <section className="glass border border-aquamarine/20 p-10 md:p-16 rounded-xl relative overflow-hidden luminous-edge">
      <div className="absolute top-0 right-0 w-80 h-80 bg-aquamarine/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-xs font-bold tracking-[0.3em] text-aquamarine uppercase mb-6 font-body flex items-center gap-3">
          <span className="w-12 h-px bg-aquamarine/60" />
          The Challenge
        </h2>

        <h3 className="text-2xl font-display font-bold text-white mb-8 leading-tight">
          {highlightAccent(challenge.heading, challenge.accentWord)}
        </h3>

        <div className="space-y-6 text-white/60 text-lg leading-relaxed max-w-3xl font-light">
          {challenge.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-10 space-y-4 max-w-md">
          <div className="flex justify-between text-[10px] font-bold tracking-widest text-aquamarine uppercase font-body">
            <span>{challenge.metric.label}</span>
            <span>{challenge.metric.targetLabel}</span>
          </div>
          <div className="h-2 w-full bg-aquamarine/10 rounded-full overflow-hidden border border-aquamarine/20">
            <div
              className="h-full bg-gradient-to-r from-aquamarine to-seafoam shadow-[0_0_15px_rgba(127,255,212,0.6)] rounded-full"
              style={{ width: `${challenge.metric.progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function SolutionSection({ solution }: { solution: Project['solution'] }) {
  return (
    <section className="p-10 md:p-16 rounded-xl relative overflow-hidden bg-surface-2 border border-seafoam/15">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-seafoam/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-xs font-bold tracking-[0.3em] text-seafoam uppercase mb-6 font-body flex items-center gap-3">
          <span className="w-12 h-px bg-seafoam/60" />
          The Solution
        </h2>

        <h3 className="text-2xl font-display font-bold text-white mb-8 leading-tight">
          {highlightAccent(solution.heading, solution.accentWord)}
        </h3>

        <div className="space-y-6 text-white/60 text-lg leading-relaxed max-w-3xl font-light">
          {solution.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Solution visual placeholder */}
        <div className="mt-12 rounded-xl overflow-hidden border border-aquamarine/20 shadow-2xl relative aspect-video">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(127,255,212,0.08) 0%, rgba(5,11,15,0.98) 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3 p-8 w-full max-w-sm opacity-60">
              {[85, 60, 40, 95].map((w, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-2 bg-aquamarine/40 rounded-full" style={{ width: `${w}%` }} />
                  <div className="h-6 bg-aquamarine/10 rounded border border-aquamarine/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
