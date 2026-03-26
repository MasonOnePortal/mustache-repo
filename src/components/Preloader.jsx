import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoOne from '../assets/logoone.webp'

export default function Preloader({ onComplete }) {
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const countRef = useRef(null)
  const taglineRef = useRef(null)
  const seamRef = useRef(null)

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete?.()
      },
    })

    // ── Phase 1: Content enters ──────────────────────────────
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 24, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
      0.25
    )
    .fromTo(
      taglineRef.current,
      { opacity: 0, letterSpacing: '0.3em' },
      { opacity: 1, letterSpacing: '0.5em', duration: 0.7, ease: 'power3.out' },
      0.6
    )

    // ── Phase 2: Gold progress line fills ───────────────────
    const prog = { val: 0 }
    tl.to(
      prog,
      {
        val: 100,
        duration: 2,
        ease: 'power1.inOut',
        onUpdate: () => {
          const v = Math.round(prog.val)
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleX(${v / 100})`
          }
          if (countRef.current) {
            countRef.current.textContent = String(v).padStart(2, '0') + '%'
          }
        },
      },
      0.55
    )

    // ── Phase 3: Content fades out ───────────────────────────
    tl.to(
      [logoRef.current, taglineRef.current],
      { opacity: 0, y: -16, duration: 0.4, ease: 'power2.in', stagger: 0.05 },
      '+=0.18'
    )
    .to(countRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '<')

    // ── Phase 4: Seam line flash ─────────────────────────────
    .to(seamRef.current, {
      opacity: 1,
      duration: 0.15,
      ease: 'none',
    })

    // ── Phase 5: Curtains split open ────────────────────────
    .to(
      topRef.current,
      { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
      '-=0.05'
    )
    .to(
      bottomRef.current,
      { yPercent: 100, duration: 0.9, ease: 'power4.inOut' },
      '<'
    )
    .to(seamRef.current, { opacity: 0, duration: 0.2 }, '<+=0.4')

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      {/* ── Top curtain ── */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 right-0"
        style={{ height: '50.5%', backgroundColor: '#0a0a0a' }}
      />

      {/* ── Bottom curtain ── */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '50.5%', backgroundColor: '#0a0a0a' }}
      />

      {/* ── Gold seam line (center split) ── */}
      <div
        ref={seamRef}
        className="absolute left-0 right-0 opacity-0"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #c9a84c 20%, #e8c96a 50%, #c9a84c 80%, transparent)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* ── Center content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 z-10">
        {/* Logo */}
        <div ref={logoRef} style={{ opacity: 0 }}>
          <img
            src={logoOne}
            alt="Mr. Mustache Barbershop"
            className="w-auto"
            style={{
              height: 'clamp(72px, 10vw, 110px)',
              filter: 'invert(1) brightness(0.92)',
            }}
          />
        </div>

        {/* Progress bar + counter */}
        <div className="flex flex-col items-center gap-4" style={{ width: '220px' }}>
          {/* Track */}
          <div className="relative w-full" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
            {/* Fill */}
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #c9a84c, #e8c96a)',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />
            {/* Glow dot at leading edge */}
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                right: 0,
                width: '4px',
                height: '5px',
                borderRadius: '50%',
                background: '#e8c96a',
                boxShadow: '0 0 8px 2px rgba(201,168,76,0.7)',
              }}
            />
          </div>

          {/* Counter */}
          <p
            ref={countRef}
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '11px',
              letterSpacing: '0.4em',
              fontFamily: 'monospace',
              fontWeight: 300,
            }}
          >
            00%
          </p>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            opacity: 0,
            color: 'rgba(255,255,255,0.18)',
            fontSize: '10px',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Precision · Style · Confidence
        </p>
      </div>
    </div>
  )
}
