'use client'

import { useState } from 'react'

export default function ContactPage(){
  const [status,setStatus] = useState<string>('')
  const [busy,setBusy] = useState(false)
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setBusy(true); setStatus('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try{
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      const json = await res.json()
      setStatus(res.ok ? 'Thank you. Your enquiry has been received.' : (json.error || 'Something went wrong.'))
      if(res.ok) form.reset()
    }catch{setStatus('Unable to submit right now. Please call the clinic.')}
    finally{setBusy(false)}
  }
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumb">Home / Contact</div><div className="kicker">Contact</div><h1>Let’s plan the next step.</h1><p style={{maxWidth:760,fontSize:18}}>Use the form for treatment enquiries, consultations or course registration interest.</p></div></section>
    <section className="section"><div className="container grid-2"><div><div className="kicker">Clinic contact</div><h2>Speak to the team.</h2><p>Phone: <a href="tel:+923001234567">+92 300 123 4567</a></p><p>Email: <a href="mailto:hello@aestheramedical.com">hello@aestheramedical.com</a></p><p>Hours: Mon–Sat · 10:00–20:00</p><div className="notice">In production, this form can store every enquiry in Sanity so your team can manage follow-up from the CMS.</div></div><form className="card form" onSubmit={submit}><div className="field"><label htmlFor="name">Name</label><input required id="name" name="name" /></div><div className="grid-2" style={{gap:15}}><div className="field"><label htmlFor="phone">Phone</label><input required id="phone" name="phone" /></div><div className="field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" /></div></div><div className="field"><label htmlFor="interest">I’m interested in</label><select id="interest" name="interest" defaultValue="Consultation"><option>Consultation</option><option>Injectables</option><option>Skin rejuvenation</option><option>PRP / regenerative care</option><option>Laser & devices</option><option>Body contouring</option><option>Training / course</option></select></div><div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="Tell us what you would like help with." /></div><button className="btn btn-primary" disabled={busy}>{busy ? 'Submitting…' : 'Send enquiry'}</button>{status && <div className="notice">{status}</div>}</form></div></section>
  </>
}
