// 프로젝트 행을 펼칠 때 보이는 아키텍처 이미지와 사전 로딩.
// 행이 펼쳐질 때 <img>가 처음 마운트되므로, 미리 받아 두지 않으면 클릭 시점에 다운로드가 시작된다.

// 프로젝트 index → [라벨, 경로, 가로, 세로]
export const ARCHS: Record<number, [string, string, number, number][]> = {
  1: [['클라우드 아키텍처', './img/medevise_cloud.webp', 1600, 1048], ['시스템 아키텍처', './img/medevise_system.webp', 1600, 946]],
  2: [['클라우드 아키텍처', './img/bowwow_cloud.webp', 1081, 856], ['시스템 아키텍처', './img/bowwow_system.webp', 1600, 1076]],
  3: [['클라우드 아키텍처', './img/hunsu_cloud.webp', 1329, 916], ['시스템 아키텍처', './img/hunsu_system.webp', 1600, 984]],
  8: [['시스템 아키텍처', './img/hanloop_system.webp', 1600, 900]],
}

// GC로 사라지지 않도록 참조를 들고 있는다.
const warmed = new Map<string, HTMLImageElement>()

function warm(src: string, high: boolean) {
  if (warmed.has(src)) return
  const img = new Image()
  img.decoding = 'async'
  if (high) img.setAttribute('fetchpriority', 'high')
  img.src = src
  warmed.set(src, img)
  img.decode?.().catch(() => {})
}

// 사용자가 행에 손을 올리거나(hover/focus/touch) 누르기 직전에 해당 이미지를 우선 요청.
export function warmArch(idx: number) {
  ;(ARCHS[idx] || []).forEach((a) => warm(a[1], true))
}

// 첫 화면이 다 뜬 뒤 남는 시간에 전부 받아 둔다. 데이터 절약 모드면 건너뛴다.
export function preloadArchesWhenIdle() {
  const conn = (navigator as any).connection
  if (conn && conn.saveData) return
  const run = () => Object.keys(ARCHS).forEach((k) => ARCHS[+k].forEach((a) => warm(a[1], false)))
  const idle = () =>
    'requestIdleCallback' in window ? (window as any).requestIdleCallback(run, { timeout: 3000 }) : setTimeout(run, 1200)
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
}
