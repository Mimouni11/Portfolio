import type { Metadata } from 'next'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import About from '@/components/About'
import Footer from '@/components/Footer'
import AmbientLines from '@/components/AmbientLines'
import Eyebrow from '@/components/Eyebrow'
import { getDictionary, hasLocale } from '../dictionaries'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { meta: m } = await getDictionary(lang)
  return {
    title: m.about_title,
    description: m.about_description,
    openGraph: { title: m.about_title, description: m.about_description },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <Header />
      <SocialSidebar />
      <main className="relative overflow-hidden mesh-gradient min-h-screen">
        <AmbientLines count={10} opacity={0.10} grid />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,255,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 pt-40 pb-4">
          <Eyebrow label={dict.aboutPage.eyebrow} />
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            {dict.aboutPage.title_1}{' '}
            <span className="text-aquamarine glow-text-aquamarine">{dict.aboutPage.title_accent}</span>
          </h1>
        </div>
        <About />
      </main>
      <Footer />
    </>
  )
}
