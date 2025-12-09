import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { AboutSection } from "@/components/about-section"
import { TracksSection } from "@/components/tracks-section"
import { TimelineSection } from "@/components/timeline-section"
import { SpeakersSection } from "@/components/speakers-section"
import { Footer } from "@/components/footer"
import { SmoothScrollWrapper } from "@/components/ui/smooth-scroll-wrapper"

export default function Home() {
  return (
    <SmoothScrollWrapper>
      <main className="min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <TracksSection />
        <TimelineSection />
        <SpeakersSection />
        <Footer />
      </main>
    </SmoothScrollWrapper>
  )
}
