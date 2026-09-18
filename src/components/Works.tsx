import { useCallback, useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../data/profile'
import Section from './Section'
import LaneBoard from './LaneBoard'
import { KnitFabric } from './Knit'

const DOMAIN_LABEL: Record<Project['domain'], string> = {
  AI: '딥러닝',
  Infra: '인프라 · 운영',
  Backend: '백엔드',
  Product: '프로덕트',
}

export default function Works() {
  const [open, setOpen] = useState<string | null>(projects[0].id)
  const [prog, setProg] = useState<number[]>(() => projects.map((_, i) => (i === 0 ? 1 : 0)))
  const rows = useRef<(HTMLElement | null)[]>([])

  const measure = useCallback(() => {
    const vh = window.innerHeight || 800
    setProg(
      projects.map((_, i) => {
        const el = rows.current[i]
        if (!el) return 0
        const top = el.getBoundingClientRect().top
        const p = (vh * 0.86 - top) / (vh * 0.5)
        return Math.min(1, Math.max(0, p))
      }),
    )
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        measure()
        ticking = false
      })
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [measure, open])

  const overall = prog.reduce((a, b) => a + b, 0) / projects.length
  const done = prog.filter((p) => p >= 0.995).length
  const rowsKnitted = done * 2
  const totalRows = projects.length * 2

  return (
    <Section
      id="works"
      n="03"
      label="Eight lanes"
      title="여덟 개를 끝까지 했습니다"
      lead="레인 하나를 여덟 구간으로 나눴습니다. 읽어 내려갈수록 한 구간씩 나아가고, 그만큼 뒤에서 편물이 떠집니다."
      clip={false}
    >
      <div className="sticky top-0 z-30 -mt-2 bg-paper pb-3 pt-5">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="u-label">헤엄쳐 온 길</span>
          <span className="u-num text-[12px] text-ink-2">
            완주 <b className="text-water">{String(done).padStart(2, '0')}</b> / {projects.length}
            <span className="mx-2 text-ink-3">·</span>
            편물 <b className="text-yarn">{String(rowsKnitted).padStart(2, '0')}</b> / {totalRows} 줄
          </span>
        </div>

        <LaneBoard progress={overall} segments={projects.length} />

        <ul className="mt-1.5 flex px-[14px]">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className={`u-num flex-1 text-[10px] ${
                prog[i] >= 0.995 ? 'text-water' : 'text-ink-3'
              }`}
            >
              {p.index}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-3">
        <KnitFabric filled={rowsKnitted} total={totalRows} />

        <div className="relative border-t border-rule">
          {projects.map((p, i) => {
            const isOpen = open === p.id
            return (
              <article
                key={p.id}
                ref={(el) => {
                  rows.current[i] = el
                }}
                className="border-b border-rule"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${p.id}`}
                    data-open={isOpen ? 'true' : 'false'}
                    className="work-row flex w-full items-baseline gap-4 py-6 text-left md:gap-6 md:py-7"
                  >
                    <span className="u-num work-dim shrink-0 text-[12px] text-ink-3">
                      {p.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="work-swap block text-[19px] font-extrabold leading-tight tracking-[-0.03em] md:text-[26px]">
                        {p.name}
                      </span>
                      <span className="work-dim mt-1 block text-[13px] leading-snug text-ink-2 md:text-[14.5px]">
                        {p.subtitle}
                      </span>
                    </span>
                    <span className="u-num work-dim hidden shrink-0 text-[12px] text-ink-3 md:block">
                      {DOMAIN_LABEL[p.domain]}
                    </span>
                    <span className="u-num work-dim hidden shrink-0 text-[12px] text-ink-3 xl:block">
                      {p.period}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`work-swap shrink-0 text-[18px] text-water transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div id={`panel-${p.id}`} hidden={!isOpen}>
                  <Detail p={p} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function Detail({ p }: { p: Project }) {
  return (
    <div className="grid gap-9 pb-12 xl:grid-cols-[1.3fr_0.7fr] xl:gap-12">
      <div className="flex flex-col gap-7">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-rule py-5 sm:grid-cols-4">
          {[
            ['기간', p.period],
            ['소속', p.org],
            ['역할', p.role],
            ['규모', p.team],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="u-label mb-1 text-ink-3">{k}</dt>
              <dd className="text-[13px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>

        <Block title="문제">
          <p className="u-body text-[15px]">{p.problem}</p>
        </Block>

        <Block title="내가 한 것">
          <ul className="flex flex-col gap-3">
            {p.did.map((d, i) => (
              <li key={i} className="flex gap-4 text-[15px] leading-[1.8] text-ink-2">
                <span className="u-num mt-[3px] shrink-0 text-[11px] text-water">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="결과">
          <p className="text-[15px] leading-[1.9]">{p.result}</p>
        </Block>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-l-[3px] border-water bg-[#eaf3fc] px-5 py-4">
            <p className="u-label mb-2">얻은 것</p>
            <p className="text-[14px] leading-[1.85] text-ink-2">{p.gained}</p>
          </div>
          <div className="border-l-[3px] border-yarn bg-[#fdf3ec] px-5 py-4">
            <p className="u-label mb-2 text-yarn">한계</p>
            <p className="text-[14px] leading-[1.85] text-ink-2">{p.limit}</p>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-7">
        <div className="grid grid-cols-2 gap-px bg-rule">
          {p.numbers.map((m) => (
            <div key={m.label} className="bg-paper px-4 py-5">
              <div className="u-num text-[19px] font-semibold leading-none text-water">
                {m.value}
              </div>
              <div className="mt-2 text-[12px] leading-snug text-ink-2">{m.label}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="u-label mb-3 text-ink-3">스택</p>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="u-num border border-rule bg-paper px-2.5 py-1 text-[11px] text-ink-2"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {p.link && (
          <a
            href={p.link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="u-num inline-flex items-center gap-2 self-start border-b-2 border-water pb-1 text-[12px] text-water"
          >
            {p.link.label} <span aria-hidden="true">↗</span>
          </a>
        )}

        {p.images?.map((im) => (
          <figure key={im.src} className="flex flex-col gap-2">
            <div className="plate">
              <img src={im.src} alt={im.caption} loading="lazy" decoding="async" />
            </div>
            <figcaption className="text-[12px] leading-snug text-ink-3">{im.caption}</figcaption>
          </figure>
        ))}
      </aside>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="u-label mb-3 text-ink-3">{title}</p>
      {children}
    </div>
  )
}
