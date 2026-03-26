import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import mainShop from '../assets/main-shop.jpeg'

export default function Hero() {
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const tagRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const subRef = useRef(null)
  const btnsRef = useRef(null)
  const scrollRef = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    // Page load timeline
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.72, duration: 2, ease: 'power2.inOut' })
      .fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=1')
      .fromTo(line1Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.4')
      .fromTo(line2Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.7')
      .fromTo(line3Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.7')
      .fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo(btnsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, '-=0.4')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    // Mouse parallax
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25
      const y = (e.clientY / window.innerHeight - 0.5) * 15
      gsap.to(bgRef.current, { x, y, duration: 1.8, ease: 'power1.out' })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.08]" style={{ willChange: 'transform' }}>
        <img
          src={mainShop}
          alt="Mustache Barbershop interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal" />

      {/* Gradient vignette bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent pointer-events-none" />
      {/* Gradient vignette sides */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal/40 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tag */}
        <p
          ref={tagRef}
          className="text-gold text-xs tracking-[0.5em] uppercase font-semibold mb-8 opacity-0"
        >
          Est. 2015 — Premium Grooming
        </p>

        {/* Heading */}
        <div className="mb-8 overflow-hidden">
          <h1 className="font-black leading-[0.9] tracking-tight">
            <span
              ref={line1Ref}
              className="block text-white opacity-0"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Precision.
            </span>
            <span
              ref={line2Ref}
              className="block text-gold opacity-0"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Style.
            </span>
            <span
              ref={line3Ref}
              className="block text-white opacity-0"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Confidence.
            </span>
          </h1>
        </div>

        {/* Gold divider */}
        <div
          ref={dividerRef}
          className="w-16 h-px bg-gold mx-auto mb-8 origin-left"
          style={{ scaleX: 0 }}
        />

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-white/55 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed opacity-0 tracking-wide"
        >
          Where every cut tells a story. Experience the art of modern barbering
          at Mustache Barbershop.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="group relative bg-gold text-charcoal px-10 py-4 text-xs font-black tracking-[0.2em] uppercase min-w-[220px] text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
          >
            <span className="relative z-10">Book Appointment</span>
            <span className="absolute inset-0 bg-gold-light translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href="#services"
            className="border border-white/30 text-white/80 px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase min-w-[220px] text-center hover:border-gold hover:text-gold transition-all duration-300"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-14 relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-b from-gold to-transparent animate-[fall_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
