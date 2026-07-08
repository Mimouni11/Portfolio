'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import AmbientLines from '@/components/AmbientLines'
import Eyebrow from '@/components/Eyebrow'
import ProjectModal from '@/components/projects/ProjectModal'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  return (
    <>
      <Header />
      <SocialSidebar />

      <main className="relative overflow-hidden mesh-gradient min-h-screen">
        <AmbientLines count={10} opacity={0.10} grid />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />

        <section className="relative max-w-7xl mx-auto px-8 lg:px-12 pt-40 pb-32">
          {/* Heading */}
          <div className="mb-20">
            <Eyebrow label="Selected Work" />
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
              Projects &amp;{' '}
              <span className="text-aquamarine glow-text-aquamarine">Case Studies</span>
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedSlug(p.slug)}
                className="group glass border border-aquamarine/25 rounded-2xl overflow-hidden hover:border-aquamarine/60 transition-all duration-300 luminous-edge text-left w-full"
              >
                {/* Cover */}
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ background: p.coverGradient, backgroundColor: '#020d0d' }}
                >
                  {p.coverImage ? (
                    <Image
                      src={p.coverImage}
                      alt={p.title.join(' ')}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(127,255,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-aquamarine/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ animation: 'shimmer-x 1.6s ease-in-out infinite' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full border border-aquamarine/40 bg-aquamarine/15 text-aquamarine text-[10px] font-bold tracking-widest uppercase font-body">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <p className="font-body text-[10px] tracking-widest uppercase text-aquamarine/60 font-bold mb-2">
                    {p.subtitle}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-aquamarine transition-colors duration-300">
                    {p.title.join(' ')}
                  </h2>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">{p.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.meta.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded bg-aquamarine/10 border border-aquamarine/15 text-aquamarine/70 text-[10px] font-bold uppercase tracking-wider font-body"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Case study modal */}
      {selectedSlug && (
        <ProjectModal
          slug={selectedSlug}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </>
  )
}
