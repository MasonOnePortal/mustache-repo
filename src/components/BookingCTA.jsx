import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mainShop from '../assets/main-shop.jpeg'

gsap.registerPlugin(ScrollTrigger)

export default function BookingCTA() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content reveal
      const items = contentRef.current.querySelectorAll('.reveal')
      gsap.fromTo(
        items,
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.13,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="booking" ref={sectionRef} className="relative py-36" style={{ isolation: 'isolate' }}>
      {/* Background with parallax — clipped inside its own container */}
      <div className="absolute inset-0" style={{ overflow: 'hidden', zIndex: 0 }}>
        <div ref={bgRef} className="absolute" style={{ top: '-20%', left: '-20%', right: '-20%', bottom: '-20%' }}>
          <img
            src={mainShop}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/88" />
      </div>

      {/* Gold border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-gold/30" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r border-t border-gold/30" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-l border-b border-gold/30" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-gold/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div ref={contentRef}>
          <p className="reveal text-gold text-xs tracking-[0.5em] uppercase font-semibold mb-8">
            Ready for Your Transformation?
          </p>

          <h2
            className="reveal font-black text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            Book Your<br />
            <span className="text-gold">Next Look</span><br />
            Today.
          </h2>

          <p className="reveal text-white/50 text-lg max-w-lg mx-auto leading-relaxed mb-12">
            Don't wait for the perfect moment — create it. Our master barbers
            are ready to craft your signature look.
          </p>

          {/* CTA Buttons */}
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+1234567890"
              className="group relative bg-gold text-charcoal px-12 py-5 font-black text-xs tracking-[0.2em] uppercase overflow-hidden hover:shadow-2xl hover:shadow-gold/25 transition-shadow duration-300 min-w-[240px]"
            >
              <span className="relative z-10 flex items-center gap-3 justify-center">
                Book Appointment
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-gold-light translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>

            <a
              href="tel:+1234567890"
              className="border border-white/25 text-white/70 hover:border-white hover:text-white px-12 py-5 font-bold text-xs tracking-[0.2em] uppercase min-w-[240px] text-center transition-all duration-300"
            >
              Call (123) 456-7890
            </a>
          </div>

          {/* Hours */}
          <p className="reveal text-white/25 text-xs tracking-[0.25em] uppercase mt-10">
            Walk-ins Welcome &nbsp;·&nbsp; Mon–Sat 9AM–8PM &nbsp;·&nbsp; Sun 10AM–6PM
          </p>
        </div>
      </div>
    </section>
  )
}
