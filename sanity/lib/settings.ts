import { client } from './client'
import { SITE_SETTINGS_QUERY } from './queries'

export type SiteSettings = {
  siteName: string
  heroTitle: string
  heroText: string
  phone?: string
  email?: string
  whatsapp?: string
  stats: { value: string; label: string }[]
}

// Used when Sanity is unreachable or siteSettings hasn't been populated yet.
export const fallbackSiteSettings: SiteSettings = {
  siteName: 'IARM',
  heroTitle: 'Institute of Aesthetic and Regenerative Medicine',
  heroText:
    'Advanced aesthetic and regenerative treatments in Lahore, delivered with expert medical care.',
  phone: '0313-6006008',
  email: undefined,
  whatsapp: 'https://wa.me/923136006008',
  stats: [],
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallbackSiteSettings
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY)
    if (!settings) return fallbackSiteSettings
    return {
      siteName: settings.siteName || fallbackSiteSettings.siteName,
      heroTitle: settings.heroTitle || fallbackSiteSettings.heroTitle,
      heroText: settings.heroText || fallbackSiteSettings.heroText,
      phone: settings.phone || fallbackSiteSettings.phone,
      email: settings.email || undefined,
      whatsapp: settings.whatsapp || fallbackSiteSettings.whatsapp,
      stats: settings.stats?.length ? settings.stats : fallbackSiteSettings.stats,
    }
  } catch {
    return fallbackSiteSettings
  }
}
