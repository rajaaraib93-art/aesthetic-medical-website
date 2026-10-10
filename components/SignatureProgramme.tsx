import { Reveal } from '@/components/Reveal'
import { MagneticLink } from '@/components/MagneticLink'

type Props = { eyebrow: string; heading: string; intro: string; cta: string; items: { title: string; tagline: string }[] }

export function SignatureProgramme({ eyebrow, heading, intro, cta, items }: Props) {
  return (
    <section className="section signature">
      <div className="container signature-grid">
        <Reveal className="signature-copy">
          <div className="kicker">{eyebrow}</div>
          <h2>{heading}</h2>
          <p>{intro}</p>
          <MagneticLink href="/contact" className="btn btn-primary">{cta}</MagneticLink>
        </Reveal>
        <Reveal className="signature-list" stagger>
          {items.map((it, i) => (
            <div className="signature-row" key={it.title}>
              <span className="signature-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{it.title}</strong>
                <span>{it.tagline}</span>
              </div>
              <span className="signature-arrow" aria-hidden="true">→</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
