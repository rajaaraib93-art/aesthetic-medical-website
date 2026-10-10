'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MagneticLink } from '@/components/MagneticLink'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = { lines: string[]; button: string; location: string; whatsappUrl?: string | null }

/** Full-width closing call to action with scale/opacity on scroll and a parallax backdrop. */
export function BigCta({ lines, button, location, whatsappUrl }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.bigcta-inner', { scale: 0.92, opacity: 0.3 }, {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 90%', end: 'top 45%', scrub: true },
        })
        gsap.fromTo('.bigcta-bg', { yPercent: -8 }, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="bigcta">
      <div className="bigcta-bg" aria-hidden="true" />
      <div className="container bigcta-inner">
        <h2>
          {lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <MagneticLink href="/contact" className="btn btn-light">{button}</MagneticLink>
          {whatsappUrl && (
            <a className="btn btn-ghost-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          )}
        </div>
        <p>{location}</p>
      </div>
    </section>
  )
}
