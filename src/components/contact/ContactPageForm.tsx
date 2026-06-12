'use client'

import { useState } from 'react'

const underlineInput =
  'w-full bg-transparent border-b border-aquamarine/20 py-4 font-body text-xl text-white placeholder-white/20 focus:outline-none focus:border-aquamarine transition-colors duration-300'

const fields = [
  { id: 'name',    label: '01_IDENTITY // FULL NAME',         type: 'text',  placeholder: 'Enter identification string...' },
  { id: 'email',   label: '02_FREQUENCY // EMAIL ADDRESS',    type: 'email', placeholder: 'user@domain.protocol'           },
]

export default function ContactPageForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="glass-strong border border-aquamarine/20 rounded-2xl p-10 luminous-edge flex flex-col items-start gap-6 py-20">
        <div className="w-14 h-14 rounded-full border border-aquamarine/40 bg-aquamarine/10 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FFFD4" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display font-bold text-3xl text-aquamarine glow-text-aquamarine">Transmission Sent.</p>
        <p className="font-body text-sm text-white/40">Signal received. Establishing reply channel shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong border border-aquamarine/20 rounded-2xl p-10 space-y-12 luminous-edge">
      {fields.map(({ id, label, type, placeholder }) => (
        <div key={id} className="group">
          <label className="block font-body text-[10px] tracking-[0.3em] text-aquamarine/60 mb-4 uppercase group-focus-within:text-aquamarine transition-colors duration-200">
            {label}
          </label>
          <input
            type={type}
            required
            placeholder={placeholder}
            value={form[id as 'name' | 'email']}
            onChange={(e) => setForm({ ...form, [id]: e.target.value })}
            className={underlineInput}
          />
        </div>
      ))}

      <div className="group">
        <label className="block font-body text-[10px] tracking-[0.3em] text-aquamarine/60 mb-4 uppercase group-focus-within:text-aquamarine transition-colors duration-200">
          03_TRANSMISSION // MESSAGE BODY
        </label>
        <textarea
          rows={5}
          placeholder="Draft your query here..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-surface/40 backdrop-blur-[32px] border border-aquamarine/15 rounded-xl p-6 font-body text-lg text-white placeholder-white/20 focus:outline-none focus:border-aquamarine/50 transition-colors duration-300 resize-none"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-6 bg-aquamarine text-obsidian font-display font-bold uppercase tracking-widest px-12 py-5 rounded-lg shadow-[0_0_30px_rgba(127,255,212,0.5)] hover:shadow-[0_0_50px_rgba(127,255,212,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Send Transmission
          <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
        </button>
      </div>
    </form>
  )
}
