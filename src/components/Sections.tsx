import {
  endurance,
  strengths,
  kpis,
  stackMatrix,
  timeline,
  education,
  certs,
  profile,
} from '../data/profile'
import { useCountUp, useReveal } from '../lib/anim'
import Section from './Section'
import { KnitBackdrop, YarnThread } from './Knit'

export function Endurance() {
  const ref = useReveal<HTMLDivElement>('[data-rv]', { y: 24, stagger: 0.09 })
  return (
    <Section
      id="endurance"
      n="01"
      label="What carries me"
      title={endurance.headline}
      lead="AI가 더 빨리 더 많이 푸는 시대에, 사람에게 남는 것은 지구력이라고 생각합니다."
      tone="alt"
      backdrop={<KnitBackdrop />}
    >
      <div ref={ref} className="mt-14 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-5">
          {endurance.body.map((p, i) => (
            <p key={i} data-rv className="u-body text-[15px] leading-[1.95]">
              {p}
            </p>
          ))}
          <div data-rv className="mt-3 flex flex-col gap-2">
            <YarnThread className="h-[44px] w-full max-w-[420px]" />
            <p className="u-num text-[12px] uppercase tracking-[0.2em] text-yarn">
              수영 · 뜨개질 — 반복이 결과를 만든다
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {strengths.map((s) => (
            <div key={s.n} data-rv className="flex flex-col gap-3 bg-paper-2 p-6 md:p-7">
              <span className="u-num text-[11px] tracking-[0.2em] text-water">{s.n}</span>
              <h3 className="text-[17px] font-extrabold leading-snug tracking-[-0.03em]">
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.8] text-ink-2">{s.body}</p>
              <p className="u-num mt-auto pt-3 text-[11px] text-ink-3">{s.proof}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Numbers() {
  const ref = useReveal<HTMLDivElement>('[data-kpi]', { y: 18, stagger: 0.07 })
  return (
    <Section
      id="numbers"
      n="02"
      label="By the numbers"
      title="검증할 수 있는 것만 적었습니다"
      lead="증빙이 없는 수상과 순위는 이 페이지에 없습니다. 아래는 논문 표, 포스터, 증명서로 확인되는 값입니다."
      tone="blue"
    >
      <div ref={ref} className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <Kpi key={k.label} value={k.value} label={k.label} note={k.note} />
        ))}
      </div>
    </Section>
  )
}

function Kpi({ value, label, note }: { value: string; label: string; note?: string }) {
  const numeric = /^[\d,.]+$/.test(value)
  const ref = useCountUp(numeric ? value : '')
  return (
    <div data-kpi className="flex flex-col gap-2 bg-paper-3 px-6 py-8 md:px-8 md:py-10">
      <span className="u-num text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-none text-water">
        {numeric ? <span ref={ref}>{value}</span> : value}
      </span>
      <span className="mt-1 text-[14px] font-semibold leading-snug">{label}</span>
      {note && <span className="text-[12px] leading-snug text-ink-3">{note}</span>}
    </div>
  )
}

export function Stack() {
  const ref = useReveal<HTMLDivElement>('[data-rv]', { y: 20, stagger: 0.06 })
  return (
    <Section
      id="stack"
      n="04"
      label="Stack"
      title="근거가 있는 기술만 적었습니다"
      lead="영역마다 어느 프로젝트에서 썼는지 함께 적었습니다. 써 본 적 없는 도구는 올리지 않았습니다."
      tone="alt"
    >
      <div ref={ref} className="mt-12 grid gap-px bg-rule lg:grid-cols-3">
        {stackMatrix.map((g) => (
          <div key={g.area} data-rv className="flex flex-col gap-4 bg-paper-2 p-6 md:p-7">
            <h3 className="text-[15px] font-extrabold tracking-[-0.02em]">{g.area}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i} className="u-num border border-rule px-2.5 py-1 text-[11px] text-ink-2">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-rule pt-3 text-[12px] leading-snug text-ink-3">
              근거 · {g.proof}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Path() {
  const ref = useReveal<HTMLDivElement>('[data-rv]', { y: 18, stagger: 0.07 })
  return (
    <Section
      id="path"
      n="05"
      label="Where I came from"
      title="고객 데스크 6년 8개월, 그 옆에서 끝낸 학위"
      lead="현장에서 반복 민원을 절차로 바꾸던 감각이 지금 배포 체크리스트와 롤백 절차가 되었습니다."
    >
      <div ref={ref} className="mt-12 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="u-label mb-6 text-ink-3">한국마사회 · 2019.10 – 2026.06</p>
          <ol className="flex flex-col">
            {timeline.map((t) => (
              <li
                key={t.period}
                data-rv
                className="grid gap-2 border-t border-rule py-6 md:grid-cols-[0.34fr_0.66fr] md:gap-8"
              >
                <div>
                  <p className="u-num text-[12px] text-water">{t.period}</p>
                  <p className="u-num mt-1 text-[11px] text-ink-3">{t.org}</p>
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold">{t.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-ink-2">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="u-num mt-6 border-t border-rule pt-5 text-[12px] leading-relaxed text-ink-3">
            2025.08 학위 취득으로 SW 직무 전환 확정 → 진행 중이던 프로젝트를 마친 뒤 2026.06 퇴직
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <p className="u-label mb-6 text-ink-3">교육 · 학력</p>
            <ul className="flex flex-col">
              {education.map((e) => (
                <li key={e.name} data-rv className="border-t border-rule py-5">
                  <p className="u-num text-[11px] text-ink-3">{e.period}</p>
                  <p className="mt-1 text-[14px] font-semibold leading-snug">{e.name}</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-2">{e.org}</p>
                  <p className="u-num mt-1 text-[11px] text-ink-3">{e.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="u-label mb-6 text-ink-3">자격 · 어학</p>
            <ul className="flex flex-col">
              {certs.map((c) => (
                <li
                  key={c.name}
                  data-rv
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-4"
                >
                  <span className="text-[14px] font-semibold">{c.name}</span>
                  <span className="u-num text-[11px] text-ink-3">
                    {c.org} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        paddingLeft: 'var(--rail)',
        background:
          'linear-gradient(180deg, #11161c 0px, #1c252d 70px, #7d8a94 150px, #e8eae6 230px, #ffffff 300px)',
      }}
    >
      <div
        className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10 pb-20 pt-[300px] md:pb-28"
        style={{ paddingInline: 'var(--gutter)' }}
      >
        <p className="u-label flex items-center gap-3">
          <span className="text-ink-3">07</span>
          <span aria-hidden="true" className="h-px w-8 bg-rule" />
          Contact
        </p>

        <h2 className="u-display text-[clamp(2.8rem,10vw,7.5rem)] leading-[0.92]">
          <span className="block">Let&rsquo;s</span>
          <span className="block text-water">Talk.</span>
        </h2>

        <div className="grid gap-8 border-t border-rule pt-10 md:grid-cols-3">
          <div>
            <p className="u-label mb-3 text-ink-3">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="text-[15px] font-semibold underline-offset-4 hover:text-water hover:underline md:text-[17px]"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="u-label mb-3 text-ink-3">GitHub</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[15px] font-semibold underline-offset-4 hover:text-water hover:underline md:text-[17px]"
            >
              github.com/yoonju977
            </a>
          </div>
          <div>
            <p className="u-label mb-3 text-ink-3">Based in</p>
            <p className="text-[15px] font-semibold md:text-[17px]">
              {profile.location}, 대한민국
            </p>
          </div>
        </div>

        <p className="u-num max-w-[62ch] text-[11.5px] leading-relaxed text-ink-3">
          이 페이지의 모든 수치는 논문 표, 포스터, 수료증, 공적 증명서로 확인된 값만 적었습니다.
          증빙이 없는 수상·순위는 넣지 않았습니다. · 최종 갱신 2026.09
        </p>
      </div>
    </footer>
  )
}
