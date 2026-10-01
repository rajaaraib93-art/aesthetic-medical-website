'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { urlFor } from '@/sanity/lib/image'

type Service = {
  _id?: string
  title: string
  slug: { current: string } | string
  short: string
  category?: string
  image?: any
}

export function ConcernFinder({ services }: { services: Service[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    services.forEach(s => s.category && set.add(s.category))
    return ['All', ...Array.from(set)]
  }, [services])

  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? services : services.filter(s => s.category === active)

  return (
    <div>
      <div className="concern-tags">
        {categories.map(cat => (
          <button
            key={cat}
            className={`concern-tag ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="concern-scroll">
        {filtered.map((s, i) => {
          const slug = typeof s.slug === 'string' ? s.slug : s.slug?.current
          return (
            <Link href={`/services/${slug}`} key={s._id ?? slug} className="concern-card">
              {s.image?.asset?.url ? (
                <div className="concern-media">
                  <Image src={urlFor(s.image).width(320).height(220).fit('crop').url()} alt={s.image.alt || s.title} width={320} height={220} />
                </div>
              ) : (
                <div className="concern-media concern-media-fallback">{String(i + 1).padStart(2, '0')}</div>
              )}
              <div style={{padding:'16px 4px 4px'}}>
                <div className="badge">{s.category}</div>
                <h4 style={{marginTop:10}}>{s.title}</h4>
                <p style={{fontSize:14}}>{s.short}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
