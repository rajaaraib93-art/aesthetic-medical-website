import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
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
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader siteName={settings.siteName} />
          <main>{children}</main>
          <SiteFooter siteName={settings.siteName} phone={settings.phone} email={settings.email} whatsapp={settings.whatsapp} />
        </div>
      </body>
    </html>
  )
}
