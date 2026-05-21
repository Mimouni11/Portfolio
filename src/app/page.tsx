import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import ScrollIndicator from '@/components/ScrollIndicator'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <main className="relative overflow-hidden mesh-gradient">
        {/* Ambient blob glows — span the full page height */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-aquamarine/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-seafoam/20 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,255,212,0.05)_0%,transparent_70%)] pointer-events-none" />

        <Hero />
        <Stats />
        <ScrollIndicator />
      </main>
      <Footer />
    </>
  )
}
