import logoTwo from '../assets/logotwo.webp'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Book Now', href: '#booking' },
]

const socials = [
  {
    label: 'Instagram',
    abbr: 'IG',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    abbr: 'FB',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    abbr: 'TW',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    abbr: 'YT',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-[#0d0d0d]" style={{ position: 'relative', zIndex: 10 }}>
      {/* Gold separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand col */}
          <div className="md:col-span-5 space-y-6">
            <a href="#home" className="inline-block group">
              <img
                src={logoTwo}
                alt="Mr. Mustache Barbershop"
                className="h-24 w-auto transition-all duration-300 group-hover:brightness-110 opacity-85 group-hover:opacity-100"
                style={{ filter: 'invert(1) brightness(0.88)' }}
              />
            </a>

            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Premium barbershop experience where precision meets style. Crafting
              confident looks since 2015.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.abbr}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/35 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-white text-xs font-bold tracking-[0.25em] uppercase">Navigation</p>
            <ul className="space-y-3">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/35 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div className="md:col-span-4 space-y-5">
            <p className="text-white text-xs font-bold tracking-[0.25em] uppercase">Contact & Hours</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/35 hover:text-white/60 transition-colors duration-300">
                <span className="text-gold mt-0.5">📍</span>
                <span>123 Style Avenue, Downtown District</span>
              </li>
              <li className="flex items-start gap-3 text-white/35 hover:text-white/60 transition-colors duration-300">
                <span className="text-gold mt-0.5">📞</span>
                <a href="tel:+1234567890" className="hover:text-gold transition-colors duration-300">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/35 hover:text-white/60 transition-colors duration-300">
                <span className="text-gold mt-0.5">✉️</span>
                <a href="mailto:hello@mustache.com" className="hover:text-gold transition-colors duration-300">
                  hello@mustache.com
                </a>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/8 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/25 tracking-wide">Mon – Saturday</span>
                <span className="text-gold font-semibold">9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/25 tracking-wide">Sunday</span>
                <span className="text-gold font-semibold">10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs tracking-wide">
            © {new Date().getFullYear()} Mustache Barbershop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/15 hover:text-white/40 text-xs tracking-wide transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="text-white/10">·</span>
            <a href="#" className="text-white/15 hover:text-white/40 text-xs tracking-wide transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
