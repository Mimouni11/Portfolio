export default function ScrollIndicator() {
  return (
    <div className="mt-32 flex flex-col items-center gap-4 pb-20">
      <div className="w-[2px] h-24 bg-gradient-to-b from-aquamarine via-aquamarine/50 to-transparent shadow-[0_0_15px_rgba(127,255,212,0.5)]" />
      <span className="font-body text-[10px] tracking-[0.5em] uppercase text-aquamarine font-bold">
        Scroll to Explore
      </span>
    </div>
  )
}
