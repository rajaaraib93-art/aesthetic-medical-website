import Link from 'next/link'

type FooterProps = {
  siteName?: string
  phone?: string
  email?: string
  whatsapp?: string
}

export function SiteFooter({ siteName = 'IARM', phone, email, whatsapp }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="brand-mark">{siteName.charAt(0)}</span><span>{siteName}</span></div>
            <p style={{marginTop:18}}>Institute of Aesthetic and Regenerative Medicine — evidence-led treatments and patient-first care.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links"><Link href="/services">Services</Link><Link href="/about">About</Link></div>
          </div>
          <div>
            <h4>Patient care</h4>
            <div className="footer-links">
              <Link href="/contact">Book consultation</Link>
              {email && <a href={`mailto:${email}`}>Email us</a>}
              {phone && <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>}
              {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
            </div>
          </div>
          <div>
            <h4>CMS</h4>
            <div className="footer-links"><Link href="/studio">Sanity Studio</Link><span style={{color:'rgba(255,255,255,.45)'}}>Content-managed</span></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 {siteName}.</span><span>Built with Next.js + Sanity</span></div>
      </div>
    </footer>
  )
}
