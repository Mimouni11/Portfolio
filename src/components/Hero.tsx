import Link from 'next/link'
import Eyebrow from './Eyebrow'
import BackgroundScene from './ui/aurora-section-hero'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: '#000800' }}>
      <BackgroundScene beamCount={60} />

      {/* Radial vignette so text pops over the beams */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,11,15,0.7)_100%)] pointer-events-none" />

      {/* Content — centered with header clearance */}
      <div className="relative z-10 text-center px-8 lg:px-12 pt-24 pb-16 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <Eyebrow label="Alex Rivera — Architecting Digital Landscapes" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8 text-white">
          Senior{' '}
          <span className="text-aquamarine glow-text-aquamarine">Full-Stack</span>{' '}
          Engineer &amp;{' '}
          <em className="italic font-light text-cyan">Interaction</em>{' '}
          Designer.
        </h1>

        <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
          Bridging the gap between hyper-functional engineering and evocative
          digital aesthetics. I build high-performance systems for the next
          generation of the web.
        </p>

        <div className="flex flex-wrap gap-6 items-center justify-center">
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
    </section>
  )
}
