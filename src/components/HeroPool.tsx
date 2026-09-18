import { useEffect, useRef } from 'react'
import { reduced } from '../lib/anim'
import { drawSideSwimmer, drawWater } from '../lib/pool'

/** 히어로. 파도 속에서 한 사람이 계속 앞으로 간다. */
export default function HeroPool() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const g = cv.getContext('2d')
    if (!g) return
    const still = reduced()

    let w = 0
    let h = 0
    let raf = 0
    let live = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const t0 = performance.now()
    const frame = (now: number) => {
      const t = still ? 5.1 : (now - t0) / 1000
      drawWater(g, w, h, t, 0.54)
      const s = Math.max(0.95, Math.min(2.1, w / 330))
      // 제자리에서 앞으로 — 물이 흐르고 사람은 화면 가운데를 지킨다
      const drift = still ? 0 : Math.sin(t * 0.32) * w * 0.07
      drawSideSwimmer(g, w * 0.46 + drift, h * 0.54, s, still ? 4.1 : t * 3.1)
      if (live && !still) raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(
      ([e]) => {
        if (still) return
        if (e.isIntersecting && !live) {
          live = true
          raf = requestAnimationFrame(frame)
        } else if (!e.isIntersecting) {
          live = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(cv)

    return () => {
      live = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="block h-[260px] w-full sm:h-[320px] lg:h-full lg:min-h-[460px]"
    />
  )
}
