import Header from '@/components/Header'
import SocialSidebar from '@/components/SocialSidebar'
import About from '@/components/About'
import Footer from '@/components/Footer'
import AmbientLines from '@/components/AmbientLines'
import Eyebrow from '@/components/Eyebrow'

export default function AboutPage() {
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
          <Eyebrow label="The Architect" />
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            About <span className="text-aquamarine glow-text-aquamarine">Me</span>
          </h1>
        </div>
        <About />
      </main>
      <Footer />
    </>
  )
}
