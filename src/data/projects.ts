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
  coverImage?: string
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
    image?: string
  }
  feedback?: {
    quote: string
    author: string
    role: string
  }
  results: ProjectResult[]
  gallery: Array<{ label: string; gradient: string; image?: string; document?: string }>
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // 1. FaceForge
  // ─────────────────────────────────────────────
  {
    slug: 'faceforge',
    title: ['FACE', 'FORGE'],
    subtitle: 'GenAI Research',
    category: 'AI / ML Engineering',
    tagline:
      'Two generation paradigms explored and compared — StyleGAN2 latent optimization vs. SDXL + IP-Adapter diffusion conditioning — plus deepfake detection, all orchestrated by a closed-loop LLM judge.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.10) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.15) 0%, transparent 60%)',
    coverImage: '/gallery/faceforge/face-forge.png',
    meta: {
      role: ['ML Engineer', 'Full-Stack Developer'],
      timeline: '3 Months',
      period: '2026',
      platform: ['Web App', 'GPU Server'],
      stack: ['PyTorch', 'StyleGAN2', 'CLIP', 'SDXL', 'IP-Adapter', 'FastAPI', 'React 19', 'MLflow', 'Docker'],
    },
    challenge: {
      heading: 'Generating recognizable faces from text prompts while detecting fakes with calibrated, explainable confidence.',
      accentWord: 'recognizable faces',
      body: [
        "StyleGAN2's W-space offers expressive control over facial attributes, but text-guided editing required bridging the semantic gap between CLIP's vision-language embedding space and the latent geometry — without collapsing the subject's identity in the process.",
        'Deepfake detection at inference time demanded more than binary accuracy: production use needs calibrated confidence scores, an uncertainty band for borderline verdicts, and Grad-CAM explainability to surface what the model actually focused on.',
      ],
      metric: { label: 'Identity Preservation', targetLabel: 'FaceNet Sim ≥ 0.75', progress: 82 },
    },
    solution: {
      heading: "A closed-loop optimizer where an LLM judge dynamically re-weights gradient losses mid-generation.",
      accentWord: 'dynamically re-weights',
      body: [
        "Two generation paradigms were built and compared side by side. StyleGAN2 latent optimization: CLIP cosine similarity drives gradient descent in W-space, with a differentiable FaceNet identity loss to prevent attribute edits from drifting the subject's likeness. Real photos are projected into W-space via VGG16 perceptual loss and MTCNN landmark alignment. SDXL + IP-Adapter (ViT-H): diffusion-based image conditioning prototyped in Colab with HuggingFace caching and MLflow tracking — a fundamentally different approach to the same generation problem.",
        'Gemini 2.5 Flash runs as an LLM-as-judge across both pipelines: it scores per-facial-feature identity preservation — jawline, eyes, nose, hair, skin tone — as structured JSON verdicts, then dynamically re-weights λ and adjusts the learning rate mid-optimization. A closed feedback loop not typically seen outside research settings.',
      ],
      image: '/gallery/faceforge/faceforge-diagram.png',
    },
    results: [
      { value: '11k+', label: 'Lines of Code',    description: 'Solo-engineered across 27 commits — model training to containerized production service.',       progress: 95,  accent: 'primary'   },
      { value: '7',    label: 'Quality Metrics',  description: 'CLIP similarity, LPIPS, InceptionV3 confidence, sharpness, W-distance, mode-collapse, pixel-std.', progress: 100, accent: 'secondary' },
      { value: '3',    label: 'ML Pipelines',     description: 'Generation, deepfake detection, and GAN inversion — each tracked independently in MLflow.',        progress: 85,  accent: 'primary'   },
      { value: '2',    label: 'Gen Paradigms',    description: 'StyleGAN2 latent optimization vs. SDXL + IP-Adapter diffusion conditioning — both architected and compared.',  progress: 100, accent: 'secondary' },
    ],
    gallery: [
      { label: 'Text-to-Face Generator',          gradient: 'linear-gradient(135deg, rgba(139,92,246,0.20) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/Text-to-Face Generator.png' },
      { label: 'Deepfake Detector · Grad-CAM',    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/Deepfake Detector · Grad-CAM.png' },
      { label: 'CLIP Guidance · LLM Judge Metrics', gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/CLIP Guidance · LLM Judge Metrics.png' },
      { label: 'MLflow · 3 Experiment Pipelines', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/MLflow · 3 Experiment Pipelines.png' },
      { label: 'GAN Inversion · Bald Prompt Edit', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.20) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/sdxl-outputs-bald-prompt.png' },
      { label: 'GAN Inversion · Identity Edit',   gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/sdxl-outputs.png.jpg' },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. AgileAI
  // ─────────────────────────────────────────────
  {
    slug: 'agileai',
    title: ['AGILE', 'AI'],
    subtitle: 'Multi-Agent RAG',
    category: 'AI Engineering',
    tagline:
      'Multi-agent RAG system for Agile Q&A, with a custom YOLOv5 + PaddleOCR pipeline that reads and structures UML use-case diagrams as inputs.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.22) 0%, rgba(14,165,233,0.10) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(20,184,166,0.18) 0%, transparent 60%)',
    meta: {
      role: ['ML Engineer', 'Backend Developer'],
      timeline: '3 Months',
      period: '2025',
      platform: ['Web App', 'Local Deployment'],
      stack: ['Python', 'Flask', 'FAISS', 'Mistral 7B', 'YOLOv5', 'PaddleOCR', 'Sentence-Transformers'],
    },
    challenge: {
      heading: 'Building a RAG system that handles natural language queries and raw UML diagram images without hallucinating on out-of-domain questions.',
      accentWord: 'without hallucinating',
      body: [
        'A standard retrieval pipeline collapses at domain boundaries — when a user asks about something outside Scrum, Kanban, or PM, it needs to route to a fallback rather than confabulate an answer. Similarity-threshold confidence routing was essential, not optional.',
        'Diagram input added a second dimension of complexity: UML use-case images are structured visually, not textually. Extracting actor names and relationships required a full computer vision pipeline — not just OCR, but spatial detection first.',
      ],
      metric: { label: 'Knowledge Domains Covered', targetLabel: 'Scrum · Kanban · PM', progress: 100 },
    },
    solution: {
      heading: 'An Orchestrator routes intent-classified queries across five specialized agents; diagrams are parsed by a YOLOv5 + OCR vision pipeline before entering retrieval.',
      accentWord: 'five specialized agents',
      body: [
        'FAISS IndexFlatL2 over all-MiniLM-L6-v2 embeddings powers nearest-neighbor retrieval across three domain knowledge bases. A similarity-threshold confidence mechanism routes retrieval-grounded answers vs. Mistral 7B fallback, cutting hallucination on out-of-scope queries.',
        'UML diagrams pass through a custom YOLOv5 detector (trained on manually annotated data) to localize actors and use-case ovals, then PaddleOCR with adaptive binarization extracts text in a dual-pass setup — binarized and original — maximizing recall on noisy diagram inputs.',
      ],
      image: '/gallery/agileai/ChatGPT Image Jul 1, 2026, 09_40_07 PM.png',
    },
    results: [
      { value: '5',      label: 'Agent Roles',    description: 'Retrieval, Generation, Conversation, Special-Queries, and Learning — each independently extensible.', progress: 100, accent: 'primary'   },
      { value: 'FAISS',  label: 'Vector Store',   description: 'IndexFlatL2 over all-MiniLM-L6-v2 embeddings with confidence-threshold hallucination routing.',       progress: 90,  accent: 'secondary' },
      { value: 'Custom', label: 'YOLOv5 Model',   description: 'Trained on manually annotated UML diagrams to detect actors and use-case ovals with NMS.',             progress: 78,  accent: 'primary'   },
      { value: 'FLAN-T5',label: 'Synthetic Data', description: 'Auto-generated Q&A pairs from segmented Agile documentation to seed the knowledge base.',               progress: 85,  accent: 'secondary' },
    ],
    gallery: [
      { label: 'YOLOv5 · Actor & Use-Case Detection',        gradient: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/uml_test.png' },
      { label: 'OCR · Actor-to-Use-Case Mapping',            gradient: 'linear-gradient(135deg, rgba(20,184,166,0.18) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/debug_uml_test.png' },
      { label: 'OCR · Complex Actor Relationship Graph',     gradient: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/debug_uml_test6.png' },
      { label: 'ML Priority Classifier · Confusion Matrix',  gradient: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/confusion_matrix.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Smart Cover
  // ─────────────────────────────────────────────
  {
    slug: 'smart-cover',
    title: ['SMART', 'COVER'],
    subtitle: 'Hackathon · 48h',
    category: 'Agentic AI',
    tagline:
      'Insurance claim automation pipeline: plain text in, routed structured verdict out — built with LangGraph multi-step orchestration and an LLM-as-judge fraud review.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.20) 0%, rgba(234,88,12,0.10) 40%, transparent 70%), radial-gradient(ellipse at 75% 65%, rgba(239,68,68,0.12) 0%, transparent 60%)',
    coverImage: '/gallery/smartcover/smart-cover-deck-cover.png',
    meta: {
      role: ['AI Engineer', 'Full-Stack Developer'],
      timeline: '48 Hours',
      period: '2025',
      platform: ['Web App'],
      stack: ['Python', 'FastAPI', 'LangGraph', 'Claude Sonnet', 'React'],
    },
    challenge: {
      heading: 'Automating insurance claim processing end-to-end: from ambiguous natural language to a structured, routable verdict under 48-hour hackathon pressure.',
      accentWord: 'ambiguous natural language',
      body: [
        'Insurance claims arrive as unstructured text — names, incident descriptions, coverage references, all mixed together. The system needed to extract typed fields, populate templates, and route to the correct provider without any manual step in between.',
        'Adding an LLM-as-judge fraud review on top of routing meant designing a multi-step agentic workflow where each stage depends on the output of the previous — a pipeline that needed to be both correct and demonstrable within 48 hours.',
      ],
      metric: { label: 'Pipeline Steps Automated', targetLabel: 'Extract → Route → Judge → Verdict', progress: 100 },
    },
    solution: {
      heading: 'LangGraph orchestrates the multi-step agentic workflow — extraction, routing, and LLM-as-judge fraud scoring — without human intervention.',
      accentWord: 'without human intervention',
      body: [
        'LangGraph nodes handle structured extraction from free-text claims, template population, and intelligent routing based on extracted context — each step passing typed state to the next with tool-calling at each decision point.',
        'Claude Sonnet runs as the final LLM-as-judge: it reviews the structured claim for fraud signals and generates a cost estimate, producing an automated verdict delivered directly to the insurer without requiring a human review loop.',
      ],
      image: '/gallery/smartcover/smart-cover-diagram.png',
    },
    results: [
      { value: '48h',   label: 'Build Time',      description: 'Zero to fully working agentic pipeline — built under hackathon pressure.',                                    progress: 100, accent: 'primary'   },
      { value: 'Agentic', label: 'Orchestration',  description: 'LangGraph multi-step agentic workflow: each node passes typed state to the next with tool-calling at every decision point.', progress: 90,  accent: 'secondary' },
      { value: '100%',  label: 'Automated',       description: 'Full claim lifecycle automated: extract → structure → route → LLM verdict, no human in the loop.',                         progress: 100, accent: 'primary'   },
      { value: 'Claude',label: 'LLM Judge',       description: 'Claude Sonnet reviews each structured claim for fraud signals and generates a cost estimate as the final verdict.',          progress: 88,  accent: 'secondary' },
    ],
    gallery: [
      { label: 'Claim Processing Pipeline', gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/smartcover/smart-cover-claim-processing.png' },
      { label: 'Smart Cover Pitch Deck', gradient: 'linear-gradient(135deg, rgba(234,88,12,0.15) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/smartcover/smart-cover-deck-cover.png', document: '/gallery/smartcover/smart-cover-presentation.pdf' },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. WavyVoice
  // ─────────────────────────────────────────────
  {
    slug: 'wavy-voice',
    title: ['WAVY', 'VOICE'],
    subtitle: 'Hackathon · 48h',
    category: 'Multi-Modal AI',
    tagline:
      "Accessibility pipeline that converts any video's speech into sign language pose animations — chaining Whisper, NLP translation, and MediaPipe skeleton rendering.",
    coverGradient:
      'radial-gradient(ellipse at 35% 40%, rgba(16,185,129,0.22) 0%, rgba(6,182,212,0.10) 40%, transparent 70%), radial-gradient(ellipse at 75% 65%, rgba(5,150,105,0.18) 0%, transparent 60%)',
    coverImage: '/gallery/wavyvoice/wavy-voice-deck-cover.png',
    meta: {
      role: ['AI Engineer'],
      timeline: '48 Hours',
      period: '2024',
      platform: ['Web App'],
      stack: ['Python', 'OpenAI Whisper', 'OpenCV', 'MediaPipe', 'TensorFlow'],
    },
    challenge: {
      heading: "Making any video accessible to the deaf community by translating speech to sign language animations in a single offline pipeline.",
      accentWord: 'single offline pipeline',
      body: [
        "The challenge was chaining three fundamentally different domains — speech recognition, NLP-level translation, and real-time pose rendering — into a single coherent pipeline that processes an arbitrary video file without requiring an internet connection.",
        'Each model hand-off is a failure point: Whisper output must be tokenized correctly for sign-mapping, MediaPipe pose coordinates must align to the original video frame dimensions, and the final render must stay synchronized with the source timeline.',
      ],
      metric: { label: 'Models Chained', targetLabel: 'Whisper · NLP · MediaPipe', progress: 100 },
    },
    solution: {
      heading: 'Three models chain sequentially: Whisper extracts audio, NLP maps to signs, MediaPipe renders pose overlays directly onto the original video frames.',
      accentWord: 'chain sequentially',
      body: [
        'OpenAI Whisper transcribes the audio track from any video file, then an NLP translation layer maps the transcript to a sign language gesture sequence aligned to timing markers from the original transcript.',
        'MediaPipe renders skeletal pose overlays frame-by-frame onto the source video using OpenCV — producing a new video file where the original content plays alongside a synchronized sign language pose animation.',
      ],
    },
    results: [
      { value: '3',       label: 'Models Chained', description: 'Whisper ASR + NLP translation + MediaPipe pose estimation in one coherent pipeline.',    progress: 100, accent: 'primary'   },
      { value: 'Offline', label: 'Processing',     description: 'No cloud dependency — runs locally on any video file input.',                            progress: 90,  accent: 'secondary' },
      { value: '48h',     label: 'Build Time',     description: 'Multi-model pipeline from zero to working demo in a single hackathon.',                  progress: 100, accent: 'primary'   },
      { value: 'OpenCV',  label: 'Video Output',   description: 'Pose overlay rendered frame-by-frame and written to a new synchronized output video.',   progress: 80,  accent: 'secondary' },
    ],
    gallery: [
      { label: 'WavyVoice Pitch Deck', gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/wavyvoice/wavy-voice-deck-cover.png', document: '/gallery/wavyvoice/wavy-voice-presentation.pdf' },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Custom ERP
  // ─────────────────────────────────────────────
  {
    slug: 'custom-erp',
    title: ['CUSTOM', 'ERP'],
    subtitle: 'Client · Langar Tunis & Commerce',
    category: 'Full-Stack Engineering',
    tagline:
      'ERPNext deployed for two companies — Langar Tunis and Langar Commerce — with custom doctypes, server + client scripts, legacy CSV migration, user training workshops, and shipped MkDocs documentation.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(100,116,139,0.25) 0%, rgba(71,85,105,0.12) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(79,70,229,0.15) 0%, transparent 60%)',
    meta: {
      role: ['Full-Stack Developer', 'Systems Architect'],
      timeline: 'Delivered',
      period: '2026',
      platform: ['Web App (Desktop)', 'Linux Server'],
      stack: ['Python', 'JavaScript', 'MySQL', 'ERPNext', 'Frappe', 'MkDocs', 'Linux'],
    },
    challenge: {
      heading: "Delivering a customized ERP for two companies with no formal spec — then training both teams and shipping documentation so they could own it.",
      accentWord: 'two companies',
      body: [
        "Langar Tunis and Langar Commerce had no technical documentation — only manual processes, spreadsheets, and domain knowledge held by their teams. Requirements were discovered through operational interviews for both entities, each with different workflows that needed separate customization within the same ERPNext instance.",
        "Delivery didn't end at launch. Both companies needed onboarding workshops to actually use the platform, and a deployed MkDocs documentation site so the teams could self-serve after handoff — turning a software project into a complete product delivery.",
      ],
      metric: { label: 'Companies Deployed', targetLabel: 'Langar Tunis · Langar Commerce', progress: 100 },
    },
    solution: {
      heading: 'Custom Frappe doctypes and scripts built for two entities, with MkDocs docs and hands-on workshops delivering a complete handoff.',
      accentWord: 'complete handoff',
      body: [
        'Legacy data from both companies was extracted from spreadsheets, cleaned through a normalization and deduplication pipeline, then imported into ERPNext via frappe.get_doc() / .insert() and the Bulk Import Tool — with post-import integrity hooks validating every record. Custom Doctypes model the business entities specific to each company. Server scripts (Python) enforce rules at validate, before_save, and on_submit hooks. Client scripts (JavaScript) handle field visibility, real-time calculations, and custom UI triggers.',
        'Post-build, hands-on training workshops walked both teams through the platform. A MkDocs documentation site was written and deployed — covering workflows, custom doctypes, and admin procedures — so both companies could operate and self-serve without depending on a developer for every question.',
      ],
      image: '/gallery/erpnext/erpnext-diagram.png',
    },
    results: [
      { value: '2',      label: 'Companies',         description: 'Langar Tunis and Langar Commerce — two separate ERPNext setups, each with custom workflows.',        progress: 100, accent: 'primary'   },
      { value: 'Custom', label: 'Doctypes Built',     description: 'New data models specific to each company — not available in standard ERPNext out of the box.',       progress: 90,  accent: 'secondary' },
      { value: 'MkDocs', label: 'Docs Shipped',       description: 'Full documentation site deployed — workflows, custom doctypes, admin procedures, self-serve.',       progress: 100, accent: 'primary'   },
      { value: 'Solo',   label: 'Full Lifecycle',     description: 'Discovery → build → data migration → workshops → docs → delivery. End-to-end ownership.',           progress: 100, accent: 'secondary' },
    ],
    gallery: [],
  },

  // ─────────────────────────────────────────────
  // 6. NanoLab Website
  // ─────────────────────────────────────────────
  {
    slug: 'nanolab-website',
    title: ['NANO', 'LAB'],
    subtitle: 'Production',
    category: 'Full-Stack Web',
    tagline:
      'Trilingual corporate website (EN/FR/AR with RTL) — built solo from zero to Netlify production with schema.org SEO, Open Graph, and full i18n.',
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(127,255,212,0.22) 0%, rgba(0,255,255,0.08) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(32,178,170,0.18) 0%, transparent 60%)',
    meta: {
      role: ['Full-Stack Developer'],
      timeline: '2 Months',
      period: 'Mar – May 2026',
      platform: ['Web (Desktop + Mobile)'],
      stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Netlify'],
      liveUrl: 'https://nanolab.tn',
    },
    challenge: {
      heading: 'Building a trilingual site with RTL Arabic support, full SEO instrumentation, and Netlify production deployment — entirely solo.',
      accentWord: 'RTL Arabic support',
      body: [
        'Arabic RTL is not just a text direction change — it requires layout mirroring, flex/grid direction flips, icon orientation adjustments, and font fallback chains that behave correctly without breaking the EN and FR layouts on the same codebase.',
        'Full SEO coverage meant more than meta tags: schema.org JSON-LD structured data, Open Graph for social previews, canonical tags for trilingual URL variants, and a generated sitemap — all implemented and validated before launch.',
      ],
      metric: { label: 'Languages Supported', targetLabel: 'EN · FR · AR (RTL)', progress: 100 },
    },
    solution: {
      heading: 'next-intl handles all three locales including RTL layout direction; schema.org JSON-LD, Open Graph, and canonical tags cover the full SEO surface.',
      accentWord: 'full SEO surface',
      body: [
        'next-intl manages locale routing and message loading for EN, FR, and AR. The `dir` attribute is set dynamically per locale, and Tailwind\'s RTL utilities handle layout mirroring — a single component tree serves all three languages without duplication.',
        'The full SEO stack was built from scratch: JSON-LD structured data for the organization, Open Graph metadata for all key pages, `<link rel="alternate" hreflang>` tags for trilingual URL signalling, and an auto-generated sitemap.xml — the site was indexable correctly from day one.',
      ],
    },
    results: [
      { value: '3',    label: 'Languages',   description: 'English, French, Arabic — with full RTL layout support for Arabic using next-intl.',          progress: 100, accent: 'primary'   },
      { value: 'Live', label: 'Production',  description: 'Deployed on Netlify at nanolab.tn — real domain, real traffic.',                              progress: 100, accent: 'secondary' },
      { value: 'Full', label: 'SEO Stack',   description: 'schema.org JSON-LD, Open Graph, sitemap.xml, and canonical hreflang tags implemented.',       progress: 95,  accent: 'primary'   },
      { value: 'Solo', label: 'Delivery',    description: 'Setup → design → i18n → SEO → deployment, owned end-to-end in 2 months.',                    progress: 100, accent: 'secondary' },
    ],
    gallery: [
      { label: 'English Landing',    gradient: 'linear-gradient(135deg, rgba(127,255,212,0.18) 0%, rgba(5,11,15,0.95) 100%)' },
      { label: 'French Version',     gradient: 'linear-gradient(135deg, rgba(0,255,255,0.12) 0%, rgba(5,11,15,0.95) 100%)'   },
      { label: 'Arabic RTL Layout',  gradient: 'linear-gradient(135deg, rgba(32,178,170,0.18) 0%, rgba(5,11,15,0.95) 100%)'  },
    ],
  },
]

export function getProject(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null
}
