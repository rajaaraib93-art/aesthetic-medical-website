'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Step = { label: string; title: string; text: string; points: string[]; image?: string }
type Props = { eyebrow: string; heading: string; steps: Step[] }

/**
 * Scroll-driven story. On desktop the stage is pinned and each step cross-fades
 * as the visitor scrolls, with a progress bar. On mobile / reduced motion it is
 * a plain stacked list.
 */
export function JourneyStory({ eyebrow, heading, steps }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = root.querySelector<HTMLElement>('.journey-stage')
        const bar = root.querySelector<HTMLElement>('.journey-progress-bar')
        const items = gsap.utils.toArray<HTMLElement>('.journey-step', root)
        const panes = gsap.utils.toArray<HTMLElement>('.journey-pane', root)
        const n = items.length
        if (!stage || n < 2) return

        stage.classList.add('is-pinned')
        gsap.set([...items.slice(1), ...panes.slice(1)], { autoAlpha: 0, y: 40 })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: stage,
            start: 'center center',
            end: () => '+=' + window.innerHeight * (n - 1) * 0.9,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        if (bar) tl.fromTo(bar, { scaleX: 1 / n }, { scaleX: 1, ease: 'none', duration: n - 1 }, 0)
        for (let i = 1; i < n; i++) {
          tl.to([items[i - 1], panes[i - 1]], { autoAlpha: 0, y: -40, duration: 0.4 }, i - 0.7)
          tl.to([items[i], panes[i]], { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.4)
        }

        return () => stage.classList.remove('is-pinned')
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="section journey">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{eyebrow}</div>
            <h2>{heading}</h2>
          </div>
        </div>
        <div className="journey-stage">
          <div className="journey-progress" aria-hidden="true"><span className="journey-progress-bar" /></div>
          <div className="journey-copy">
            {steps.map((s, i) => (
              <article className="journey-step" key={s.label}>
                <div className="journey-num">Step {String(i + 1).padStart(2, '0')} · {s.label}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="journey-visual" aria-hidden="true">
            {steps.map((s, i) => (
              <div className="journey-pane" key={s.label} style={s.image ? { backgroundImage: `url(${s.image})` } : undefined}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <em>{s.label}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
