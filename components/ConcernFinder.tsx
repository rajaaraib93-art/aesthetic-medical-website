'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import 'swiper/css'
import 'swiper/css/free-mode'
import { urlFor } from '@/sanity/lib/image'

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

export function ConcernFinder({ services }: { services: Service[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    services.forEach((s) => s.category && set.add(s.category))
    return ['All', ...Array.from(set)]
  }, [services])

  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [showAllChips, setShowAllChips] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const pending = useRef<ReturnType<typeof Flip.getState> | null>(null)

  const q = query.trim().toLowerCase()
  const filtered = services.filter(
    (s) =>
      (active === 'All' || s.category === active) &&
      (!q || `${s.title} ${s.short ?? ''} ${s.category ?? ''}`.toLowerCase().includes(q))
  )

  const chips = showAllChips || categories.length <= VISIBLE_CHIPS + 1 ? categories : categories.slice(0, VISIBLE_CHIPS)

  /** Records card positions before a filter change so Flip can animate to the new layout. */
  const withFlip = (change: () => void) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && railRef.current) {
      pending.current = Flip.getState(railRef.current.querySelectorAll('.concern-card'))
    }
    change()
  }

  useLayoutEffect(() => {
    const state = pending.current
    if (!state) return
    pending.current = null
    const swiper = swiperRef.current
    if (swiper && !swiper.destroyed) {
      swiper.update()
      swiper.slideTo(0, 0)
    }
    const targets = railRef.current ? Array.from(railRef.current.querySelectorAll<HTMLElement>('.concern-card')) : []
    if (!targets.length) return
    Flip.from(state, {
      targets,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.04,
      onEnter: (els: Element[]) =>
        gsap.fromTo(els, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1 }),
    })
  }, [active, q])

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
              onClick={() => withFlip(() => setActive(cat))}
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
        <span className="cf-arrows">
          <button type="button" aria-label="Previous" onClick={() => swiperRef.current?.slidePrev()}>←</button>
          <button type="button" aria-label="Next" onClick={() => swiperRef.current?.slideNext()}>→</button>
        </span>
      </div>

      <div ref={railRef}>
        {filtered.length === 0 ? (
          <p className="muted">No treatments match your search. Try a different word or category.</p>
        ) : (
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={18}
            freeMode
            grabCursor
            onSwiper={(s) => {
              swiperRef.current = s
            }}
            className="cf-swiper"
          >
            {filtered.map((s, i) => {
              const slug = typeof s.slug === 'string' ? s.slug : s.slug?.current
              return (
                <SwiperSlide key={s._id ?? slug} className="cf-slide">
                  <Link href={`/services/${slug}`} data-flip-id={slug} className="concern-card">
                    {s.image?.asset?.url ? (
                      <div className="concern-media">
                        <Image src={urlFor(s.image).width(320).height(220).fit('crop').url()} alt={s.image.alt || s.title} width={320} height={220} />
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
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}
