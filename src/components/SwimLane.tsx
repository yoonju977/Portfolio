import { useEffect, useRef } from 'react'
import { reduced } from '../lib/anim'

/**
 * 레인 한 줄. 파도 아래에서 계속 앞으로 가는 사람.
 * 캔버스 좌표: y = 0 이 수면.
 */
export default function SwimLane() {
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D | null
    if (!ctx) return
    const g2 = ctx

    let w = 0
    let h = 0
    let raf = 0
    let running = true
    const still = reduced()

    const DEEP = 'rgba(76,227,198,'

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      g2.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // ---- bubbles ----
    type B = { x: number; y: number; r: number; vy: number; vx: number; life: number }
    const bubbles: B[] = []

    const surfaceY = () => h * 0.34

    function drawWater(t: number) {
      const sy = surfaceY()
      // body of water
      const g = g2.createLinearGradient(0, sy, 0, h)
      g.addColorStop(0, 'rgba(76,227,198,0.16)')
      g.addColorStop(0.55, 'rgba(38,120,120,0.10)')
      g.addColorStop(1, 'rgba(6,17,26,0)')
      g2.fillStyle = g
      g2.beginPath()
      g2.moveTo(0, h)
      g2.lineTo(0, sy)
      for (let x = 0; x <= w; x += 8) {
        const y =
          sy +
          Math.sin(x * 0.012 + t * 0.9) * 8 +
          Math.sin(x * 0.03 - t * 1.6) * 3.2
        g2.lineTo(x, y)
      }
      g2.lineTo(w, h)
      g2.closePath()
      g2.fill()

      // surface strokes
      const layers = [
        { a: 9, k: 0.012, s: 0.9, o: 0.62, dy: 0 },
        { a: 5.2, k: 0.026, s: -1.4, o: 0.34, dy: 7 },
        { a: 3, k: 0.044, s: 2.1, o: 0.2, dy: 14 },
      ]
      layers.forEach((L) => {
        g2.beginPath()
        for (let x = 0; x <= w; x += 6) {
          const y = sy + L.dy + Math.sin(x * L.k + t * L.s) * L.a
          if (x === 0) g2.moveTo(x, y)
          else g2.lineTo(x, y)
        }
        g2.strokeStyle = DEEP + L.o + ')'
        g2.lineWidth = 1.2
        g2.stroke()
      })
    }

    function drawLaneRope(t: number, y: number) {
      const drift = ((t * 9) % 26) - 26
      for (let x = drift; x < w + 26; x += 13) {
        const i = Math.round((x - drift) / 13)
        g2.beginPath()
        g2.arc(x, y + Math.sin(x * 0.02 + t) * 1.4, 3.1, 0, Math.PI * 2)
        g2.fillStyle = i % 4 === 0 ? 'rgba(228,162,77,0.55)' : 'rgba(76,227,198,0.28)'
        g2.fill()
      }
    }

    /** 자유형 한 사이클. phase 0 = 손이 물에 들어가는 순간. */
    function drawSwimmer(cx: number, sy: number, phase: number, scale: number) {
      const roll = Math.sin(phase) * 0.1
      const bob = Math.sin(phase * 2) * 2.2

      g2.save()
      g2.translate(cx, sy + 20 * scale + bob)
      g2.scale(scale, scale)
      g2.rotate(roll * 0.5)

      const strokeSub = 'rgba(232,242,243,0.46)'

      // ---- legs (flutter) ----
      const kick = (off: number) => {
        const a = Math.sin(phase * 2 + off) * 0.3
        g2.beginPath()
        g2.moveTo(-40, 1)
        g2.quadraticCurveTo(-58, 1 + a * 14, -76, 2 + a * 28)
        g2.strokeStyle = strokeSub
        g2.lineWidth = 4.4
        g2.lineCap = 'round'
        g2.stroke()
      }
      kick(0)
      kick(Math.PI)

      // ---- torso ----
      g2.beginPath()
      g2.moveTo(28, -8)
      g2.quadraticCurveTo(0, -10.5, -22, -6)
      g2.quadraticCurveTo(-34, -4, -42, -1)
      g2.quadraticCurveTo(-34, 3, -22, 6)
      g2.quadraticCurveTo(0, 10.5, 28, 8)
      g2.closePath()
      g2.fillStyle = 'rgba(232,242,243,0.9)'
      g2.fill()

      // ---- head ----
      g2.beginPath()
      g2.arc(38, -1, 8, 0, Math.PI * 2)
      g2.fillStyle = 'rgba(232,242,243,0.95)'
      g2.fill()

      // ---- arms ----
      const arm = (th: number) => {
        const px = 26
        const py = -2
        const L = 46
        const above = Math.sin(th) < 0
        const bend = above ? 0.62 : -0.46
        const hx = px + Math.cos(th) * L
        const hy = py + Math.sin(th) * L
        const ex = px + Math.cos(th + bend) * L * 0.58
        const ey = py + Math.sin(th + bend) * L * 0.58
        g2.beginPath()
        g2.moveTo(px, py)
        g2.quadraticCurveTo(ex, ey, hx, hy)
        g2.strokeStyle = above ? '#ffffff' : strokeSub
        g2.lineWidth = above ? 6 : 5.2
        g2.lineCap = 'round'
        g2.stroke()
        return { hx, hy, above }
      }
      const a1 = arm(phase)
      arm(phase + Math.PI)

      g2.restore()
      return a1
    }

    let t0 = performance.now()

    const frame = (now: number) => {
      const t = (now - t0) / 1000
      g2.clearRect(0, 0, w, h)
      drawWater(still ? 0 : t)
      drawLaneRope(still ? 0 : t, surfaceY() - 26)
      drawLaneRope(still ? 0 : t + 4, h - 12)

      const scale = Math.max(0.62, Math.min(1.05, w / 1080))
      const span = w + 320
      const travel = still ? w * 0.42 : ((t * 62) % span) - 170
      const phase = still ? 1.25 : t * 3.0
      const sy = surfaceY()

      const hand = drawSwimmer(travel, sy, phase, scale)

      // 손이 들어가는 지점의 물보라
      if (!still && hand.above === false && Math.abs(Math.sin(phase)) < 0.22) {
        for (let i = 0; i < 2; i++) {
          bubbles.push({
            x: travel + hand.hx * scale,
            y: sy + 6 + Math.random() * 6,
            r: 1 + Math.random() * 2.2,
            vy: -8 - Math.random() * 14,
            vx: -14 - Math.random() * 18,
            life: 1,
          })
        }
      }
      if (!still && Math.random() < 0.18) {
        bubbles.push({
          x: travel - 80 * scale,
          y: sy + 18 + Math.random() * 16,
          r: 0.8 + Math.random() * 1.8,
          vy: -10 - Math.random() * 10,
          vx: -6 - Math.random() * 8,
          life: 1,
        })
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        b.x += b.vx * 0.016
        b.y += b.vy * 0.016
        b.life -= 0.012
        if (b.life <= 0 || b.y < sy - 6) {
          bubbles.splice(i, 1)
          continue
        }
        g2.beginPath()
        g2.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        g2.fillStyle = DEEP + (0.5 * b.life).toFixed(3) + ')'
        g2.fill()
      }
      if (bubbles.length > 260) bubbles.splice(0, bubbles.length - 260)

      if (running && !still) raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(
      ([e]) => {
        if (still) return
        if (e.isIntersecting && !running) {
          running = true
          t0 = performance.now() - 1000
          raf = requestAnimationFrame(frame)
        } else if (!e.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(cv)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full" aria-hidden="true">
      <canvas ref={cvRef} className="block h-[170px] w-full md:h-[230px]" />
    </div>
  )
}
