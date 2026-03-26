import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import t1 from '../assets/t1.jpeg'
import t2 from '../assets/t2.jpeg'
import t3 from '../assets/t3.jpeg'
import t4 from '../assets/t4.jpeg'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Wael Issa',
    role: 'Founder & Head Barber',
    specialty: 'Classic Cuts',
    img: t1,
    pos: 'object-top',
    exp: '12 yrs',
  },
  {
    name: 'Abdullah ayoub',
    role: 'Senior Barber',
    specialty: 'Fades & Designs',
    img: t2,
    pos: 'object-top',
    exp: '8 yrs',
  },
  {
    name: 'Arab abufarhah',
    role: 'Style Specialist',
    specialty: 'Modern Styles',
    img: t3,
    pos: 'object-center',
    exp: '6 yrs',
  },
  {
    name: 'Karam elbouakhri',
    role: 'Master Barber',
    specialty: 'Beard Shaping',
    img: t4,
    pos: 'object-center',
    exp: '9 yrs',
  },
]

export default function Team() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])

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

      gsap.fromTo(
        cardsRef.current,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="team" ref={sectionRef} className="bg-dark py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div ref={headRef} className="mb-16 md:mb-20">
          <p className="reveal text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            The Craftsmen
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="reveal text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
              Meet The <span className="text-gold">Team</span>
            </h2>
            <p className="reveal text-white/40 text-sm md:text-base max-w-xs md:text-right leading-relaxed">
              Master barbers dedicated to the art of precision grooming.
            </p>
          </div>

          <div className="reveal mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/6" />
            <div className="w-2 h-2 bg-gold rotate-45 shrink-0" />
            <div className="h-px w-16 bg-gold shrink-0" />
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden cursor-pointer"
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card">
                <img
                  src={member.img}
                  alt={member.name}
                  className={`
                    w-full h-full object-cover ${member.pos}
                    grayscale group-hover:grayscale-0
                    scale-[1.04] group-hover:scale-110
                    transition-all duration-700 ease-out
                  `}
                />

                {/* Bottom gradient — hides low-quality image edges + text bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                {/* Subtle dark vignette that lifts on hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-gold text-charcoal text-[10px] font-black px-2.5 py-1 tracking-[0.15em] uppercase">
                  {member.exp}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40 group-hover:border-gold transition-colors duration-400" />
              </div>

              {/* Member info — fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-gold/60 text-[10px] tracking-[0.35em] uppercase font-semibold mb-1.5 translate-y-1 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                  {member.specialty}
                </p>
                <h3 className="text-white font-black text-lg md:text-xl leading-tight tracking-tight">
                  {member.name}
                </h3>
                <p className="text-white/45 text-[11px] tracking-[0.18em] uppercase mt-1">
                  {member.role}
                </p>

                {/* Animated gold underline */}
                <div className="mt-4 h-px bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>

              {/* Border frame */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-gold/25 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div className="mt-16 flex items-center justify-center gap-6">
          <div className="h-px flex-1 max-w-xs bg-white/6" />
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase text-center">
            Every cut, a masterpiece
          </p>
          <div className="h-px flex-1 max-w-xs bg-white/6" />
        </div>

      </div>
    </section>
  )
}
