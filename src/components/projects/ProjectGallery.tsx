'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const PAGE_SIZE = 4

export default function ProjectGallery({
  gallery,
}: {
  gallery: Array<{ label: string; gradient: string; image?: string; document?: string }>
}) {
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null)
  const [documentViewer, setDocumentViewer] = useState<{ src: string; label: string } | null>(null)

  if (gallery.length === 0) return null

  const totalPages = Math.ceil(gallery.length / PAGE_SIZE)
  const visible = gallery.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <>
      <section className="mt-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-bold tracking-[0.4em] text-aquamarine uppercase mb-4 font-body">
              Visual Journey
            </h2>
            <p className="text-3xl md:text-4xl font-display font-bold text-white">Project Gallery</p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30 font-body tracking-widest uppercase">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-14 h-14 rounded-full border border-aquamarine/30 flex items-center justify-center hover:bg-aquamarine/20 transition-all text-aquamarine text-lg shadow-[0_0_15px_rgba(127,255,212,0.10)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-14 h-14 rounded-full border border-aquamarine/30 flex items-center justify-center hover:bg-aquamarine/20 transition-all text-aquamarine text-lg shadow-[0_0_15px_rgba(127,255,212,0.10)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visible.map(({ label, gradient, image, document }) => (
            <button
              key={label}
              onClick={() => {
                if (document) {
                  setDocumentViewer({ src: document, label })
                  return
                }
                if (image) setLightbox({ src: image, label })
              }}
              className={`group relative aspect-video rounded-xl overflow-hidden border border-aquamarine/20 luminous-edge text-left w-full ${image || document ? 'cursor-zoom-in' : 'cursor-default'}`}
            >
              {image ? (
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: gradient }} />
                  <div className="absolute inset-0 p-4 opacity-40 pointer-events-none">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-aquamarine/50" />)}
                    </div>
                    <div className="space-y-2">
                      {[80, 50, 65, 35].map((w, i) => (
                        <div key={i} className="h-1.5 bg-aquamarine/30 rounded-full" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-5 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest text-obsidian bg-aquamarine px-5 py-2.5 rounded-full uppercase shadow-xl font-display">
                  {document ? 'Open Deck' : label}
                </span>
              </div>
              {document && (
                <span className="absolute top-4 right-4 rounded-full border border-aquamarine/40 bg-obsidian/75 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-aquamarine backdrop-blur-sm font-body">
                  PDF
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {lightbox && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-body z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative w-[90vw] max-w-5xl rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.label}
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
              <p className="text-xs font-bold tracking-widest text-aquamarine uppercase font-body">{lightbox.label}</p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {documentViewer && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={() => setDocumentViewer(null)}
        >
          <div
            className="relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-aquamarine/20 bg-obsidian shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-5">
              <p className="min-w-0 truncate text-xs font-bold tracking-widest text-aquamarine uppercase font-body">
                {documentViewer.label}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={documentViewer.src}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-aquamarine/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-aquamarine transition-colors hover:bg-aquamarine/10 font-body"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => setDocumentViewer(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-white/70 transition-all hover:border-white/50 hover:text-white"
                  aria-label="Close document"
                >
                  âœ•
                </button>
              </div>
            </div>
            <iframe
              src={documentViewer.src}
              title={documentViewer.label}
              className="h-full w-full bg-white"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
