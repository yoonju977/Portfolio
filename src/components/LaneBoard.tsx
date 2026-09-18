import { useEffect, useRef } from 'react'
import { reduced } from '../lib/anim'
import { drawLaneStrip, drawSideSwimmer } from '../lib/pool'

/**
 * 레인 한 줄을 프로젝트 수만큼 등분한 보드.
 * 히어로에서 헤엄치던 그 사람이 내려와, 왼쪽에서 오른쪽으로 레인을 완주한다.
 */
export default function LaneBoard({
  progress,
  segments,
}: {
  progress: number
  segments: number
}) {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const pRef = useRef(progress)
  pRef.current = progress

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const g = cv.getContext('2d')
    if (!g) return
    const still = reduced()

    let w = 0
    let h = 0
    let raf = 0
    let live = true
    let entry = still ? 1 : 0

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
      const p = Math.min(1, Math.max(0, pRef.current))
      const { x, sy } = drawLaneStrip(g, w, h, t, segments, p)
      const s = Math.max(0.62, Math.min(1.15, w / 760))
      // 처음 보일 때 왼쪽 밖에서 들어온다
      entry = Math.min(1, entry + 0.035)
      const ex = -70 + (x + 70) * (entry * entry * (3 - 2 * entry))
      drawSideSwimmer(g, ex, sy, s, still ? 4.1 : t * 3.1)
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
  }, [segments])

  return (
    <canvas
      ref={cvRef}
      aria-hidden="true"
      className="block h-[124px] w-full md:h-[150px]"
    />
  )
}
