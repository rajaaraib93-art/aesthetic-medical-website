import Link from 'next/link'
import { Reveal } from '@/components/Reveal'

type Doctor = { name: string; title: string; initials: string; href: string; image?: string }

export function DoctorSection({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: Doctor[] }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="kicker">{eyebrow}</div>
            <h2>{heading}</h2>
          </div>
        </Reveal>
        <Reveal className="doctor-grid" stagger>
          {items.map((d, i) => (
            <Link href={d.href} className="doctor-card" key={`${d.name}-${i}`}>
              <div className="doctor-photo" style={d.image ? { backgroundImage: `url(${d.image})` } : undefined}>
                {!d.image && <span>{d.initials}</span>}
              </div>
              <h3>{d.name}</h3>
              <p>{d.title}</p>
              <span className="doctor-link">View profile →</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
