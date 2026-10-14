import { useEffect, useState } from 'react'
import RunbookPC from './runbook/RunbookPC'
import RunbookMobile from './runbook/RunbookMobile'

// 1024px 이상이면 웹 화면. 1366×768 노트북을 125% 배율로 쓰는 경우(약 1093px)도 포함되고, 태블릿 세로는 모바일로 남는다.
// ?view=pc 링크는 프로젝트 표(최소 880px)가 넘치지 않는 폭까지 웹 화면을 허용한다.
const FORCE_PC = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('view')?.toLowerCase() === 'pc'
const QUERY = FORCE_PC ? '(min-width: 880px)' : '(min-width: 1024px)'

function useWide() {
  const get = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  const [wide, setWide] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

export default function App() {
  return useWide() ? <RunbookPC /> : <RunbookMobile />
}
