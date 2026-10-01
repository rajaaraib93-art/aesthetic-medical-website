type Testimonial = { _id?: string; quote: string; name: string; role?: string }

export function TestimonialReel({ testimonials }: { testimonials: Testimonial[] }) {
  // Repeated as placeholder to fill the reel until real video testimonials are supplied.
  const items = testimonials.length ? [...testimonials, ...testimonials] : []
  return (
    <div className="reel-scroll">
      {items.map((t, i) => (
        <div className="reel-card" key={`${t._id ?? t.name}-${i}`}>
          <div className="reel-media-fallback">▶</div>
          <div className="quote" style={{fontSize:15}}>&ldquo;{t.quote}&rdquo;</div>
          <strong style={{marginTop:14, display:'block'}}>{t.name}</strong>
          <span className="muted" style={{fontSize:13}}>{t.role}</span>
        </div>
      ))}
    </div>
  )
}
