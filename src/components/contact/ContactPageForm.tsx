'use client'

import { useState } from 'react'
import { useLocale } from '@/context/LocaleContext'

const FORMSPREE_ID = 'mgavovwd'

const underlineInput =
  'w-full bg-transparent border-b border-aquamarine/20 py-4 font-body text-xl text-white placeholder-white/20 focus:outline-none focus:border-aquamarine transition-colors duration-300 disabled:opacity-50'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPageForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [file, setFile] = useState<File | null>(null)
  const { dict } = useLocale()
  const cf = dict.contactForm

  const fields = [
    { id: 'name',  label: cf.field_name_label,  type: 'text',  placeholder: cf.field_name_placeholder  },
    { id: 'email', label: cf.field_email_label, type: 'email', placeholder: cf.field_email_placeholder },
  ]

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData()
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('message', form.message)
    if (file) data.append('attachment', file)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setFile(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-strong border border-aquamarine/20 rounded-2xl p-10 luminous-edge flex flex-col items-start gap-6 py-20">
        <div className="w-14 h-14 rounded-full border border-aquamarine/40 bg-aquamarine/10 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FFFD4" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display font-bold text-3xl text-aquamarine glow-text-aquamarine">{cf.success_heading}</p>
        <p className="font-body text-sm text-white/40">{cf.success_body}</p>
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
            disabled={status === 'sending'}
          />
        </div>
      ))}

      <div className="group">
        <label className="block font-body text-[10px] tracking-[0.3em] text-aquamarine/60 mb-4 uppercase group-focus-within:text-aquamarine transition-colors duration-200">
          {cf.field_message_label}
        </label>
        <textarea
          rows={5}
          required
          placeholder={cf.field_message_placeholder}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-surface/40 backdrop-blur-[32px] border border-aquamarine/15 rounded-xl p-6 font-body text-lg text-white placeholder-white/20 focus:outline-none focus:border-aquamarine/50 transition-colors duration-300 resize-none disabled:opacity-50"
          disabled={status === 'sending'}
        />
      </div>

      <div className="group">
        <label className="block font-body text-[10px] tracking-[0.3em] text-aquamarine/60 mb-4 uppercase">
          {cf.field_attachment_label}
        </label>
        <label className="flex items-center gap-4 cursor-pointer w-fit">
          <span className="border border-aquamarine/20 rounded-lg px-5 py-3 font-body text-sm text-aquamarine/60 hover:border-aquamarine/50 hover:text-aquamarine transition-colors duration-200">
            {file ? file.name : 'Choose file'}
          </span>
          <input
            type="file"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={status === 'sending'}
          />
          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-white/20 hover:text-white/60 transition-colors duration-200 text-xs"
            >
              remove
            </button>
          )}
        </label>
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-400/80">
          Transmission failed. Try again or reach out directly.
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-6 bg-aquamarine text-obsidian font-display font-bold uppercase tracking-widest px-12 py-5 rounded-lg shadow-[0_0_30px_rgba(127,255,212,0.5)] hover:shadow-[0_0_50px_rgba(127,255,212,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? '...' : cf.submit}
          {status !== 'sending' && (
            <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
          )}
        </button>
      </div>
    </form>
  )
}
