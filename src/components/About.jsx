import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img8 from '../assets/img8.jpeg'
import img5 from '../assets/img5.jpeg'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Years Experience', value: 10 },
  { label: 'Happy Clients', value: 5000 },
  { label: 'Master Barbers', value: 8 },
  { label: 'Awards Won', value: 12 },
]

export default function About() {
  const sectionRef = useRef(null)
  const imgWrapRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imgWrapRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      )

      // Content reveal - staggered children
      const items = contentRef.current.querySelectorAll('.reveal')
      gsap.fromTo(
        items,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      )

      // Stats counters
      const statEls = statsRef.current.querySelectorAll('.stat-number')
      statEls.forEach((el, i) => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent =
              stats[i].value >= 1000
                ? Math.round(obj.val / 100) * 100 + '+'
                : Math.round(obj.val) + '+'
          },
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%', once: true },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="bg-dark py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image stack */}
          <div ref={imgWrapRef} className="relative">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={img8}
                alt="Barbershop craftsmanship"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-[1.02] hover:scale-100"
              />
              {/* Gold border overlay */}
              <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
            </div>

            {/* Floating accent image */}
            <div className="absolute -bottom-8 -right-8 w-44 h-52 border-2 border-charcoal overflow-hidden hidden md:block shadow-2xl">
              <img
                src={img5}
                alt="Barber detail"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Decorative box */}
            <div className="absolute -top-5 -left-5 w-20 h-20 border border-gold/25 -z-10" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 border border-gold/10 -z-10" />

            {/* Badge */}
            <div className="absolute top-6 left-6 bg-gold text-charcoal px-4 py-2">
              <p className="text-xs font-black tracking-[0.2em] uppercase">Since 2015</p>
            </div>
          </div>

          {/* Text content */}
          <div ref={contentRef} className="space-y-6">
            <p className="reveal text-gold text-xs tracking-[0.4em] uppercase font-semibold">
              Our Story
            </p>

            <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight">
              More Than<br />
              a <span className="text-gold">Haircut.</span>
            </h2>

            <p className="reveal text-white/65 text-lg leading-relaxed">
              Our customers' experiences take center stage. At Mustache Barbershop,
              we believe grooming is an art form — a ritual that connects craft,
              culture, and confidence.
            </p>

            <p className="reveal text-white/45 leading-relaxed">
              Founded with a passion for precision and a dedication to quality,
              we've built a sanctuary where every client is treated like royalty.
              From classic fades to modern styles, our master barbers bring
              decades of experience to every cut.
            </p>

            <div className="reveal flex items-center gap-4">
              <div className="h-px w-12 bg-gold" />
              <p className="text-white/40 italic text-sm tracking-wide">
                "The details are not the details. They make the design."
              </p>
            </div>

            <div className="reveal pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-3 border border-gold text-gold text-xs tracking-[0.2em] uppercase font-bold px-8 py-3 hover:bg-gold hover:text-charcoal transition-all duration-300 group"
              >
                Explore Services
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28 pt-16 border-t border-white/8"
        >
          {stats.map(({ label }) => (
            <div key={label} className="text-center group">
              <p
                className="stat-number text-4xl md:text-5xl font-black text-gold mb-2 tabular-nums group-hover:scale-110 transition-transform duration-300 inline-block"
              >
                0+
              </p>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
