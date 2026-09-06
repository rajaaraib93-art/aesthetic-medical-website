import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fallbackServices } from '@/data'
import { client } from '@/sanity/lib/client'
import { SERVICE_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let service:any = fallbackServices.find(s=>s.slug===slug)
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try { const live = await client.fetch(SERVICE_QUERY,{slug}); if (live) service = live } catch {}
  }
  if (!service) notFound()
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/services">Services</Link> / {service.title}</div><span className="badge">{service.category}</span><h1 style={{marginTop:18}}>{service.title}</h1><p style={{maxWidth:760,fontSize:19}}>{service.short}</p></div></section>
    <section className="section"><div className="container detail-hero"><article><div className="kicker">About this treatment</div><h2>A considered pathway, not a one-size-fits-all procedure.</h2><p style={{fontSize:17}}>{service.body}</p><div className="feature-list"><div><span className="check">1</span><span><strong>Consultation</strong><br/><span className="muted">Assess goals, contraindications and suitability.</span></span></div><div><span className="check">2</span><span><strong>Treatment plan</strong><br/><span className="muted">Build a phased plan around skin, anatomy and priorities.</span></span></div><div><span className="check">3</span><span><strong>Review</strong><br/><span className="muted">Review progress and refine the plan over time.</span></span></div></div></article><aside className="detail-aside"><div className="kicker">Ready to start?</div><h3>Discuss your goals with a clinician.</h3><p>Use the enquiry form and the team can guide the next step.</p><Link href="/contact" className="btn btn-primary" style={{width:'100%'}}>Book consultation</Link><hr/><small className="muted">This page is a website starter and not medical advice.</small></aside></div></section>
  </>
}
