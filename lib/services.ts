import { fallbackServices } from '@/data'
import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'

export type NavService = { title: string; slug: string; short?: string; category: string }

/** Normalises Sanity (or fallback) services into a small, serialisable shape. */
export function toNavServices(list: any[]): NavService[] {
  return (list ?? [])
    .map((s: any) => ({
      title: String(s.title ?? ''),
      slug: typeof s.slug === 'string' ? s.slug : String(s.slug?.current ?? ''),
      short: s.short ? String(s.short) : undefined,
      category: s.category ? String(s.category) : 'Treatments',
    }))
    .filter((s) => s.title && s.slug)
}

export function groupByCategory(list: NavService[]): { category: string; items: NavService[] }[] {
  const map = new Map<string, NavService[]>()
  list.forEach((s) => map.set(s.category, [...(map.get(s.category) ?? []), s]))
  return Array.from(map, ([category, items]) => ({ category, items }))
}

/** Same Sanity-or-fallback logic the homepage uses, for the header and footer. */
export async function getServices(): Promise<any[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallbackServices
  try {
    const services = await client.fetch(SERVICES_QUERY)
    return services?.length ? services : fallbackServices
  } catch {
    return fallbackServices
  }
}
