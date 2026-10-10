import { Reveal } from '@/components/Reveal'
import { MagneticLink } from '@/components/MagneticLink'

type Props = { eyebrow: string; lines: string[]; text: string; cta: { label: string; href: string } }

export function MensHealth({ eyebrow, lines, text, cta }: Props) {
  return (
    <section className="mens">
      <Reveal className="container mens-inner">
        <div className="kicker">{eyebrow}</div>
        <h2>
          {lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <p>{text}</p>
        <MagneticLink href={cta.href} className="btn btn-light">{cta.label} →</MagneticLink>
      </Reveal>
    </section>
  )
}
