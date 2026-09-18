import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'top', n: '00', label: 'Intro' },
  { id: 'endurance', n: '01', label: '지구력' },
  { id: 'numbers', n: '02', label: '숫자' },
  { id: 'works', n: '03', label: '프로젝트' },
  { id: 'stack', n: '04', label: '기술' },
  { id: 'path', n: '05', label: '경로' },
  { id: 'pod', n: '06', label: '지금' },
  { id: 'contact', n: '07', label: '연락' },
]

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div
      className="fixed left-0 right-0 z-[95] h-[3px] bg-transparent"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
      aria-hidden="true"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-water"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export function SideRail() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="섹션"
      className="fixed left-0 top-0 z-[80] hidden h-full w-[72px] flex-col items-center justify-center gap-6 border-r border-rule bg-paper min-[1000px]:flex"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex flex-col items-center gap-2">
            <span
              className={`u-num text-[11px] tracking-widest transition-colors ${
                on ? 'text-water' : 'text-ink-3 group-hover:text-ink'
              }`}
            >
              {s.n}
            </span>
            <span
              className={`block w-[2px] transition-all ${
                on ? 'h-7 bg-water' : 'h-3 bg-rule group-hover:h-5'
              }`}
            />
            <span className="sr-only">{s.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
