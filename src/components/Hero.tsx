'use client'

import Eyebrow from './Eyebrow'
import BackgroundScene from './ui/aurora-section-hero'
import TransitionLink from './TransitionLink'
import { useLocale } from '@/context/LocaleContext'

export default function Hero() {
  const { dict } = useLocale()
  const h = dict.hero

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: '#000800' }}>
      <BackgroundScene beamCount={60} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,11,15,0.7)_100%)] pointer-events-none" />

      <div className="relative z-10 text-center px-8 lg:px-12 pt-24 pb-16 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <Eyebrow label={h.eyebrow} />
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8 text-white">
          {h.h1_p1}{' '}
          <span className="text-aquamarine glow-text-aquamarine">{h.h1_accent}</span>{' '}
          {h.h1_connector}{' '}
          <em className="italic font-light text-cyan">{h.h1_italic}</em>{' '}
          {h.h1_p3}
        </h1>

        <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
          {h.tagline}
        </p>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          <TransitionLink
            href="/projects"
            className="px-8 py-4 bg-gradient-to-r from-aquamarine to-seafoam text-obsidian font-display font-bold rounded-lg shadow-[0_0_40px_rgba(127,255,212,0.5)] hover:shadow-[0_0_60px_rgba(127,255,212,0.7)] transition-all active:scale-95 text-sm"
          >
            {h.cta_portfolio}
          </TransitionLink>
          <TransitionLink
            href="/about"
            className="px-8 py-4 border-2 border-aquamarine/40 hover:border-aquamarine hover:bg-aquamarine/10 text-white font-display font-medium rounded-lg transition-all flex items-center gap-2 text-sm"
          >
            {h.cta_story}
            <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
