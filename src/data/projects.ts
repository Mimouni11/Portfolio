export interface ProjectResult {
  value: string
  label: string
  description: string
  progress: number
  accent: 'primary' | 'secondary'
}

export interface Project {
  slug: string
  title: string[]
  subtitle: string
  category: string
  tagline: string
  coverGradient: string
  meta: {
    role: string[]
    timeline: string
    period: string
    platform: string[]
    stack: string[]
    liveUrl?: string
  }
  challenge: {
    heading: string
    accentWord: string
    body: string[]
    metric: { label: string; targetLabel: string; progress: number }
  }
  solution: {
    heading: string
    accentWord: string
    body: string[]
  }
  feedback?: {
    quote: string
    author: string
    role: string
  }
  results: ProjectResult[]
  gallery: Array<{ label: string; gradient: string }>
}

export const projects: Project[] = [
  {
    slug: 'nova-fintech-dashboard',
    title: ['NOVA FINTECH', 'DASHBOARD'],
    subtitle: 'FinTech Evolution',
    category: 'Case Study',
    tagline:
      'Reimagining complex asset management through a cinematic lens. Precision meets fluidity in the next generation of digital finance.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(127,255,212,0.25) 0%, rgba(0,255,255,0.10) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(32,178,170,0.20) 0%, transparent 60%)',
    meta: {
      role: ['Lead UI/UX Designer', 'Creative Director'],
      timeline: '6 Months',
      period: '2023 – 2024',
      platform: ['Web App (Desktop)', 'iOS / Android'],
      stack: ['React.js', 'Three.js', 'Tailwind CSS', 'Framer Motion', 'D3.js'],
      liveUrl: '#',
    },
    challenge: {
      heading: 'Bridging the gap between complex data and human intuition.',
      accentWord: 'complex data',
      body: [
        'Nova FinTech faced a significant hurdle: their existing platform was powerful but overwhelming. Institutional traders were losing critical seconds navigating through layers of legacy UI, leading to missed opportunities in high-volatility markets.',
        "The objective was clear: create a workspace that felt less like a spreadsheet and more like an observatory—a clear, luminous portal into the world's financial flows.",
      ],
      metric: { label: 'Cognitive Load Reduction', targetLabel: '35% Target', progress: 85 },
    },
    solution: {
      heading: 'A spatial UI architecture built on light and depth.',
      accentWord: 'light and depth',
      body: [
        'We introduced a layered glassmorphism system that allows users to maintain context across multiple data streams. By using tonal stacking instead of rigid borders, we reduced cognitive load by 35%.',
        'The final interface leverages cinematic lighting to highlight priority movements, ensuring that the most critical information is always the most luminous on the screen.',
      ],
    },
    feedback: {
      quote:
        '"The level of atmospheric detail brought a clarity to our data we didn\'t think was possible. It\'s not just a dashboard; it\'s a competitive advantage."',
      author: 'Marcus Thorne',
      role: 'CTO, Nova FinTech',
    },
    results: [
      { value: '40%',   label: 'Performance Boost', description: 'Optimization of data fetching layers and render cycles.',           progress: 40,  accent: 'primary'   },
      { value: '10k+',  label: 'Active Users',       description: 'Scale achieved within the first 3 months of launch.',              progress: 80,  accent: 'secondary' },
      { value: '2.4s',  label: 'Avg. Load Time',     description: 'Sub-3 second global latency across all core modules.',             progress: 90,  accent: 'primary'   },
      { value: '99.9%', label: 'System Uptime',       description: 'Resilient cloud architecture handling 1M+ req/min.',               progress: 99,  accent: 'secondary' },
    ],
    gallery: [
      { label: 'Analytics View', gradient: 'linear-gradient(135deg, rgba(127,255,212,0.15) 0%, rgba(5,11,15,0.95) 100%)' },
      { label: 'Market Pulse',   gradient: 'linear-gradient(135deg, rgba(0,255,255,0.12) 0%, rgba(5,11,15,0.95) 100%)'   },
      { label: 'Growth Portal',  gradient: 'linear-gradient(135deg, rgba(32,178,170,0.15) 0%, rgba(5,11,15,0.95) 100%)' },
    ],
  },
]

export function getProject(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null
}
