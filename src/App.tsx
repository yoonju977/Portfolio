import { useEffect, useState } from 'react'
import RunbookPC from './runbook/RunbookPC'
import RunbookMobile from './runbook/RunbookMobile'

const QUERY = '(min-width: 1180px)'

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
