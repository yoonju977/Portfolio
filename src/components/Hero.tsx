import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile, marquee } from '../data/profile'
import { reduced } from '../lib/anim'
import HeroPool from './HeroPool'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!root.current || reduced()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-hero-line] > span', { yPercent: 108, duration: 1.05, stagger: 0.13 })
        .from('[data-hero-meta]', { y: 14, opacity: 0, duration: 0.65, stagger: 0.08 }, 0.4)
        .from('[data-hero-pool]', { opacity: 0, duration: 0.9 }, 0.25)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header
      id="top"
      ref={root}
      className="border-b border-rule bg-paper"
      style={{ paddingLeft: 'var(--rail)' }}
    >
      <div
        className="mx-auto w-full max-w-[1320px] pb-0 pt-9 md:pt-12"
        style={{ paddingInline: 'var(--gutter)' }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <span data-hero-meta className="u-label">
            {profile.role}
          </span>
          <span data-hero-meta className="u-num text-[11px] tracking-[0.3em] text-ink-3">
            {profile.year}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
          <div className="flex flex-col justify-between gap-10">
            <h1 className="u-display">
              <span data-hero-line className="reveal-line">
                <span className="block text-[clamp(3.2rem,11vw,8.6rem)]">Song</span>
              </span>
              <span data-hero-line className="reveal-line">
                <span className="block text-[clamp(3.2rem,11vw,8.6rem)]">Yoon Ju</span>
              </span>
              <span data-hero-line className="reveal-line mt-4">
                <span className="u-ko block text-[clamp(1.3rem,3.6vw,2.45rem)] text-water">
                  그럼에도 불구하고&nbsp;해내는 사람
                </span>
              </span>
            </h1>

            <div className="flex flex-col gap-6 border-t border-rule pt-7">
              <p data-hero-meta className="u-body text-[15px] leading-[1.95] md:text-[16.5px]">
                {profile.bio}
              </p>
              <div data-hero-meta className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="u-label mb-1.5 text-ink-3">한 줄 정의</p>
                  <p className="max-w-[38ch] text-[14px] font-semibold leading-[1.7] md:text-[15px]">
                    {profile.oneLine}
                  </p>
                </div>
                <a
                  href="#works"
                  className="u-num inline-flex items-center gap-2 border-b-2 border-water pb-1 text-[12px] uppercase tracking-[0.18em] text-water"
                >
                  헤엄쳐 온 길 <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div
            data-hero-pool
            className="relative -mx-[var(--gutter)] lg:mx-0 lg:h-auto"
            aria-hidden="true"
          >
            <HeroPool />
            <div className="pointer-events-none absolute bottom-0 left-0 hidden p-5 lg:block">
              <p className="u-num text-[10px] uppercase tracking-[0.22em] text-white/85">
                Lane 03 · 자유형 · 25m
              </p>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </header>
  )
}

function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="mt-12 overflow-hidden border-t border-rule bg-water text-white md:mt-16">
      <div className="marquee-track py-2.5">
        {items.map((t, i) => (
          <span
            key={i}
            className="u-num flex shrink-0 items-center gap-6 whitespace-nowrap px-6 text-[12px] font-semibold uppercase tracking-[0.14em]"
          >
            {t}
            <span aria-hidden="true" className="opacity-55">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
