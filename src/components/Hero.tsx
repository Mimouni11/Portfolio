import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-48 pb-20 px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* ── Left: copy ── */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-aquamarine" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-aquamarine font-bold">
              Alex Rivera — Architecting Digital Landscapes
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
            Senior{' '}
            <span className="text-aquamarine glow-text-aquamarine">Full-Stack</span>{' '}
            Engineer &amp;{' '}
            <em className="italic font-light text-cyan">Interaction</em>{' '}
            Designer.
          </h1>

          <p className="font-body text-lg text-white/90 max-w-xl mb-12 leading-relaxed">
            Bridging the gap between hyper-functional engineering and evocative
            digital aesthetics. I build high-performance systems for the next
            generation of the web.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Link
              href="/projects"
              className="px-8 py-4 bg-gradient-to-r from-aquamarine to-seafoam text-obsidian font-display font-bold rounded-lg shadow-[0_0_40px_rgba(127,255,212,0.5)] hover:shadow-[0_0_60px_rgba(127,255,212,0.7)] transition-all active:scale-95 text-sm"
            >
              View My Portfolio
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-aquamarine/40 hover:border-aquamarine hover:bg-aquamarine/10 text-white font-display font-medium rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              Read My Story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ── Right: project card ── */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden glass luminous-edge p-2 rotate-2 hover:rotate-0 transition-transform duration-700 shadow-[0_0_100px_rgba(127,255,212,0.15)]">

            {/* Orb visual */}
            <div className="w-full h-full rounded-lg relative overflow-hidden flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(127,255,212,0.25) 0%, rgba(0,255,255,0.10) 35%, rgba(32,178,170,0.05) 65%, transparent 100%)',
              }}
            >
              <div
                className="w-64 h-64 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, rgba(127,255,212,0.35) 0%, rgba(0,255,255,0.15) 38%, rgba(32,178,170,0.06) 65%, transparent 100%)',
                  boxShadow: '0 0 80px rgba(127,255,212,0.12), inset 0 0 60px rgba(0,255,255,0.08), inset 1px 1px 30px rgba(255,255,255,0.05)',
                  border: '1px solid rgba(127,255,212,0.15)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-aquamarine/10 opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-body text-[10px] uppercase tracking-widest text-aquamarine font-bold mb-2 block">
                  Featured Project
                </span>
                <h3 className="font-display text-2xl font-bold text-white glow-text-aquamarine">
                  Quantum Analytics Platform
                </h3>
              </div>
            </div>
          </div>

          {/* Floating deployment badge */}
          <div className="absolute -bottom-10 -left-10 glass border border-aquamarine/40 rounded-xl p-6 shadow-[0_0_50px_rgba(127,255,212,0.2)] max-w-[240px] hidden md:block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-aquamarine flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
                  <path d="M12 2.5c-1.5 3.5-2 6-1.5 8.5-2-1-3.5-2.5-4-5C5 8 4 11 5 14c1.5 4 5.5 6 7 6s5.5-2 7-6c1-3 0-6-1.5-8-0.5 2.5-2 4-4 5 0.5-2.5 0-5-1.5-8.5z"/>
                </svg>
              </div>
              <span className="font-display font-bold text-sm text-aquamarine">
                Deployment Ready
              </span>
            </div>
            <p className="text-[10px] text-white/80 leading-normal font-medium">
              Fully integrated with edge functions and real-time streaming sockets.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
