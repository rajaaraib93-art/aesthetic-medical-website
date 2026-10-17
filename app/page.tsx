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
import { fallbackFaqs, fallbackServices, fallbackStats, fallbackTestimonials } from '@/data'
import { whatsappHref } from '@/lib/contactLinks'
import { resolveHome } from '@/lib/homeResolve'
import { toNavServices } from '@/lib/services'
import { client } from '@/sanity/lib/client'
import { getHomeDoctors, getHomePage } from '@/sanity/lib/homePage'
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
  const [{ services, testimonials, faqs, settings }, homeCms, homeDoctors] = await Promise.all([
    getContent(),
    getHomePage(),
    getHomeDoctors(),
  ])
  const home = resolveHome(homeCms, homeDoctors)

  const marqueeNames = services.map((s: any) => s.title)
  const navServices = toNavServices(services)
  const stats = settings.stats.length > 0 ? settings.stats : fallbackStats
  const ctaWhatsapp = whatsappHref(settings.whatsapp || settings.phone, `Hello ${settings.siteName}, I would like to book a consultation.`)

  return (
    <>
      {/* HERO: full-bleed cinematic */}
      <HeroMotion className="hero hero-cine">
        <div className="hero-stage">
          <div className="hero-art" aria-hidden="true">
            {home.hero.videoSrc ? (
              <video src={home.hero.videoSrc} poster={home.hero.posterUrl || undefined} autoPlay muted loop playsInline />
            ) : (
              <Image src={home.hero.imageUrl} alt={home.hero.imageAlt} width={1600} height={1000} priority unoptimized />
            )}
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy">
              <div className="kicker">{home.hero.kicker}</div>
              <h1>{settings.heroTitle}</h1>
              <p>{settings.heroText}</p>
              <div className="hero-actions">
                <MagneticLink href="/contact" className="btn btn-primary">{home.hero.ctaPrimary}</MagneticLink>
                <Link href="/services" className="btn btn-ghost">{home.hero.ctaSecondary}</Link>
              </div>
              <div className="rating-badge">★★★★★ <strong>{home.hero.ratingValue}</strong> <span>— {home.hero.ratingLabel}</span></div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true"><span>{home.hero.scrollLabel}</span><i /></div>
        </div>
        <div className="marquee"><div className="marquee-track">{[...marqueeNames, ...marqueeNames].map((n: string, i: number) => <span key={i}>{n}</span>)}</div></div>
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
            <div className="kicker">{home.wizard.eyebrow}</div>
            <h2>{home.wizard.heading}</h2>
            <p>{home.wizard.intro}</p>
            <ul className="tick-list">
              {home.wizard.points.map((p: string) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingWizard interests={home.wizard.interests} times={home.wizard.times} clinicName={settings.siteName} whatsapp={settings.whatsapp} phone={settings.phone} />
          </Reveal>
        </div>
      </section>

      {/* FIND YOUR TREATMENT */}
      <section className="section" id="services" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">{home.finder.eyebrow}</div><h2>{home.finder.heading}</h2></div><p>{home.finder.intro}</p></Reveal>
          <ConcernFinder services={services} />
        </div>
      </section>

      {/* ALL SERVICES */}
      <AllServices services={navServices} eyebrow={home.allServices.eyebrow} heading={home.allServices.heading} intro={home.allServices.intro} />

      {/* TRUST PILLARS */}
      <TrustPillars pillars={home.trustPillars} />

      {/* JOURNEY (scroll-driven story) */}
      <JourneyStory eyebrow={home.journey.eyebrow} heading={home.journey.heading} steps={home.journey.steps} />

      {/* SIGNATURE TREATMENTS */}
      <SignatureProgramme eyebrow={home.signature.eyebrow} heading={home.signature.heading} intro={home.signature.intro} cta={home.signature.cta} items={home.signature.items} />

      {/* WATCH REAL TREATMENTS */}
      <VideoReel eyebrow={home.treatmentVideos.eyebrow} heading={home.treatmentVideos.heading} intro={home.treatmentVideos.intro} items={home.treatmentVideos.items} />

      {/* BEFORE / AFTER */}
      <section className="section" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">{home.beforeAfter.eyebrow}</div><h2>{home.beforeAfter.heading}</h2></div><p>{home.beforeAfter.intro}</p></Reveal>
          <Reveal>
            <BeforeAfterSlider before={home.beforeAfter.before} after={home.beforeAfter.after} />
            <p className="muted" style={{ fontSize: 13, marginTop: 14 }}>{home.beforeAfter.note}</p>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE + DOCTORS */}
      <ExperienceBand {...home.experience} />
      <DoctorSection eyebrow={home.doctors.eyebrow} heading={home.doctors.heading} items={home.doctors.items} />

      {/* MEN'S HEALTH */}
      <MensHealth eyebrow={home.mensHealth.eyebrow} lines={home.mensHealth.lines} text={home.mensHealth.text} cta={home.mensHealth.cta} />

      {/* CLIENT STORIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">{home.clientStories.eyebrow}</div><h2>{home.clientStories.heading}</h2></div><p className="muted">{home.clientStories.intro}</p></Reveal>
          <TestimonialReel testimonials={testimonials} />
        </div>
      </section>

      {/* WALL OF RESULTS */}
      <VideoReel variant="wall" eyebrow={home.resultVideos.eyebrow} heading={home.resultVideos.heading} intro={home.resultVideos.intro} items={home.resultVideos.items} />

      {/* SINGLE-CLINIC LOCATION BLOCK */}
      <section className="section" style={{ background: 'var(--soft)' }}>
        <Reveal className="container grid-2" stagger>
          <div>
            <div className="kicker">{home.location.eyebrow}</div>
            <h2>{home.location.heading}</h2>
            <p>{settings.phone ? `Call ${settings.phone}` : 'Phone — add to Sanity siteSettings'} {settings.whatsapp ? ' or message us on WhatsApp.' : '.'}</p>
            <p className="muted">{home.location.address}</p>
          </div>
          <div className="service-media"><Image src={home.location.imageUrl} alt={home.location.imageAlt} width={480} height={360} unoptimized /></div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head"><div><div className="kicker">{home.faq.eyebrow}</div><h2>{home.faq.heading}</h2></div></Reveal>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <BigCta lines={home.finalCta.lines} button={home.finalCta.button} location={home.finalCta.location} whatsappUrl={ctaWhatsapp} />
    </>
  )
}
