import { useId } from 'react'

/**
 * 메리야스 한 코 — V 자. 두 다리가 위로 벌어지고 바닥에서 만난다.
 * 굵은 선 + 둥근 끝으로 그려 레퍼런스의 또렷한 V 모양을 낸다.
 */
export function stitchPath(x: number, y: number, w: number, h: number) {
  const hw = w / 2
  const bx = x
  const by = y + h * 0.84
  return (
    `M ${x - hw} ${y + h * 0.05} Q ${x - hw * 0.5} ${y + h * 0.5} ${bx} ${by} ` +
    `M ${x + hw} ${y + h * 0.05} Q ${x + hw * 0.5} ${y + h * 0.5} ${bx} ${by}`
  )
}

/**
 * 프로젝트 목록 뒤에 깔리는 편물.
 * 레인을 완주할 때마다 두 줄씩, 위에서부터 떠진다.
 */
export function KnitFabric({ filled, total }: { filled: number; total: number }) {
  const id = useId()
  const SW = 30
  const SH = 24
  const ratio = total > 0 ? Math.min(1, Math.max(0, filled / total)) : 0

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full">
        <defs>
          <pattern id={`kf-${id}`} width={SW} height={SH} patternUnits="userSpaceOnUse">
            <path
              d={stitchPath(SW / 2, 0, SW * 0.72, SH)}
              fill="none"
              stroke="#e2602f"
              strokeWidth={SW * 0.2}
              strokeLinecap="round"
            />
          </pattern>
          <pattern id={`kg-${id}`} width={SW} height={SH} patternUnits="userSpaceOnUse">
            <path
              d={stitchPath(SW / 2, 0, SW * 0.72, SH)}
              fill="none"
              stroke="#b9b2a4"
              strokeWidth={SW * 0.2}
              strokeLinecap="round"
            />
          </pattern>
          <linearGradient id={`kfade-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="88%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.25" />
          </linearGradient>
          <mask id={`kmask-${id}`}>
            <rect
              x="0"
              y="0"
              width="100%"
              height={`${ratio * 100}%`}
              fill={`url(#kfade-${id})`}
            />
          </mask>
        </defs>
        {/* 아직 뜨지 않은 코 */}
        <rect width="100%" height="100%" fill={`url(#kg-${id})`} opacity={0.2} />
        {/* 떠진 코 */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#kf-${id})`}
          opacity={0.26}
          mask={`url(#kmask-${id})`}
        />
      </svg>
    </div>
  )
}

/** 지구력 섹션 바닥에 깔리는 편물. */
export function KnitBackdrop() {
  const id = useId()
  const SW = 34
  const SH = 27
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full">
        <defs>
          <pattern id={`kb-${id}`} width={SW} height={SH} patternUnits="userSpaceOnUse">
            <path
              d={stitchPath(SW / 2, 0, SW * 0.72, SH)}
              fill="none"
              stroke="#e2602f"
              strokeWidth={SW * 0.2}
              strokeLinecap="round"
            />
          </pattern>
          <linearGradient id={`kfd-${id}`} x1="1" y1="0" x2="0.1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`kmk-${id}`}>
            <rect width="100%" height="100%" fill={`url(#kfd-${id})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#kb-${id})`}
          opacity={0.3}
          mask={`url(#kmk-${id})`}
        />
      </svg>
    </div>
  )
}

/** 풀린 실 한 가닥 — 빠진 코를 되짚는 자리. */
export function YarnThread({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 60"
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 30 C 34 6, 62 54, 96 30 S 158 6, 192 30 S 254 54, 288 30 S 350 6, 384 30 C 398 40, 408 46, 420 34"
        stroke="#e2602f"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="420" cy="34" r="3.5" fill="#e2602f" />
    </svg>
  )
}
