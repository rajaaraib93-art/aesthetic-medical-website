'use client'

import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

type Faq = { _id?: string; question: string; answer: string }

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <MotionConfig reducedMotion="user">
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i
          const id = `faq-panel-${i}`
          return (
            <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={f._id ?? f.question}>
              <button className="faq-question" onClick={() => setOpen(isOpen ? null : i)} type="button" aria-expanded={isOpen} aria-controls={id}>
                <span>{f.question}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={id}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer">{f.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </MotionConfig>
  )
}
