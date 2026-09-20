import type { Metadata } from 'next'
import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import DataStreams from '@/components/contact/DataStreams'
import ContactPageForm from '@/components/contact/ContactPageForm'
import DirectAccess from '@/components/contact/DirectAccess'
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
    title: m.contact_title,
    description: m.contact_description,
    openGraph: { title: m.contact_title, description: m.contact_description },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const c = dict.contactPage

  return (
    <>
      <Header />
      <SocialSidebar />
      <main className="relative overflow-hidden mesh-gradient min-h-screen">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,255,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <DataStreams />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 pt-40 pb-32">
          <Eyebrow label={c.eyebrow_left} right={c.eyebrow_right} />
          <section className="mb-20">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight text-aquamarine glow-text-aquamarine whitespace-pre-line">
              {c.title}
            </h1>
            <p className="mt-8 font-body text-white/50 text-lg max-w-xl leading-relaxed">
              {c.subtitle}
            </p>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-8">
              <ContactPageForm />
            </div>
            <div className="md:col-span-4">
              <DirectAccess />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
