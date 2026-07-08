'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getProject } from '@/data/projects'
import CaseStudyHero from './CaseStudyHero'
import { ChallengeSection, SolutionSection } from './NarrativeSection'
import ResultsGrid from './ResultsGrid'
import ProjectGallery from './ProjectGallery'
import ProjectSidebar from './ProjectSidebar'

export default function ProjectModal({
  slug,
  onClose,
}: {
  slug: string
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const closingRef = useRef(false)

  // Lock scroll + trigger enter animation
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setVisible(false)
    setTimeout(() => {
      document.body.style.overflow = ''
      onClose()
    }, 520)
  }, [onClose])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  const project = getProject(slug)
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[500] overflow-y-auto"
      style={{
        backgroundColor: '#050B0F',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 520ms cubic-bezier(0.32, 0, 0.67, 0)',
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-8 z-[600] w-10 h-10 rounded-full border border-aquamarine/30 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center text-aquamarine/60 hover:text-aquamarine hover:border-aquamarine hover:bg-aquamarine/10 transition-all text-sm font-body"
        aria-label="Close project"
      >
        ✕
      </button>

      {/* Hero */}
      <CaseStudyHero project={project} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 pb-32 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <ChallengeSection challenge={project.challenge} />
            <SolutionSection solution={project.solution} />
          </div>
          <div className="lg:col-span-4">
            <ProjectSidebar meta={project.meta} feedback={project.feedback} />
          </div>
        </div>
        <ResultsGrid results={project.results} />
        <ProjectGallery gallery={project.gallery} />
      </div>
    </div>
  )
}
