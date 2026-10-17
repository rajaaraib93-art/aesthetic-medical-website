import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import type { NavService } from '@/lib/services'

type Props = { services: NavService[]; eyebrow?: string; heading?: string; intro?: string }

export function AllServices({ services, eyebrow = 'All services', heading = 'Everything we do, in one place.', intro = 'Every treatment has its own page with the full detail.' }: Props) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="kicker">{eyebrow}</div>
            <h2>{heading}</h2>
          </div>
          <p>{intro}</p>
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
