'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/**
 * Wraps the homepage hero <section>. Animates (only when the visitor has not
 * asked for reduced motion):
 *  - headline: masked line-by-line reveal
 *  - kicker / paragraph / buttons / rating: staggered fade-up
 *  - hero image: masked reveal on load, then slow zoom + subtle parallax on scroll
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const h1 = root.querySelector('h1')
        const art = root.querySelector('.hero-art')
        const img = root.querySelector('.hero-art img')

        gsap.from('.hero-copy .kicker', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })

        if (h1) {
          SplitText.create(h1, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.12,
                delay: 0.1,
                ease: 'power4.out',
              }),
          })
        }

        gsap.from('.hero-copy p, .hero-actions, .rating-badge', {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.55,
          ease: 'power3.out',
        })

        if (art) {
          gsap.fromTo(
            art,
            { clipPath: 'inset(10% 10% 10% 10% round 32px)', opacity: 0.4 },
            { clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1, duration: 1.4, ease: 'power4.out' }
          )
        }

        if (img && art) {
          gsap.fromTo(
            img,
            { scale: 1, yPercent: 0 },
            {
              scale: 1.08,
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
            }
          )
        }
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  )
}
