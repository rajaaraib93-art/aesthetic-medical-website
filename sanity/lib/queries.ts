import { defineQuery } from 'next-sanity'

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    _id, title, slug, short, body, category,
    image { asset->{_id, url, metadata {lqip, dimensions}}, alt }
  }
`)

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, short, body, category,
    image { asset->{_id, url, metadata {lqip, dimensions}}, alt }
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName, heroTitle, heroText, phone, email, whatsapp, stats[] {value, label}
  }
`)

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(date asc) {
    _id, title, slug, date, location, tag, price, desc
  }
`)

export const FACULTY_QUERY = defineQuery(`
  *[_type == "doctor" && active == true] | order(order asc) { _id, name, role, initials }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) { _id, quote, name, role }
`)

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc) { _id, question, answer }
`)

export const HOME_DOCTORS_QUERY = defineQuery(`
  *[_type == "doctor" && active == true] | order(order asc) {
    _id, name, role, initials, "imageUrl": image.asset->url
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    announcement,
    hero {
      kicker, ctaPrimary, ctaSecondary, ratingValue, ratingLabel, scrollLabel,
      "imageUrl": image.asset->url, "imageAlt": image.alt,
      "videoSrc": coalesce(video.asset->url, videoUrl),
      "posterUrl": poster.asset->url
    },
    finder { eyebrow, heading, intro },
    allServices { eyebrow, heading, intro },
    wizard { eyebrow, heading, intro, points, interests, times },
    trustPillars[] { title, text },
    journey {
      eyebrow, heading,
      steps[] { label, title, text, points, "imageUrl": image.asset->url }
    },
    signature { eyebrow, heading, intro, ctaLabel, items[] { title, tagline } },
    treatmentVideos {
      eyebrow, heading, intro,
      items[] { title, tag, "videoSrc": coalesce(video.asset->url, videoUrl), "poster": poster.asset->url }
    },
    beforeAfter {
      eyebrow, heading, intro, note, consentConfirmed,
      "beforeUrl": before.asset->url, "afterUrl": after.asset->url
    },
    experience { eyebrow, headingStart, headingEmphasis, text, primaryLabel, primaryHref, secondaryLabel, secondaryHref },
    doctors { eyebrow, heading },
    mensHealth { eyebrow, lines, text, ctaLabel, ctaHref },
    clientStories { eyebrow, heading, intro },
    resultVideos {
      eyebrow, heading, intro,
      items[] { title, tag, consent, "videoSrc": coalesce(video.asset->url, videoUrl), "poster": poster.asset->url }
    },
    location { eyebrow, heading, address, "imageUrl": image.asset->url, "imageAlt": image.alt },
    faq { eyebrow, heading },
    finalCta { lines, button, location }
  }
`)
