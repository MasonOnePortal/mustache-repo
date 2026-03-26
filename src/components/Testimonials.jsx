import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Marcus Williams',
    role: 'Loyal Client · 5 Years',
    text: "Mustache is the real deal. They don't just cut hair — they create experiences. Every visit feels like a luxury ritual. I wouldn't trust anyone else with my fade.",
    initials: 'MW',
  },
  {
    name: 'James Rivera',
    role: 'Regular Client',
    text: "The attention to detail is unmatched. My barber remembers exactly how I like my cut, every single time. The atmosphere is premium and the results are always flawless.",
    initials: 'JR',
  },
  {
    name: 'David Chen',
    role: 'First-Time Client',
    text: "Walked in with no appointment, walked out a whole new person. The hot towel shave alone is worth the trip. This place is elite — nothing else comes close.",
    initials: 'DC',
  },
  {
    name: 'Anthony Moore',
    role: 'Client · 3 Years',
    text: "Best barbershop in the city, hands down. The skill, the vibe, the professionalism — everything is next level. My confidence is through the roof after every visit.",
    initials: 'AM',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardRef = useRef(null)
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headItems = headRef.current.querySelectorAll('.reveal')
      gsap.fromTo(
        headItems,
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const animateCard = useCallback(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
    )
  }, [])

  useEffect(() => {
    animateCard()
  }, [active, animateCard])

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i) => {
    clearInterval(intervalRef.current)
    setActive(i)
    // Restart timer
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5500)
  }

  const t = testimonials[active]

  return (
    <section id="testimonials" ref={sectionRef} className="bg-charcoal py-24 md:py-36 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <p className="reveal text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Client Stories
          </p>
          <h2 className="reveal text-4xl md:text-6xl font-black text-white leading-tight">
            What They <span className="text-gold">Say</span>
          </h2>
        </div>

        {/* Quote marks decorative */}
        <div className="relative">
          <span className="absolute -top-8 -left-4 text-gold/6 font-serif leading-none select-none pointer-events-none"
            style={{ fontSize: '12rem' }}
          >
            "
          </span>

          {/* Card */}
          <div
            ref={cardRef}
            className="relative bg-dark border border-white/8 px-8 md:px-16 py-14 md:py-20 text-center"
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gold" />

            {/* Avatar */}
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20">
              <span className="text-charcoal font-black text-sm tracking-wider">{t.initials}</span>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-base">★</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-white/75 text-lg md:text-xl lg:text-2xl leading-relaxed font-light italic mb-10 max-w-2xl mx-auto">
              "{t.text}"
            </blockquote>

            {/* Divider */}
            <div className="w-8 h-px bg-gold/50 mx-auto mb-6" />

            {/* Attribution */}
            <p className="text-white font-bold text-base tracking-wide">{t.name}</p>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mt-1">{t.role}</p>

            {/* Bottom gold line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gold" />
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`transition-all duration-300 h-px ${
                i === active ? 'w-10 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Client count social proof */}
        <p className="text-center text-white/25 text-xs tracking-[0.25em] uppercase mt-10">
          Trusted by 5,000+ satisfied clients
        </p>
      </div>
    </section>
  )
}
