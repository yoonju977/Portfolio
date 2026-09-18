import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Reveals children matching `sel` on scroll. Content is visible by default;
 *  gsap.from() only sets the hidden start state when JS actually runs. */
export function useReveal<T extends HTMLElement>(
  sel: string,
  opts: { y?: number; x?: number; stagger?: number; duration?: number } = {},
) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || reduced()) return
    const targets = root.querySelectorAll(sel)
    if (!targets.length) return
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: opts.y ?? 34,
        x: opts.x ?? 0,
        opacity: 0,
        duration: opts.duration ?? 0.85,
        ease: 'power3.out',
        stagger: opts.stagger ?? 0.08,
        scrollTrigger: { trigger: root, start: 'top 86%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [sel, opts.y, opts.x, opts.stagger, opts.duration])
  return ref
}

export function useCountUp(target: string) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const m = target.match(/^([\d,.]+)(.*)$/)
    if (!m) return
    const end = parseFloat(m[1].replace(/,/g, ''))
    if (!isFinite(end) || end === 0) return
    const decimals = (m[1].split('.')[1] ?? '').length
    const suffix = m[2] ?? ''
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate() {
          const n = decimals
            ? obj.v.toFixed(decimals)
            : Math.round(obj.v).toLocaleString('en-US')
          el.textContent = n + suffix
        },
      })
    }, el)
    return () => ctx.revert()
  }, [target])
  return ref
}
