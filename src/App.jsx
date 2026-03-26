import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import CursorEffect from './components/CursorEffect'
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
        <CursorEffect />
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <BookingCTA />
        <Footer />
      </div>
    </>
  )
}
