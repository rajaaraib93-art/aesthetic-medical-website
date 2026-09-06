import Link from 'next/link'
import { fallbackServices } from '@/data'
import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function ServicesPage() {
  let services:any[] = fallbackServices
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try { const live = await client.fetch(SERVICES_QUERY); if (live?.length) services = live } catch {}
  }
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumb">Home / Services</div><div className="kicker">Clinical services</div><h1>Aesthetic treatments, presented simply.</h1><p style={{maxWidth:760,fontSize:18}}>Organise your clinic's treatment menu into clear, patient-friendly pathways. Every service can be edited in Sanity Studio.</p></div></section>
    <section className="section"><div className="container"><div className="grid-3">{services.map((s:any,i:number)=><Link key={s._id ?? s.slug} href={`/services/${s.slug.current ?? s.slug}`} className="card card-hover service-card"><div className="service-icon">{String(i+1).padStart(2,'0')}</div><div style={{marginTop:18}}><span className="badge">{s.category}</span><h3 style={{marginTop:14}}>{s.title}</h3><p>{s.short}</p></div><div className="meta"><span>View service</span><span>→</span></div></Link>)}</div></div></section>
  </>
}
