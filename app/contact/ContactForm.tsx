'use client'

import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setStatus('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      setStatus(res.ok ? 'Thank you. Your enquiry has been received.' : (json.error || 'Something went wrong.'))
      if (res.ok) form.reset()
    } catch {
      setStatus('Unable to submit right now. Please call the clinic.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Name</label><input required id="name" name="name" /></div>
      <div className="grid-2" style={{gap:15}}>
        <div className="field"><label htmlFor="phone">Phone</label><input required id="phone" name="phone" /></div>
        <div className="field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" /></div>
      </div>
      <div className="field">
        <label htmlFor="interest">I&rsquo;m interested in</label>
        <select id="interest" name="interest" defaultValue="Consultation">
          <option>Consultation</option>
          <option>Injectables</option>
          <option>Skin and facials</option>
          <option>Hair restoration</option>
          <option>Men&rsquo;s health</option>
          <option>Laser treatments</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="Tell us what you would like help with." /></div>
      <button className="btn btn-primary" disabled={busy}>{busy ? 'Submitting…' : 'Send enquiry'}</button>
      {status && <div className="notice">{status}</div>}
    </form>
  )
}
