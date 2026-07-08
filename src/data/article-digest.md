# Article Digest — Project & Experience Proof Points

This file is the source of truth for tailored CV generation. When building a CV, I read this file to pick the right framing and bullet points for each project based on what the role values.

---

## Projects

### FaceForge
**Type:** Personal / academic project (2025–2026)
**Stack:** Python, PyTorch, StyleGAN2, OpenAI CLIP (ViT-B/32), FaceNet (InceptionResnetV1), EfficientNet-B0, Grad-CAM, LPIPS, MTCNN, VGG16, SDXL/IP-Adapter, scikit-learn, FastAPI, Pydantic, React 19, TypeScript, Vite, TailwindCSS, MLflow, Docker/docker-compose, Gemini 2.5 Flash (OpenRouter)
**Scale:** 27 commits, ~11k LOC, solo-engineered
**Repo/Link:** (add if public)

**What it is:**
Full-stack GenAI face platform combining two systems: a text-guided face generator and a deepfake detector, served via FastAPI + React 19, fully containerized with Docker, and tracked end-to-end with MLflow.

**Generation system (StyleGAN2 + CLIP):**
- CLIP-guided latent optimization: Adam optimizer in StyleGAN2 W-space against negative cosine similarity in CLIP embedding space — text prompt drives gradient directly into the latent
- Identity-preserving editing: combined CLIP text-alignment loss + differentiable FaceNet identity loss (VGGFace2) — attributes change while the person stays recognizable
- Real-photo GAN inversion: project arbitrary face photos into W-space via VGG16 perceptual loss, enabling edits on real users (not just sampled faces)
- FFHQ face alignment with MTCNN landmark detection before inversion (avoids garbage projections)
- Celebrity latent database: cached inverted W-vectors for instant reuse
- Latent interpolation between two W-vectors for smooth face morphing
- fp16/fp32 precision switching for GPU memory efficiency

**LLM intelligence layer (Gemini 2.5 Flash via OpenRouter):**
- Prompt enrichment: LLM rewrites natural-language edit requests into minimal CLIP-optimized descriptors
- LLM-as-judge: vision model scores per-facial-feature identity preservation (jawline, eyes, nose, mouth, hair, skin tone) — returns structured JSON verdicts
- Closed-loop dynamic loss adjustment: re-weights identity loss (λ) and learning rate mid-optimization based on judge scores
- Automated evaluation reports: structured quality assessments logged as MLflow artifacts

**Deepfake detection (EfficientNet-B0):**
- Transfer learning from ImageNet, dropout head, BCEWithLogitsLoss, Adam + StepLR scheduler
- Full evaluation pipeline: AUC, accuracy, per-class precision/recall/F1, confusion matrix — all logged to MLflow
- Grad-CAM explainability with custom single-neuron binary target
- ROC-based threshold calibration maximizing Youden's J statistic (robust to class imbalance)
- Uncertainty band: "uncertain" verdict zone around calibrated threshold — surfaces low-confidence predictions instead of forcing binary call
- Debugged label-polarity bug (verified empirically via AUC < 0.5) and corrected probability/confidence split between training and inference

**Generation metrics suite:** CLIP similarity, LPIPS perceptual distance, InceptionV3 confidence/entropy, Laplacian sharpness, W-space distance (OOD detection), pixel-std mode-collapse check

**Backend / API:** FastAPI with lazy model loading (StyleGAN2 + CLIP load on first call — fast boot, ~2GB GPU cost deferred), /predict + /generate endpoints, Pydantic validation, CORS, /health

**Frontend:** React 19 + TypeScript + Vite + TailwindCSS SPA — tool-picker splash, detector UI (upload → verdict + Grad-CAM + uncertainty), generator UI (live params panel wired to /generate)

**MLOps:** MLflow (SQLite backend) — training, calibration, and user generations as separate experiments; per-step optimization curves; Gemini judge scores; ROC/confusion matrix PNGs; model artifacts

**DevOps:** Docker + docker-compose (API + frontend + MLflow as orchestrated services), GPU-with-CPU-fallback builds, git-subtree monorepo merge, pytest suite (test_api.py, test_preprocessing.py)

**Research:** Prototyped SDXL / RealVisXL + IP-Adapter (ViT-H) in Colab with HuggingFace caching, MLflow tracking, ngrok tunneling

---

**CV-ready bullets (pick by role type):**

*ML Engineering / AI Research (6 bullets):*
- Engineered CLIP-guided StyleGAN2 face generation: optimized W-space latents via Adam against CLIP text embeddings (ViT-B/32), with identity preservation via differentiable FaceNet loss and real-photo GAN inversion via VGG16 perceptual loss.
- Trained an EfficientNet-B0 deepfake classifier (transfer learning, Grad-CAM explainability, ROC threshold calibration, uncertainty verdict band) with full evaluation metrics logged to MLflow.
- Built a closed-loop LLM intelligence layer (Gemini 2.5 Flash): prompt enrichment, per-feature identity scoring with structured JSON verdicts, and dynamic loss (λ) + learning-rate adjustment mid-optimization.
- Implemented a generation quality metrics suite: CLIP similarity, LPIPS perceptual distance, InceptionV3 confidence, Laplacian sharpness, W-space OOD detection, and mode-collapse check.
- Served the full system via FastAPI (/generate + /predict) with lazy model loading and a React 19 + TypeScript frontend; all experiments tracked end-to-end in MLflow.
- Containerized the stack with Docker + docker-compose (GPU/CPU fallback), unified a split codebase via git-subtree, and added a pytest suite covering API and preprocessing.

*Agentic / LLM Engineering focus (swap bullet 3):*
- Designed a 4-feature LLM-as-judge layer (Gemini 2.5 Flash via OpenRouter): rewrites user prompts into CLIP-optimized descriptors, scores identity preservation per facial feature as structured JSON, and dynamically adjusts loss weights and learning rate mid-generation in a closed feedback loop.

*Full-stack / product focus (condensed to 4):*
- Built a dual GenAI face platform: StyleGAN2 + CLIP text-guided generation and EfficientNet-B0 deepfake detection, served via FastAPI and a React 19 + TypeScript frontend.
- Added an LLM-as-judge layer (Gemini 2.5 Flash) for prompt enrichment, identity scoring, and closed-loop loss adjustment mid-optimization.
- Instrumented the full stack with MLflow (training + inference + generation experiments) and containerized with Docker + docker-compose.
- Solo-engineered end-to-end: 27 commits, ~11k LOC, from model training to production-ready containerized service.

---

**Reframe by role type:**
- ML engineering → CLIP + StyleGAN2 + EfficientNet + Grad-CAM + threshold calibration
- LLM/agentic → LLM-as-judge closed loop, prompt enrichment, dynamic λ adjustment
- Computer vision → deepfake detection, GAN inversion, Grad-CAM, MTCNN, face alignment
- MLOps → MLflow full instrumentation, Docker, experiment reproducibility
- Full-stack AI → FastAPI + React 19 + Docker + MLflow, end-to-end solo delivery
- Research/generative AI → StyleGAN2 W-space optimization, latent interpolation, SDXL prototyping

**Strongest signals:**
1. Closed-loop LLM judge dynamically adjusting gradient loss weights mid-optimization — this is not standard, this is novel system design
2. GAN inversion on real photos (VGG16 perceptual loss + MTCNN alignment) — deep understanding of generative model internals
3. Threshold calibration with uncertainty bands — production-thinking on ML outputs, not just accuracy
4. 11k LOC solo — sustained, serious engineering effort

**When to use:** Any ML engineering, AI research, computer vision, generative AI, or LLM-heavy role. Strongest project for roles requiring demonstrated ML depth. Pair with Smart Cover for "LLM pipeline" proof and AgileAI for "RAG + classical ML" proof.

---

### AgileAI
**Repo name:** ScrumKanbanChatbot
**Type:** University project (2025)
**Stack:** Python, Flask + Flask-CORS, FAISS (IndexFlatL2), Sentence-Transformers (all-MiniLM-L6-v2), Mistral 7B (Ollama local + HuggingFace Inference API), YOLOv5 (PyTorch), PaddleOCR, OpenCV, FLAN-T5, multi-agent orchestrator architecture
**Repo/Link:** (add GitHub link)
**⚠️ Action needed:** config/dbconfig.py has a hardcoded MongoDB Atlas credential committed publicly — rotate the password immediately in Atlas, then clean git history.

**What it is:**
Multi-agent RAG system for Scrum/Kanban Q&A with a computer-vision pipeline that reads UML use-case diagrams. An Orchestrator routes queries across specialized agents (Retrieval, Generation, Conversation, Special-Queries, Learning). Text queries hit FAISS semantic retrieval → Mistral 7B generation. Image input (UML diagrams) goes through a custom YOLOv5 detector + PaddleOCR extraction pipeline → structured actor/use-case data.

**Key proof points:**

*RAG & retrieval:*
- FAISS (IndexFlatL2) over Sentence-Transformer embeddings (all-MiniLM-L6-v2), top-k nearest-neighbor search across a multi-domain knowledge base
- Similarity-threshold confidence mechanism: retrieval-grounded answers vs. LLM fallback, reducing hallucination on out-of-domain queries
- Retrieval post-processing: deduplicates and merges overlapping answers across Scrum, Kanban, and PM datasets, tagging each result with its source methodology

*LLM / generation:*
- Mistral 7B integration: local Ollama deployment (streaming token-by-token) + HuggingFace Inference API fallback
- Instruction-formatted [INST] prompt templates fusing retrieved context with user query
- Stateful conversational agent with multi-turn history and toggleable conversation mode

*Multi-agent architecture:*
- Orchestrator routing across specialized agents based on intent (out-of-domain detection, conversational-intent heuristics, correction detection)
- Base-agent extensible pattern — new agents plug in without touching core orchestration

*Computer vision — UML diagram understanding:*
- Custom YOLOv5 object detector (PyTorch) trained on manually annotated UML diagrams: localizes actors and use-case ovals with NMS + letterbox preprocessing
- PaddleOCR with adaptive-threshold preprocessing (upscaling, grayscale, Gaussian adaptive binarization, morphological opening) — dual-passes original + binarized images for higher recall
- IoU-based bounding-box merging and confidence-based deduplication on noisy detections
- Element-type-aware text-region heuristics (text below actors vs. inside ovals)
- Debug visualization tooling (OpenCV overlays) and JSON export for downstream consumption

*Data engineering:*
- FLAN-T5 synthetic Q&A generation pipeline: auto-generates question–answer pairs from segmented domain documents
- Document parsing and cleaning: regex + keyword classification to segment Scrum/Kanban/PM source material into structured topical sections
- Multi-domain knowledge bases (Scrum, Kanban, Project Management) in structured JSON

*Continuous learning:*
- User-feedback learning module: detects corrections in user input, stores corrected answers with timestamps, serves them on future matching queries

**CV-ready bullets (pick 4-5 by role):**
- Built a multi-agent RAG system for Agile Q&A: FAISS semantic retrieval over Sentence-Transformer embeddings, Mistral 7B generation (local Ollama + HuggingFace API), with similarity-threshold confidence routing to reduce hallucination.
- Architected an Orchestrator-based multi-agent system routing queries across specialized agents (Retrieval, Generation, Conversation, Learning) via intent-detection heuristics.
- Built a computer-vision pipeline to extract structured data from UML use-case diagrams: custom YOLOv5 detector (trained on manually annotated data) + PaddleOCR with adaptive binarization preprocessing.
- Implemented streaming LLM inference via Ollama API and built instruction-formatted prompt templates fusing retrieved context with user queries.
- Created a synthetic Q&A dataset generation pipeline using FLAN-T5, parsing and segmenting Scrum/Kanban documentation into structured topical knowledge bases.
- Added a continuous learning module: detects user corrections at runtime and incorporates them into the answer store for future queries.

**⚠️ Do NOT list:** BLEU/ROUGE/MRR/Precision@5 — the evaluation code was not implemented, only designed. Listing unverified metrics in a technical interview is a liability.

**Reframe by role type:**
- RAG/retrieval → FAISS + Sentence-Transformers + Mistral, confidence-threshold hallucination reduction
- Multi-agent / agentic → Orchestrator routing across specialized agents, intent detection, base-agent pattern
- Computer vision → custom YOLOv5 on manually annotated UML diagrams, PaddleOCR pipeline
- LLM engineering → streaming Ollama inference, [INST] prompt templates, multi-turn conversation
- Data engineering → FLAN-T5 synthetic dataset generation, document parsing and structuring

**Strongest signals:**
1. Manual annotation + custom YOLOv5 training — full ML data lifecycle, not pretrained out of the box
2. Multi-agent orchestrator pattern — shows systems thinking beyond a single model call
3. Similarity-threshold confidence routing — thoughtful hallucination mitigation, not naive retrieval
4. Dual-pass PaddleOCR with adaptive binarization — real CV engineering for a hard domain (diagram text)

**When to use:** RAG roles, multi-agent roles, computer vision roles, LLM engineering roles. Pairs well with FaceForge (deeper CV/ML) and Smart Cover (agentic pipelines). Together the three projects cover: RAG + multi-agent + CV + generative AI + LLM-as-judge.

---

### Smart Cover
**Type:** Hackathon project (2025)
**Stack:** Python, FastAPI, React, LangGraph, Claude Sonnet
**Repo/Link:** (add if public)

**What it is:**
Insurance claim automation pipeline. Users describe claims in plain text → AI extracts structured data → populates document templates → routes to the correct provider → LLM-as-judge reviews each claim for fraud signals and cost estimation → automated verdict delivered to insurer.

**Key proof points:**
- Built end-to-end in a hackathon (zero to working pipeline under time pressure)
- LangGraph orchestration: multi-step agentic workflow with tool-calling
- LLM-as-judge pattern: automated verdict without human intervention
- Structured extraction from unstructured input (plain text → typed fields)
- Intelligent routing based on extracted context

**Reframe by role type:**
- AI/Agentic engineering → "LangGraph + LLM-as-judge agentic pipeline"
- Automation → "extract-route-automate pipeline, fully automated claim processing"
- Fullstack → "end-to-end: FastAPI backend + React frontend + LLM pipeline"
- Forward deployed / consulting → "rapid prototype from ambiguous problem, built in 48h"

**Strongest signal:** LangGraph experience is rare at junior level. Most engineers have chatbots; this has autonomous tool-calling and automated verdicts.

---

### WavyVoice
**Type:** Hackathon project (2024)
**Stack:** Python, OpenAI Whisper, OpenCV, MediaPipe, TensorFlow
**Repo/Link:** (add if public)

**What it is:**
Accessibility tool. Takes any video → extracts audio → transcribes via Whisper → translates to sign language → renders animated pose overlay on the original video using MediaPipe.

**Key proof points:**
- Multi-modal pipeline: speech recognition + NLP translation + computer vision in one system
- Three models/libraries chained: Whisper + NLP + MediaPipe pose estimation
- Built from scratch in a hackathon (prototyping speed proof)
- Computer vision: OpenCV video processing, MediaPipe skeleton rendering
- Real social impact framing (accessibility for deaf community)

**Reframe by role type:**
- AI/ML engineering → "multi-modal pipeline: Whisper + NLP + MediaPipe"
- Rapid prototyping → "zero to working multi-model pipeline in a hackathon"
- Computer vision → "OpenCV + MediaPipe pose estimation"
- Speech/NLP → "Whisper transcription + translation pipeline"

**Strongest signal:** Shows ability to combine multiple AI models into a coherent pipeline — not just calling one API.

**When to use vs NanoLab:** Use for AI/automation/ML roles. Use NanoLab for frontend-heavy or fullstack roles.

---

### Custom ERP System
**Type:** Production client delivery (2024)
**Stack:** Python, JavaScript, MySQL, ERPNext/Frappe, REST API, Linux
**Repo/Link:** (private, client project)

**What it is:**
Fully customized ERP built for a real client. Mapped their operational workflows to ERPNext modules, built REST API integrations with external systems, custom reporting, automated business workflows. Client uses it daily.

**Key proof points:**
- Translated messy operational requirements into production software (no spec — had to discover and define)
- Active daily production use by a real client (not a demo)
- REST API integrations with external systems
- Custom Frappe modules + business logic + automated workflows
- Delivered and maintained post-launch (full lifecycle ownership)

**Reframe by role type:**
- Forward deployed / consulting → "enterprise client delivery: turned operational requirements into working software"
- Backend/API → "REST API integrations, custom business logic, production delivery"
- Automation → "automated business workflows inside ERP system"
- Enterprise AI → "worked with messy real-world business data and processes"

**Strongest signal:** This is "forward deployed" work before the term existed — discovered requirements, built to them, delivered to a paying client. Most junior engineers don't have this.

---

### NanoLab Website
**Type:** Production (Mar–May 2026)
**Stack:** Next.js 14, TypeScript, Tailwind, next-intl, Netlify
**Live:** nanolab.tn

**What it is:**
Trilingual corporate website (EN/FR/AR) for NanoLab. Built solo from zero to Netlify production: dark mode, full i18n, SEO metadata (schema.org JSON-LD, Open Graph, sitemap), RTL support for Arabic.

**Key proof points:**
- Solo end-to-end: setup → design → i18n → SEO → deployment
- Trilingual including RTL (Arabic) — non-trivial i18n implementation
- Full SEO stack: schema.org, Open Graph, sitemap, canonical tags
- Production on Netlify, live domain

**Reframe by role type:**
- Fullstack/frontend → "shipped trilingual production site solo, full SEO stack"
- TypeScript → "Next.js 14 + TypeScript, full type coverage"
- i18n → "EN/FR/AR with RTL support using next-intl"

**When to use vs WavyVoice:** Use for fullstack/frontend roles or when production delivery of a web product is relevant. Not the right pick for AI/automation/ML roles.

---

## Work Experience Detail

### Bakchich — Part-time Developer (Jul 2025 – Mar 2026)

**What I did:**
1. **KYC automation system** — webhook handler for Didit identity verification API, status-driven state machine, admin management UI (Next.js + Prisma). Event fires → state machine advances → admin sees real-time status. Live, tens of thousands of users, zero downtime since launch.
2. **Analytics migration** — PostHog → Amplitude across a 4-app Next.js monorepo. Built a Node.js server-side proxy for reliable event delivery. Avoided client-side tracking gaps.
3. **Performance** — lazy loading, Suspense, WebM video conversion on the public landing page.

**Key proof points:**
- Production at scale: tens of thousands of users
- Event-driven / webhook architecture in production
- State machine design (not ad-hoc if/else, actual state transitions)
- Maintained 4 production apps simultaneously under live conditions
- Third-party API integration pattern: idempotency, webhook verification, retry handling

**Reframe by role type:**
- Automation/agentic → "event-driven automation system, webhook-driven state machine"
- Backend/API → "third-party API integration (Didit KYC), production webhook handler"
- Fullstack → "Next.js + Prisma admin, Node.js proxy, 4-app monorepo"
- Scale proof → "tens of thousands of users, zero downtime"

---

### Digital Identity — Fullstack Developer Intern (Feb 2024 – Jun 2024)

**What I did:**
Fleet management platform for a client. Web + mobile. Real-time vehicle tracking with OpenStreetMap routing. QR code check-in/check-out. Operations dashboard (fleet analytics, mechanic workflows, maintenance status).

**Key proof points:**
- Client project (delivered to a real client, not internal)
- Real-time features: location tracking, live dashboard
- Mobile + web: cross-platform delivery
- Operations workflow automation (QR check-in/check-out)

**Reframe by role type:**
- Fullstack → "web + mobile platform, real-time tracking"
- Client-facing → "delivered for a real client, operations dashboard"
- Automation → "QR-code workflow automation for field operations"

---

## Things I Want to Add (fill in when you can)

- Any other projects not listed here (side projects, university projects, open source contributions)
- GitHub links for public projects (Smart Cover, WavyVoice)
- Whether any projects have numbers/metrics I can use (users, uptime %, time saved, etc.)
- Certifications or courses with proof points
- Any freelance/consulting work besides the ERP
