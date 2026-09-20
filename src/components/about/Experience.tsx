'use client'

import { useLocale } from '@/context/LocaleContext'

export default function Experience() {
  const { dict } = useLocale()
  const { experience_title, jobs } = dict.about

  return (
    <div className="mt-20 pt-16 border-t border-aquamarine/10">
      <h2 className="text-xs font-bold tracking-[0.4em] text-aquamarine uppercase mb-10 font-body">
        {experience_title}
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-aquamarine/40 via-aquamarine/10 to-transparent hidden md:block" />

        <div className="space-y-12">
          {jobs.map((job) => (
            <div key={job.company} className="md:pl-10 relative">
              <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-aquamarine shadow-[0_0_8px_rgba(127,255,212,0.6)] hidden md:block" />

              <div className="glass border border-aquamarine/15 rounded-xl p-8 hover:border-aquamarine/30 transition-colors duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="font-display font-bold text-white text-xl">{job.company}</p>
                    <p className="font-body text-aquamarine/80 text-sm mt-0.5">{job.role}</p>
                  </div>
                  <span className="font-body text-xs tracking-widest uppercase text-white/30 font-bold border border-white/10 rounded-full px-3 py-1 shrink-0">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed font-body">
                      <span className="text-aquamarine/50 mt-1.5 shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded bg-aquamarine/10 border border-aquamarine/15 text-aquamarine/70 text-[10px] font-bold uppercase tracking-wider font-body"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
