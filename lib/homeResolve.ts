import { fallbackProcessSteps } from '@/data'
import * as base from '@/homeContent'
import type { VideoItem } from '@/homeContent'

/**
 * Merges the Sanity "Homepage" document over the built-in defaults in
 * homeContent.ts / data.ts. Any empty field keeps its default, so the page
 * never goes blank while content is still being entered.
 */

const s = (v: unknown, d: string): string => (typeof v === 'string' && v.trim() ? v.trim() : d)

const strs = (v: unknown, d: string[]): string[] => {
  const a = Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '') : []
  return a.length ? a : d
}

const withSize = (url: unknown, width: number): string | undefined =>
  typeof url === 'string' && url ? `${url}?w=${width}&auto=format&q=80` : undefined

function videoItems(v: any, d: VideoItem[], requireConsent = false): VideoItem[] {
  if (!Array.isArray(v) || v.length === 0) return d
  return v.map((i: any) => {
    const allowed = !requireConsent || i?.consent === true
    return {
      title: s(i?.title, 'Video'),
      tag: s(i?.tag, ''),
      videoSrc: allowed && i?.videoSrc ? String(i.videoSrc) : undefined,
      poster: allowed && i?.poster ? withSize(i.poster, 600) : undefined,
    }
  })
}

export function resolveHome(cms: any, doctorsCms: any[]) {
  const c = cms ?? {}

  const defaultSteps = fallbackProcessSteps.map((p, i) => ({
    label: p.title,
    title: base.journey.steps[i]?.title ?? p.title,
    text: p.body,
    points: base.journey.steps[i]?.points ?? [],
    image: undefined as string | undefined,
  }))
  const cmsSteps: any[] = Array.isArray(c.journey?.steps) ? c.journey.steps : []
  const steps = cmsSteps.length
    ? cmsSteps.map((st, i) => ({
        label: s(st?.label, base.journey.steps[i]?.label ?? `Step ${i + 1}`),
        title: s(st?.title, base.journey.steps[i]?.title ?? ''),
        text: s(st?.text, fallbackProcessSteps[i]?.body ?? ''),
        points: strs(st?.points, base.journey.steps[i]?.points ?? []),
        image: withSize(st?.imageUrl, 1000),
      }))
    : defaultSteps

  const consentOk = c.beforeAfter?.consentConfirmed === true

  return {
    announcement: typeof c.announcement === 'string' && c.announcement.trim() ? c.announcement.trim() : undefined,

    hero: {
      kicker: s(c.hero?.kicker, 'AESTHETIC MEDICINE · REGENERATIVE CARE'),
      ctaPrimary: s(c.hero?.ctaPrimary, 'Book a consultation'),
      ctaSecondary: s(c.hero?.ctaSecondary, 'Explore treatments'),
      ratingValue: s(c.hero?.ratingValue, '[X.X]'),
      ratingLabel: s(c.hero?.ratingLabel, 'placeholder rating, replace with real reviews'),
      scrollLabel: s(c.hero?.scrollLabel, base.heroExtras.scrollLabel),
      imageUrl: withSize(c.hero?.imageUrl, 1800) ?? 'https://picsum.photos/seed/iarm-hero/1600/1000',
      imageAlt: s(c.hero?.imageAlt, ''),
      videoSrc: c.hero?.videoSrc ? String(c.hero.videoSrc) : base.heroMedia.videoSrc,
      posterUrl: withSize(c.hero?.posterUrl, 1600) ?? base.heroMedia.poster,
    },

    finder: {
      eyebrow: s(c.finder?.eyebrow, 'Find your treatment'),
      heading: s(c.finder?.heading, 'Browse by category.'),
      intro: s(c.finder?.intro, 'Filter by category to find the right treatment. Every card links to the full service page.'),
    },

    allServices: {
      eyebrow: s(c.allServices?.eyebrow, 'All services'),
      heading: s(c.allServices?.heading, 'Everything we do, in one place.'),
      intro: s(c.allServices?.intro, 'Every treatment has its own page with the full detail.'),
    },

    wizard: {
      eyebrow: s(c.wizard?.eyebrow, base.wizard.eyebrow),
      heading: s(c.wizard?.heading, base.wizard.heading),
      intro: s(c.wizard?.intro, base.wizard.intro),
      points: strs(c.wizard?.points, base.wizard.points),
      interests: strs(c.wizard?.interests, base.wizard.interests),
      times: strs(c.wizard?.times, base.wizard.times),
    },

    trustPillars:
      Array.isArray(c.trustPillars) && c.trustPillars.length
        ? c.trustPillars.map((p: any) => ({ title: s(p?.title, ''), text: s(p?.text, '') })).filter((p: any) => p.title)
        : base.trustPillars,

    journey: {
      eyebrow: s(c.journey?.eyebrow, base.journey.eyebrow),
      heading: s(c.journey?.heading, base.journey.heading),
      steps,
    },

    signature: {
      eyebrow: s(c.signature?.eyebrow, base.signature.eyebrow),
      heading: s(c.signature?.heading, base.signature.heading),
      intro: s(c.signature?.intro, base.signature.intro),
      cta: s(c.signature?.ctaLabel, base.signature.cta),
      items:
        Array.isArray(c.signature?.items) && c.signature.items.length
          ? c.signature.items.map((i: any) => ({ title: s(i?.title, ''), tagline: s(i?.tagline, '') })).filter((i: any) => i.title)
          : base.signature.items,
    },

    treatmentVideos: {
      eyebrow: s(c.treatmentVideos?.eyebrow, base.treatmentVideos.eyebrow),
      heading: s(c.treatmentVideos?.heading, base.treatmentVideos.heading),
      intro: s(c.treatmentVideos?.intro, base.treatmentVideos.intro),
      items: videoItems(c.treatmentVideos?.items, base.treatmentVideos.items),
    },

    beforeAfter: {
      eyebrow: s(c.beforeAfter?.eyebrow, base.beforeAfter.eyebrow),
      heading: s(c.beforeAfter?.heading, base.beforeAfter.heading),
      intro: s(c.beforeAfter?.intro, base.beforeAfter.intro),
      note: s(c.beforeAfter?.note, base.beforeAfter.note),
      // Photos are only shown once written patient consent is confirmed in Sanity.
      before: consentOk ? withSize(c.beforeAfter?.beforeUrl, 1600) : undefined,
      after: consentOk ? withSize(c.beforeAfter?.afterUrl, 1600) : undefined,
    },

    experience: {
      eyebrow: s(c.experience?.eyebrow, base.experience.eyebrow),
      headingStart: s(c.experience?.headingStart, base.experience.headingStart),
      headingEmphasis: s(c.experience?.headingEmphasis, base.experience.headingEmphasis),
      text: s(c.experience?.text, base.experience.text),
      primary: {
        label: s(c.experience?.primaryLabel, base.experience.primary.label),
        href: s(c.experience?.primaryHref, base.experience.primary.href),
      },
      secondary: {
        label: s(c.experience?.secondaryLabel, base.experience.secondary.label),
        href: s(c.experience?.secondaryHref, base.experience.secondary.href),
      },
    },

    doctors: {
      eyebrow: s(c.doctors?.eyebrow, base.doctors.eyebrow),
      heading: s(c.doctors?.heading, base.doctors.heading),
      items: doctorsCms.length
        ? doctorsCms.map((d: any) => ({
            name: s(d?.name, ''),
            title: s(d?.role, ''),
            initials: s(d?.initials, 'Dr'),
            href: '/about',
            image: withSize(d?.imageUrl, 800),
          }))
        : base.doctors.items,
    },

    mensHealth: {
      eyebrow: s(c.mensHealth?.eyebrow, base.mensHealth.eyebrow),
      lines: strs(c.mensHealth?.lines, base.mensHealth.lines),
      text: s(c.mensHealth?.text, base.mensHealth.text),
      cta: {
        label: s(c.mensHealth?.ctaLabel, base.mensHealth.cta.label),
        href: s(c.mensHealth?.ctaHref, base.mensHealth.cta.href),
      },
    },

    clientStories: {
      eyebrow: s(c.clientStories?.eyebrow, 'Client stories'),
      heading: s(c.clientStories?.heading, 'Hear it from our patients.'),
      intro: s(c.clientStories?.intro, 'Placeholder reel — swap in real video testimonials (with consent) when available.'),
    },

    resultVideos: {
      eyebrow: s(c.resultVideos?.eyebrow, base.resultVideos.eyebrow),
      heading: s(c.resultVideos?.heading, base.resultVideos.heading),
      intro: s(c.resultVideos?.intro, base.resultVideos.intro),
      // Patient videos are only shown when consent is ticked on that item.
      items: videoItems(c.resultVideos?.items, base.resultVideos.items, true),
    },

    location: {
      eyebrow: s(c.location?.eyebrow, 'Visit us'),
      heading: s(c.location?.heading, 'One clinic, easy to find.'),
      address: s(c.location?.address, 'DHA Phase 6, Sector A, 67-A (4th Floor), Lahore'),
      imageUrl: withSize(c.location?.imageUrl, 960) ?? 'https://picsum.photos/seed/iarm-clinic/480/360',
      imageAlt: s(c.location?.imageAlt, 'Clinic location'),
    },

    faq: {
      eyebrow: s(c.faq?.eyebrow, 'FAQs'),
      heading: s(c.faq?.heading, 'Questions, answered honestly.'),
    },

    finalCta: {
      lines: strs(c.finalCta?.lines, base.finalCta.lines),
      button: s(c.finalCta?.button, base.finalCta.button),
      location: s(c.finalCta?.location, base.finalCta.location),
    },
  }
}
