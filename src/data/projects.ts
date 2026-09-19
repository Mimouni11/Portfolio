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

// ─── Internal locale types ───────────────────────────────────────────────────

type Locale = 'en' | 'fr' | 'ar'

interface ProjectLocale {
  subtitle: string
  category: string
  tagline: string
  meta: { role: string[]; timeline: string; platform: string[] }
  challenge: {
    heading: string
    accentWord: string
    body: string[]
    metric: { label: string; targetLabel: string }
  }
  solution: { heading: string; accentWord: string; body: string[] }
  feedback?: { quote: string; author: string; role: string }
  results: Array<{ label: string; description: string }>
  gallery: Array<{ label: string }>
}

interface RawProject {
  slug: string
  title: string[]
  coverGradient: string
  coverImage?: string
  meta: { stack: string[]; liveUrl?: string; period: string }
  challenge: { metric: { progress: number } }
  solution: { image?: string }
  resultsBase: Array<{ value: string; progress: number; accent: 'primary' | 'secondary' }>
  galleryBase: Array<{ gradient: string; image?: string; document?: string }>
  locales: Record<Locale, ProjectLocale>
}

function merge(raw: RawProject, lang: string): Project {
  const locale = raw.locales[(lang in raw.locales ? lang : 'en') as Locale]
  return {
    slug: raw.slug,
    title: raw.title,
    subtitle: locale.subtitle,
    category: locale.category,
    tagline: locale.tagline,
    coverGradient: raw.coverGradient,
    coverImage: raw.coverImage,
    meta: {
      role: locale.meta.role,
      timeline: locale.meta.timeline,
      period: raw.meta.period,
      platform: locale.meta.platform,
      stack: raw.meta.stack,
      liveUrl: raw.meta.liveUrl,
    },
    challenge: {
      heading: locale.challenge.heading,
      accentWord: locale.challenge.accentWord,
      body: locale.challenge.body,
      metric: {
        label: locale.challenge.metric.label,
        targetLabel: locale.challenge.metric.targetLabel,
        progress: raw.challenge.metric.progress,
      },
    },
    solution: {
      heading: locale.solution.heading,
      accentWord: locale.solution.accentWord,
      body: locale.solution.body,
      image: raw.solution.image,
    },
    feedback: locale.feedback,
    results: raw.resultsBase.map((r, i) => ({
      value: r.value,
      progress: r.progress,
      accent: r.accent,
      label: locale.results[i]?.label ?? '',
      description: locale.results[i]?.description ?? '',
    })),
    gallery: raw.galleryBase.map((g, i) => ({
      gradient: g.gradient,
      image: g.image,
      document: g.document,
      label: locale.gallery[i]?.label ?? '',
    })),
  }
}

// ─── Project data ─────────────────────────────────────────────────────────────

const rawProjects: RawProject[] = [
  // 1. FaceForge
  {
    slug: 'faceforge',
    title: ['FACE', 'FORGE'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.10) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.15) 0%, transparent 60%)',
    coverImage: '/gallery/faceforge/face-forge.png',
    meta: {
      stack: ['PyTorch', 'StyleGAN2', 'CLIP', 'SDXL', 'IP-Adapter', 'FastAPI', 'React 19', 'MLflow', 'Docker'],
      period: '2026',
    },
    challenge: { metric: { progress: 82 } },
    solution: { image: '/gallery/faceforge/faceforge-diagram.png' },
    resultsBase: [
      { value: '11k+', progress: 95,  accent: 'primary'   },
      { value: '7',    progress: 100, accent: 'secondary' },
      { value: '3',    progress: 85,  accent: 'primary'   },
      { value: '2',    progress: 100, accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(139,92,246,0.20) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/Text-to-Face Generator.png' },
      { gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/Deepfake Detector · Grad-CAM.png' },
      { gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/CLIP Guidance · LLM Judge Metrics.png' },
      { gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/MLflow · 3 Experiment Pipelines.png' },
      { gradient: 'linear-gradient(135deg, rgba(139,92,246,0.20) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/sdxl-outputs-bald-prompt.png' },
      { gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/faceforge/sdxl-outputs.png.jpg' },
    ],
    locales: {
      en: {
        subtitle: 'GenAI Research',
        category: 'AI / ML Engineering',
        tagline:
          'Two generation paradigms explored and compared: StyleGAN2 latent optimization vs. SDXL + IP-Adapter diffusion conditioning. Plus deepfake detection, all orchestrated by a closed-loop LLM judge.',
        meta: {
          role: ['ML Engineer', 'Full-Stack Developer'],
          timeline: '3 Months',
          platform: ['Web App', 'GPU Server'],
        },
        challenge: {
          heading: 'Generating recognizable faces from text prompts while detecting fakes with calibrated, explainable confidence.',
          accentWord: 'recognizable faces',
          body: [
            "StyleGAN2's W-space offers expressive control over facial attributes, but text-guided editing required bridging the semantic gap between CLIP's vision-language embedding space and the latent geometry, without collapsing the subject's identity in the process.",
            'Deepfake detection at inference time demanded more than binary accuracy: production use needs calibrated confidence scores, an uncertainty band for borderline verdicts, and Grad-CAM explainability to surface what the model actually focused on.',
          ],
          metric: { label: 'Identity Preservation', targetLabel: 'FaceNet Sim ≥ 0.75' },
        },
        solution: {
          heading: "A closed-loop optimizer where an LLM judge dynamically re-weights gradient losses mid-generation.",
          accentWord: 'dynamically re-weights',
          body: [
            "Two generation paradigms were built and compared side by side. StyleGAN2 latent optimization: CLIP cosine similarity drives gradient descent in W-space, with a differentiable FaceNet identity loss to prevent attribute edits from drifting the subject's likeness. Real photos are projected into W-space via VGG16 perceptual loss and MTCNN landmark alignment. SDXL + IP-Adapter (ViT-H): diffusion-based image conditioning prototyped in Colab with HuggingFace caching and MLflow tracking, a fundamentally different approach to the same generation problem.",
            'Gemini 2.5 Flash runs as an LLM-as-judge across both pipelines: it scores per-facial-feature identity preservation (jawline, eyes, nose, hair, skin tone) as structured JSON verdicts, then dynamically re-weights λ and adjusts the learning rate mid-optimization. A closed feedback loop not typically seen outside research settings.',
          ],
        },
        results: [
          { label: 'Lines of Code',    description: 'Solo-engineered across 27 commits, from model training to containerized production service.' },
          { label: 'Quality Metrics',  description: 'CLIP similarity, LPIPS, InceptionV3 confidence, sharpness, W-distance, mode-collapse, pixel-std.' },
          { label: 'ML Pipelines',     description: 'Generation, deepfake detection, and GAN inversion, each tracked independently in MLflow.' },
          { label: 'Gen Paradigms',    description: 'StyleGAN2 latent optimization vs. SDXL + IP-Adapter diffusion conditioning, both architected and compared.' },
        ],
        gallery: [
          { label: 'Text-to-Face Generator' },
          { label: 'Deepfake Detector · Grad-CAM' },
          { label: 'CLIP Guidance · LLM Judge Metrics' },
          { label: 'MLflow · 3 Experiment Pipelines' },
          { label: 'GAN Inversion · Bald Prompt Edit' },
          { label: 'GAN Inversion · Identity Edit' },
        ],
      },
      fr: {
        subtitle: 'Recherche GenAI',
        category: 'Ingénierie IA / ML',
        tagline:
          'Deux paradigmes de génération explorés et comparés : optimisation latente StyleGAN2 vs. conditionnement par diffusion SDXL + IP-Adapter. Plus la détection de deepfake, orchestrée par un juge LLM en boucle fermée.',
        meta: {
          role: ['Ingénieur ML', 'Développeur Full-Stack'],
          timeline: '3 Mois',
          platform: ['Application Web', 'Serveur GPU'],
        },
        challenge: {
          heading: 'Générer des visages reconnaissables depuis des prompts texte, tout en détectant les deepfakes avec une confiance calibrée et explicable.',
          accentWord: 'visages reconnaissables',
          body: [
            "L'espace W de StyleGAN2 offre un contrôle expressif sur les attributs faciaux, mais l'édition guidée par le texte exigeait de combler l'écart sémantique entre l'espace d'embedding vision-langage de CLIP et la géométrie latente, sans écraser l'identité du sujet dans le processus.",
            "La détection de deepfake à l'inférence demandait plus qu'une simple précision binaire : en production, il faut des scores de confiance calibrés, une bande d'incertitude pour les verdicts limites, et une explicabilité Grad-CAM pour exposer ce sur quoi le modèle s'est réellement focalisé.",
          ],
          metric: { label: "Préservation d'identité", targetLabel: 'FaceNet Sim ≥ 0.75' },
        },
        solution: {
          heading: "Un optimiseur en boucle fermée où un juge LLM réévalue dynamiquement les pertes gradient en cours de génération.",
          accentWord: 'réévalue dynamiquement',
          body: [
            "Deux paradigmes de génération construits et comparés côte à côte. Optimisation latente StyleGAN2 : la similarité cosinus CLIP pilote la descente de gradient dans l'espace W, avec une perte d'identité FaceNet différentiable pour éviter que les éditions d'attributs ne dérivent la ressemblance du sujet. Les photos réelles sont projetées dans l'espace W via la perte perceptuelle VGG16 et l'alignement de repères MTCNN. SDXL + IP-Adapter (ViT-H) : conditionnement d'image par diffusion prototypé sur Colab avec cache HuggingFace et tracking MLflow, une approche fondamentalement différente du même problème de génération.",
            "Gemini 2.5 Flash fonctionne comme juge LLM sur les deux pipelines : il évalue la préservation d'identité par trait facial (mâchoire, yeux, nez, cheveux, teint) sous forme de verdicts JSON structurés, puis réévalue dynamiquement λ et ajuste le taux d'apprentissage en cours d'optimisation. Une boucle de feedback fermée rarement vue en dehors de la recherche.",
          ],
        },
        results: [
          { label: 'Lignes de code',           description: 'Développé en solo sur 27 commits, du training au service de production conteneurisé.' },
          { label: 'Métriques qualité',         description: 'Similarité CLIP, LPIPS, confiance InceptionV3, netteté, W-distance, mode-collapse, pixel-std.' },
          { label: 'Pipelines ML',              description: 'Génération, détection de deepfake et inversion GAN, chacun tracké indépendamment dans MLflow.' },
          { label: 'Paradigmes de génération',  description: "Optimisation latente StyleGAN2 vs. conditionnement par diffusion SDXL + IP-Adapter, les deux architecturés et comparés." },
        ],
        gallery: [
          { label: 'Générateur Texte-vers-Visage' },
          { label: 'Détecteur Deepfake · Grad-CAM' },
          { label: 'Guidage CLIP · Métriques Juge LLM' },
          { label: "MLflow · 3 Pipelines d'expériences" },
          { label: 'Inversion GAN · Édition Prompt Chauve' },
          { label: "Inversion GAN · Édition d'identité" },
        ],
      },
      ar: {
        subtitle: 'بحث GenAI',
        category: 'هندسة ذكاء اصطناعي / تعلم آلي',
        tagline:
          'نموذجا توليد مستكشفان ومقارنان: تحسين الفضاء الكامن StyleGAN2 مقابل التكييف بالانتشار SDXL + IP-Adapter. مع كشف التزييف العميق، منسقاً بمحكم LLM في حلقة مغلقة.',
        meta: {
          role: ['مهندس تعلم آلي', 'مطور متكامل'],
          timeline: '3 أشهر',
          platform: ['تطبيق ويب', 'خادم GPU'],
        },
        challenge: {
          heading: 'توليد وجوه قابلة للتعرف من نصوص مع كشف المزيفات بثقة معيّرة وقابلة للتفسير.',
          accentWord: 'وجوه قابلة للتعرف',
          body: [
            "يوفر الفضاء W في StyleGAN2 تحكماً معبراً في سمات الوجه، لكن التحرير الموجه بالنص تطلّب سد الفجوة الدلالية بين فضاء تضمين الرؤية-اللغة لـ CLIP وهندسة الفضاء الكامن، دون إفساد هوية الشخص في العملية.",
            "كشف التزييف العميق وقت الاستدلال تطلّب أكثر من دقة ثنائية: الاستخدام الإنتاجي يحتاج درجات ثقة معيّرة، ونطاق عدم يقين للأحكام الحدودية، وقابلية تفسير Grad-CAM لإظهار ما ركز عليه النموذج فعلياً.",
          ],
          metric: { label: 'الحفاظ على الهوية', targetLabel: 'FaceNet Sim ≥ 0.75' },
        },
        solution: {
          heading: "محسّن في حلقة مغلقة حيث يعيد محكم LLM ضبط خسائر التدرج ديناميكياً أثناء التوليد.",
          accentWord: 'يعيد ضبطها ديناميكياً',
          body: [
            "نموذجا توليد مبنيان ومقارنان جنباً إلى جنب. تحسين الفضاء الكامن StyleGAN2: تقود مشابهة الجيب تمام CLIP نزول التدرج في الفضاء W، مع خسارة هوية FaceNet قابلة للتفاضل لمنع انجراف هوية الشخص أثناء تحرير السمات. تُسقَط الصور الحقيقية في الفضاء W عبر خسارة الإدراك VGG16 ومحاذاة المعالم MTCNN. SDXL + IP-Adapter (ViT-H): تكييف صورة بالانتشار مصمم على Colab مع تخزين مؤقت HuggingFace وتتبع MLflow، نهج مختلف جوهرياً لنفس مشكلة التوليد.",
            "يعمل Gemini 2.5 Flash محكماً LLM عبر كلا الخطوطين: يُقيّم الحفاظ على الهوية لكل سمة وجه (الفك، العيون، الأنف، الشعر، لون البشرة) كأحكام JSON منظمة، ثم يعيد ضبط λ ويعدل معدل التعلم ديناميكياً أثناء التحسين. حلقة تغذية راجعة مغلقة نادراً ما تُرى خارج بيئات البحث.",
          ],
        },
        results: [
          { label: 'سطر من الكود',     description: 'مطور بمفرد عبر 27 commit، من تدريب النموذج إلى خدمة إنتاج محاويتية.' },
          { label: 'مقياس جودة',       description: 'مشابهة CLIP، LPIPS، ثقة InceptionV3، الحدة، W-distance، mode-collapse، pixel-std.' },
          { label: 'خط أنابيب ML',     description: 'التوليد، كشف التزييف العميق، وعكس GAN، كل منها متتبع باستقلالية في MLflow.' },
          { label: 'نموذج توليد',      description: 'تحسين الفضاء الكامن StyleGAN2 مقابل تكييف الانتشار SDXL + IP-Adapter، كلاهما مصمم ومقارن.' },
        ],
        gallery: [
          { label: 'مولّد نص إلى وجه' },
          { label: 'كاشف التزييف العميق · Grad-CAM' },
          { label: 'توجيه CLIP · مقاييس محكم LLM' },
          { label: 'MLflow · 3 خطوط تجارب' },
          { label: 'عكس GAN · تعديل بالموجّه الأصلع' },
          { label: 'عكس GAN · تعديل الهوية' },
        ],
      },
    },
  },

  // 2. AgileAI
  {
    slug: 'agileai',
    title: ['AGILE', 'AI'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.22) 0%, rgba(14,165,233,0.10) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(20,184,166,0.18) 0%, transparent 60%)',
    meta: {
      stack: ['Python', 'Flask', 'FAISS', 'Mistral 7B', 'YOLOv5', 'PaddleOCR', 'Sentence-Transformers'],
      period: '2025',
    },
    challenge: { metric: { progress: 100 } },
    solution: { image: '/gallery/agileai/ChatGPT Image Jul 1, 2026, 09_40_07 PM.png' },
    resultsBase: [
      { value: '5',       progress: 100, accent: 'primary'   },
      { value: 'FAISS',   progress: 90,  accent: 'secondary' },
      { value: 'Custom',  progress: 78,  accent: 'primary'   },
      { value: 'FLAN-T5', progress: 85,  accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/uml_test.png' },
      { gradient: 'linear-gradient(135deg, rgba(20,184,166,0.18) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/debug_uml_test.png' },
      { gradient: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/debug_uml_test6.png' },
      { gradient: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(5,11,15,0.95) 100%)',  image: '/gallery/agileai/confusion_matrix.png' },
    ],
    locales: {
      en: {
        subtitle: 'Multi-Agent RAG',
        category: 'AI Engineering',
        tagline:
          'Multi-agent RAG system for Agile Q&A, with a custom YOLOv5 + PaddleOCR pipeline that reads and structures UML use-case diagrams as inputs.',
        meta: {
          role: ['ML Engineer', 'Backend Developer'],
          timeline: '3 Months',
          platform: ['Web App', 'Local Deployment'],
        },
        challenge: {
          heading: 'Building a RAG system that handles natural language queries and raw UML diagram images without hallucinating on out-of-domain questions.',
          accentWord: 'without hallucinating',
          body: [
            'A standard retrieval pipeline collapses at domain boundaries: when a user asks about something outside Scrum, Kanban, or PM, it needs to route to a fallback rather than confabulate an answer. Similarity-threshold confidence routing was essential, not optional.',
            'Diagram input added a second dimension of complexity: UML use-case images are structured visually, not textually. Extracting actor names and relationships required a full computer vision pipeline, not just OCR but spatial detection first.',
          ],
          metric: { label: 'Knowledge Domains Covered', targetLabel: 'Scrum · Kanban · PM' },
        },
        solution: {
          heading: 'An Orchestrator routes intent-classified queries across five specialized agents; diagrams are parsed by a YOLOv5 + OCR vision pipeline before entering retrieval.',
          accentWord: 'five specialized agents',
          body: [
            'FAISS IndexFlatL2 over all-MiniLM-L6-v2 embeddings powers nearest-neighbor retrieval across three domain knowledge bases. A similarity-threshold confidence mechanism routes retrieval-grounded answers vs. Mistral 7B fallback, cutting hallucination on out-of-scope queries.',
            'UML diagrams pass through a custom YOLOv5 detector (trained on manually annotated data) to localize actors and use-case ovals, then PaddleOCR with adaptive binarization extracts text in a dual-pass setup (binarized and original) maximizing recall on noisy diagram inputs.',
          ],
        },
        results: [
          { label: 'Agent Roles',     description: 'Retrieval, Generation, Conversation, Special-Queries, and Learning, each independently extensible.' },
          { label: 'Vector Store',    description: 'IndexFlatL2 over all-MiniLM-L6-v2 embeddings with confidence-threshold hallucination routing.' },
          { label: 'YOLOv5 Model',   description: 'Trained on manually annotated UML diagrams to detect actors and use-case ovals with NMS.' },
          { label: 'Synthetic Data',  description: 'Auto-generated Q&A pairs from segmented Agile documentation to seed the knowledge base.' },
        ],
        gallery: [
          { label: 'YOLOv5 · Actor & Use-Case Detection' },
          { label: 'OCR · Actor-to-Use-Case Mapping' },
          { label: 'OCR · Complex Actor Relationship Graph' },
          { label: 'ML Priority Classifier · Confusion Matrix' },
        ],
      },
      fr: {
        subtitle: 'RAG Multi-Agent',
        category: 'Ingénierie IA',
        tagline:
          "Système RAG multi-agent pour le Q&R Agile, avec un pipeline personnalisé YOLOv5 + PaddleOCR qui lit et structure les diagrammes UML use-case en entrée.",
        meta: {
          role: ['Ingénieur ML', 'Développeur Backend'],
          timeline: '3 Mois',
          platform: ['Application Web', 'Déploiement local'],
        },
        challenge: {
          heading: 'Construire un système RAG qui gère les requêtes en langage naturel et les images de diagrammes UML bruts sans halluciner sur les questions hors domaine.',
          accentWord: 'sans halluciner',
          body: [
            "Un pipeline de retrieval standard s'effondre aux frontières du domaine : quand un utilisateur pose une question hors de Scrum, Kanban ou PM, le système doit router vers un fallback plutôt que de confabuler une réponse. Le routage par seuil de confiance était essentiel, pas optionnel.",
            "L'entrée de diagrammes ajoutait une deuxième dimension de complexité : les images UML use-case sont structurées visuellement, pas textuellement. Extraire les noms d'acteurs et les relations nécessitait un pipeline complet de vision par ordinateur, non pas seulement de l'OCR mais aussi de la détection spatiale en premier.",
          ],
          metric: { label: 'Domaines de connaissance couverts', targetLabel: 'Scrum · Kanban · PM' },
        },
        solution: {
          heading: "Un Orchestrateur route les requêtes classifiées par intention vers cinq agents spécialisés ; les diagrammes sont analysés par un pipeline de vision YOLOv5 + OCR avant d'entrer dans le retrieval.",
          accentWord: 'cinq agents spécialisés',
          body: [
            "FAISS IndexFlatL2 sur les embeddings all-MiniLM-L6-v2 alimente le retrieval par plus proche voisin sur trois bases de connaissances de domaine. Un mécanisme de confiance par seuil de similarité route les réponses ancrées dans le retrieval vs. le fallback Mistral 7B, réduisant les hallucinations sur les requêtes hors périmètre.",
            "Les diagrammes UML passent par un détecteur YOLOv5 personnalisé (entraîné sur des données annotées manuellement) pour localiser acteurs et ovales use-case, puis PaddleOCR avec binarisation adaptative extrait le texte en double passe (binarisée et originale) maximisant le rappel sur des entrées de diagrammes bruitées.",
          ],
        },
        results: [
          { label: "Rôles d'agents",      description: 'Retrieval, Génération, Conversation, Requêtes spéciales et Apprentissage, chacun extensible indépendamment.' },
          { label: 'Stockage vectoriel',   description: 'IndexFlatL2 sur embeddings all-MiniLM-L6-v2 avec routage anti-hallucination par seuil de confiance.' },
          { label: 'Modèle YOLOv5',       description: 'Entraîné sur des diagrammes UML annotés manuellement pour détecter acteurs et ovales use-case avec NMS.' },
          { label: 'Données synthétiques', description: 'Paires Q&R auto-générées depuis la documentation Agile segmentée pour alimenter la base de connaissances.' },
        ],
        gallery: [
          { label: 'YOLOv5 · Détection Acteur & Use-Case' },
          { label: 'OCR · Mappage Acteur-vers-Use-Case' },
          { label: 'OCR · Graphe de Relations Complexes' },
          { label: 'Classifieur ML · Matrice de Confusion' },
        ],
      },
      ar: {
        subtitle: 'RAG متعدد الوكلاء',
        category: 'هندسة ذكاء اصطناعي',
        tagline:
          'نظام RAG متعدد الوكلاء للأسئلة والأجوبة حول Agile، مع خط أنابيب YOLOv5 + PaddleOCR مخصص يقرأ ويهيكل مخططات UML use-case كمدخلات.',
        meta: {
          role: ['مهندس تعلم آلي', 'مطور خلفي'],
          timeline: '3 أشهر',
          platform: ['تطبيق ويب', 'نشر محلي'],
        },
        challenge: {
          heading: 'بناء نظام RAG يتعامل مع الاستعلامات باللغة الطبيعية وصور مخططات UML الخام دون هلوسة على الأسئلة خارج النطاق.',
          accentWord: 'دون هلوسة',
          body: [
            "خط أنابيب الاسترجاع القياسي ينهار عند حدود النطاق: عندما يسأل المستخدم عن شيء خارج Scrum أو Kanban أو PM، يجب التوجيه إلى بديل بدلاً من اختلاق إجابة. التوجيه بعتبة الثقة كان ضرورياً لا اختيارياً.",
            "إدخال المخططات أضاف بعداً ثانياً من التعقيد: صور UML use-case منظمة بصرياً لا نصياً. استخراج أسماء الممثلين والعلاقات تطلّب خط أنابيب كامل لرؤية الحاسوب، ليس OCR فحسب بل كشفاً مكانياً أولاً.",
          ],
          metric: { label: 'نطاقات المعرفة المغطاة', targetLabel: 'Scrum · Kanban · PM' },
        },
        solution: {
          heading: "منسّق يوجّه الاستعلامات المصنّفة بالنية عبر خمسة وكلاء متخصصين؛ تُحلَّل المخططات بخط أنابيب YOLOv5 + OCR قبل دخول الاسترجاع.",
          accentWord: 'خمسة وكلاء متخصصين',
          body: [
            "FAISS IndexFlatL2 على تضمينات all-MiniLM-L6-v2 يشغّل استرجاع الجار الأقرب عبر ثلاث قواعد معرفة. آلية ثقة بعتبة المشابهة توجّه الإجابات المستندة إلى الاسترجاع مقابل بديل Mistral 7B، مما يقلل الهلوسة على الاستعلامات خارج النطاق.",
            "تمر مخططات UML عبر كاشف YOLOv5 مخصص (مدرّب على بيانات مُعلَّمة يدوياً) لتحديد الممثلين وبيضاويات use-case، ثم PaddleOCR مع ثنائية التكيّف يستخرج النص في مسحتين (ثنائية وأصلية) لتعظيم الاستدعاء على مدخلات المخططات الصاخبة.",
          ],
        },
        results: [
          { label: 'دور وكيل',        description: 'الاسترجاع، التوليد، المحادثة، الاستعلامات الخاصة، والتعلم، كل منها قابل للتوسع باستقلالية.' },
          { label: 'مخزن متجهات',    description: 'IndexFlatL2 على تضمينات all-MiniLM-L6-v2 مع توجيه مكافحة الهلوسة بعتبة الثقة.' },
          { label: 'نموذج YOLOv5',   description: 'مدرّب على مخططات UML مُعلَّمة يدوياً للكشف عن الممثلين وبيضاويات use-case بـ NMS.' },
          { label: 'بيانات تركيبية', description: 'أزواج أسئلة وأجوبة مُولَّدة تلقائياً من وثائق Agile المجزأة لتغذية قاعدة المعرفة.' },
        ],
        gallery: [
          { label: 'YOLOv5 · كشف الممثلين وحالات الاستخدام' },
          { label: 'OCR · تخطيط ممثل إلى حالة استخدام' },
          { label: 'OCR · مخطط علاقات معقد' },
          { label: 'مصنّف ML · مصفوفة الارتباك' },
        ],
      },
    },
  },

  // 3. Smart Cover
  {
    slug: 'smart-cover',
    title: ['SMART', 'COVER'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.20) 0%, rgba(234,88,12,0.10) 40%, transparent 70%), radial-gradient(ellipse at 75% 65%, rgba(239,68,68,0.12) 0%, transparent 60%)',
    coverImage: '/gallery/smartcover/smart-cover-deck-cover.png',
    meta: {
      stack: ['Python', 'FastAPI', 'LangGraph', 'Claude Sonnet', 'React'],
      period: '2025',
    },
    challenge: { metric: { progress: 100 } },
    solution: { image: '/gallery/smartcover/smart-cover-diagram.png' },
    resultsBase: [
      { value: '48h',     progress: 100, accent: 'primary'   },
      { value: 'Agentic', progress: 90,  accent: 'secondary' },
      { value: '100%',    progress: 100, accent: 'primary'   },
      { value: 'Claude',  progress: 88,  accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/smartcover/smart-cover-claim-processing.png' },
      { gradient: 'linear-gradient(135deg, rgba(234,88,12,0.15) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/smartcover/smart-cover-deck-cover.png', document: '/gallery/smartcover/smart-cover-presentation.pdf' },
    ],
    locales: {
      en: {
        subtitle: 'Hackathon · 48h',
        category: 'Agentic AI',
        tagline:
          'Insurance claim automation pipeline: plain text in, routed structured verdict out. Built with LangGraph multi-step orchestration and an LLM-as-judge fraud review.',
        meta: {
          role: ['AI Engineer', 'Full-Stack Developer'],
          timeline: '48 Hours',
          platform: ['Web App'],
        },
        challenge: {
          heading: 'Automating insurance claim processing end-to-end: from ambiguous natural language to a structured, routable verdict under 48-hour hackathon pressure.',
          accentWord: 'ambiguous natural language',
          body: [
            'Insurance claims arrive as unstructured text: names, incident descriptions, coverage references, all mixed together. The system needed to extract typed fields, populate templates, and route to the correct provider without any manual step in between.',
            'Adding an LLM-as-judge fraud review on top of routing meant designing a multi-step agentic workflow where each stage depends on the output of the previous. A pipeline that needed to be both correct and demonstrable within 48 hours.',
          ],
          metric: { label: 'Pipeline Steps Automated', targetLabel: 'Extract → Route → Judge → Verdict' },
        },
        solution: {
          heading: 'LangGraph orchestrates extraction, routing, and LLM-as-judge fraud scoring, without human intervention.',
          accentWord: 'without human intervention',
          body: [
            'LangGraph nodes handle structured extraction from free-text claims, template population, and intelligent routing based on extracted context. Each step passes typed state to the next with tool-calling at each decision point.',
            'Claude Sonnet runs as the final LLM-as-judge: it reviews the structured claim for fraud signals and generates a cost estimate, producing an automated verdict delivered directly to the insurer without requiring a human review loop.',
          ],
        },
        results: [
          { label: 'Build Time',    description: 'Zero to fully working agentic pipeline, built under hackathon pressure.' },
          { label: 'Orchestration', description: 'LangGraph multi-step agentic workflow: each node passes typed state to the next with tool-calling at every decision point.' },
          { label: 'Automated',    description: 'Full claim lifecycle automated: extract, structure, route, LLM verdict. No human in the loop.' },
          { label: 'LLM Judge',    description: 'Claude Sonnet reviews each structured claim for fraud signals and generates a cost estimate as the final verdict.' },
        ],
        gallery: [
          { label: 'Claim Processing Pipeline' },
          { label: 'Smart Cover Pitch Deck' },
        ],
      },
      fr: {
        subtitle: 'Hackathon · 48h',
        category: 'IA Agentique',
        tagline:
          "Pipeline d'automatisation de sinistres : texte brut en entrée, verdict structuré et routé en sortie. Construit avec l'orchestration multi-étapes LangGraph et une revue anti-fraude LLM-as-judge.",
        meta: {
          role: ['Ingénieur IA', 'Développeur Full-Stack'],
          timeline: '48 Heures',
          platform: ['Application Web'],
        },
        challenge: {
          heading: "Automatiser le traitement de sinistres de bout en bout : du langage naturel ambigu à un verdict structuré et routable, sous la pression d'un hackathon de 48 heures.",
          accentWord: 'langage naturel ambigu',
          body: [
            "Les sinistres arrivent comme du texte non structuré : noms, descriptions d'incidents, références de couverture, tout mélangé. Le système devait extraire des champs typés, remplir des templates et router vers le bon assureur sans aucune étape manuelle.",
            "Ajouter une revue anti-fraude LLM-as-judge en plus du routage signifiait concevoir un workflow agentique multi-étapes où chaque étape dépend de la sortie de la précédente. Un pipeline devant être à la fois correct et démontrable en 48 heures.",
          ],
          metric: { label: 'Étapes automatisées', targetLabel: 'Extraire → Router → Juger → Verdict' },
        },
        solution: {
          heading: "LangGraph orchestre l'extraction, le routage et la notation anti-fraude LLM-as-judge, sans intervention humaine.",
          accentWord: 'sans intervention humaine',
          body: [
            "Les nœuds LangGraph gèrent l'extraction structurée depuis les sinistres en texte libre, le remplissage de templates et le routage intelligent basé sur le contexte extrait. Chaque étape passe un état typé à la suivante avec des appels d'outils à chaque point de décision.",
            "Claude Sonnet agit comme juge LLM final : il examine le sinistre structuré pour détecter des signaux de fraude et génère une estimation de coût, produisant un verdict automatisé livré directement à l'assureur sans boucle de revue humaine.",
          ],
        },
        results: [
          { label: 'Temps de build',  description: 'De zéro à pipeline agentique complet, construit sous pression de hackathon.' },
          { label: 'Orchestration',   description: "Workflow agentique multi-étapes LangGraph : chaque nœud passe un état typé au suivant avec des appels d'outils à chaque point de décision." },
          { label: 'Automatisé',      description: "Cycle de vie complet du sinistre automatisé : extraction, structuration, routage, verdict LLM. Aucun humain dans la boucle." },
          { label: 'Juge LLM',        description: 'Claude Sonnet examine chaque sinistre structuré pour détecter des signaux de fraude et génère une estimation de coût.' },
        ],
        gallery: [
          { label: 'Pipeline de traitement de sinistres' },
          { label: 'Présentation Smart Cover' },
        ],
      },
      ar: {
        subtitle: 'هاكاثون · 48 ساعة',
        category: 'ذكاء اصطناعي وكيل',
        tagline:
          'خط أنابيب أتمتة مطالبات التأمين: نص عادي مدخلاً، حكم منظم وموجَّه مخرجاً. مبني بتنسيق LangGraph متعدد الخطوات ومراجعة LLM-as-judge للاحتيال.',
        meta: {
          role: ['مهندس ذكاء اصطناعي', 'مطور متكامل'],
          timeline: '48 ساعة',
          platform: ['تطبيق ويب'],
        },
        challenge: {
          heading: 'أتمتة معالجة مطالبات التأمين من البداية إلى النهاية: من اللغة الطبيعية الغامضة إلى حكم منظم وقابل للتوجيه تحت ضغط 48 ساعة هاكاثون.',
          accentWord: 'اللغة الطبيعية الغامضة',
          body: [
            "تصل مطالبات التأمين كنص غير منظم: أسماء، أوصاف حوادث، مراجع تغطية، كلها مختلطة. كان النظام بحاجة لاستخراج حقول مكتوبة، وملء القوالب، والتوجيه إلى المزود الصحيح دون أي خطوة يدوية.",
            "إضافة مراجعة احتيال LLM-as-judge فوق التوجيه معناه تصميم سير عمل وكيل متعدد الخطوات حيث تعتمد كل مرحلة على مخرجات السابقة. خط أنابيب يجب أن يكون صحيحاً وقابلاً للعرض خلال 48 ساعة.",
          ],
          metric: { label: 'خطوات مؤتمتة', targetLabel: 'استخراج → توجيه → تحكيم → حكم' },
        },
        solution: {
          heading: "LangGraph ينسّق الاستخراج والتوجيه وتسجيل مكافحة الاحتيال LLM-as-judge، دون تدخل بشري.",
          accentWord: 'دون تدخل بشري',
          body: [
            "تتولى عقد LangGraph الاستخراج المنظم من المطالبات النصية الحرة، وملء القوالب، والتوجيه الذكي بناءً على السياق المستخرج. تمرر كل خطوة حالة مكتوبة إلى التالية مع استدعاء أدوات عند كل نقطة قرار.",
            "يعمل Claude Sonnet محكماً LLM نهائياً: يراجع المطالبة المنظمة بحثاً عن إشارات احتيال ويُنشئ تقديراً للتكلفة، منتجاً حكماً آلياً يُسلَّم مباشرة للمؤمِّن دون حلقة مراجعة بشرية.",
          ],
        },
        results: [
          { label: 'وقت البناء',  description: 'من الصفر إلى خط أنابيب وكيل كامل، مبني تحت ضغط الهاكاثون.' },
          { label: 'تنسيق',       description: 'سير عمل وكيل متعدد الخطوات LangGraph: كل عقدة تمرر حالة مكتوبة للتالية مع استدعاء أدوات عند كل نقطة قرار.' },
          { label: 'مؤتمت',       description: 'دورة حياة المطالبة الكاملة مؤتمتة: استخراج، هيكلة، توجيه، حكم LLM. لا إنسان في الحلقة.' },
          { label: 'محكم LLM',    description: 'Claude Sonnet يراجع كل مطالبة منظمة بحثاً عن إشارات احتيال ويُنشئ تقديراً للتكلفة كحكم نهائي.' },
        ],
        gallery: [
          { label: 'خط أنابيب معالجة المطالبات' },
          { label: 'عرض Smart Cover التقديمي' },
        ],
      },
    },
  },

  // 4. WavyVoice
  {
    slug: 'wavy-voice',
    title: ['WAVY', 'VOICE'],
    coverGradient:
      'radial-gradient(ellipse at 35% 40%, rgba(16,185,129,0.22) 0%, rgba(6,182,212,0.10) 40%, transparent 70%), radial-gradient(ellipse at 75% 65%, rgba(5,150,105,0.18) 0%, transparent 60%)',
    coverImage: '/gallery/wavyvoice/wavy-voice-deck-cover.png',
    meta: {
      stack: ['Python', 'OpenAI Whisper', 'OpenCV', 'MediaPipe', 'TensorFlow'],
      period: '2024',
    },
    challenge: { metric: { progress: 100 } },
    solution: {},
    resultsBase: [
      { value: '3',       progress: 100, accent: 'primary'   },
      { value: 'Offline', progress: 90,  accent: 'secondary' },
      { value: '48h',     progress: 100, accent: 'primary'   },
      { value: 'OpenCV',  progress: 80,  accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,11,15,0.95) 100%)', image: '/gallery/wavyvoice/wavy-voice-deck-cover.png', document: '/gallery/wavyvoice/wavy-voice-presentation.pdf' },
    ],
    locales: {
      en: {
        subtitle: 'Hackathon · 48h',
        category: 'Multi-Modal AI',
        tagline:
          "Accessibility pipeline that converts any video's speech into sign language pose animations, chaining Whisper, NLP translation, and MediaPipe skeleton rendering.",
        meta: {
          role: ['AI Engineer'],
          timeline: '48 Hours',
          platform: ['Web App'],
        },
        challenge: {
          heading: "Making any video accessible to the deaf community by translating speech to sign language animations in a single offline pipeline.",
          accentWord: 'single offline pipeline',
          body: [
            "The challenge was chaining three fundamentally different domains (speech recognition, NLP-level translation, and real-time pose rendering) into a single coherent pipeline that processes an arbitrary video file without requiring an internet connection.",
            'Each model hand-off is a failure point: Whisper output must be tokenized correctly for sign-mapping, MediaPipe pose coordinates must align to the original video frame dimensions, and the final render must stay synchronized with the source timeline.',
          ],
          metric: { label: 'Models Chained', targetLabel: 'Whisper · NLP · MediaPipe' },
        },
        solution: {
          heading: 'Three models chain sequentially: Whisper extracts audio, NLP maps to signs, MediaPipe renders pose overlays directly onto the original video frames.',
          accentWord: 'chain sequentially',
          body: [
            'OpenAI Whisper transcribes the audio track from any video file, then an NLP translation layer maps the transcript to a sign language gesture sequence aligned to timing markers from the original transcript.',
            'MediaPipe renders skeletal pose overlays frame-by-frame onto the source video using OpenCV, producing a new video file where the original content plays alongside a synchronized sign language pose animation.',
          ],
        },
        results: [
          { label: 'Models Chained', description: 'Whisper ASR + NLP translation + MediaPipe pose estimation in one coherent pipeline.' },
          { label: 'Processing',     description: 'No cloud dependency. Runs locally on any video file input.' },
          { label: 'Build Time',     description: 'Multi-model pipeline from zero to working demo in a single hackathon.' },
          { label: 'Video Output',   description: 'Pose overlay rendered frame-by-frame and written to a new synchronized output video.' },
        ],
        gallery: [
          { label: 'WavyVoice Pitch Deck' },
        ],
      },
      fr: {
        subtitle: 'Hackathon · 48h',
        category: 'IA Multi-Modale',
        tagline:
          "Pipeline d'accessibilité convertissant la parole de n'importe quelle vidéo en animations de poses en langue des signes, chaînant Whisper, la traduction NLP et le rendu de squelette MediaPipe.",
        meta: {
          role: ['Ingénieur IA'],
          timeline: '48 Heures',
          platform: ['Application Web'],
        },
        challenge: {
          heading: "Rendre n'importe quelle vidéo accessible à la communauté sourde en traduisant la parole en animations de langue des signes dans un pipeline offline unique.",
          accentWord: 'pipeline offline unique',
          body: [
            "Le défi consistait à chaîner trois domaines fondamentalement différents (reconnaissance vocale, traduction NLP, et rendu de poses en temps réel) en un seul pipeline cohérent traitant un fichier vidéo arbitraire sans connexion internet.",
            "Chaque transfert entre modèles est un point de défaillance : la sortie de Whisper doit être tokenisée correctement pour le mappage de signes, les coordonnées de poses MediaPipe doivent s'aligner aux dimensions des images de la vidéo source, et le rendu final doit rester synchronisé avec la timeline source.",
          ],
          metric: { label: 'Modèles chaînés', targetLabel: 'Whisper · NLP · MediaPipe' },
        },
        solution: {
          heading: "Trois modèles s'enchaînent séquentiellement : Whisper extrait l'audio, le NLP mappe vers les signes, MediaPipe rend les superpositions de poses directement sur les images vidéo originales.",
          accentWord: "s'enchaînent séquentiellement",
          body: [
            "OpenAI Whisper transcrit la piste audio de n'importe quel fichier vidéo, puis une couche de traduction NLP mappe la transcription vers une séquence de gestes de langue des signes alignée aux marqueurs temporels de la transcription originale.",
            "MediaPipe rend des superpositions de poses squelettiques image par image sur la vidéo source via OpenCV, produisant un nouveau fichier vidéo où le contenu original est joué avec une animation de pose de langue des signes synchronisée.",
          ],
        },
        results: [
          { label: 'Modèles chaînés', description: 'Whisper ASR + traduction NLP + estimation de pose MediaPipe en un pipeline cohérent.' },
          { label: 'Traitement',      description: 'Aucune dépendance cloud. Fonctionne localement sur tout fichier vidéo.' },
          { label: 'Temps de build',  description: 'Pipeline multi-modèles de zéro à démo fonctionnelle en un seul hackathon.' },
          { label: 'Sortie vidéo',    description: 'Superposition de pose rendue image par image et écrite dans une nouvelle vidéo de sortie synchronisée.' },
        ],
        gallery: [
          { label: 'Présentation WavyVoice' },
        ],
      },
      ar: {
        subtitle: 'هاكاثون · 48 ساعة',
        category: 'ذكاء اصطناعي متعدد الوسائط',
        tagline:
          'خط أنابيب إمكانية وصول يحوّل كلام أي فيديو إلى رسوم متحركة لأوضاع لغة الإشارة، يربط Whisper وترجمة NLP وتصيير هيكل MediaPipe.',
        meta: {
          role: ['مهندس ذكاء اصطناعي'],
          timeline: '48 ساعة',
          platform: ['تطبيق ويب'],
        },
        challenge: {
          heading: "جعل أي فيديو في متناول مجتمع الصم بترجمة الكلام إلى رسوم متحركة للغة الإشارة في خط أنابيب واحد غير متصل.",
          accentWord: 'خط أنابيب واحد غير متصل',
          body: [
            "التحدي كان ربط ثلاثة مجالات مختلفة جوهرياً (التعرف على الكلام، الترجمة بـ NLP، وتصيير الأوضاع فورياً) في خط أنابيب واحد متسق يعالج أي ملف فيديو دون اتصال بالإنترنت.",
            "كل انتقال بين النماذج نقطة فشل محتملة: يجب ترميز مخرجات Whisper بشكل صحيح لتخطيط الإشارات، يجب محاذاة إحداثيات أوضاع MediaPipe لأبعاد إطارات الفيديو المصدر، ويجب أن يبقى التصيير النهائي متزامناً مع الجدول الزمني للمصدر.",
          ],
          metric: { label: 'نماذج مترابطة', targetLabel: 'Whisper · NLP · MediaPipe' },
        },
        solution: {
          heading: "ثلاثة نماذج تتسلسل بالتتابع: Whisper يستخرج الصوت، NLP يخطط إلى الإشارات، MediaPipe يصيّر تراكبات الأوضاع مباشرة على إطارات الفيديو الأصلية.",
          accentWord: 'تتسلسل بالتتابع',
          body: [
            "OpenAI Whisper يحوّل المسار الصوتي لأي ملف فيديو نصاً، ثم طبقة ترجمة NLP تخطط النص إلى تسلسل إيماءات لغة الإشارة مواءمة للعلامات الزمنية من النص الأصلي.",
            "MediaPipe يصيّر تراكبات الأوضاع الهيكلية إطاراً بإطار على الفيديو المصدر عبر OpenCV، منتجاً ملف فيديو جديداً يُشغّل فيه المحتوى الأصلي مع رسم متحرك لأوضاع لغة الإشارة متزامناً.",
          ],
        },
        results: [
          { label: 'نماذج مترابطة', description: 'Whisper ASR + ترجمة NLP + تقدير أوضاع MediaPipe في خط أنابيب واحد متسق.' },
          { label: 'معالجة',        description: 'لا اعتماد على السحابة. يعمل محلياً على أي مدخل ملف فيديو.' },
          { label: 'وقت البناء',   description: 'خط أنابيب متعدد النماذج من الصفر إلى عرض عملي في هاكاثون واحد.' },
          { label: 'مخرج فيديو',   description: 'تراكب الأوضاع مصيَّر إطاراً بإطار ومكتوب في ملف فيديو مخرج متزامن جديد.' },
        ],
        gallery: [
          { label: 'عرض WavyVoice التقديمي' },
        ],
      },
    },
  },

  // 5. Custom ERP
  {
    slug: 'custom-erp',
    title: ['CUSTOM', 'ERP'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(100,116,139,0.25) 0%, rgba(71,85,105,0.12) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(79,70,229,0.15) 0%, transparent 60%)',
    meta: {
      stack: ['Python', 'JavaScript', 'MySQL', 'ERPNext', 'Frappe', 'MkDocs', 'Linux'],
      period: '2026',
    },
    challenge: { metric: { progress: 100 } },
    solution: { image: '/gallery/erpnext/erpnext-diagram.png' },
    resultsBase: [
      { value: '2',      progress: 100, accent: 'primary'   },
      { value: 'Custom', progress: 90,  accent: 'secondary' },
      { value: 'MkDocs', progress: 100, accent: 'primary'   },
      { value: 'Solo',   progress: 100, accent: 'secondary' },
    ],
    galleryBase: [],
    locales: {
      en: {
        subtitle: 'Client · Langar Tunis & Commerce',
        category: 'Full-Stack Engineering',
        tagline:
          'ERPNext deployed for Langar Tunis and Langar Commerce with custom doctypes, server and client scripts, legacy CSV migration, user training workshops, and shipped MkDocs documentation.',
        meta: {
          role: ['Full-Stack Developer', 'Systems Architect'],
          timeline: 'Delivered',
          platform: ['Web App (Desktop)', 'Linux Server'],
        },
        challenge: {
          heading: "Delivering a customized ERP for two companies with no formal spec, then training both teams and shipping documentation so they could own it.",
          accentWord: 'two companies',
          body: [
            "Langar Tunis and Langar Commerce had no technical documentation: only manual processes, spreadsheets, and domain knowledge held by their teams. Requirements were discovered through operational interviews for both entities, each with different workflows that needed separate customization within the same ERPNext instance.",
            "Delivery didn't end at launch. Both companies needed onboarding workshops to actually use the platform, and a deployed MkDocs documentation site so the teams could self-serve after handoff, turning a software project into a complete product delivery.",
          ],
          metric: { label: 'Companies Deployed', targetLabel: 'Langar Tunis · Langar Commerce' },
        },
        solution: {
          heading: 'Custom Frappe doctypes and scripts built for two entities, with MkDocs docs and hands-on workshops delivering a complete handoff.',
          accentWord: 'complete handoff',
          body: [
            'Legacy data from both companies was extracted from spreadsheets, cleaned through a normalization and deduplication pipeline, then imported into ERPNext via frappe.get_doc() / .insert() and the Bulk Import Tool, with post-import integrity hooks validating every record. Custom Doctypes model the business entities specific to each company. Server scripts (Python) enforce rules at validate, before_save, and on_submit hooks. Client scripts (JavaScript) handle field visibility, real-time calculations, and custom UI triggers.',
            'Post-build, hands-on training workshops walked both teams through the platform. A MkDocs documentation site was written and deployed, covering workflows, custom doctypes, and admin procedures, so both companies could operate and self-serve without depending on a developer for every question.',
          ],
        },
        results: [
          { label: 'Companies',       description: 'Langar Tunis and Langar Commerce: two separate ERPNext setups, each with custom workflows.' },
          { label: 'Doctypes Built',  description: 'New data models specific to each company, not available in standard ERPNext out of the box.' },
          { label: 'Docs Shipped',    description: 'Full documentation site deployed: workflows, custom doctypes, admin procedures, self-serve.' },
          { label: 'Full Lifecycle',  description: 'Discovery, build, data migration, workshops, docs, and delivery. End-to-end ownership.' },
        ],
        gallery: [],
      },
      fr: {
        subtitle: 'Client · Langar Tunis & Commerce',
        category: 'Ingénierie Full-Stack',
        tagline:
          "ERPNext déployé pour Langar Tunis et Langar Commerce avec des doctypes personnalisés, des scripts serveur et client, une migration CSV legacy, des ateliers de formation utilisateurs, et une documentation MkDocs livrée.",
        meta: {
          role: ['Développeur Full-Stack', 'Architecte Systèmes'],
          timeline: 'Livré',
          platform: ['Application Web (Desktop)', 'Serveur Linux'],
        },
        challenge: {
          heading: "Livrer un ERP personnalisé pour deux entreprises sans spécification formelle, puis former les équipes et livrer la documentation pour qu'elles puissent l'exploiter en autonomie.",
          accentWord: 'deux entreprises',
          body: [
            "Langar Tunis et Langar Commerce n'avaient aucune documentation technique : seulement des processus manuels, des feuilles de calcul, et la connaissance métier détenue par leurs équipes. Les besoins ont été découverts lors d'entretiens opérationnels avec les deux entités, chacune ayant des workflows différents nécessitant une personnalisation séparée dans la même instance ERPNext.",
            "La livraison ne s'est pas arrêtée au lancement. Les deux entreprises avaient besoin d'ateliers d'onboarding pour vraiment utiliser la plateforme, et d'un site de documentation MkDocs déployé pour que les équipes puissent se débrouiller seules après le transfert, transformant un projet logiciel en une livraison produit complète.",
          ],
          metric: { label: 'Entreprises déployées', targetLabel: 'Langar Tunis · Langar Commerce' },
        },
        solution: {
          heading: "Doctypes et scripts Frappe personnalisés construits pour deux entités, avec docs MkDocs et ateliers pratiques pour un transfert complet.",
          accentWord: 'transfert complet',
          body: [
            "Les données legacy des deux entreprises ont été extraites des feuilles de calcul, nettoyées via un pipeline de normalisation et déduplication, puis importées dans ERPNext via frappe.get_doc() / .insert() et l'outil d'import en masse, avec des hooks d'intégrité post-import validant chaque enregistrement. Des Doctypes personnalisés modélisent les entités métier spécifiques à chaque entreprise. Les scripts serveur (Python) appliquent les règles aux hooks validate, before_save et on_submit. Les scripts client (JavaScript) gèrent la visibilité des champs, les calculs en temps réel et les déclencheurs UI personnalisés.",
            "Après la construction, des ateliers de formation pratique ont guidé les deux équipes sur la plateforme. Un site de documentation MkDocs a été rédigé et déployé, couvrant les workflows, les doctypes personnalisés et les procédures d'administration, permettant aux deux entreprises d'opérer en autonomie sans dépendre d'un développeur pour chaque question.",
          ],
        },
        results: [
          { label: 'Entreprises',    description: 'Langar Tunis et Langar Commerce : deux installations ERPNext distinctes, chacune avec des workflows personnalisés.' },
          { label: 'Doctypes',       description: "Nouveaux modèles de données spécifiques à chaque entreprise, absents d'ERPNext standard." },
          { label: 'Docs livrés',    description: 'Site de documentation complet déployé : workflows, doctypes personnalisés, procédures admin, self-service.' },
          { label: 'Cycle complet',  description: 'Découverte, build, migration de données, ateliers, docs et livraison. Ownership de bout en bout.' },
        ],
        gallery: [],
      },
      ar: {
        subtitle: 'عميل · Langar Tunis & Commerce',
        category: 'هندسة متكاملة',
        tagline:
          'ERPNext منشور لـ Langar Tunis وLangar Commerce مع doctypes مخصصة، سكريبتات خادم وعميل، ترحيل CSV قديم، ورش تدريبية للمستخدمين، ووثائق MkDocs مُسلَّمة.',
        meta: {
          role: ['مطور متكامل', 'مهندس أنظمة'],
          timeline: 'مُسلَّم',
          platform: ['تطبيق ويب (سطح مكتب)', 'خادم Linux'],
        },
        challenge: {
          heading: "تسليم ERP مخصص لشركتين دون مواصفات رسمية، ثم تدريب الفريقين وتسليم التوثيق لتشغيله باستقلالية.",
          accentWord: 'شركتين',
          body: [
            "لم يكن لدى Langar Tunis وLangar Commerce أي توثيق تقني: فقط عمليات يدوية، جداول بيانات، ومعرفة مجالية تحتفظ بها فرقهم. اكتُشفت المتطلبات من خلال مقابلات تشغيلية مع كلتا الجهتين، لكل منهما سير عمل مختلف يتطلب تخصيصاً منفصلاً داخل نفس نظام ERPNext.",
            "التسليم لم ينته عند الإطلاق. كلتا الشركتين احتاجتا لورش إعداد للاستخدام الفعلي للمنصة، وموقع توثيق MkDocs منشور لتمكين الفرق من الاعتماد على النفس بعد التسليم، محوّلاً مشروع برمجي إلى تسليم منتج كامل.",
          ],
          metric: { label: 'شركات تم نشرها', targetLabel: 'Langar Tunis · Langar Commerce' },
        },
        solution: {
          heading: "Doctypes وسكريبتات Frappe مخصصة مبنية لجهتين، مع توثيق MkDocs وورش عملية لتسليم كامل.",
          accentWord: 'تسليم كامل',
          body: [
            "استُخرجت البيانات القديمة لكلتا الشركتين من جداول البيانات، ونُظِّفت عبر خط أنابيب تطبيع وإزالة تكرار، ثم استُوردت إلى ERPNext عبر frappe.get_doc() / .insert() وأداة الاستيراد الجماعي، مع خطافات سلامة ما بعد الاستيراد للتحقق من كل سجل. تُمثّل Doctypes المخصصة الكيانات التجارية الخاصة بكل شركة. سكريبتات الخادم (Python) تُطبّق القواعد على خطافات validate وbefore_save وon_submit. سكريبتات العميل (JavaScript) تتعامل مع رؤية الحقول والحسابات الفورية ومشغّلات واجهة المستخدم المخصصة.",
            "بعد البناء، قادت ورش تدريبية عملية كلا الفريقين عبر المنصة. كُتب موقع توثيق MkDocs ونُشر، يغطي سير العمل والـ doctypes المخصصة وإجراءات الإدارة، لتمكين الشركتين من التشغيل المستقل دون الاعتماد على مطوّر لكل سؤال.",
          ],
        },
        results: [
          { label: 'شركة',            description: 'Langar Tunis وLangar Commerce: نظامان ERPNext منفصلان، لكل منهما سير عمل مخصصة.' },
          { label: 'Doctypes مبنية',  description: 'نماذج بيانات جديدة خاصة بكل شركة، غير متاحة في ERPNext القياسي.' },
          { label: 'وثائق مُسلَّمة', description: 'موقع توثيق كامل منشور: سير عمل، doctypes مخصصة، إجراءات إدارية، اعتماد على النفس.' },
          { label: 'دورة كاملة',      description: 'الاكتشاف، البناء، ترحيل البيانات، الورش، التوثيق، والتسليم. ملكية من البداية إلى النهاية.' },
        ],
        gallery: [],
      },
    },
  },

  // 6. NanoLab Website
  {
    slug: 'nanolab-website',
    title: ['NANO', 'LAB'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(127,255,212,0.22) 0%, rgba(0,255,255,0.08) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(32,178,170,0.18) 0%, transparent 60%)',
    meta: {
      stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Netlify'],
      liveUrl: 'https://nanolab.tn',
      period: 'Mar – May 2026',
    },
    challenge: { metric: { progress: 100 } },
    solution: {},
    resultsBase: [
      { value: '3',    progress: 100, accent: 'primary'   },
      { value: 'Live', progress: 100, accent: 'secondary' },
      { value: 'Full', progress: 95,  accent: 'primary'   },
      { value: 'Solo', progress: 100, accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(127,255,212,0.18) 0%, rgba(5,11,15,0.95) 100%)' },
      { gradient: 'linear-gradient(135deg, rgba(0,255,255,0.12) 0%, rgba(5,11,15,0.95) 100%)'   },
      { gradient: 'linear-gradient(135deg, rgba(32,178,170,0.18) 0%, rgba(5,11,15,0.95) 100%)'  },
    ],
    locales: {
      en: {
        subtitle: 'Production',
        category: 'Full-Stack Web',
        tagline:
          'Trilingual corporate website (EN/FR/AR with RTL), built solo from zero to Netlify production with schema.org SEO, Open Graph, and full i18n.',
        meta: {
          role: ['Full-Stack Developer'],
          timeline: '2 Months',
          platform: ['Web (Desktop + Mobile)'],
        },
        challenge: {
          heading: 'Building a trilingual site with RTL Arabic support, full SEO instrumentation, and Netlify production deployment. Entirely solo.',
          accentWord: 'RTL Arabic support',
          body: [
            'Arabic RTL is not just a text direction change: it requires layout mirroring, flex/grid direction flips, icon orientation adjustments, and font fallback chains that behave correctly without breaking the EN and FR layouts on the same codebase.',
            'Full SEO coverage meant more than meta tags: schema.org JSON-LD structured data, Open Graph for social previews, canonical tags for trilingual URL variants, and a generated sitemap, all implemented and validated before launch.',
          ],
          metric: { label: 'Languages Supported', targetLabel: 'EN · FR · AR (RTL)' },
        },
        solution: {
          heading: 'next-intl handles all three locales including RTL layout direction; schema.org JSON-LD, Open Graph, and canonical tags cover the full SEO surface.',
          accentWord: 'full SEO surface',
          body: [
            "next-intl manages locale routing and message loading for EN, FR, and AR. The `dir` attribute is set dynamically per locale, and Tailwind's RTL utilities handle layout mirroring, so a single component tree serves all three languages without duplication.",
            "The full SEO stack was built from scratch: JSON-LD structured data for the organization, Open Graph metadata for all key pages, `<link rel=\"alternate\" hreflang>` tags for trilingual URL signalling, and an auto-generated sitemap.xml. The site was indexable correctly from day one.",
          ],
        },
        results: [
          { label: 'Languages',  description: 'English, French, Arabic, with full RTL layout support for Arabic using next-intl.' },
          { label: 'Production', description: 'Deployed on Netlify at nanolab.tn. Real domain, real traffic.' },
          { label: 'SEO Stack',  description: 'schema.org JSON-LD, Open Graph, sitemap.xml, and canonical hreflang tags implemented.' },
          { label: 'Delivery',   description: 'Setup, design, i18n, SEO, and deployment, owned end-to-end in 2 months.' },
        ],
        gallery: [
          { label: 'English Landing' },
          { label: 'French Version' },
          { label: 'Arabic RTL Layout' },
        ],
      },
      fr: {
        subtitle: 'Production',
        category: 'Web Full-Stack',
        tagline:
          "Site corporate trilingue (EN/FR/AR avec RTL), construit en solo de zéro jusqu'en production Netlify avec SEO schema.org, Open Graph et i18n complet.",
        meta: {
          role: ['Développeur Full-Stack'],
          timeline: '2 Mois',
          platform: ['Web (Desktop + Mobile)'],
        },
        challenge: {
          heading: "Construire un site trilingue avec support RTL arabe, instrumentation SEO complète, et déploiement en production Netlify. Entièrement en solo.",
          accentWord: 'support RTL arabe',
          body: [
            "Le RTL arabe n'est pas qu'un simple changement de direction de texte : il exige le mirroring des layouts, le retournement des directions flex/grid, l'ajustement de l'orientation des icônes, et des chaînes de polices de secours qui fonctionnent correctement sans casser les layouts EN et FR sur la même base de code.",
            "Une couverture SEO complète signifiait plus que des balises meta : données structurées JSON-LD schema.org, Open Graph pour les aperçus sociaux, balises canoniques pour les variantes d'URL trilingues, et un sitemap généré, tous implémentés et validés avant le lancement.",
          ],
          metric: { label: 'Langues supportées', targetLabel: 'EN · FR · AR (RTL)' },
        },
        solution: {
          heading: "next-intl gère les trois locales dont la direction RTL ; JSON-LD schema.org, Open Graph et balises canoniques couvrent toute la surface SEO.",
          accentWord: 'toute la surface SEO',
          body: [
            "next-intl gère le routage des locales et le chargement des messages pour EN, FR et AR. L'attribut `dir` est défini dynamiquement par locale, et les utilitaires RTL de Tailwind gèrent le mirroring des layouts, ainsi un seul arbre de composants sert les trois langues sans duplication.",
            "La stack SEO complète a été construite de zéro : données structurées JSON-LD pour l'organisation, métadonnées Open Graph pour toutes les pages clés, balises `<link rel=\"alternate\" hreflang>` pour le signalement trilingue des URLs, et un sitemap.xml auto-généré. Le site était correctement indexable dès le premier jour.",
          ],
        },
        results: [
          { label: 'Langues',     description: "Anglais, français, arabe avec support complet du layout RTL pour l'arabe via next-intl." },
          { label: 'Production',  description: 'Déployé sur Netlify à nanolab.tn. Vrai domaine, vrai trafic.' },
          { label: 'Stack SEO',   description: 'JSON-LD schema.org, Open Graph, sitemap.xml et balises hreflang canoniques implémentés.' },
          { label: 'Livraison',   description: 'Setup, design, i18n, SEO et déploiement, maîtrisés de bout en bout en 2 mois.' },
        ],
        gallery: [
          { label: 'Landing anglaise' },
          { label: 'Version française' },
          { label: 'Layout RTL arabe' },
        ],
      },
      ar: {
        subtitle: 'إنتاج',
        category: 'ويب متكامل',
        tagline:
          'موقع شركة ثلاثي اللغات (EN/FR/AR مع RTL)، مبني بمفرده من الصفر إلى إنتاج Netlify مع SEO بـ schema.org، Open Graph، وi18n كامل.',
        meta: {
          role: ['مطور متكامل'],
          timeline: 'شهران',
          platform: ['ويب (سطح مكتب + جوال)'],
        },
        challenge: {
          heading: "بناء موقع ثلاثي اللغات مع دعم RTL العربي، توثيق SEO كامل، ونشر إنتاجي على Netlify. بمفرده تماماً.",
          accentWord: 'دعم RTL العربي',
          body: [
            "RTL العربي ليس مجرد تغيير اتجاه النص: يتطلب عكس التخطيطات، قلب اتجاهات flex/grid، تعديل توجيه الأيقونات، وسلاسل احتياطية للخطوط تعمل بشكل صحيح دون كسر تخطيطات EN وFR على نفس قاعدة الكود.",
            "التغطية الكاملة لـ SEO تعني أكثر من علامات meta: بيانات منظمة schema.org JSON-LD، Open Graph للمعاينات الاجتماعية، علامات canonical لمتغيرات URL الثلاثية، وخريطة موقع مُولَّدة، كلها منفَّذة ومتحقق منها قبل الإطلاق.",
          ],
          metric: { label: 'لغات مدعومة', targetLabel: 'EN · FR · AR (RTL)' },
        },
        solution: {
          heading: "next-intl يتولى المناطق الثلاثة بما فيها اتجاه RTL؛ schema.org JSON-LD وOpen Graph والعلامات الـ canonical تغطي كامل سطح SEO.",
          accentWord: 'كامل سطح SEO',
          body: [
            "next-intl يدير توجيه المناطق وتحميل الرسائل لـ EN وFR وAR. سمة `dir` تُعيَّن ديناميكياً لكل منطقة، وأدوات RTL لـ Tailwind تتولى عكس التخطيطات، فيخدم شجرة مكونات واحدة اللغات الثلاث دون تكرار.",
            "بُنيت كامل مجموعة SEO من الصفر: بيانات منظمة JSON-LD للمنظمة، بيانات تعريف Open Graph لجميع الصفحات الرئيسية، علامات `<link rel=\"alternate\" hreflang>` للإشارة الثلاثية لعناوين URL، وsitemap.xml مُولَّد تلقائياً. الموقع كان قابلاً للفهرسة بشكل صحيح من أول يوم.",
          ],
        },
        results: [
          { label: 'لغة',           description: 'الإنجليزية والفرنسية والعربية، مع دعم كامل لتخطيط RTL للعربية باستخدام next-intl.' },
          { label: 'إنتاج',         description: 'منشور على Netlify على nanolab.tn. نطاق حقيقي، حركة مرور حقيقية.' },
          { label: 'مجموعة SEO',    description: 'schema.org JSON-LD وOpen Graph وsitemap.xml وعلامات hreflang canonical منفَّذة.' },
          { label: 'تسليم',         description: 'الإعداد والتصميم وi18n وSEO والنشر، مملوكة من البداية إلى النهاية في شهرين.' },
        ],
        gallery: [
          { label: 'الصفحة الرئيسية الإنجليزية' },
          { label: 'النسخة الفرنسية' },
          { label: 'تخطيط RTL العربي' },
        ],
      },
    },
  },

  // 7. Payroll Platform (NDA)
  {
    slug: 'payroll-platform',
    title: ['PAYROLL', 'PLATFORM'],
    coverGradient:
      'radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.24) 0%, rgba(59,130,246,0.12) 40%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.16) 0%, transparent 60%)',
    meta: {
      stack: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Mistral AI', 'Tailwind CSS', 'Vitest'],
      period: '2025 – 2026',
    },
    challenge: { metric: { progress: 80 } },
    solution: {},
    resultsBase: [
      { value: 'SSE',   progress: 90,  accent: 'primary'   },
      { value: 'Cache', progress: 85,  accent: 'secondary' },
      { value: 'PG',    progress: 100, accent: 'primary'   },
      { value: '5+',    progress: 100, accent: 'secondary' },
    ],
    galleryBase: [
      { gradient: 'linear-gradient(135deg, rgba(99,102,241,0.20) 0%, rgba(5,11,15,0.95) 100%)' },
      { gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(5,11,15,0.95) 100%)' },
      { gradient: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(5,11,15,0.95) 100%)' },
    ],
    locales: {
      en: {
        subtitle: 'Team Project · NDA',
        category: 'Document Intelligence',
        tagline:
          'Full-stack SvelteKit platform using Mistral AI to classify and sort payroll documents automatically. Live progress streams over SSE, uploads deduplicate by content hash, and a cross-client document explorer ships with in-browser PDF and Excel previews.',
        meta: {
          role: ['Full-Stack Developer', 'AI/LLM Engineer'],
          timeline: 'Ongoing',
          platform: ['Web App (SaaS)'],
        },
        challenge: {
          heading: 'Replacing a fragile multi-route pipeline with an architecture that streams live progress, handles diverse document formats, and keeps LLM costs under control at scale.',
          accentWord: 'LLM costs under control',
          body: [
            'The existing architecture spread document processing across several routes with no real-time feedback. Large batches failed silently on Mistral API rate limits. Long runs were fragile: browser disconnects left orphaned server processes, a startup race condition caused inconsistent database readiness, and pending uploads had no resume path.',
            'Classification accuracy degraded on re-runs: unchanged files re-hit the model anyway, wasting cost, and results still created duplicate period folders. Date extraction from long documents cut off before the relevant content, and blank OCR pages polluted the cache.',
          ],
          metric: { label: 'LLM Calls Eliminated', targetLabel: 'Cached Re-runs' },
        },
        solution: {
          heading: 'A clean upload/run architecture with SSE streaming, content-hash caching, and a rate limiter built to survive production batch sizes.',
          accentWord: 'content-hash caching',
          body: [
            'Rebuilt the pipeline around a single upload endpoint and a single run endpoint. The run endpoint streams live progress over Server-Sent Events. Runs cancel server-side on browser disconnect; pending uploads resume without re-uploading; a startup database readiness check eliminates the race condition. Migrated the data layer from SQLite to PostgreSQL with Drizzle ORM, moving dashboard KPI aggregation from in-memory JS parsing into SQL.',
            'Per-file content-hash caching skips the model call entirely for unchanged files on re-run. A global HTTP 429 rate limiter with exponential retry stops large batches from failing on API limits. Placement logic steers high-confidence ambiguous files into existing parent folders rather than creating duplicates. Date extraction now sees both start and end of long documents. Added .docx, .csv, .xml, and .xlsm support; built zip upload with content-hash deduplication; delivered a cross-client explorer with in-browser PDF and Excel previews and a month-grid date filter.',
          ],
        },
        results: [
          { label: 'Live Streaming',    description: 'Run progress streams to the browser over SSE. Browser disconnect cancels the server-side run cleanly; pending uploads resume without re-uploading.' },
          { label: 'LLM Cost Cut',      description: 'Content-hash caching skips the model call for unchanged files. Global HTTP 429 rate limiter with exponential retry prevents batch failures.' },
          { label: 'Data Migration',    description: 'SQLite to PostgreSQL with Drizzle ORM, including a one-time migration script. Dashboard KPI aggregation moved from in-memory JS into SQL.' },
          { label: 'Formats Supported', description: 'PDF, docx, csv, xml, and xlsm. Zip archives unpack on upload with a progress indicator; Office files left intact; duplicates deduplicated by content hash.' },
        ],
        gallery: [
          { label: 'Operations Dashboard · KPI Overview' },
          { label: 'Document Explorer · PDF & Excel Preview' },
          { label: 'Classification Pipeline · SSE Progress' },
        ],
      },
      fr: {
        subtitle: 'Projet d\'équipe · NDA',
        category: 'Intelligence documentaire',
        tagline:
          'Plateforme SvelteKit full-stack utilisant Mistral AI pour classifier et trier automatiquement des documents de paie. La progression en direct est streamée via SSE, les uploads sont dédupliqués par hash de contenu, et un explorateur de documents multi-client inclut des aperçus PDF et Excel in-browser.',
        meta: {
          role: ['Développeur Full-Stack', 'Ingénieur IA/LLM'],
          timeline: 'En cours',
          platform: ['Application Web (SaaS)'],
        },
        challenge: {
          heading: 'Remplacer un pipeline fragile multi-routes par une architecture qui streame la progression en direct, gère des formats variés, et maintient les coûts LLM sous contrôle à l\'échelle.',
          accentWord: 'coûts LLM sous contrôle',
          body: [
            "L'architecture existante répartissait le traitement des documents sur plusieurs routes sans retour en temps réel. Les gros batches échouaient silencieusement sur les limites de l'API Mistral. Les exécutions longues étaient fragiles : les déconnexions navigateur laissaient des processus serveur orphelins, une race condition au démarrage causait une incohérence de disponibilité de la base de données, et les uploads en attente n'avaient aucun chemin de reprise.",
            "La précision de classification se dégradait lors des ré-exécutions : les fichiers inchangés frappaient quand même le modèle, gaspillant du coût, et les résultats créaient encore des dossiers de période en double. L'extraction de dates sur les longs documents s'arrêtait avant le contenu pertinent, et les pages OCR vides polluaient le cache.",
          ],
          metric: { label: 'Appels LLM éliminés', targetLabel: 'Ré-exécutions mises en cache' },
        },
        solution: {
          heading: 'Une architecture upload/exécution propre avec streaming SSE, cache par hash de contenu, et un rate limiter conçu pour survivre aux batches en production.',
          accentWord: 'cache par hash de contenu',
          body: [
            "Pipeline reconstruit autour d'un seul endpoint d'upload et d'un seul endpoint d'exécution. L'endpoint de run streame la progression en direct via Server-Sent Events. Les exécutions s'annulent côté serveur à la déconnexion navigateur ; les uploads en attente reprennent sans ré-upload ; un check de disponibilité de la BDD au démarrage élimine la race condition. Migration de la couche de données de SQLite vers PostgreSQL avec Drizzle ORM, en déplaçant l'agrégation des KPIs du dashboard de JS en mémoire vers SQL.",
            "Le cache par hash de contenu par fichier saute entièrement l'appel modèle pour les fichiers inchangés lors d'une ré-exécution. Un rate limiter HTTP 429 global avec retry exponentiel empêche les gros batches d'échouer sur les limites d'API. La logique de placement dirige les fichiers ambigus à haute confiance vers les dossiers parents existants plutôt que de créer des doublons. Ajout du support .docx, .csv, .xml et .xlsm ; upload zip avec déduplication par hash de contenu ; explorateur multi-client avec aperçus PDF et Excel in-browser et filtre date par grille mensuelle.",
          ],
        },
        results: [
          { label: 'Streaming en direct',   description: 'La progression streame vers le navigateur via SSE. La déconnexion navigateur annule proprement le run côté serveur ; les uploads en attente reprennent.' },
          { label: 'Coûts LLM réduits',     description: 'Le cache par hash de contenu saute l\'appel modèle pour les fichiers inchangés. Rate limiter HTTP 429 global avec retry exponentiel.' },
          { label: 'Migration de données',   description: 'SQLite vers PostgreSQL avec Drizzle ORM, script de migration one-shot. Agrégation KPIs déplacée du parsing JS en mémoire vers SQL.' },
          { label: 'Formats supportés',      description: 'PDF, docx, csv, xml et xlsm. Les archives zip se décompressent à l\'upload ; fichiers Office conservés intacts ; doublons dédupliqués par hash.' },
        ],
        gallery: [
          { label: 'Dashboard Opérations · Vue KPIs' },
          { label: 'Explorateur de documents · Aperçu PDF & Excel' },
          { label: 'Pipeline de classification · Progression SSE' },
        ],
      },
      ar: {
        subtitle: 'مشروع فريق · سري',
        category: 'ذكاء معالجة الوثائق',
        tagline:
          'منصة SvelteKit متكاملة تستخدم Mistral AI لتصنيف وترتيب وثائق الرواتب تلقائياً. تتدفق التقدم المباشر عبر SSE، تُرفَع الملفات مع إزالة التكرار بالـ hash، ومستكشف وثائق متعدد العملاء مع معاينة PDF وExcel في المتصفح.',
        meta: {
          role: ['مطور متكامل', 'مهندس ذكاء اصطناعي/LLM'],
          timeline: 'جارٍ',
          platform: ['تطبيق ويب (SaaS)'],
        },
        challenge: {
          heading: 'استبدال خط أنابيب هش متعدد المسارات ببنية تبث التقدم مباشرة، وتتعامل مع صيغ وثائق متنوعة، وتُبقي تكاليف LLM تحت السيطرة على نطاق واسع.',
          accentWord: 'تكاليف LLM تحت السيطرة',
          body: [
            'كانت البنية الموجودة تُوزّع معالجة الوثائق عبر عدة مسارات دون تغذية راجعة فورية. فشلت الدفعات الكبيرة بصمت عند حدود API Mistral. كانت التشغيلات الطويلة هشة: قطع الاتصال من المتصفح يترك عمليات خادم يتيمة، وحالة سباق عند الإقلاع تُسبب عدم اتساق جاهزية قاعدة البيانات، دون مسار استئناف للرفعات المعلقة.',
            'تراجعت دقة التصنيف عند إعادة التشغيل: الملفات غير المتغيرة تضرب النموذج مجدداً مضيعةً التكلفة، والنتائج لا تزال تُنشئ مجلدات فترات مكررة. استخراج التواريخ من الوثائق الطويلة ينقطع قبل الوصول للمحتوى ذي الصلة، والصفحات الفارغة من OCR تُلوّث الذاكرة المؤقتة.',
          ],
          metric: { label: 'استدعاءات LLM مُلغاة', targetLabel: 'نتائج مُخزَّنة مؤقتاً' },
        },
        solution: {
          heading: 'بنية رفع/تشغيل نظيفة مع بث SSE وتخزين مؤقت بالـ hash ومحدِّد معدل مبني للصمود أمام دفعات الإنتاج.',
          accentWord: 'تخزين مؤقت بالـ hash',
          body: [
            'أُعيد بناء خط الأنابيب حول نقطة رفع واحدة ونقطة تشغيل واحدة. تبث نقطة التشغيل التقدم مباشرةً عبر Server-Sent Events. تُلغى التشغيلات من جهة الخادم عند قطع المتصفح؛ الرفعات المعلقة تستأنف دون إعادة رفع؛ فحص جاهزية قاعدة البيانات عند الإقلاع يُزيل حالة السباق. ترحيل طبقة البيانات من SQLite إلى PostgreSQL باستخدام Drizzle ORM، مع نقل تجميع KPIs لوحة التحكم من تحليل JS في الذاكرة إلى SQL.',
            'يتخطى التخزين المؤقت بالـ hash لكل ملف استدعاء النموذج كلياً للملفات غير المتغيرة عند إعادة التشغيل. محدِّد معدل HTTP 429 عالمي مع إعادة محاولة أسية يمنع فشل الدفعات الكبيرة. منطق التوزيع يوجّه الملفات الغامضة عالية الثقة إلى المجلدات الأم الموجودة. إضافة دعم docx وcsv وxml وxlsm؛ رفع zip مع إزالة التكرار؛ مستكشف متعدد العملاء مع معاينة PDF وExcel في المتصفح وفلتر التاريخ بشبكة شهرية.',
          ],
        },
        results: [
          { label: 'بث مباشر',           description: 'التقدم يتدفق للمتصفح عبر SSE. قطع المتصفح يُلغي التشغيل من جهة الخادم نظيفاً؛ الرفعات المعلقة تستأنف دون إعادة رفع.' },
          { label: 'تخفيض تكلفة LLM',   description: 'التخزين المؤقت بالـ hash يتخطى استدعاء النموذج للملفات غير المتغيرة. محدِّد معدل HTTP 429 عالمي مع إعادة محاولة أسية.' },
          { label: 'ترحيل البيانات',     description: 'SQLite إلى PostgreSQL مع Drizzle ORM وسكريبت ترحيل أحادي. تجميع KPIs نُقل من تحليل JS في الذاكرة إلى SQL.' },
          { label: 'صيغ مدعومة',        description: 'PDF وdocx وcsv وxml وxlsm. الأرشيفات المضغوطة تُفكّ عند الرفع؛ ملفات Office تُحفظ كاملة؛ التكرارات مُزالة بالـ hash.' },
        ],
        gallery: [
          { label: 'لوحة العمليات · نظرة عامة على KPIs' },
          { label: 'مستكشف الوثائق · معاينة PDF وExcel' },
          { label: 'خط التصنيف · تقدم SSE' },
        ],
      },
    },
  },
]

// ─── Public API ───────────────────────────────────────────────────────────────

export function getProjects(lang = 'en'): Project[] {
  return rawProjects.map((r) => merge(r, lang))
}

export function getProject(slug: string, lang = 'en'): Project | null {
  const raw = rawProjects.find((r) => r.slug === slug)
  return raw ? merge(raw, lang) : null
}
