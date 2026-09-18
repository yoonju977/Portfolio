import { useEffect, useRef, useState } from 'react'
import { reduced } from '../lib/anim'

type Line = { kind: 'cmd' | 'head' | 'row' | 'blank' | 'note'; text: string; ok?: boolean }

const LINES: Line[] = [
  { kind: 'cmd', text: 'kubectl get pods -n hire-2027' },
  { kind: 'head', text: 'NAME          READY   STATUS    RESTARTS   AGE' },
  { kind: 'row', text: 'song-yoonju   6/6     Running   0          6y8m', ok: true },
  { kind: 'blank', text: '' },
  { kind: 'cmd', text: 'kubectl describe pod song-yoonju' },
  { kind: 'head', text: 'Name:         song-yoonju' },
  { kind: 'head', text: 'Namespace:    hire-2027' },
  { kind: 'head', text: 'Node:         lane-08/finished' },
  { kind: 'head', text: 'Labels:       role=backend-infra' },
  { kind: 'head', text: '              endurance=true' },
  { kind: 'blank', text: '' },
  { kind: 'head', text: 'Containers:' },
  { kind: 'row', text: '  procedure-first    Running   반복을 절차로 바꾼다', ok: true },
  { kind: 'row', text: '  measure-the-loss   Running   무엇을 내주었는지 잰다', ok: true },
  { kind: 'row', text: '  keep-it-running    Running   정확도보다 멈추지 않는 것', ok: true },
  { kind: 'row', text: '  full-cycle-solo    Running   혼자서도 끝을 본다', ok: true },
  { kind: 'row', text: '  field-6y8m         Running   고객 접점에서 배운 것', ok: true },
  { kind: 'row', text: '  still-learning     Running   배울 체력과 담아둘 공간', ok: true },
  { kind: 'blank', text: '' },
  { kind: 'head', text: 'Events:       <none>' },
  { kind: 'note', text: '# 여덟 개 레인을 완주했고, 그때 만든 것들이 지금도 돌아가고 있습니다.' },
]

function renderLine(l: Line, i: number) {
  if (l.kind === 'blank') return <div key={i}>&nbsp;</div>
  if (l.kind === 'cmd')
    return (
      <div key={i} className="whitespace-pre">
        <span className="text-term-green">$ </span>
        <span className="text-term-fg">{l.text}</span>
      </div>
    )
  if (l.kind === 'note')
    return (
      <div key={i} className="whitespace-pre-wrap text-[#7d8a95]">
        {l.text}
      </div>
    )
  if (l.kind === 'row') {
    const idx = l.text.indexOf('Running')
    return (
      <div key={i} className="whitespace-pre">
        <span className="text-term-fg">{l.text.slice(0, idx)}</span>
        <span className="font-semibold text-term-green">Running</span>
        <span className="text-[#9aa6b1]">{l.text.slice(idx + 7)}</span>
      </div>
    )
  }
  return (
    <div key={i} className="whitespace-pre text-[#9aa6b1]">
      {l.text}
    </div>
  )
}

export default function Terminal() {
  const [n, setN] = useState(LINES.length)
  const ref = useRef<HTMLElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    setN(0)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played.current) return
        played.current = true
        let i = 0
        const tick = () => {
          i += 1
          setN(i)
          if (i < LINES.length) {
            const d = LINES[i - 1]?.kind === 'cmd' ? 230 : 95
            timer = window.setTimeout(tick, d)
          }
        }
        let timer = window.setTimeout(tick, 260)
        cleanup = () => window.clearTimeout(timer)
      },
      { threshold: 0.25 },
    )
    let cleanup = () => {}
    io.observe(el)
    return () => {
      io.disconnect()
      cleanup()
    }
  }, [])

  const running = n < LINES.length

  return (
    <section
      id="pod"
      ref={ref}
      className="border-b border-[#11161c]"
      style={{
        paddingLeft: 'var(--rail)',
        background:
          'linear-gradient(180deg, #f6f3ec 0%, #f1efe8 16%, #ccd6dd 29%, #6c7b87 42%, #1e2830 58%, #11161c 74%, #11161c 100%)',
      }}
      aria-labelledby="pod-title"
    >
      <div
        className="mx-auto w-full max-w-[1320px] py-20 md:py-28"
        style={{ paddingInline: 'var(--gutter)' }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="min-w-0">
            <p className="u-label mb-4 flex items-center gap-3">
              <span className="text-ink-3">06</span>
              <span aria-hidden="true" className="h-px w-8 bg-rule" />
              Still running
            </p>
            <h2 id="pod-title" className="u-ko text-[clamp(1.75rem,5.2vw,3.4rem)]">
              완주한 레인은 멈추지 않습니다
            </h2>
          </div>
          <p className="max-w-[44ch] text-[14px] leading-[1.9] text-ink-2 md:text-right md:text-[15px]">
            프로젝트를 끝냈다는 말은 배포하고 손을 뗐다는 뜻이 아닙니다. 지금도 떠 있는 것,
            아직 제가 답할 수 있는 것만 컨테이너로 세었습니다.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div className="term-bar flex items-center gap-2 rounded-t-[3px] px-4 py-2.5">
            <span className="h-[11px] w-[11px] rounded-full bg-[#e14b3a]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#e2a72f]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#46d07f]" />
            <span className="u-num ml-3 text-[11px] text-[#7d8a95]">
              song-yoonju — kubectl — 96×32
            </span>
          </div>
          <div
            className="term overflow-x-auto px-4 py-5 md:px-6 md:py-7"
            style={{ background: 'linear-gradient(180deg, #11161c 0%, #11161c 48%, rgba(17,22,28,0.35) 88%, rgba(17,22,28,0) 100%)' }}
          >
            <div className="min-w-[46ch]">
              {LINES.slice(0, n).map(renderLine)}
              {running && (
                <div>
                  <span className="text-term-green">$ </span>
                  <span className="caret" />
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="u-num mt-4 text-[11px] leading-relaxed text-[#8b96a0]">
          READY 6/6 — 위 여섯 가지는 이 페이지 안에서 근거를 댈 수 있는 것들입니다.
          RESTARTS 0 은 실패가 없었다는 뜻이 아니라, 실패한 자리마다 절차를 남겨 같은 이유로 다시
          내려가지 않았다는 뜻입니다.
        </p>
      </div>
    </section>
  )
}
