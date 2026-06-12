import Link from 'next/link'
import NeuralNetwork from './NeuralNetwork'
import AmbientLines from './AmbientLines'
import Eyebrow from './Eyebrow'

export default function Hero() {
  return (
    <section className="relative pt-40 pb-16 px-8 lg:px-12 overflow-hidden">
      <AmbientLines count={10} opacity={0.10} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* ── Left: copy ── */}
        <div className="lg:col-span-7">
          <Eyebrow label="Alex Rivera — Architecting Digital Landscapes" />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8 text-white">
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

        {/* ── Right: neural network with HUD frame ── */}
        <div className="lg:col-span-5 mt-12 lg:mt-0 relative" style={{ animation: 'float-slow 7s ease-in-out infinite' }}>
          {/* HUD corner brackets */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-aquamarine/60 rounded-tl z-20" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-aquamarine/60 rounded-tr z-20" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-aquamarine/60 rounded-bl z-20" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-aquamarine/60 rounded-br z-20" />
          {/* Live status badge */}
          <div className="absolute -top-8 right-0 flex items-center gap-2 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-aquamarine animate-pulse shadow-[0_0_6px_rgba(127,255,212,0.8)]" />
            <span className="font-body text-[9px] tracking-widest uppercase text-aquamarine/60">Live Node</span>
          </div>
          <NeuralNetwork />
        </div>

      </div>
    </section>
  )
}
