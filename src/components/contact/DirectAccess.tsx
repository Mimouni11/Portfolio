const contacts = [
  { label: 'Encrypted_Mail',  value: 'hello@aquatic.dev',        href: 'mailto:hello@aquatic.dev' },
  { label: 'Satellite_Link',  value: '+1 (000) 808-NODE',         href: 'tel:+10008086633'         },
  { label: 'Global_Office',   value: 'Level 42, The Spire\nNeo-Shinjuku, Sector 7', href: null   },
]

export default function DirectAccess() {
  return (
    <div className="space-y-8">
      {/* Info card */}
      <div className="glass border border-aquamarine/15 rounded-2xl p-8 luminous-edge">
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-aquamarine mb-6">
          Direct_Access
        </h3>
        <ul className="space-y-6">
          {contacts.map(({ label, value, href }) => (
            <li key={label}>
              <span className="block font-body text-[10px] text-white/30 uppercase tracking-widest mb-1">
                {label}
              </span>
              {href ? (
                <a href={href} className="font-body text-white hover:text-aquamarine transition-colors duration-200 whitespace-pre-line">
                  {value}
                </a>
              ) : (
                <p className="font-body text-white leading-snug whitespace-pre-line">{value}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual node card */}
      <div className="relative overflow-hidden rounded-2xl aspect-square border border-aquamarine/15 luminous-edge">
        {/* Gradient placeholder — swap for next/image when you have the asset */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(127,255,212,0.15) 0%, rgba(0,255,255,0.06) 40%, transparent 70%), radial-gradient(ellipse at 70% 80%, rgba(32,178,170,0.12) 0%, transparent 60%)',
            backgroundColor: '#020d0d',
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(127,255,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-aquamarine/20 backdrop-blur-md rounded-full text-[10px] text-aquamarine font-bold uppercase tracking-widest border border-aquamarine/30">
            <span className="w-1.5 h-1.5 bg-aquamarine rounded-full animate-pulse shadow-[0_0_6px_rgba(127,255,212,0.8)]" />
            Live_Node
          </span>
        </div>
      </div>
    </div>
  )
}
