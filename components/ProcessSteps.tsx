import Image from 'next/image'
import { fallbackProcessSteps } from '@/data'

export function ProcessSteps() {
  return (
    <div className="process-grid">
      {fallbackProcessSteps.map((s, i) => (
        <div className="process-card" key={s.step}>
          <div className="process-media">
            <Image src={`https://picsum.photos/seed/iarm-process-${i}/480/360`} alt={`${s.title} step illustration (placeholder)`} width={480} height={360} />
          </div>
          <div className="kicker">Step {s.step}</div>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  )
}
