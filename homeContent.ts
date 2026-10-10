/**
 * Homepage copy for the NEW motion modules (not stored in Sanity).
 * Everything marked [placeholder] must be replaced with verified clinic content
 * before it is relied on. Edit this one file to change the wording, then
 * re-upload it to the repo root.
 */

export type VideoItem = {
  title: string
  tag: string
  /** Direct .mp4/.webm URL (e.g. in /public/videos). Leave empty until you have footage. */
  videoSrc?: string
  /** Poster image URL. Optional. */
  poster?: string
}

/** Optional hero background video. Leave empty to keep the hero image. */
export const heroMedia = { videoSrc: '', poster: '' }

export const heroExtras = {
  scrollLabel: 'Scroll',
}

export const wizard = {
  eyebrow: 'Start here',
  heading: 'Your consultation, in four quick steps',
  intro:
    'Tell us what you would like help with and when suits you. We will pick this up on WhatsApp and confirm your appointment.',
  points: ['Doctor-led consultation', 'Clear advice before you decide', 'One clinic, one standard of care'],
  interests: ['Skin', 'Hair', 'Laser', 'Face', 'Body', "Men's Health", 'Not sure yet'],
  times: ['Morning', 'Afternoon', 'Evening', 'Flexible'],
}

export const trustPillars = [
  {
    title: 'Doctor-led, always',
    text: 'Every plan starts with a clinician who examines your concern and explains your options, including when a treatment is not the right choice. [placeholder - verify]',
  },
  {
    title: 'Evidence-led care',
    text: 'Treatments are recommended for how well they are supported by clinical evidence, not because they are trending. [placeholder - verify]',
  },
  {
    title: 'Progress you can see',
    text: 'Your response is reviewed at follow-up, so decisions are based on how you are actually progressing. [placeholder - verify]',
  },
]

export const journey = {
  eyebrow: 'The IARM journey',
  heading: 'From first conversation to lasting results',
  steps: [
    {
      label: 'Consult',
      title: 'A doctor listens first',
      points: ['Full history and examination', 'Your goals, in your words', 'An honest answer on what will and will not help'],
    },
    {
      label: 'Plan',
      title: 'A plan made for you',
      points: ['Treatment and course explained', 'Costs set out before you decide', 'Realistic expectations'],
    },
    {
      label: 'Treat',
      title: 'Careful, comfortable treatment',
      points: ['Clinical protocols', 'Comfort and safety checks', 'Aftercare explained in detail'],
    },
    {
      label: 'Review',
      title: 'Results reviewed, not assumed',
      points: ['Follow-up reviews', 'Plan adjusted to your response', 'Support after your course ends'],
    },
  ],
}

export const signature = {
  eyebrow: 'Signature treatments',
  heading: 'Where we do our finest work',
  intro: 'A closer look at the treatments patients ask about most. [placeholder - replace with your real signature treatments]',
  cta: 'Book a consultation',
  items: [
    { title: 'Skin rejuvenation', tagline: '[Add a one-line description]' },
    { title: 'PRP and hair restoration', tagline: '[Add a one-line description]' },
    { title: 'Laser treatments', tagline: '[Add a one-line description]' },
    { title: 'HydraFacial and facials', tagline: '[Add a one-line description]' },
    { title: 'Injectables', tagline: '[Add a one-line description]' },
  ],
}

export const treatmentVideos = {
  eyebrow: 'Watch real treatments',
  heading: 'See it before you feel it',
  intro: 'Short films from the treatment room. [placeholder tiles - add videoSrc to each item when footage is ready]',
  items: [
    { title: 'PRP session', tag: 'Hair' },
    { title: 'Laser treatment', tag: 'Laser' },
    { title: 'DHI', tag: 'Hair' },
    { title: 'HydraFacial', tag: 'Skin' },
    { title: 'Skin rejuvenation', tag: 'Skin' },
    { title: 'Injectables', tag: 'Face' },
  ] as VideoItem[],
}

export const resultVideos = {
  eyebrow: 'Patient voices',
  heading: 'The wall of real results',
  intro: 'Patient stories, in their own words, shared with consent. [placeholder tiles]',
  items: [
    { title: 'Patient story', tag: 'Skin' },
    { title: 'Patient story', tag: 'Hair' },
    { title: 'Patient story', tag: 'Laser' },
    { title: 'Patient story', tag: 'Face' },
    { title: 'Patient story', tag: "Men's Health" },
    { title: 'Patient story', tag: 'Body' },
  ] as VideoItem[],
}

export const beforeAfter = {
  eyebrow: 'Before and after',
  heading: 'Results, shown responsibly',
  intro: 'Drag the handle to compare. Every image is shown with the patient\'s written consent.',
  note: 'Individual results vary. Photographs are unretouched. [placeholder - add consented images]',
  before: '',
  after: '',
}

export const experience = {
  eyebrow: 'The IARM experience',
  headingStart: 'A clinic that feels as good as the ',
  headingEmphasis: 'results',
  text: 'Calm surroundings, unhurried consultations and clear explanations at every step. Care that feels considered, from the moment you arrive.',
  primary: { label: 'Book your visit', href: '/contact' },
  secondary: { label: 'Meet the team', href: '/about' },
}

export const doctors = {
  eyebrow: 'Your doctors',
  heading: 'Meet the people behind your care',
  items: [
    { name: '[Doctor name]', title: '[Qualification / role]', initials: 'Dr', href: '/about' },
    { name: '[Doctor name]', title: '[Qualification / role]', initials: 'Dr', href: '/about' },
  ],
}

export const mensHealth = {
  eyebrow: "Men's Health",
  lines: ['Confidential.', 'Evidence-led.', 'Doctor-led.'],
  text: 'Care for men, planned privately by a doctor and based on evidence.',
  cta: { label: "Explore Men's Health", href: '/services' },
}

export const finalCta = {
  lines: ['Ready to start', 'your journey?'],
  button: 'Book a consultation',
  location: 'DHA Phase 6, Lahore',
}

export const announcement = 'Free doctor-led consultation. No obligation. [placeholder - confirm offer]'
