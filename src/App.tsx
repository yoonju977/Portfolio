import { useEffect, useState } from 'react'
import RunbookPC from './runbook/RunbookPC'
import RunbookMobile from './runbook/RunbookMobile'

// ?view=pc 링크로 들어오면 노트북, 태블릿 폭(768px 이상)에서도 웹 화면을 보여준다. 휴대폰은 그대로 모바일.
const FORCE_PC = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('view') === 'pc'
const QUERY = FORCE_PC ? '(min-width: 768px)' : '(min-width: 1180px)'

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
