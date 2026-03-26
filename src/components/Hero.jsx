import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import mainShop from '../assets/main-shop.jpeg'

const heroStats = [
  { value: '5K+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '8',   label: 'Master Barbers' },
  { value: '12',  label: 'Awards Won' },
]

export default function Hero() {
  const bgRef    = useRef(null)
  const overlayRef = useRef(null)
  const tagRef   = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const divRef   = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.74, duration: 2, ease: 'power2.inOut' })
      .fromTo(tagRef.current,   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=1.2')
      .fromTo(line1Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power4.out' }, '-=0.5')
      .fromTo(line2Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .fromTo(line3Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .fromTo(divRef.current,   { scaleX: 0 },         { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .fromTo(subRef.current,   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .fromTo(btnsRef.current.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.5')
      .fromTo(statsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

    // Mouse parallax on bg
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 22
      const y = (e.clientY / window.innerHeight - 0.5) * 14
      gsap.to(bgRef.current, { x, y, duration: 1.8, ease: 'power1.out' })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background ── */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.08]" style={{ willChange: 'transform' }}>
        <img src={mainShop} alt="Mustache Barbershop" className="w-full h-full object-cover" loading="eager" />
      </div>

      {/* ── Overlays ── */}
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal" />
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0  w-40 bg-gradient-to-r from-charcoal/50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-charcoal/50 to-transparent pointer-events-none" />

      {/* ── Main content — centered ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6 pt-28 pb-8">
        <div className="max-w-5xl w-full mx-auto">

          {/* Tag */}
          <p ref={tagRef} className="text-gold text-[10px] tracking-[0.55em] uppercase font-semibold mb-10 opacity-0">
            Est. 2019 &nbsp;—&nbsp; Premium Grooming
          </p>

          {/* Heading — editorial mix */}
          <h1 className="font-black leading-[0.88] tracking-tight mb-8" style={{ fontSize: 'clamp(3.8rem, 11vw, 9rem)' }}>
            <span ref={line1Ref} className="block text-white opacity-0">
              Precision.
            </span>
            {/* Italic serif for contrast — the modern editorial touch */}
            <span
              ref={line2Ref}
              className="block text-gold opacity-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 900,
              }}
            >
              Style.
            </span>
            <span ref={line3Ref} className="block text-white opacity-0">
              Confidence.
            </span>
          </h1>

          {/* Divider */}
          <div ref={divRef} className="w-14 h-px bg-gold mx-auto mb-7 origin-left" style={{ transform: 'scaleX(0)' }} />

          {/* Subtitle */}
          <p ref={subRef} className="text-white/50 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed opacity-0">
            Where every cut tells a story. Experience the art of modern barbering
            at Mr. Mustache Barbershop.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="group relative bg-gold text-charcoal px-10 py-4 text-[11px] font-black tracking-[0.2em] uppercase min-w-[220px] overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book Appointment
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-gold-light translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a
              href="#services"
              className="border border-white/25 text-white/75 px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase min-w-[220px] text-center hover:border-gold hover:text-gold transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div
        ref={statsRef}
        className="relative z-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4"
      >
        {heroStats.map(({ value, label }, i) => (
          <div
            key={label}
            className={`py-6 px-8 flex flex-col items-center md:items-start gap-1 ${
              i < heroStats.length - 1 ? 'border-r border-white/8' : ''
            } hover:bg-white/[0.02] transition-colors duration-300`}
          >
            <span className="text-gold font-black text-2xl md:text-3xl leading-none tabular-nums">
              {value}
            </span>
            <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} className="absolute bottom-32 md:bottom-24 right-8 flex flex-col items-center gap-2 opacity-0 hidden md:flex">
        <div className="h-12 w-px relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-b from-gold to-transparent" style={{ animation: 'fall 1.6s ease-in-out infinite' }} />
        </div>
        <span className="text-white/25 text-[9px] tracking-[0.35em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes fall {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
