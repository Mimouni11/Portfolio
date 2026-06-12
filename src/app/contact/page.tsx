import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import DataStreams from '@/components/contact/DataStreams'
import ContactPageForm from '@/components/contact/ContactPageForm'
import DirectAccess from '@/components/contact/DirectAccess'

export default function ContactPage() {
  return (
    <>
      <DataStreams />
      <Header />
      <SocialSidebar />

      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Status bar */}
          <div className="flex items-center gap-4 mb-10 opacity-60">
            <span className="w-12 h-px bg-aquamarine" />
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-aquamarine">
              Status: Establishing Link
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.4em] ml-auto text-white/40">
              Node_Contact_V4.0
            </span>
          </div>

          {/* Heading */}
          <section className="mb-20">
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-aquamarine glow-text-aquamarine">
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
