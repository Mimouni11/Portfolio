'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export default function ClickableImage({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-12 rounded-xl overflow-hidden border border-aquamarine/20 shadow-2xl w-full cursor-zoom-in block"
        aria-label={`View ${alt} fullscreen`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain"
        />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-body z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative w-[95vw] max-w-6xl rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
