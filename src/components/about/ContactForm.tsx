'use client'

import { useState } from 'react'

const inputClass =
  'w-full glass border border-aquamarine/20 rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-aquamarine/60 transition-colors duration-200 bg-transparent'

const socials = [
  {
    label: 'Website',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'Share',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    label: 'Terminal',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="glass border border-aquamarine/25 rounded-2xl p-8 h-full flex flex-col luminous-edge">
      <h3 className="font-display font-bold text-3xl text-aquamarine glow-text-aquamarine mb-2">
        Initiate Connection
      </h3>
      <p className="font-body text-xs tracking-widest uppercase text-white/40 mb-8">
        Synchronize your objectives with my expertise.
      </p>

      {sent ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-aquamarine/15 border border-aquamarine/40 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FFFD4" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-display font-bold text-aquamarine">Transmission Sent</p>
          <p className="font-body text-xs text-white/40">I&apos;ll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <div>
            <label className="font-body text-[10px] tracking-widest uppercase text-aquamarine/60 font-bold block mb-2">
              Identity
            </label>
            <input
              type="text"
              placeholder="Full Name / Entity"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-body text-[10px] tracking-widest uppercase text-aquamarine/60 font-bold block mb-2">
              Frequency
            </label>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-body text-[10px] tracking-widest uppercase text-aquamarine/60 font-bold block mb-2">
              Transmission
            </label>
            <textarea
              placeholder="Project parameters..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-auto w-full glass border border-aquamarine/40 hover:border-aquamarine hover:bg-aquamarine/10 text-aquamarine font-display font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            Send Transmission
            <span className="group-hover:translate-x-1 transition-transform duration-200">▶</span>
          </button>
        </form>
      )}

      {/* Bottom social icons */}
      <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-aquamarine/10">
        {socials.map(({ label, svg }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-aquamarine/30 hover:text-aquamarine transition-colors duration-200"
          >
            {svg}
          </a>
        ))}
      </div>
    </div>
  )
}
