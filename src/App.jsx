import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import CursorEffect from './components/CursorEffect'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import BookingCTA from './components/BookingCTA'
import Footer from './components/Footer'

// Register GSAP plugins once globally
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({ once: false })

    // Smooth scroll-linked progress (optional luxury touch)
    gsap.to('body', { duration: 0 }) // warmup

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <div className="bg-charcoal text-white" style={{ position: 'relative' }}>
        {/* Grain texture — premium noise overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[9990]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.032,
            mixBlendMode: 'overlay',
          }}
        />

        <CursorEffect />
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Marquee reverse light />
        <Services />
        <Marquee />
        <Gallery />
        <Testimonials />
        <BookingCTA />
        <Footer />
      </div>
    </>
  )
}
