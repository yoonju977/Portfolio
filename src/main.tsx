import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './runbook/runbook.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
