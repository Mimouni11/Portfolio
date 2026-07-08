import type { Project } from '@/data/projects'

export default function CaseStudyHero({ project }: { project: Project }) {
  return (
    <header className="relative w-full h-[520px] overflow-hidden">
      {/* Cover visual — swap for next/image when you have the real asset */}
      <div
        className="absolute inset-0 scale-105"
        style={{ background: project.coverGradient, backgroundColor: '#020d0d' }}
      />
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127,255,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Fade to page bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

      <div className="absolute bottom-20 left-10 md:left-24 max-w-4xl z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 rounded-full border border-aquamarine/50 bg-aquamarine/20 text-aquamarine text-xs font-bold tracking-widest uppercase font-body">
            {project.category}
          </span>
          <div className="h-px w-16 bg-aquamarine/50" />
          <span className="text-aquamarine/70 text-xs font-bold tracking-widest uppercase font-body">
            {project.subtitle}
          </span>
        </div>

        <h1 className="font-display font-bold tracking-tighter leading-[0.85] mb-6">
          <span className="block text-4xl md:text-5xl lg:text-6xl text-aquamarine glow-text-aquamarine">
            {project.title[0]}
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
            {project.title[1]}
          </span>
        </h1>

        <p className="text-xl text-white/60 font-body max-w-2xl leading-relaxed">
          {project.tagline}
        </p>
      </div>
    </header>
  )
}
