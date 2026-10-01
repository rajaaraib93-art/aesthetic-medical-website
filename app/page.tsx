import Image from 'next/image'
import Link from 'next/link'
import { ConcernFinder } from '@/components/ConcernFinder'
import { CountUp } from '@/components/CountUp'
import { FaqAccordion } from '@/components/FaqAccordion'
import { HeroMotion } from '@/components/HeroMotion'
import { ProcessSteps } from '@/components/ProcessSteps'
import { Reveal } from '@/components/Reveal'
import { TestimonialReel } from '@/components/TestimonialReel'
import { fallbackFaqs, fallbackServices, fallbackStats, fallbackTestimonials } from '@/data'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { FAQS_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { getSiteSettings } from '@/sanity/lib/settings'

export const revalidate = 60

async function getContent() {
  const settings = await getSiteSettings()
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { services: fallbackServices, testimonials: fallbackTestimonials, faqs: fallbackFaqs, settings }
  }
  try {
    const [services, testimonials, faqs] = await Promise.all([
      client.fetch(SERVICES_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
      client.fetch(FAQS_QUERY),
    ])
    return {
      services: services?.length ? services : fallbackServices,
      testimonials: testimonials?.length ? testimonials : fallbackTestimonials,
      faqs: faqs?.length ? faqs : fallbackFaqs,
      settings,
    }
  } catch {
    return { services: fallbackServices, testimonials: fallbackTestimonials, faqs: fallbackFaqs, settings }
  }
}

export default async function Home() {
  const { services, testimonials, faqs, settings } = await getContent()
  const marqueeNames = services.map((s: any) => s.title)

  return (
    <>
      {/* HERO */}
      <HeroMotion className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="kicker">AESTHETIC MEDICINE · REGENERATIVE CARE</div>
            <h1>{settings.heroTitle}</h1>
            <p>{settings.heroText}</p>
            <div className="hero-actions"><Link href="/contact" className="btn btn-primary">Book a consultation</Link><Link href="/services" className="btn btn-ghost">Explore treatments</Link></div>
            <div className="rating-badge">★★★★★ <strong>[X.X]</strong> <span className="muted">— placeholder rating, replace with real reviews</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Image src="https://picsum.photos/seed/iarm-hero/760/900" alt="Clinic placeholder image" width={760} height={900} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:20}} priority />
          </div>
        </div>
        <div className="marquee"><div className="marquee-track">{[...marqueeNames, ...marqueeNames].map((n,i)=><span key={i}>{n}</span>)}</div></div>
        {settings.stats.length > 0 && (
          <div className="container stats">
            <Reveal className="stats-grid" stagger>
              {settings.stats.map((s) => <div className="stat" key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></div>)}
            </Reveal>
          </div>
        )}
      </HeroMotion>

      {/* TRUST STATS (placeholder) */}
      <section className="section" style={{paddingBottom:0}}>
        <Reveal className="container stats-grid" stagger>
          {fallbackStats.map(s => <div className="stat" key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></div>)}
        </Reveal>
      </section>

      {/* CONCERN FINDER */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">Find your treatment</div><h2>Browse by category.</h2></div><p>Filter by category to find the right treatment. Every card links to the full service page.</p></Reveal>
          <ConcernFinder services={services} />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" style={{background:'var(--soft)'}}>
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">The IARM process</div><h2>From first consult to lasting results.</h2></div></Reveal>
          <ProcessSteps />
        </div>
      </section>

      {/* VIDEO/TESTIMONIAL REEL */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">Client stories</div><h2>Hear it from our patients.</h2></div><p className="muted">Placeholder reel — swap in real video testimonials (with consent) when available.</p></Reveal>
          <TestimonialReel testimonials={testimonials} />
        </div>
      </section>

      {/* SINGLE-CLINIC LOCATION BLOCK */}
      <section className="section" style={{background:'var(--soft)'}}>
        <Reveal className="container grid-2" stagger>
          <div>
            <div className="kicker">Visit us</div>
            <h2>One clinic, easy to find.</h2>
            <p>{settings.phone ? `Call ${settings.phone}` : 'Phone — add to Sanity siteSettings'} {settings.whatsapp ? ' or message us on WhatsApp.' : '.'}</p>
            <p className="muted">DHA Phase 6, Sector A, 67-A (4th Floor), Lahore</p>
          </div>
          <div className="service-media"><Image src="https://picsum.photos/seed/iarm-clinic/480/360" alt="Clinic location placeholder" width={480} height={360} /></div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">FAQs</div><h2>Questions, answered honestly.</h2></div></Reveal>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{paddingTop:26}}><Reveal className="container cta" y={40}><div><div className="kicker" style={{color:'#b7d0c2'}}>Start here</div><h2 style={{color:'#fff',marginBottom:12}}>Turn interest into a consultation.</h2><p>Use the contact flow for consultations and general enquiries.</p></div><Link href="/contact" className="btn btn-light">Contact the clinic →</Link></Reveal></section>
    </>
  )
}
