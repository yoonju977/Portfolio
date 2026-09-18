import type { ReactNode } from 'react'

export default function Section({
  id,
  n,
  label,
  title,
  lead,
  children,
  tone = 'paper',
  backdrop,
  clip = true,
}: {
  id: string
  n: string
  label: string
  title: string
  lead?: string
  children: ReactNode
  tone?: 'paper' | 'alt' | 'blue'
  backdrop?: ReactNode
  clip?: boolean
}) {
  const bg = tone === 'alt' ? 'bg-paper-2' : tone === 'blue' ? 'bg-paper-3' : 'bg-paper'
  return (
    <section
      id={id}
      className={`relative border-b border-rule ${clip ? 'overflow-hidden' : ''} ${bg}`}
      style={{ paddingLeft: 'var(--rail)' }}
      aria-labelledby={`${id}-title`}
    >
      {backdrop}
      <div
        className="relative mx-auto w-full max-w-[1320px] py-20 md:py-28"
        style={{ paddingInline: 'var(--gutter)' }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="min-w-0">
            <p className="u-label mb-4 flex items-center gap-3">
              <span className="text-ink-3">{n}</span>
              <span aria-hidden="true" className="h-px w-8 bg-rule" />
              {label}
            </p>
            <h2 id={`${id}-title`} className="u-ko text-[clamp(1.75rem,5.2vw,3.4rem)]">
              {title}
            </h2>
          </div>
          {lead && (
            <p className="max-w-[44ch] text-[14px] leading-[1.9] text-ink-2 md:text-right md:text-[15px]">
              {lead}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
