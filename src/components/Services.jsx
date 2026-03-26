import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path d="M7 12h10M12 7v10" />
      </svg>
    ),
    name: 'Classic Haircut',
    price: '$35',
    duration: '45 min',
    description:
      'Precision cut tailored to your face shape and personal style. Includes wash, cut, and finish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M4 20L10 14M4 4l6 6M14 4l6 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Signature Fade',
    price: '$45',
    duration: '60 min',
    description:
      'Seamless skin-to-mid fade crafted with surgical precision. Our most requested signature service.',
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2a5 5 0 0 1 5 5c0 3-5 13-5 13S7 10 7 7a5 5 0 0 1 5-5z" strokeLinecap="round" />
      </svg>
    ),
    name: 'Beard Sculpt',
    price: '$30',
    duration: '30 min',
    description:
      'Shape, define, and refine your beard to perfection. Includes hot towel prep and premium balm.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    ),
    name: 'Royal Hot Shave',
    price: '$55',
    duration: '45 min',
    description:
      'Traditional straight razor hot towel shave. Steam, lather, precision — the ultimate grooming ritual.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
    name: 'Full Grooming',
    price: '$75',
    duration: '90 min',
    description:
      'Complete experience — haircut, signature fade, beard sculpt, and full hot towel treatment.',
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" />
      </svg>
    ),
    name: "Kid's Cut",
    price: '$25',
    duration: '30 min',
    description:
      'Gentle, patient styling for our youngest clients. Age 12 and under. Fun, fast, and flawless.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

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
        gridRef.current.children,
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="bg-charcoal py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <p className="reveal text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            What We Offer
          </p>
          <h2 className="reveal text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="reveal text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
            From classic cuts to premium grooming rituals, every service is crafted with
            relentless precision and care.
          </p>
        </div>

        {/* Grid — numbered editorial cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service, i) => (
            <div
              key={service.name}
              className={`group relative overflow-hidden cursor-default transition-all duration-500 bg-dark hover:bg-[#161616] ${
                service.featured ? 'ring-1 ring-inset ring-gold/20' : ''
              }`}
            >
              {service.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
              )}

              {/* Large background number */}
              <span
                className="absolute bottom-4 right-5 font-black leading-none select-none pointer-events-none transition-colors duration-500"
                style={{
                  fontSize: '7rem',
                  color: service.featured ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-8 md:p-9 flex flex-col h-full min-h-[260px]">
                {/* Index + price row */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-white/20 text-[10px] tracking-[0.4em] font-semibold uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gold font-black text-xl leading-none">{service.price}</span>
                    <span className="text-white/20 text-[10px] tracking-widest uppercase">{service.duration}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className={`mb-4 transition-colors duration-300 ${service.featured ? 'text-gold' : 'text-white/35 group-hover:text-gold/70'}`}>
                  {service.icon}
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-xl mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                  {service.name}
                  {service.featured && (
                    <span className="ml-2 align-middle text-[9px] bg-gold text-charcoal px-2 py-0.5 font-black tracking-[0.15em] uppercase">
                      Popular
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed flex-1">{service.description}</p>

                {/* Bottom CTA */}
                <div className="mt-7 pt-5 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.2em] uppercase font-bold group-hover:gap-3 transition-all duration-300"
                  >
                    Book →
                  </a>
                  <span className="text-white/15 text-[10px] tracking-widest uppercase">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#booking"
            className="inline-flex items-center gap-3 border border-gold/40 text-white/60 hover:border-gold hover:text-gold text-xs tracking-[0.2em] uppercase font-bold px-10 py-4 transition-all duration-300 group"
          >
            Book Any Service
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
