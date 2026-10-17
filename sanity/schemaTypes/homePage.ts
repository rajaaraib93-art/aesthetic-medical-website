import { defineArrayMember, defineField, defineType } from 'sanity'

/* ---------- small helpers so every field below stays one line ---------- */
const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'string', description })

const txt = (name: string, title: string, rows = 3, description?: string) =>
  defineField({ name, title, type: 'text', rows, description })

const strList = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'string' })], description })

const img = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for screen readers and SEO' })],
  })

const videoFile = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'file',
    options: { accept: 'video/*' },
    description: 'Upload a short MP4 or WebM (ideally under 15 MB). Or paste a link in the "Video link" field instead.',
  })

const list = (name: string, title: string, fields: any[], description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({ type: 'object', fields, preview: { select: { title: 'title' } } })],
  })

const section = (name: string, title: string, description: string, fields: any[]) =>
  defineField({
    name,
    title,
    description,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields,
  })

const EMPTY = 'Leave empty to use the default wording.'

/** Video tile fields shared by both video sections. */
const videoTileFields = [
  str('title', 'Title'),
  str('tag', 'Tag', 'Small label on the tile, e.g. "Hair" or "Laser".'),
  videoFile('video', 'Video file'),
  str('videoUrl', 'Video link (optional)', 'A direct .mp4 link, used if no file is uploaded.'),
  img('poster', 'Poster image', 'Shown before the video plays.'),
]

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  description:
    'Everything shown on the homepage except the hero headline/text, phone, WhatsApp and stats (those stay in Site Settings). Empty fields fall back to the default wording, so you can fill this in gradually. Remember to press Publish.',
  fields: [
    str('announcement', 'Top announcement bar', 'The thin line above the menu. ' + EMPTY),

    section('hero', 'Hero (top of page)', 'Headline and text come from Site Settings.', [
      str('kicker', 'Small line above the headline', EMPTY),
      str('ctaPrimary', 'Main button label', EMPTY),
      str('ctaSecondary', 'Second button label', EMPTY),
      img('image', 'Hero image', 'Full-width background. Landscape, at least 1600 px wide.'),
      videoFile('video', 'Hero background video (optional)'),
      str('videoUrl', 'Hero video link (optional)', 'A direct .mp4 link, used if no file is uploaded.'),
      img('poster', 'Hero video poster image'),
      str('ratingValue', 'Rating value', 'Enter only a real, verifiable rating (for example from Google), such as 4.9. If empty, the placeholder stays.'),
      str('ratingLabel', 'Rating text', 'For example "from 120 Google reviews". ' + EMPTY),
      str('scrollLabel', 'Scroll hint text', EMPTY),
    ]),

    section('finder', '"Find your treatment" section', 'Heading above the category filter.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
    ]),

    section('allServices', '"All services" section', 'Heading above the grid of every service.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
    ]),

    section('wizard', '"Start here" booking steps', 'The four-step enquiry that ends in a WhatsApp message.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
      strList('points', 'Tick-list points', 'Short reassurance lines shown with ticks.'),
      strList('interests', 'Interest options', 'The choices in step 1.'),
      strList('times', 'Time options', 'The choices in step 2.'),
    ]),

    list(
      'trustPillars',
      'Trust pillars (three cards)',
      [str('title', 'Title'), txt('text', 'Text')],
      'Three short statements about how you work. Only state things that are true and can be backed up.'
    ),

    section('journey', 'Patient journey (scroll story)', 'The four steps shown as the visitor scrolls.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      list('steps', 'Steps', [
        str('label', 'Step name', 'One word, e.g. Consult.'),
        str('title', 'Step heading'),
        txt('text', 'Step description'),
        strList('points', 'Bullet points'),
        img('image', 'Step image (optional)'),
      ]),
    ]),

    section('signature', 'Signature treatments', 'A numbered list of the treatments you want to feature.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
      str('ctaLabel', 'Button label'),
      list('items', 'Treatments', [str('title', 'Treatment name'), str('tagline', 'One-line description')]),
    ]),

    section('treatmentVideos', 'Treatment videos', 'Draggable video tiles showing real treatments.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
      list('items', 'Videos', videoTileFields),
    ]),

    section('beforeAfter', 'Before and after', 'Drag-to-compare photos.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
      txt('note', 'Small print under the slider', 2, 'For example: individual results vary.'),
      img('before', 'Before photo'),
      img('after', 'After photo'),
      defineField({
        name: 'consentConfirmed',
        title: 'Written patient consent is on file',
        type: 'boolean',
        initialValue: false,
        description: 'The photos stay hidden on the website until this is ticked.',
      }),
    ]),

    section('experience', 'Clinic experience band', 'A short statement with two buttons.', [
      str('eyebrow', 'Small heading'),
      str('headingStart', 'Heading (first part)', 'e.g. "A clinic that feels as good as the "'),
      str('headingEmphasis', 'Heading (highlighted word)', 'Shown in italics, e.g. "results".'),
      txt('text', 'Text'),
      str('primaryLabel', 'First button label'),
      str('primaryHref', 'First button link', 'A page on this site, e.g. /contact'),
      str('secondaryLabel', 'Second button label'),
      str('secondaryHref', 'Second button link', 'A page on this site, e.g. /about'),
    ]),

    section('doctors', 'Doctors section heading', 'The doctor cards come from the "Doctor / Faculty" entries (with "Show on website" ticked and a photo).', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
    ]),

    section('mensHealth', "Men's Health feature", 'The dark, full-width feature section.', [
      str('eyebrow', 'Small heading'),
      strList('lines', 'Big statement lines', 'Each line is shown on its own row, e.g. "Confidential."'),
      txt('text', 'Supporting text'),
      str('ctaLabel', 'Button label'),
      str('ctaHref', 'Button link', 'A page on this site, e.g. /services'),
    ]),

    section('clientStories', 'Client stories (written testimonials)', 'Heading above the testimonials. The testimonials themselves are the "Testimonial" entries.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
    ]),

    section('resultVideos', 'Patient video wall', 'Only videos with the consent box ticked are shown.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('intro', 'Intro text'),
      list('items', 'Patient videos', [
        ...videoTileFields,
        defineField({
          name: 'consent',
          title: 'Written patient consent is on file',
          type: 'boolean',
          initialValue: false,
          description: 'The video stays hidden until this is ticked.',
        }),
      ]),
    ]),

    section('location', 'Visit us (clinic location)', 'The location block near the bottom.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
      txt('address', 'Address', 2),
      img('image', 'Clinic photo'),
    ]),

    section('faq', 'FAQ section heading', 'The questions themselves are the "FAQ" entries.', [
      str('eyebrow', 'Small heading'),
      str('heading', 'Heading'),
    ]),

    section('finalCta', 'Closing call to action', 'The large banner at the bottom of the page.', [
      strList('lines', 'Headline lines', 'Each line is shown on its own row, e.g. "Ready to start" and "your journey?"'),
      str('button', 'Button label'),
      str('location', 'Line under the button', 'e.g. the area of the clinic.'),
    ]),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
})
