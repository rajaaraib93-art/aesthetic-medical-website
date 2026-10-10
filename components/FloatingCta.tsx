'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { whatsappHref } from '@/lib/contactLinks'

type Props = { whatsapp?: string | null; phone?: string | null; siteName: string }

/** Sticky "Book" pill and WhatsApp button that appear once the visitor scrolls past the hero. */
export function FloatingCta({ whatsapp, phone, siteName }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const wa = whatsappHref(whatsapp || phone, `Hello ${siteName}, I would like to book a consultation.`)

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {show && (
          <motion.div
            className="float-cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/contact" className="btn btn-primary">Book a consultation</Link>
            {wa && (
              <a href={wa} className="float-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4.1-4.7-4.3-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z"/></svg>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
