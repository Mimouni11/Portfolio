'use client'

import { useLocale } from '@/context/LocaleContext'

export default function Bio() {
  const { dict } = useLocale()
  const a = dict.about

  return (
    <div>
      <div className="inline-flex items-center gap-2 glass border border-aquamarine/30 rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 rounded-full bg-aquamarine animate-pulse" />
        <span className="font-body text-xs tracking-widest uppercase text-aquamarine font-bold">
          {a.status}
        </span>
      </div>

      <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight tracking-tight mb-8">
        <span className="text-white">{a.heading_1}</span>
        <br />
        <span className="text-aquamarine glow-text-aquamarine">{a.heading_2}</span>
      </h2>

      <div className="space-y-4 mb-10 max-w-lg">
        <p className="font-body text-white/80 leading-relaxed">
          {a.bio_1.split(a.bio_1_accent).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="text-aquamarine font-semibold">{a.bio_1_accent}</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
        <p className="font-body text-white/60 leading-relaxed">{a.bio_2}</p>
      </div>
    </div>
  )
}
