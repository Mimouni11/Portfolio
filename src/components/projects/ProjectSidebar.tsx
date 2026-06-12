import type { Project } from '@/data/projects'
import Link from 'next/link'

export default function ProjectSidebar({ meta, feedback }: { meta: Project['meta']; feedback?: Project['feedback'] }) {
  return (
    <aside className="lg:col-span-4 sticky top-32 space-y-8">
      {/* Meta card */}
      <div className="glass border border-aquamarine/25 rounded-xl p-8 luminous-edge">
        <span className="text-[10px] font-bold tracking-widest text-aquamarine uppercase font-body block mb-6 border-b border-aquamarine/10 pb-2">
          Project Meta
        </span>

        <div className="space-y-5 mb-8">
          <MetaRow label="Role" value={meta.role.join('\n')} accent />
          <MetaRow label="Timeline" value={`${meta.timeline}\n${meta.period}`} />
          <MetaRow label="Platform" value={meta.platform.join('\n')} />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-aquamarine uppercase font-body block mb-3 border-b border-aquamarine/10 pb-2">
          Stack
        </span>
        <div className="flex flex-wrap gap-2 mb-8">
          {meta.stack.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded bg-aquamarine/10 border border-aquamarine/20 text-aquamarine text-xs font-bold uppercase tracking-wider font-body"
            >
              {s}
            </span>
          ))}
        </div>

        {meta.liveUrl && (
          <Link
            href={meta.liveUrl}
            className="w-full py-4 rounded-lg bg-gradient-to-br from-aquamarine to-seafoam text-obsidian font-display font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(127,255,212,0.4)]"
          >
            Visit Live Site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        )}
      </div>

      {/* Feedback card */}
      {feedback && (
        <div className="p-8 rounded-xl bg-surface-2 border border-seafoam/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-seafoam/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] font-bold tracking-widest text-seafoam uppercase font-body block mb-4">
            Client Feedback
          </span>
          <p className="text-sm italic text-white/90 leading-relaxed relative z-10">{feedback.quote}</p>
          <div className="mt-6 flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-seafoam/30 border border-seafoam/50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-seafoam">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-white">{feedback.author}</p>
              <p className="text-[10px] text-seafoam font-bold uppercase tracking-tighter">{feedback.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

function MetaRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-start border-b border-white/5 pb-4">
      <span className="text-sm font-medium text-white/50 font-body">{label}</span>
      <span className={`text-sm font-bold text-right font-body whitespace-pre-line ${accent ? 'text-aquamarine glow-text-aquamarine' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}
