import Link from 'next/link'
import { Reveal } from '@/components/Reveal'

type Props = {
  eyebrow: string
  headingStart: string
  headingEmphasis: string
  text: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

export function ExperienceBand({ eyebrow, headingStart, headingEmphasis, text, primary, secondary }: Props) {
  return (
    <section className="section experience">
      <Reveal className="container experience-inner">
        <div className="kicker">{eyebrow}</div>
        <h2>
          {headingStart}
          <em>{headingEmphasis}</em>
        </h2>
        <p>{text}</p>
        <div className="hero-actions">
          <Link href={primary.href} className="btn btn-primary">{primary.label}</Link>
          <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>
        </div>
      </Reveal>
    </section>
  )
}
