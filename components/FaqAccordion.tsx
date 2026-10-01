'use client'

import { useState } from 'react'

type Faq = { _id?: string; question: string; answer: string }

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <div className="faq-item" key={f._id ?? f.question}>
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)} type="button">
            <span>{f.question}</span>
            <span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div className="faq-answer">{f.answer}</div>}
        </div>
      ))}
    </div>
  )
}
