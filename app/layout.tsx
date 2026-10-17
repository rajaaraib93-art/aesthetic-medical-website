import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { FloatingCta } from '@/components/FloatingCta'
import { SmoothScroll } from '@/components/SmoothScroll'
import { getServices, groupByCategory, toNavServices } from '@/lib/services'
import { getHomePage } from '@/sanity/lib/homePage'
import { getSiteSettings } from '@/sanity/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = `${settings.siteName} | Aesthetic & Regenerative Medicine`
  const description = settings.heroText
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: settings.siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()
  const navServices = toNavServices(await getServices())
  const groups = groupByCategory(navServices)
  const home = await getHomePage()
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <div className="site-shell">
          <SiteHeader siteName={settings.siteName} phone={settings.phone} groups={groups} announcement={home?.announcement?.trim() || undefined} />
          <main>{children}</main>
          <SiteFooter siteName={settings.siteName} phone={settings.phone} email={settings.email} whatsapp={settings.whatsapp} services={navServices} />
        </div>
        <FloatingCta whatsapp={settings.whatsapp} phone={settings.phone} siteName={settings.siteName} />
      </body>
    </html>
  )
}
