'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { telHref } from '@/lib/contactLinks'
import type { NavService } from '@/lib/services'

type Group = { category: string; items: NavService[] }
type Props = { siteName?: string; phone?: string | null; groups?: Group[] }

export function SiteHeader({ siteName = 'IARM', phone, groups = [] }: Props) {
  const [drawer, setDrawer] = useState(false)
  const [mega, setMega] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastY = useRef(0)
  const [first, ...rest] = siteName.split(' ')
  const tel = telHref(phone)

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > lastY.current && y > 220)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile drawer is open; Esc closes menus.
  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawer(false)
        setMega(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [drawer])

  const openMega = () => {
    if (timer.current) clearTimeout(timer.current)
    setMega(true)
  }
  const closeMega = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMega(false), 140)
  }
  const closeAll = () => {
    setDrawer(false)
    setMega(false)
  }

  const megaGroups = groups.slice(0, 5)

  return (
    <MotionConfig reducedMotion="user">
      <div className="announcement">
        <Link href="/contact">Medical aesthetics &amp; regenerative care · Book a consultation</Link>
      </div>
      <header className={`header${hidden && !mega && !drawer ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container navbar">
          <Link href="/" className="brand" onClick={closeAll}>
            <span className="brand-mark">{first.charAt(0)}</span>
            <span>{first} <span style={{ fontWeight: 500 }}>{rest.join(' ')}</span></span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {groups.length > 0 ? (
              <div
                className="nav-item"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false)
                }}
              >
                <button type="button" className="nav-trigger" aria-expanded={mega} aria-haspopup="true" onClick={() => setMega((v) => !v)}>
                  Treatments <i aria-hidden="true">▾</i>
                </button>
                <AnimatePresence>
                  {mega && (
                    <motion.div className="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
                      <div className="container mega-inner">
                        {megaGroups.map((g) => (
                          <div className="mega-col" key={g.category}>
                            <h5>{g.category}</h5>
                            {g.items.slice(0, 5).map((s) => (
                              <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeAll}>{s.title}</Link>
                            ))}
                          </div>
                        ))}
                        <div className="mega-promo">
                          <strong>Book a consultation</strong>
                          <p>A doctor-led plan, set out in writing, with no obligation to proceed.</p>
                          <Link href="/contact" className="btn btn-primary" onClick={closeAll}>Book now</Link>
                          <Link href="/services" className="mega-all" onClick={closeAll}>All treatments →</Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/services">Services</Link>
            )}
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="desktop-only header-actions">
            {tel && phone && <a href={tel} className="header-phone">Call {phone}</a>}
            <Link href="/contact" className="btn btn-primary">Book a consultation</Link>
          </div>
          <button className="mobile-toggle" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>☰</button>
        </div>
      </header>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside className="drawer" data-lenis-prevent initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }} aria-label="Menu">
              <div className="drawer-top">
                <strong>{siteName}</strong>
                <button type="button" className="mobile-toggle" style={{ display: 'inline-flex' }} aria-label="Close menu" onClick={() => setDrawer(false)}>×</button>
              </div>
              {groups.map((g) => (
                <div className="drawer-group" key={g.category}>
                  <button type="button" className="drawer-group-btn" aria-expanded={openGroup === g.category} onClick={() => setOpenGroup(openGroup === g.category ? null : g.category)}>
                    <span>{g.category}</span>
                    <span aria-hidden="true">{openGroup === g.category ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openGroup === g.category && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <div className="drawer-links">
                          {g.items.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeAll}>{s.title}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link className="drawer-main" href="/services" onClick={closeAll}>All services</Link>
              <Link className="drawer-main" href="/about" onClick={closeAll}>About</Link>
              <Link className="drawer-main" href="/contact" onClick={closeAll}>Contact</Link>
              <div className="drawer-foot">
                <Link href="/contact" className="btn btn-primary" onClick={closeAll}>Book a consultation</Link>
                {tel && phone && <a href={tel} className="btn btn-ghost">Call {phone}</a>}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
