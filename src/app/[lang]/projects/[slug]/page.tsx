import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/data/projects'
import { LOCALES } from '@/lib/config'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/projects/CaseStudyHero'
import { ChallengeSection, SolutionSection } from '@/components/projects/NarrativeSection'
import ProjectSidebar from '@/components/projects/ProjectSidebar'
import ResultsGrid from '@/components/projects/ResultsGrid'
import ProjectGallery from '@/components/projects/ProjectGallery'
export function generateStaticParams() {
  const slugs = getProjects('en').map((p) => p.slug)
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { slug, lang } = await params
  const project = getProject(slug, lang)
  if (!project) return {}
  const title = `${project.title.join(' ')} · Mimouni Mohamed Aziz`
  return {
    title,
    description: project.tagline,
    openGraph: { title, description: project.tagline },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug, lang } = await params
  const project = getProject(slug, lang)
  if (!project) notFound()

  return (
    <>
      <Header />
      <SocialSidebar />
      <CaseStudyHero project={project} />
      <main className="relative z-10 px-6 md:px-24 -mt-10 mb-20">
        <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full bg-seafoam/10 blur-[100px] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-20">
            <ChallengeSection challenge={project.challenge} />
            <SolutionSection solution={project.solution} />
          </div>
          <ProjectSidebar meta={project.meta} feedback={project.feedback} />
        </div>
        <ResultsGrid results={project.results} />
        <ProjectGallery gallery={project.gallery} />
      </main>
      <Footer />
    </>
  )
}
