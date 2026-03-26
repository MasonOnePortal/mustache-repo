import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logoOne from '../assets/logoone.webp'

const navLinks = ['About', 'Services', 'Gallery', 'Testimonials']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center group">
          <img
            src={logoOne}
            alt="Mr. Mustache Barbershop"
            className="h-12 w-auto transition-all duration-300 group-hover:brightness-[1.15]"
            style={{ filter: 'invert(1) brightness(0.92)', willChange: 'filter' }}
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="relative text-white/60 hover:text-white transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#booking"
            className="hidden md:inline-block border border-gold text-gold text-xs tracking-[0.2em] uppercase font-bold px-7 py-2.5 hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Book Now
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
          >
            <span
              className={`block h-px bg-white origin-center transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-white origin-center transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-charcoal/98 backdrop-blur-md border-t border-white/10"
        >
          <ul className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={closeMenu}
                  className="block py-3 text-white/70 hover:text-gold text-sm tracking-[0.2em] uppercase font-medium border-b border-white/5 transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#booking"
                onClick={closeMenu}
                className="block text-center border border-gold text-gold px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
