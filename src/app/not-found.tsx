import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-aquamarine/10 blur-[150px] pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127,255,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p className="font-body text-[10px] tracking-[0.4em] text-aquamarine/50 uppercase">
          ERROR // ROUTE_NOT_FOUND
        </p>

        <h1 className="font-display font-bold text-[120px] md:text-[180px] leading-none text-aquamarine glow-text-aquamarine select-none">
          404
        </h1>

        <p className="font-body text-white/40 text-lg max-w-sm">
          The page you requested does not exist or has been moved.
        </p>

        <Link
          href="/en"
          className="mt-4 inline-flex items-center gap-4 bg-aquamarine text-obsidian font-display font-bold uppercase tracking-widest px-10 py-4 rounded-lg shadow-[0_0_30px_rgba(127,255,212,0.4)] hover:shadow-[0_0_50px_rgba(127,255,212,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Return Home
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
