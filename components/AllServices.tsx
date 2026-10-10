import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import type { NavService } from '@/lib/services'

export function AllServices({ services }: { services: NavService[] }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="kicker">All services</div>
            <h2>Everything we do, in one place.</h2>
          </div>
          <p>Every treatment has its own page with the full detail.</p>
        </Reveal>
        <Reveal className="allsvc-grid" stagger>
          {services.map((s) => (
            <Link href={`/services/${s.slug}`} className="allsvc-card" key={s.slug}>
              <strong>{s.title}</strong>
              {s.short && <span>{s.short}</span>}
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
