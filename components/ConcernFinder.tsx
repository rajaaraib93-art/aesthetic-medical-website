'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { urlFor } from '@/sanity/lib/image'
import './concern-finder.css'

gsap.registerPlugin(Flip)

type Service = {
  _id?: string
  title: string
  slug: { current: string } | string
  short: string
  category?: string
  image?: any
}

const VISIBLE_CHIPS = 7
/** Cards shown before the "Show all" button appears (2 rows of 4 on desktop). */
const INITIAL_CARDS = 8

export function ConcernFinder({ services }: { services: Service[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    services.forEach((s) => s.category && set.add(s.category))
    return ['All', ...Array.from(set)]
  }, [services])

  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [showAllChips, setShowAllChips] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const pending = useRef<ReturnType<typeof Flip.getState> | null>(null)

  const q = query.trim().toLowerCase()
  const filtered = services.filter(
    (s) =>
      (active === 'All' || s.category === active) &&
      (!q || `${s.title} ${s.short ?? ''} ${s.category ?? ''}`.toLowerCase().includes(q))
  )

  // While searching, show every match; otherwise cap the list until "Show all" is pressed.
  const visible = expanded || q ? filtered : filtered.slice(0, INITIAL_CARDS)
  const hiddenCount = filtered.length - visible.length

  const chips = showAllChips || categories.length <= VISIBLE_CHIPS + 1 ? categories : categories.slice(0, VISIBLE_CHIPS)

  /** Records card positions before a change so Flip can animate to the new layout. */
  const withFlip = (change: () => void) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && gridRef.current) {
      pending.current = Flip.getState(gridRef.current.querySelectorAll('.concern-card'))
    }
    change()
  }

  useLayoutEffect(() => {
    const state = pending.current
    if (!state) return
    pending.current = null
    const targets = gridRef.current ? Array.from(gridRef.current.querySelectorAll<HTMLElement>('.concern-card')) : []
    if (!targets.length) return
    Flip.from(state, {
      targets,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.04,
      onEnter: (els: Element[]) =>
        gsap.fromTo(els, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1 }),
    })
  }, [active, q, expanded])

  return (
    <div>
      <div className="cf-toolbar">
        <div className="concern-tags" role="tablist" aria-label="Treatment categories">
          {chips.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              className={`concern-tag ${active === cat ? 'active' : ''}`}
              onClick={() =>
                withFlip(() => {
                  setActive(cat)
                  setExpanded(false)
                })
              }
              type="button"
            >
              {cat}
            </button>
          ))}
          {chips.length < categories.length && (
            <button type="button" className="concern-tag" onClick={() => setShowAllChips(true)}>More +</button>
          )}
        </div>
        <label className="cf-search">
          <span className="sr-only">Search treatments</span>
          <input
            type="search"
            value={query}
            onChange={(e) => withFlip(() => setQuery(e.target.value))}
            placeholder="Search treatments"
          />
        </label>
      </div>

      <div className="cf-meta">
        <span className="muted">{filtered.length} {filtered.length === 1 ? 'treatment' : 'treatments'}</span>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No treatments match your search. Try a different word or category.</p>
      ) : (
        <div ref={gridRef} className="cf-grid">
          {visible.map((s, i) => {
            const slug = typeof s.slug === 'string' ? s.slug : s.slug?.current
            return (
              <Link key={s._id ?? slug} href={`/services/${slug}`} data-flip-id={slug} className="concern-card">
                {s.image?.asset?.url ? (
                  <div className="concern-media">
                    <Image src={urlFor(s.image).width(640).height(480).fit('crop').url()} alt={s.image.alt || s.title} width={640} height={480} />
                  </div>
                ) : (
                  <div className="concern-media concern-media-fallback">{String(i + 1).padStart(2, '0')}</div>
                )}
                <div className="concern-body">
                  <div className="badge">{s.category}</div>
                  <h4>{s.title}</h4>
                  <p>{s.short}</p>
                  <span className="concern-cta">View treatment →</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {hiddenCount > 0 && (
        <div className="cf-more">
          <button type="button" className="btn btn-ghost" onClick={() => withFlip(() => setExpanded(true))}>
            Show all {filtered.length} treatments
          </button>
        </div>
      )}
    </div>
  )
}
