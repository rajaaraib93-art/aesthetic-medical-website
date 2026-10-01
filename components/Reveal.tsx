'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds to wait before the reveal starts */
  delay?: number
  /** Start offset in px (element rises into place) */
  y?: number
  /** Animate the direct children one after another instead of the wrapper */
  stagger?: boolean
}

/**
 * Fades + lifts its content in once when it scrolls into view.
 * Renders a plain <div>, so pass the layout classes you need via className.
 */
export function Reveal({ children, className, delay = 0, y = 32, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? Array.from(el.children) : el
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
