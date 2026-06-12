export default function ScanLine({ delay = '0s' }: { delay?: string }) {
  return (
    <div
      className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{
        background:
          'linear-gradient(to right, transparent 0%, rgba(127,255,212,0.3) 25%, rgba(127,255,212,0.7) 50%, rgba(127,255,212,0.3) 75%, transparent 100%)',
        animation: `scan-line 14s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  )
}
