import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const glowSoftRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on devices with a real mouse
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    const glowSoft = glowSoftRef.current

    const onMove = (e) => {
      const mx = e.clientX
      const my = e.clientY

      if (!visible) setVisible(true)

      // Dot — instant
      gsap.to(dot, { x: mx, y: my, duration: 0.05, ease: 'none' })

      // Ring — smooth lag
      gsap.to(ring, { x: mx, y: my, duration: 0.4, ease: 'power2.out' })

      // Primary background glow — slow, dreamy
      gsap.to(glow, { x: mx, y: my, duration: 1.1, ease: 'power2.out' })

      // Soft secondary glow — even slower
      gsap.to(glowSoft, { x: mx, y: my, duration: 2.2, ease: 'power1.out' })
    }

    // Hover state on interactive elements
    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderColor: 'rgba(201,168,76,0.8)',
        backgroundColor: 'rgba(201,168,76,0.04)',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(255,255,255,0.35)',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    // Cursor leave/enter window
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    // Attach to all interactive elements
    const attachHovers = () => {
      const els = document.querySelectorAll('a, button, [data-cursor]')
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      return els
    }

    const interactiveEls = attachHovers()

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      {/* ── Background radial glow ── */}
      {/* Follows mouse slowly — creates a ambient spotlight on the dark background */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[1]"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle at center, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 35%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* ── Secondary larger, softer glow ── */}
      <div
        ref={glowSoftRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[1]"
        style={{
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.016) 0%, transparent 60%)',
          willChange: 'transform',
        }}
      />

      {/* ── Cursor ring ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.35)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* ── Cursor dot ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#c9a84c',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          boxShadow: '0 0 8px rgba(201,168,76,0.8)',
        }}
      />

      {/* ── Hide default cursor on desktop ── */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
