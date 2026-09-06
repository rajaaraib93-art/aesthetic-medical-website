'use client'

import Link from 'next/link'
import { useState } from 'react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="announcement">Medical aesthetics, education & regenerative care · Book a consultation</div>
      <header className="header">
        <div className="container navbar">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">A</span>
            <span>AESTHERA <span style={{fontWeight:500}}>MEDICAL</span></span>
          </Link>
          <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/#courses" onClick={() => setOpen(false)}>Training</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/#faculty" onClick={() => setOpen(false)}>Faculty</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
          <div className="desktop-only"><Link href="/contact" className="btn btn-primary">Book a consultation</Link></div>
          <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? '×' : '☰'}</button>
        </div>
      </header>
    </>
  )
}
