import ProfileCard from './about/ProfileCard'
import Bio from './about/Bio'
import TechStack from './about/TechStack'
import ContactForm from './about/ContactForm'

export default function About() {
  return (
    <section id="about" className="relative px-8 lg:px-12 py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ── Profile photo ── */}
        <div className="lg:col-span-3">
          <ProfileCard />
        </div>

        {/* ── Bio + Tech stack ── */}
        <div className="lg:col-span-5">
          <Bio />
          <TechStack />
        </div>

        {/* ── Contact form ── */}
        <div className="lg:col-span-4">
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
