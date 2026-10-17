'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import './slider-fix.css'

type Testimonial = { _id?: string; quote: string; name: string; role?: string }

export function TestimonialReel({ testimonials }: { testimonials: Testimonial[] }) {
  // Repeated as placeholder to fill the reel until real video testimonials are supplied.
  const items = testimonials.length ? [...testimonials, ...testimonials] : []
  return (
    <Swiper modules={[FreeMode]} slidesPerView="auto" spaceBetween={18} freeMode grabCursor className="tr-swiper">
      {items.map((t, i) => (
        <SwiperSlide key={`${t._id ?? t.name}-${i}`} className="tr-slide">
          <div className="reel-card">
            <div className="reel-media-fallback">▶</div>
            <div className="quote" style={{ fontSize: 15 }}>&ldquo;{t.quote}&rdquo;</div>
            <strong style={{ marginTop: 14, display: 'block' }}>{t.name}</strong>
            <span className="muted" style={{ fontSize: 13 }}>{t.role}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
