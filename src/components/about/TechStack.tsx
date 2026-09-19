'use client'

import { useLocale } from '@/context/LocaleContext'

const ICONS = {
  Python: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.008 2.752h5.838v.826H3.906S0 5.789 0 11.969c0 6.18 3.42 5.96 3.42 5.96h2.043v-2.867s-.11-3.42 3.367-3.42h5.8s3.257.052 3.257-3.148V3.202S18.504 0 11.914 0zM8.708 1.816a.923.923 0 110 1.847.923.923 0 010-1.847z" />
      <path d="M12.086 24c6.09 0 5.71-2.657 5.71-2.657l-.008-2.75h-5.837v-.827h8.145s3.904.445 3.904-5.735c0-6.18-3.42-5.96-3.42-5.96h-2.043v2.867s.11 3.42-3.366 3.42h-5.8s-3.258-.052-3.258 3.148v5.293S6.55 24 12.086 24zm3.206-1.816a.923.923 0 110-1.847.923.923 0 010 1.847z" />
    </svg>
  ),
  PyTorch: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 13.953 9.865 9.865 0 0013.953 0c3.849-3.85 3.849-10.104 0-13.953l-1.957 1.957c2.81 2.81 2.81 7.381 0 10.192a7.21 7.21 0 01-10.192 0 7.21 7.21 0 010-10.192l4.334-4.334.915 4.63zM15.525 2.498a1.503 1.503 0 100 3.006 1.503 1.503 0 000-3.006z" />
    </svg>
  ),
  TypeScript: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00.125-.49c0-.21-.065-.395-.194-.558a2.028 2.028 0 00-.5-.448 12.88 12.88 0 00-.535-.5 13.974 13.974 0 00-.926-.576 6.764 6.764 0 01-1.229-.764 3.2 3.2 0 01-.674-.777 3.168 3.168 0 01-.42-1.822c0-.656.13-1.21.389-1.66.258-.45.608-.818 1.048-1.105a4.979 4.979 0 011.482-.61 7.506 7.506 0 011.76-.2zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  FastAPI: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.375 0 0 5.375 0 12c0 6.626 5.375 12 12 12 6.626 0 12-5.374 12-12 0-6.625-5.374-12-12-12zm-.624 21.621v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
    </svg>
  ),
  'Next.js': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 012.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 002.465-2.163 11.944 11.944 0 002.824-7.634c.003-.193.003-1.25 0-1.443-.058-3.538-1.737-6.827-4.551-9.003a12.16 12.16 0 00-3.588-1.907 12.346 12.346 0 00-3.114-.49c-.17-.006-.36-.011-.504-.011zm3.024 7.347a.457.457 0 01.228.122.47.47 0 01.145.34v9.22l-1.432-2.165-.005-4.515c0-2.492.008-4.524.018-4.54a.462.462 0 01.412-.224.46.46 0 01.634.762z" />
    </svg>
  ),
  LangGraph: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="5" cy="5" r="2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <line x1="5" y1="7" x2="5" y2="10.8" />
      <line x1="19" y1="7" x2="19" y2="10.8" />
      <line x1="7" y1="5" x2="17" y2="5" />
      <line x1="6.2" y1="13.2" x2="10.5" y2="17.5" />
      <line x1="17.8" y1="13.2" x2="13.5" y2="17.5" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  ),
}

const STACK_KEYS = [
  { name: 'Python',     roleKey: 'python' },
  { name: 'PyTorch',    roleKey: 'pytorch' },
  { name: 'TypeScript', roleKey: 'typescript' },
  { name: 'FastAPI',    roleKey: 'fastapi' },
  { name: 'Next.js',    roleKey: 'nextjs' },
  { name: 'LangGraph',  roleKey: 'langgraph' },
] as const

export default function TechStack() {
  const { dict } = useLocale()
  const a = dict.about

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-aquamarine/50" />
        <span className="font-body text-xs tracking-widest uppercase text-aquamarine/70 font-bold">
          {a.stack_label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STACK_KEYS.map(({ name, roleKey }) => (
          <div
            key={name}
            className="glass border border-aquamarine/20 rounded-xl p-4 group hover:border-aquamarine/50 hover:bg-aquamarine/10 transition-all duration-300 cursor-default"
          >
            <span className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-200 block mb-3">
              {ICONS[name]}
            </span>
            <p className="font-display font-bold text-white text-sm mb-0.5">{name}</p>
            <p className="font-body text-[10px] tracking-widest uppercase text-aquamarine/50">
              {a.stack_roles[roleKey]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
