'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { whatsappHref } from '@/lib/contactLinks'

type Props = {
  interests: string[]
  times: string[]
  clinicName: string
  whatsapp?: string | null
  phone?: string | null
}

const STEPS = ['Interest', 'Timing', 'Details', 'Send']

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -28 }),
}

/**
 * Four-step "start here" enquiry. No data is stored: the last step opens a
 * pre-filled WhatsApp message (or points to the contact page if no WhatsApp
 * number is set in Sanity).
 */
export function BookingWizard({ interests, times, clinicName, whatsapp, phone }: Props) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [picked, setPicked] = useState<string[]>([])
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const message =
    `Hello ${clinicName}, I would like to book a consultation.\n` +
    `Interested in: ${picked.join(', ') || 'not sure yet'}\n` +
    `Preferred time: ${time || 'flexible'}\n` +
    `Name: ${name}\nPhone: ${contact}`
  const wa = whatsappHref(whatsapp || phone, message)

  const canContinue =
    step === 0 ? picked.length > 0 : step === 1 ? time !== '' : step === 2 ? name.trim().length > 1 && contact.replace(/\D/g, '').length >= 7 : true

  const go = (delta: number) => {
    setDir(delta)
    setStep((s) => Math.min(STEPS.length - 1, Math.max(0, s + delta)))
  }

  const toggle = (v: string) => setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))

  return (
    <MotionConfig reducedMotion="user">
      <div className="wizard-card">
        <div className="wizard-top">
          <strong>Book your consultation</strong>
          <span className="muted">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
        </div>
        <div className="wizard-bar" aria-hidden="true">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        <div className="wizard-body">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.26 }}>
              {step === 0 && (
                <div>
                  <p className="wizard-q">What would you like help with?</p>
                  <div className="chip-row">
                    {interests.map((i) => (
                      <button key={i} type="button" className={`chip${picked.includes(i) ? ' active' : ''}`} onClick={() => toggle(i)} aria-pressed={picked.includes(i)}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <p className="wizard-q">When suits you best?</p>
                  <div className="chip-row">
                    {times.map((t) => (
                      <button key={t} type="button" className={`chip${time === t ? ' active' : ''}`} onClick={() => setTime(t)} aria-pressed={time === t}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="form">
                  <div className="field">
                    <label htmlFor="wz-name">Your name</label>
                    <input id="wz-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="wz-phone">Phone / WhatsApp number</label>
                    <input id="wz-phone" value={contact} onChange={(e) => setContact(e.target.value)} inputMode="tel" autoComplete="tel" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <p className="wizard-q">Ready to send</p>
                  <ul className="wizard-summary">
                    <li><span>Interest</span>{picked.join(', ')}</li>
                    <li><span>Timing</span>{time}</li>
                    <li><span>Name</span>{name}</li>
                    <li><span>Phone</span>{contact}</li>
                  </ul>
                  {wa ? (
                    <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
                  ) : (
                    <Link className="btn btn-primary" href="/contact">Continue to contact form</Link>
                  )}
                  <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Nothing is stored on this site. You will confirm details with the clinic directly.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="wizard-actions">
          <button type="button" className="btn btn-ghost" onClick={() => go(-1)} disabled={step === 0}>Back</button>
          {step < STEPS.length - 1 && (
            <button type="button" className="btn btn-primary" onClick={() => go(1)} disabled={!canContinue}>Continue</button>
          )}
        </div>
      </div>
    </MotionConfig>
  )
}
