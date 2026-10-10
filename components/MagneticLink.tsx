'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type Props = { href: string; className?: string; children: ReactNode; strength?: number }

/** A next/link button that gently follows the cursor (desktop only, off for reduced motion). */
export function MagneticLink({ href, className, children, strength = 0.25 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * strength)
          yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
        return () => {
          el.removeEventListener('mousemove', move)
          el.removeEventListener('mouseleave', leave)
        }
      })
    },
    { scope: ref }
  )

  return (
    <Link ref={ref} href={href} className={`${className ?? ''} magnetic`}>
      {children}
    </Link>
  )
}
