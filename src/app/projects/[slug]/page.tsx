import { notFound } from 'next/navigation'
import { getProject } from '@/data/projects'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/projects/CaseStudyHero'
import { ChallengeSection, SolutionSection } from '@/components/projects/NarrativeSection'
import ProjectSidebar from '@/components/projects/ProjectSidebar'
import ResultsGrid from '@/components/projects/ResultsGrid'
import ProjectGallery from '@/components/projects/ProjectGallery'

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <Header />
      <SocialSidebar />

      <CaseStudyHero project={project} />

      <main className="relative z-10 px-6 md:px-24 -mt-10 mb-20">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full bg-seafoam/10 blur-[100px] pointer-events-none" />

        {/* Two-column layout */}
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
