export default function Eyebrow({
  label,
  right,
}: {
  label: string
  right?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-[2px] w-12 bg-aquamarine shrink-0" />
      <span className="font-body text-xs tracking-[0.3em] uppercase text-aquamarine font-bold">
        {label}
      </span>
      {right && (
        <span className="font-body text-[10px] uppercase tracking-[0.3em] ml-auto text-white/40">
          {right}
        </span>
      )}
    </div>
  )
}
