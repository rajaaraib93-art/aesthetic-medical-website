import { getSiteSettings } from '@/sanity/lib/settings'
import { ContactForm } from './ContactForm'

export const metadata = { title: 'Contact | IARM' }

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumb">Home / Contact</div><div className="kicker">Contact</div><h1>Let&rsquo;s plan the next step.</h1><p style={{maxWidth:760,fontSize:18}}>Use the form for treatment enquiries or consultation requests.</p></div></section>
    <section className="section"><div className="container grid-2">
      <div>
        <div className="kicker">Clinic contact</div>
        <h2>Speak to the team.</h2>
        {settings.phone && <p>Phone: <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a></p>}
        {settings.whatsapp && <p>WhatsApp: <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer">Message us</a></p>}
        {settings.email && <p>Email: <a href={`mailto:${settings.email}`}>{settings.email}</a></p>}
        <p>Consultation fee: PKR 2,000 (in clinic or online)</p>
        <div className="notice">Every enquiry submitted here is stored in Sanity so the team can manage follow-up from the CMS.</div>
      </div>
      <ContactForm />
    </div></section>
  </>
}
