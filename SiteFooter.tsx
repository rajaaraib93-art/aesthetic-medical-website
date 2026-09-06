import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="brand-mark">A</span><span>AESTHERA MEDICAL</span></div>
            <p style={{marginTop:18}}>A contemporary medical aesthetics platform for evidence-led treatments, physician education and patient-first care.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links"><Link href="/services">Services</Link><Link href="/#courses">Training</Link><Link href="/about">About</Link></div>
          </div>
          <div>
            <h4>Patient care</h4>
            <div className="footer-links"><Link href="/contact">Book consultation</Link><a href="mailto:hello@aestheramedical.com">Email us</a><a href="tel:+923001234567">+92 300 123 4567</a></div>
          </div>
          <div>
            <h4>CMS</h4>
            <div className="footer-links"><Link href="/studio">Sanity Studio</Link><span style={{color:'rgba(255,255,255,.45)'}}>Content-managed</span></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Aesthera Medical. Demo starter website.</span><span>Built with Next.js + Sanity</span></div>
      </div>
    </footer>
  )
}
