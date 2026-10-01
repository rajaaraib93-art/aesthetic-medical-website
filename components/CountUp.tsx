'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Counts a number up when it scrolls into view. Values with no digits
 * (e.g. the "[X]+" placeholders) are shown exactly as given and never animated.
 * Examples: "5,000+" -> counts 0 to 5,000 then "+"; "98%" -> 0 to 98 then "%".
 */
export function CountUp({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const text = String(value)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const match = text.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/)
      if (!match) return
      const [, prefix, num, suffix] = match
      const target = parseFloat(num.replace(/,/g, ''))
      if (!Number.isFinite(target)) return

      const decimals = num.includes('.') ? num.split('.')[1].length : 0
      const useCommas = num.includes(',')
      const format = (n: number) =>
        useCommas
          ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
          : n.toFixed(decimals)

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { v: 0 }
        el.textContent = prefix + format(0) + suffix
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent = prefix + format(counter.v) + suffix
          },
        })
        return () => {
          el.textContent = text
        }
      })
    },
    { scope: ref, dependencies: [text] }
  )

  return <span ref={ref}>{text}</span>
}
