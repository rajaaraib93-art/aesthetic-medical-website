import Image from 'next/image'
import Link from 'next/link'
import { AllServices } from '@/components/AllServices'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import { BigCta } from '@/components/BigCta'
import { BookingWizard } from '@/components/BookingWizard'
import { ConcernFinder } from '@/components/ConcernFinder'
import { CountUp } from '@/components/CountUp'
import { DoctorSection } from '@/components/DoctorSection'
import { ExperienceBand } from '@/components/ExperienceBand'
import { FaqAccordion } from '@/components/FaqAccordion'
import { HeroMotion } from '@/components/HeroMotion'
import { JourneyStory } from '@/components/JourneyStory'
import { MagneticLink } from '@/components/MagneticLink'
import { MensHealth } from '@/components/MensHealth'
import { Reveal } from '@/components/Reveal'
import { SignatureProgramme } from '@/components/SignatureProgramme'
import { TestimonialReel } from '@/components/TestimonialReel'
import { TrustPillars } from '@/components/TrustPillars'
import { VideoReel } from '@/components/VideoReel'
import { fallbackFaqs, fallbackProcessSteps, fallbackServices, fallbackStats, fallbackTestimonials } from '@/data'
import {
  beforeAfter,
  doctors,
  experience,
  finalCta,
  heroMedia,
  heroExtras,
  journey,
  mensHealth,
  resultVideos,
  signature,
  treatmentVideos,
  trustPillars,
  wizard,
} from '@/homeContent'
import { whatsappHref } from '@/lib/contactLinks'
import { toNavServices } from '@/lib/services'
import { client } from '@/sanity/lib/client'
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
  const navServices = toNavServices(services)
  const journeySteps = fallbackProcessSteps.map((p, i) => ({
    label: p.title,
    title: journey.steps[i]?.title ?? p.title,
    text: p.body,
    points: journey.steps[i]?.points ?? [],
  }))
  const stats = settings.stats.length > 0 ? settings.stats : fallbackStats
  const ctaWhatsapp = whatsappHref(settings.whatsapp || settings.phone, `Hello ${settings.siteName}, I would like to book a consultation.`)

  return (
    <>
      {/* HERO: full-bleed cinematic */}
      <HeroMotion className="hero hero-cine">
        <div className="hero-stage">
          <div className="hero-art" aria-hidden="true">
            {heroMedia.videoSrc ? (
              <video src={heroMedia.videoSrc} poster={heroMedia.poster || undefined} autoPlay muted loop playsInline />
            ) : (
              <Image src="https://picsum.photos/seed/iarm-hero/1600/1000" alt="" width={1600} height={1000} priority />
            )}
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy">
              <div className="kicker">AESTHETIC MEDICINE · REGENERATIVE CARE</div>
              <h1>{settings.heroTitle}</h1>
              <p>{settings.heroText}</p>
              <div className="hero-actions">
                <MagneticLink href="/contact" className="btn btn-primary">Book a consultation</MagneticLink>
                <Link href="/services" className="btn btn-ghost">Explore treatments</Link>
              </div>
              <div className="rating-badge">★★★★★ <strong>[X.X]</strong> <span>— placeholder rating, replace with real reviews</span></div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true"><span>{heroExtras.scrollLabel}</span><i /></div>
        </div>
        <div className="marquee"><div className="marquee-track">{[...marqueeNames, ...marqueeNames].map((n, i) => <span key={i}>{n}</span>)}</div></div>
      </HeroMotion>

      {/* NUMBERS */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <Reveal className="container stats-grid" stagger>
          {stats.map((s: any) => <div className="stat" key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></div>)}
        </Reveal>
      </section>

      {/* START HERE: booking wizard */}
      <section className="section" id="start">
        <div className="container wizard-grid">
          <Reveal>
            <div className="kicker">{wizard.eyebrow}</div>
            <h2>{wizard.heading}</h2>
            <p>{wizard.intro}</p>
            <ul className="tick-list">
              {wizard.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingWizard interests={wizard.interests} times={wizard.times} clinicName={settings.siteName} whatsapp={settings.whatsapp} phone={settings.phone} />
          </Reveal>
        </div>
      </section>

      {/* FIND YOUR TREATMENT */}
      <section className="section" id="services" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">Find your treatment</div><h2>Browse by category.</h2></div><p>Filter by category to find the right treatment. Every card links to the full service page.</p></Reveal>
          <ConcernFinder services={services} />
        </div>
      </section>

      {/* ALL SERVICES */}
      <AllServices services={navServices} />

      {/* TRUST PILLARS */}
      <TrustPillars pillars={trustPillars} />

      {/* JOURNEY (scroll-driven story) */}
      <JourneyStory eyebrow={journey.eyebrow} heading={journey.heading} steps={journeySteps} />

      {/* SIGNATURE TREATMENTS */}
      <SignatureProgramme eyebrow={signature.eyebrow} heading={signature.heading} intro={signature.intro} cta={signature.cta} items={signature.items} />

      {/* WATCH REAL TREATMENTS */}
      <VideoReel eyebrow={treatmentVideos.eyebrow} heading={treatmentVideos.heading} intro={treatmentVideos.intro} items={treatmentVideos.items} />

      {/* BEFORE / AFTER */}
      <section className="section" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">{beforeAfter.eyebrow}</div><h2>{beforeAfter.heading}</h2></div><p>{beforeAfter.intro}</p></Reveal>
          <Reveal>
            <BeforeAfterSlider before={beforeAfter.before || undefined} after={beforeAfter.after || undefined} />
            <p className="muted" style={{ fontSize: 13, marginTop: 14 }}>{beforeAfter.note}</p>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE + DOCTORS */}
      <ExperienceBand {...experience} />
      <DoctorSection eyebrow={doctors.eyebrow} heading={doctors.heading} items={doctors.items} />

      {/* MEN'S HEALTH */}
      <MensHealth eyebrow={mensHealth.eyebrow} lines={mensHealth.lines} text={mensHealth.text} cta={mensHealth.cta} />

      {/* CLIENT STORIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">Client stories</div><h2>Hear it from our patients.</h2></div><p className="muted">Placeholder reel — swap in real video testimonials (with consent) when available.</p></Reveal>
          <TestimonialReel testimonials={testimonials} />
        </div>
      </section>

      {/* WALL OF RESULTS */}
      <VideoReel variant="wall" eyebrow={resultVideos.eyebrow} heading={resultVideos.heading} intro={resultVideos.intro} items={resultVideos.items} />

      {/* SINGLE-CLINIC LOCATION BLOCK */}
      <section className="section" style={{ background: 'var(--soft)' }}>
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
      <BigCta lines={finalCta.lines} button={finalCta.button} location={finalCta.location} whatsappUrl={ctaWhatsapp} />
    </>
  )
}
