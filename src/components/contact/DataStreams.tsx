'use client'

const STREAMS = Array.from({ length: 16 }, (_, i) => ({
  left:     `${(i * 6.5 + 2) % 100}%`,
  delay:    `${(i * 0.55) % 8}s`,
  duration: `${6 + (i * 0.9) % 9}s`,
}))

export default function DataStreams() {
  return (
    <>
      {/* Dot-grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127,255,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Falling light streams */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {STREAMS.map((s, i) => (
          <div
            key={i}
            className="absolute w-px"
            style={{
              left: s.left,
              top: 0,
              height: '120px',
              background: 'linear-gradient(to bottom, transparent, rgba(127,255,212,0.5), transparent)',
              animation: `data-stream ${s.duration} linear infinite`,
              animationDelay: s.delay,
              opacity: 0.18,
            }}
          />
        ))}
      </div>
    </>
  )
}
