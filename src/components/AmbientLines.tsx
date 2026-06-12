'use client'

export default function AmbientLines({
  count = 8,
  opacity = 0.12,
  grid = false,
}: {
  count?: number
  opacity?: number
  grid?: boolean
}) {
  const streams = Array.from({ length: count }, (_, i) => ({
    left:     `${(i * (100 / count) + 3) % 100}%`,
    delay:    `${(i * 1.4) % 12}s`,
    duration: `${9 + (i * 1.1) % 11}s`,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(127,255,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      )}
      {streams.map((s, i) => (
        <div
          key={i}
          className="absolute w-px"
          style={{
            left:     s.left,
            top:      0,
            height:   '140px',
            background: 'linear-gradient(to bottom, transparent, rgba(127,255,212,0.55), transparent)',
            animation: `data-stream ${s.duration} linear infinite`,
            animationDelay: s.delay,
            opacity,
          }}
        />
      ))}
    </div>
  )
}
