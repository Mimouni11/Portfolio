import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import DataStreams from '@/components/contact/DataStreams'
import ContactPageForm from '@/components/contact/ContactPageForm'
import DirectAccess from '@/components/contact/DirectAccess'
import Eyebrow from '@/components/Eyebrow'

export default function ContactPage() {
  return (
    <>
      <Header />
      <SocialSidebar />

      <main className="relative overflow-hidden mesh-gradient min-h-screen">
        {/* Ambient blob glows */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,255,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <DataStreams />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 pt-40 pb-32">

          <Eyebrow label="Status: Establishing Link" right="Node_Contact_V4.0" />

          {/* Heading */}
          <section className="mb-20">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight text-aquamarine glow-text-aquamarine">
              INITIATE_<br />CONNECTION
            </h1>
            <p className="mt-8 font-body text-white/50 text-lg max-w-xl leading-relaxed">
              System architect awaiting transmission. For collaboration inquiries, technical
              protocols, or encrypted direct lines, please populate the parameters below.
            </p>
          </section>

          {/* Form + sidebar */}
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
