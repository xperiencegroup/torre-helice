import { useAppStore } from '../../../store/useAppStore'
import './Widgets.css'
import { TRACK, track } from '../../../config/trackIds'

export const Widgets: React.FC = () => {
  const openOverlay = useAppStore((s) => s.openOverlay)

  return (
    <div className="widgets">
      <button
        type="button"
        className="widgets__qr"
        title="Sube tu unidad"
onClick={() => { track(TRACK.widgets.qr); openOverlay({ type: 'qr' }) }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <path d="M14 14h3v3h-3zM20 14h1M14 20h1M20 20h1" />
        </svg>
      </button>
      <span className="widgets__label">TU UNIDAD</span>
    </div>
  )
}