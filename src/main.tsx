import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { loadMedia } from './config/media'
import './index.css'

const rootEl = document.getElementById('root')!
const root = createRoot(rootEl)

// Loading simple mientras se resuelve el manifest de media (Supabase).
root.render(<div className="app-boot-loading">Cargando…</div>)

loadMedia()
  .catch((err) => {
    console.error('[main] Error cargando media manifest:', err)
    // Continuamos igual: MEDIA queda con strings vacíos (fallback ya contemplado
    // en resolveIdleByTo / VideoHandlerComponent).
  })
  .finally(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  })