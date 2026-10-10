import { Reveal } from '@/components/Reveal'

type Pillar = { title: string; text: string }

const icons = [
  <svg key="a" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 3v18M3 12h18" strokeLinecap="round" /><circle cx="12" cy="12" r="9" /></svg>,
  <svg key="b" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 4h14v16H5zM8 9h8M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="c" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 18l5-6 4 3 7-9" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 6h5v5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
]

export function TrustPillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <section className="section">
      <Reveal className="container pillars" stagger>
        {pillars.map((p, i) => (
          <div className="pillar" key={p.title}>
            <div className="pillar-icon">{icons[i % icons.length]}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
