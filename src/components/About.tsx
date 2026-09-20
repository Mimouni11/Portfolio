'use client'
import ProfileCard from './about/ProfileCard'
import Bio from './about/Bio'
import TechStack from './about/TechStack'
import Experience from './about/Experience'
import TransitionLink from './TransitionLink'
import { useLocale } from '@/context/LocaleContext'

export default function About() {
  const { dict } = useLocale()
  const a = dict.about

  return (
    <section id="about" className="relative px-8 lg:px-12 pt-12 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-3">
            <ProfileCard />
          </div>

          <div className="lg:col-span-5">
            <Bio />
            <TechStack />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass border border-aquamarine/20 rounded-xl p-8">
              <p className="font-display font-bold text-white text-xl mb-3 leading-snug">
                {a.cta_heading}
              </p>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
                {a.cta_body}
              </p>
              <TransitionLink
                href="/contact"
                className="w-full block px-6 py-3 bg-gradient-to-r from-aquamarine to-seafoam text-obsidian font-display font-bold rounded-lg shadow-[0_0_30px_rgba(127,255,212,0.4)] hover:shadow-[0_0_50px_rgba(127,255,212,0.6)] transition-all active:scale-95 text-sm text-center"
              >
                {a.cta_button}
              </TransitionLink>
            </div>
          </div>

        </div>

        <Experience />
      </div>
    </section>
  )
}
