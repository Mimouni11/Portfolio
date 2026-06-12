import Link from 'next/link'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <SocialSidebar />

      <main className="relative overflow-hidden mesh-gradient min-h-screen">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />

        <section className="relative max-w-7xl mx-auto px-8 lg:px-12 pt-48 pb-32">
          {/* Heading */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-aquamarine" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-aquamarine font-bold">
                Selected Work
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              Projects &amp;{' '}
              <span className="text-aquamarine glow-text-aquamarine">Case Studies</span>
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group glass border border-aquamarine/25 rounded-2xl overflow-hidden hover:border-aquamarine/60 transition-all duration-300 luminous-edge"
              >
                {/* Cover */}
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ background: p.coverGradient, backgroundColor: '#020d0d' }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(127,255,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.3) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full border border-aquamarine/40 bg-aquamarine/15 text-aquamarine text-[10px] font-bold tracking-widest uppercase font-body">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <p className="font-body text-[10px] tracking-widest uppercase text-aquamarine/60 font-bold mb-2">
                    {p.subtitle}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-aquamarine transition-colors duration-300">
                    {p.title.join(' ')}
                  </h2>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">{p.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.meta.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded bg-aquamarine/10 border border-aquamarine/15 text-aquamarine/70 text-[10px] font-bold uppercase tracking-wider font-body"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
