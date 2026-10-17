'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import type { VideoItem } from '@/homeContent'

type Props = { eyebrow: string; heading: string; intro: string; items: VideoItem[]; variant?: 'default' | 'wall' }

function VideoTile({ item, onOpen }: { item: VideoItem; onOpen: (v: VideoItem) => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  const hasVideo = Boolean(item.videoSrc)

  // On touch devices, play muted while the tile is mostly in view.
  useEffect(() => {
    const v = ref.current
    if (!hasVideo || !v) return
    if (!window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: [0, 0.6] }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [hasVideo])

  const play = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.play().catch(() => {})
  }
  const stop = () => {
    const v = ref.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <button
      type="button"
      className={`vr-tile${hasVideo ? '' : ' is-empty'}`}
      style={item.poster ? { backgroundImage: `url(${item.poster})` } : undefined}
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={() => hasVideo && onOpen(item)}
      aria-label={hasVideo ? `Play ${item.title}` : `${item.title} (video coming soon)`}
    >
      {hasVideo && <video ref={ref} src={item.videoSrc} poster={item.poster} muted loop playsInline preload="metadata" />}
      {item.tag && <span className="vr-tag">{item.tag}</span>}
      <span className="vr-play" aria-hidden="true">▶</span>
      <span className="vr-title">{item.title}</span>
      {!hasVideo && <span className="vr-soon">Coming soon</span>}
    </button>
  )
}

export function VideoReel({ eyebrow, heading, intro, items, variant = 'default' }: Props) {
  const [open, setOpen] = useState<VideoItem | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <MotionConfig reducedMotion="user">
      <section className={`section vr vr-${variant}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">{eyebrow}</div>
              <h2>{heading}</h2>
            </div>
            <p>{intro}</p>
          </div>
        </div>
        <div className="vr-rail">
          <Swiper modules={[FreeMode]} slidesPerView="auto" spaceBetween={16} freeMode grabCursor className="vr-swiper">
            {items.map((item, i) => (
              <SwiperSlide key={`${item.title}-${i}`} className="vr-slide">
                <VideoTile item={item} onOpen={setOpen} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div className="vr-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
              <motion.div initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }} className="vr-modal-inner" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="vr-close" onClick={() => setOpen(null)} aria-label="Close video">×</button>
                <video src={open.videoSrc} poster={open.poster} controls autoPlay playsInline />
                <p>{open.title} · {open.tag}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  )
}
