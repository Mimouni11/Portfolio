export default function Bio() {
  return (
    <div>
      {/* Status badge */}
      <div className="inline-flex items-center gap-2 glass border border-aquamarine/30 rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 rounded-full bg-aquamarine animate-pulse" />
        <span className="font-body text-xs tracking-widest uppercase text-aquamarine font-bold">
          Deployment: Active
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-display font-bold text-5xl xl:text-6xl leading-[1.0] tracking-tight mb-8">
        <span className="text-white">Engineering</span>
        <br />
        <span className="text-aquamarine glow-text-aquamarine">Philosophy</span>
      </h2>

      {/* Description */}
      <div className="space-y-4 mb-10 max-w-lg">
        <p className="font-body text-white/80 leading-relaxed">
          As a lead systems architect, my approach centers on the intersection of{' '}
          <span className="text-aquamarine font-semibold">aesthetic precision</span>{' '}
          and{' '}
          <span className="text-aquamarine font-semibold">mechanical robustness</span>.
        </p>
        <p className="font-body text-white/60 leading-relaxed">
          Specializing in low-latency systems and distributed cloud architectures,
          I transform complex technical requirements into elegant, observable, and
          highly-performant digital ecosystems.
        </p>
      </div>
    </div>
  )
}
