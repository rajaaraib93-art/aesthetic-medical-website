import Image from 'next/image'
import Link from 'next/link'
import { fallbackServices, fallbackTestimonials } from '@/data'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { SERVICES_QUERY, TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { getSiteSettings } from '@/sanity/lib/settings'

export const revalidate = 60

async function getContent() {
  const settings = await getSiteSettings()
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { services: fallbackServices, testimonials: fallbackTestimonials, settings }
  }
  try {
    const [services, testimonials] = await Promise.all([
      client.fetch(SERVICES_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
    ])
    return {
      services: services?.length ? services : fallbackServices,
      testimonials: testimonials?.length ? testimonials : fallbackTestimonials,
      settings,
    }
  } catch {
    return { services: fallbackServices, testimonials: fallbackTestimonials, settings }
  }
}

export default async function Home() {
  const { services, testimonials, settings } = await getContent()
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="kicker">AESTHETIC MEDICINE · REGENERATIVE CARE</div>
            <h1>{settings.heroTitle}</h1>
            <p>{settings.heroText}</p>
            <div className="hero-actions"><Link href="/contact" className="btn btn-primary">Book a consultation</Link><Link href="/services" className="btn btn-ghost">Explore treatments</Link></div>
            <div className="hero-actions" style={{marginTop:18}}><span className="eyebrow"><span/> Evidence-led protocols</span><span className="eyebrow"><span/> Doctor-led care</span></div>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="hero-panel"><div className="kicker" style={{marginBottom:6}}>THE AESTHETIC JOURNEY</div><strong style={{fontSize:24, fontFamily:'Georgia,serif', fontWeight:500}}>Consult · Plan · Treat · Review</strong><div className="hero-mini"><div><strong>01</strong><br/><span className="muted">Assessment</span></div><div><strong>02</strong><br/><span className="muted">Personalised plan</span></div></div></div></div>
        </div>
        {settings.stats.length > 0 && (
          <div className="container stats"><div className="stats-grid">{settings.stats.map((s) => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></div>
        )}
      </section>

      <section className="section" id="services"><div className="container"><div className="section-head"><div><div className="kicker">Services</div><h2>A complete aesthetics menu, without the clutter.</h2></div><p>Clear pathways help visitors understand what you offer, who it is for and how to start. Every service card can be managed from Sanity.</p></div><div className="grid-3">{services.slice(0,6).map((s:any,i:number)=><Link href={`/services/${s.slug?.current ?? s.slug}`} className="card card-hover service-card" key={s._id ?? s.slug}>{s.image?.asset?.url ? <div className="service-media"><Image src={urlFor(s.image).width(480).height(360).fit('crop').url()} alt={s.image.alt || s.title} width={480} height={360} /></div> : <div className="service-icon">{String(i+1).padStart(2,'0')}</div>}<div style={{marginTop:20}}><div className="badge">{s.category}</div><h3 style={{marginTop:14}}>{s.title}</h3><p>{s.short}</p></div><div className="meta"><span>Explore treatment</span><span>→</span></div></Link>)}</div></div></section>

      <section className="section" style={{paddingTop:18}}><div className="container"><div className="section-head"><div><div className="kicker">Testimonials</div><h2>Trust is part of the interface.</h2></div></div><div className="grid-2">{testimonials.slice(0,2).map((t:any)=><div className="card" key={t._id ?? t.name}><div className="quote">"{t.quote}"</div><div style={{marginTop:22}}><strong>{t.name}</strong><div className="muted" style={{fontSize:13,marginTop:4}}>{t.role}</div></div></div>)}</div></div></section>

      <section className="section" style={{paddingTop:26}}><div className="container cta"><div><div className="kicker" style={{color:'#b7d0c2'}}>Start here</div><h2 style={{color:'#fff',marginBottom:12}}>Turn interest into a consultation.</h2><p>Use the contact flow for consultations and general enquiries.</p></div><Link href="/contact" className="btn btn-light">Contact the clinic →</Link></div></section>
    </>
  )
}
