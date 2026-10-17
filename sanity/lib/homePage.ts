import { client } from './client'
import { HOME_DOCTORS_QUERY, HOME_PAGE_QUERY } from './queries'

/** Homepage document from Sanity, or null if it is missing / Sanity is unreachable. */
export async function getHomePage(): Promise<any | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !client) return null
  try {
    return (await client.fetch(HOME_PAGE_QUERY)) ?? null
  } catch {
    return null
  }
}

/** Active doctors (with photo URLs) for the homepage doctors section. */
export async function getHomeDoctors(): Promise<any[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !client) return []
  try {
    return (await client.fetch(HOME_DOCTORS_QUERY)) ?? []
  } catch {
    return []
  }
}
