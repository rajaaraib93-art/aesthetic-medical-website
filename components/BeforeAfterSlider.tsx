'use client'

import { useState, type CSSProperties } from 'react'

type Props = { before?: string; after?: string; alt?: string }

/** Drag (or use arrow keys on) the handle to compare. Shows labelled placeholders until images are supplied. */
export function BeforeAfterSlider({ before, after, alt = 'Before and after comparison' }: Props) {
  const [pos, setPos] = useState(50)
  const bg = (src?: string): CSSProperties | undefined => (src ? { backgroundImage: `url(${src})` } : undefined)

  return (
    <div className="ba" role="group" aria-label={alt}>
      <div className="ba-layer ba-after" style={bg(after)}>
        <span className="ba-tag ba-tag-right">After</span>
      </div>
      <div className="ba-layer ba-before" style={{ ...bg(before), clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <span className="ba-tag">Before</span>
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true"><span>⇄</span></div>
      <input
        className="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
      />
    </div>
  )
}
