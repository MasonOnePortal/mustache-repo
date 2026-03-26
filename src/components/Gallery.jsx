import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import img1 from '../assets/img1.jpeg'
import img2 from '../assets/img2.jpeg'
import img3 from '../assets/img3.jpeg'
import img4 from '../assets/img4.jpeg'
import img5 from '../assets/img5.jpeg'
import img6 from '../assets/img6.jpeg'
import img7 from '../assets/img7.jpeg'
import img8 from '../assets/img8.jpeg'
import img9 from '../assets/img9.jpeg'
import img10 from '../assets/img10.jpeg'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: img1, alt: 'Mustache Barbershop entrance', size: 'tall' },
  { src: img2, alt: 'Precision fade haircut', size: 'normal' },
  { src: img3, alt: 'Dark fade — back view', size: 'normal' },
  { src: img4, alt: 'Classic fade — back view', size: 'normal' },
  { src: img5, alt: 'Beard sculpting service', size: 'tall' },
  { src: img6, alt: 'Side profile cut', size: 'normal' },
  { src: img7, alt: 'High fade style', size: 'normal' },
  { src: img8, alt: 'Barbershop atmosphere', size: 'normal' },
  { src: img9, alt: 'In-chair experience', size: 'normal' },
  { src: img10, alt: 'Profile precision cut', size: 'normal' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

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
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    if (lightbox) {
      window.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, lightboxIndex])

  const openLightbox = (src, index) => {
    setLightbox(src)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightbox(null)
    setLightboxIndex(null)
  }

  const navigate = (dir) => {
    const next = (lightboxIndex + dir + images.length) % images.length
    setLightbox(images[next].src)
    setLightboxIndex(next)
  }

  return (
    <section id="gallery" ref={sectionRef} className="bg-dark py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <p className="reveal text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Our Work
          </p>
          <h2 className="reveal text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The <span className="text-gold">Gallery</span>
          </h2>
          <p className="reveal text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
            Every cut is a masterpiece. Browse our portfolio of precision grooming and style.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
          style={{ gridAutoRows: '180px' }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(img.src, i)}
              className={`relative overflow-hidden group cursor-pointer ${
                img.size === 'tall' ? 'row-span-2' : ''
              } ${i === 0 ? 'col-span-1 md:col-span-2 row-span-2' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col items-center gap-2">
                  <div className="w-8 h-px bg-gold" />
                  <span className="text-white text-[10px] tracking-[0.3em] uppercase font-bold">
                    View
                  </span>
                  <div className="w-8 h-px bg-gold" />
                </div>
              </div>
              {/* Index label */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/60 text-[10px] tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/96 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Image */}
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-[90vw] max-h-[88vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
            aria-label="Previous"
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
            aria-label="Next"
          >
            →
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em] uppercase">
            {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </section>
  )
}
