export default function ProjectGallery({
  gallery,
}: {
  gallery: Array<{ label: string; gradient: string }>
}) {
  return (
    <section className="mt-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-xs font-bold tracking-[0.4em] text-aquamarine uppercase mb-4 font-body">
            Visual Journey
          </h2>
          <p className="text-5xl font-display font-bold text-white">Project Gallery</p>
        </div>
        <div className="flex gap-4">
          {['←', '→'].map((arrow) => (
            <button
              key={arrow}
              className="w-14 h-14 rounded-full border border-aquamarine/30 flex items-center justify-center hover:bg-aquamarine/20 transition-all text-aquamarine text-lg shadow-[0_0_15px_rgba(127,255,212,0.10)]"
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gallery.map(({ label, gradient }) => (
          <div
            key={label}
            className="group relative aspect-video rounded-xl overflow-hidden border border-aquamarine/20 luminous-edge"
          >
            {/* Placeholder — replace div with next/image when real assets are ready */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: gradient }} />
            {/* Fake UI chrome to make it look like a screenshot */}
            <div className="absolute inset-0 p-4 opacity-40 pointer-events-none">
              <div className="flex gap-1 mb-3">
                {[1,2,3].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-aquamarine/50" />)}
              </div>
              <div className="space-y-2">
                {[80,50,65,35].map((w,i) => (
                  <div key={i} className="h-1.5 bg-aquamarine/30 rounded-full" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            {/* Hover label */}
            <div className="absolute inset-0 bg-aquamarine/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest text-obsidian bg-aquamarine px-6 py-3 rounded-full uppercase shadow-xl font-display">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
