import Link from 'next/link'
import NeuralNetwork from './NeuralNetwork'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-48 pb-4 px-8 lg:px-12">
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

        {/* ── Right: neural network ── */}
        <div className="lg:col-span-5 mt-12 lg:mt-0">
          <NeuralNetwork />
        </div>

      </div>
    </section>
  )
}
