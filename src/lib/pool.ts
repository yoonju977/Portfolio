/** 옆에서 본 물과 사람. 플랫한 포스터 일러스트 톤. */

export const C = {
  water: '#2b74c8',
  waterDeep: '#1b5aa6',
  waterLight: '#4f97e0',
  under: '#8fc3ef',
  underDeep: '#6aabe4',
  foam: '#ffffff',
  suit: '#12306f',
  skin: '#f0c9a4',
  cap: '#e14b3a',
  tick: 'rgba(255,255,255,0.45)',
  tickOn: 'rgba(255,255,255,0.95)',
}

export type Ctx = CanvasRenderingContext2D

/** 물 한 면 + 수면 포말. surface 는 패널 안에서 수면이 놓이는 비율. */
export function drawWater(g: Ctx, w: number, h: number, t: number, surface: number) {
  const sy = h * surface

  const grad = g.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, C.waterLight)
  grad.addColorStop(0.45, C.water)
  grad.addColorStop(1, C.waterDeep)
  g.fillStyle = grad
  g.fillRect(0, 0, w, h)

  // 깊은 쪽 잔물결
  g.save()
  g.globalAlpha = 0.11
  g.strokeStyle = '#ffffff'
  g.lineWidth = 2
  for (let i = 1; i <= 4; i++) {
    const y = sy + i * (h - sy) * 0.22
    g.beginPath()
    for (let x = 0; x <= w; x += 10) {
      const yy = y + Math.sin(x * 0.014 + t * (0.5 + i * 0.12) + i) * (3 + i)
      if (x === 0) g.moveTo(x, yy)
      else g.lineTo(x, yy)
    }
    g.stroke()
  }
  g.restore()

  // 수면 포말 — 흰 띠 세 겹
  const band = (off: number, amp: number, k: number, sp: number, thick: number, a: number) => {
    g.save()
    g.globalAlpha = a
    g.fillStyle = C.foam
    g.beginPath()
    g.moveTo(0, sy + off + amp)
    for (let x = 0; x <= w; x += 6) {
      g.lineTo(x, sy + off + Math.sin(x * k + t * sp) * amp)
    }
    for (let x = w; x >= 0; x -= 6) {
      g.lineTo(x, sy + off + thick + Math.sin(x * k + t * sp + 0.8) * amp * 0.7)
    }
    g.closePath()
    g.fill()
    g.restore()
  }
  band(-6, 5, 0.013, 0.8, 7, 0.95)
  band(6, 3.6, 0.027, -1.2, 4, 0.55)
  band(16, 2.6, 0.04, 1.6, 3, 0.3)
}

/**
 * 옆에서 본 자유형. 오른쪽으로 간다. y = 0 이 수면.
 * phase 0 → 오른팔 입수, π → 오른팔이 뒤로 빠져 회복 시작.
 */
export function drawSideSwimmer(g: Ctx, x: number, sy: number, s: number, phase: number) {
  g.save()
  g.translate(x, sy)
  g.scale(s, s)
  g.translate(0, Math.sin(phase * 2) * 1.6)

  const kick = Math.sin(phase * 3)

  // ---------- 물속 ----------
  g.save()
  g.globalAlpha = 0.95

  // 다리
  const leg = (k: number, d: number) => {
    g.beginPath()
    g.moveTo(-42, 6)
    g.quadraticCurveTo(-62, 6 + k * 9, -82, 8 + k * 17 + d)
    g.strokeStyle = C.underDeep
    g.lineWidth = 7
    g.lineCap = 'round'
    g.stroke()
  }
  leg(kick, 0)
  leg(-kick, 2)

  // 몸통
  g.beginPath()
  g.moveTo(-46, 8)
  g.quadraticCurveTo(-10, 11, 16, 5)
  g.strokeStyle = C.under
  g.lineWidth = 18
  g.lineCap = 'round'
  g.stroke()

  // 수영복
  g.beginPath()
  g.moveTo(-30, 9)
  g.lineTo(-6, 9)
  g.strokeStyle = C.suit
  g.lineWidth = 16
  g.lineCap = 'butt'
  g.stroke()
  g.restore()

  // ---------- 팔 ----------
  const arm = (th: number) => {
    const px = 15
    const py = 0
    const L = 36
    const above = Math.sin(th) < 0
    const bend = above ? 0.66 : -0.5
    const hx = px + Math.cos(th) * L
    const hy = py + Math.sin(th) * L
    const ex = px + Math.cos(th + bend) * L * 0.56
    const ey = py + Math.sin(th + bend) * L * 0.56
    g.beginPath()
    g.moveTo(px, py)
    g.quadraticCurveTo(ex, ey, hx, hy)
    g.strokeStyle = above ? C.skin : C.under
    g.lineWidth = above ? 8 : 7
    g.lineCap = 'round'
    g.stroke()
    return { hx, hy, above }
  }
  const back = arm(phase + Math.PI)
  const front = arm(phase)

  // ---------- 수면 포말 ----------
  g.save()
  g.fillStyle = C.foam
  // 머리 앞의 바우 웨이브
  g.globalAlpha = 0.95
  g.beginPath()
  g.ellipse(31, 1, 9, 3.4, 0, 0, Math.PI * 2)
  g.fill()
  // 몸을 따라 가는 얇은 수면선
  for (let i = 0; i < 9; i++) {
    const bx = 22 - i * 12
    const r = 6.4 - i * 0.35
    g.globalAlpha = 0.62 - i * 0.055
    g.beginPath()
    g.ellipse(bx, -1 + Math.sin(phase * 2 + i * 0.8) * 0.9, r, 2.1, 0, 0, Math.PI * 2)
    g.fill()
  }
  g.restore()

  // ---------- 머리 ----------
  g.beginPath()
  g.ellipse(22, 3, 9.5, 7.6, -0.2, 0, Math.PI * 2)
  g.fillStyle = C.skin
  g.fill()
  g.beginPath()
  g.arc(24, 0, 9, Math.PI * 0.92, Math.PI * 2.1)
  g.closePath()
  g.fillStyle = C.cap
  g.fill()

  // 손 입수 물보라
  const splash = (hx: number, hy: number, on: boolean) => {
    if (!on) return
    g.save()
    g.globalAlpha = 0.85
    g.fillStyle = C.foam
    for (let i = 0; i < 4; i++) {
      g.beginPath()
      g.arc(hx + (i - 1.5) * 4, hy - 2 - Math.abs(i - 1.5) * 2, 2.6, 0, Math.PI * 2)
      g.fill()
    }
    g.restore()
  }
  splash(front.hx, front.hy, !front.above && Math.abs(Math.sin(phase)) < 0.3)
  splash(back.hx, back.hy, !back.above && Math.abs(Math.sin(phase + Math.PI)) < 0.3)

  g.restore()
}

/** 레인 한 줄을 n등분 — 지나온 구간은 밝게 표시된다. */
export function drawLaneStrip(
  g: Ctx,
  w: number,
  h: number,
  t: number,
  segments: number,
  progress: number,
) {
  const pad = 14
  const inner = w - pad * 2
  drawWater(g, w, h, t, 0.52)

  const sy = h * 0.52

  // 출발벽 / 도착벽
  g.fillStyle = 'rgba(255,255,255,0.28)'
  g.fillRect(0, 0, pad, h)
  g.fillRect(w - pad, 0, pad, h)

  // 구간 눈금
  for (let i = 0; i <= segments; i++) {
    const x = pad + (inner * i) / segments
    const on = progress * segments >= i
    g.beginPath()
    g.moveTo(x, sy + 22)
    g.lineTo(x, h - 8)
    g.strokeStyle = on ? C.tickOn : C.tick
    g.lineWidth = on ? 2.4 : 1.4
    g.setLineDash(on ? [] : [4, 6])
    g.stroke()
    g.setLineDash([])
  }

  // 지나온 물길
  const hx = pad + inner * Math.min(1, Math.max(0, progress))
  if (hx - pad > 6) {
    const wake = g.createLinearGradient(pad, 0, hx, 0)
    wake.addColorStop(0, 'rgba(255,255,255,0.14)')
    wake.addColorStop(0.75, 'rgba(255,255,255,0.09)')
    wake.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = wake
    g.fillRect(pad, sy - 24, hx - pad, 48)
  }

  return { x: hx, sy }
}
