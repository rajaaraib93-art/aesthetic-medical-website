import Link from 'next/link'
import { fallbackCourses, fallbackFaculty, fallbackServices, fallbackTestimonials } from '@/data'
import { client } from '@/sanity/lib/client'
import { COURSES_QUERY, FACULTY_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

async function getContent() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { services:fallbackServices, courses:fallbackCourses, faculty:fallbackFaculty, testimonials:fallbackTestimonials }
  }
  try {
    const [services, courses, faculty, testimonials] = await Promise.all([
      client.fetch(SERVICES_QUERY), client.fetch(COURSES_QUERY), client.fetch(FACULTY_QUERY), client.fetch(TESTIMONIALS_QUERY),
    ])
    return {
      services: services?.length ? services : fallbackServices,
      courses: courses?.length ? courses : fallbackCourses,
      faculty: faculty?.length ? faculty : fallbackFaculty,
      testimonials: testimonials?.length ? testimonials : fallbackTestimonials,
    }
  } catch {
    return { services:fallbackServices, courses:fallbackCourses, faculty:fallbackFaculty, testimonials:fallbackTestimonials }
  }
}

export default async function Home() {
  const { services, courses, faculty, testimonials } = await getContent()
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="kicker">AESTHETIC MEDICINE · EDUCATION · REGENERATIVE CARE</div>
            <h1>Refined aesthetics. Clinical confidence.</h1>
            <p>Patient-focused aesthetic care and practical physician education, brought together in a calm, premium digital experience.</p>
            <div className="hero-actions"><Link href="/contact" className="btn btn-primary">Book a consultation</Link><Link href="/services" className="btn btn-ghost">Explore treatments</Link></div>
            <div className="hero-actions" style={{marginTop:18}}><span className="eyebrow"><span/> Evidence-led protocols</span><span className="eyebrow"><span/> Doctor-led care</span></div>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="hero-panel"><div className="kicker" style={{marginBottom:6}}>THE AESTHETIC JOURNEY</div><strong style={{fontSize:24, fontFamily:'Georgia,serif', fontWeight:500}}>Consult · Plan · Treat · Review</strong><div className="hero-mini"><div><strong>01</strong><br/><span className="muted">Assessment</span></div><div><strong>02</strong><br/><span className="muted">Personalised plan</span></div></div></div></div>
        </div>
        <div className="container stats"><div className="stats-grid"><div className="stat"><strong>01:01</strong><span>patient-first consultation model</span></div><div className="stat"><strong>06+</strong><span>core aesthetic treatment pathways</span></div><div className="stat"><strong>360°</strong><span>assessment-to-aftercare journey</span></div><div className="stat"><strong>CMS</strong><span>content managed with Sanity</span></div></div></div>
      </section>

      <section className="section" id="services"><div className="container"><div className="section-head"><div><div className="kicker">Services</div><h2>A complete aesthetics menu, without the clutter.</h2></div><p>Clear pathways help visitors understand what you offer, who it is for and how to start. Every service card can be managed from Sanity.</p></div><div className="grid-3">{services.slice(0,6).map((s:any,i:number)=><Link href={`/services/${s.slug?.current ?? s.slug}`} className="card card-hover service-card" key={s._id ?? s.slug}><div className="service-icon">{String(i+1).padStart(2,'0')}</div><div style={{marginTop:20}}><div className="badge">{s.category}</div><h3 style={{marginTop:14}}>{s.title}</h3><p>{s.short}</p></div><div className="meta"><span>Explore treatment</span><span>→</span></div></Link>)}</div></div></section>

      <section className="section dark-band" id="courses"><div className="container"><div className="section-head"><div><div className="kicker">Education</div><h2>Training that feels structured, practical and premium.</h2></div><p>The education section supports courses, registrations and professional development without copying another organisation's branding or source code.</p></div><div className="grid-3">{courses.slice(0,3).map((c:any)=><div className="card course-card" key={c._id ?? c.slug}><span className="badge course-tag">{c.tag}</span><div className="course-date">{c.date}</div><h3 style={{marginTop:14}}>{c.title}</h3><p>{c.desc}</p><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:26,gap:14}}><strong>{c.price}</strong><span style={{opacity:.65,fontSize:13}}>{c.location}</span></div></div>)}</div></div></section>

      <section className="section" id="why-us"><div className="container grid-2"><div className="split-feature"><div className="kicker">Architecture</div><h2>Make your expertise easy to navigate.</h2><p>AAAM's current information architecture groups training, worldwide courses, faculty, membership, communications and contact into a broad institutional structure. This starter keeps the useful concepts while making the experience lighter and more conversion-focused.</p><div className="feature-list">{['Services are accessible within one tap from mobile','Course cards can be edited without a developer','Faculty, testimonials and articles are reusable content types','Enquiries flow into your Sanity dashboard'].map(x=><div key={x}><span className="check">✓</span><span>{x}</span></div>)}</div></div><div className="split-feature" id="faculty"><div className="kicker">Faculty</div><h2>Put clinicians at the centre of the story.</h2><div className="grid-3" style={{gridTemplateColumns:'1fr'}}>{faculty.slice(0,3).map((d:any)=><div className="person" key={d._id ?? d.name}><div className="avatar">{d.initials}</div><div><strong>{d.name}</strong><div className="muted" style={{fontSize:13,marginTop:4}}>{d.role}</div></div></div>)}</div></div></div></section>

      <section className="section" style={{paddingTop:18}}><div className="container"><div className="section-head"><div><div className="kicker">Testimonials</div><h2>Trust is part of the interface.</h2></div></div><div className="grid-2">{testimonials.slice(0,2).map((t:any)=><div className="card" key={t._id ?? t.name}><div className="quote">“{t.quote}”</div><div style={{marginTop:22}}><strong>{t.name}</strong><div className="muted" style={{fontSize:13,marginTop:4}}>{t.role}</div></div></div>)}</div></div></section>

      <section className="section" style={{paddingTop:26}}><div className="container cta"><div><div className="kicker" style={{color:'#b7d0c2'}}>Start here</div><h2 style={{color:'#fff',marginBottom:12}}>Turn interest into a consultation.</h2><p>Use the contact flow for consultations, course registration interest and general enquiries.</p></div><Link href="/contact" className="btn btn-light">Contact the clinic →</Link></div></section>
    </>
  )
}
