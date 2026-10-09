/* import { useLocation } from 'react-router-dom' */
import { useAppStore } from '../../../store/useAppStore'
import { PROJECT } from '../../../config/project'
/* import { VIEW_PATHS, VIEWS, ADMIN_PATH } from '../../../config/views' */
import './Topbar.css'
import { TRACK, track } from '../../../config/trackIds'

export const Topbar: React.FC = () => {
  /* const { pathname } = useLocation() */
  /* const showAdmin = pathname === VIEW_PATHS[VIEWS.INICIO] */
    const openOverlay = useAppStore((s) => s.openOverlay)

/*   const openAdmin = () => {
    window.open(ADMIN_PATH, '_blank', 'noopener,noreferrer')
  }
 */
  return (
    <header className="topbar">
      <div className="topbar__id">
        <span className="topbar__marca">{PROJECT.marca}</span>
        <span className="topbar__nombre">{PROJECT.nombre}</span>
        <span className="topbar__tipo">{PROJECT.tipo}</span>
      </div>

      <div className="topbar__acciones">
        <button
          type="button"
          className="topbar__btn topbar__btn--precios"
onClick={() => { track(TRACK.topbar.precios); openOverlay({ type: 'paquetes' }) }}

        >
          PRECIOS
        </button>
        <button
          type="button"
          className="topbar__btn topbar__btn--cotiza"
onClick={() => { track(TRACK.topbar.cotiza); openOverlay({ type: 'cotizar' }) }}

        >
          COTIZA YA
        </button>
        <button
          type="button"
          className="topbar__icon"
          title="Dashboard"
          onClick={() => {
            track(TRACK.topbar.dashboard)
            openOverlay({ type: 'dashboard' })
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
          </svg>
        </button>
{/*         {showAdmin && (
          <button type="button" className="topbar__icon" title="Panel de administración" onClick={openAdmin}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3.2" />
              <path d="M19.4 15a1.6 1.6 0 0 0 .32 1.76l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.97 1.47V21a2 2 0 1 1-4 0v-.09a1.6 1.6 0 0 0-1.05-1.47 1.6 1.6 0 0 0-1.76.32l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.6 1.6 0 0 0 4.6 15a1.6 1.6 0 0 0-1.47-.97H3a2 2 0 1 1 0-4h.09A1.6 1.6 0 0 0 4.56 9a1.6 1.6 0 0 0-.32-1.76l-.06-.06A2 2 0 1 1 7.01 4.35l.06.06a1.6 1.6 0 0 0 1.76.32H8.9A1.6 1.6 0 0 0 9.87 3.26V3a2 2 0 1 1 4 0v.09a1.6 1.6 0 0 0 .97 1.47 1.6 1.6 0 0 0 1.76-.32l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.6 1.6 0 0 0-.32 1.76V9a1.6 1.6 0 0 0 1.47.97H21a2 2 0 1 1 0 4h-.09a1.6 1.6 0 0 0-1.47.97z" />
            </svg>
          </button>
        )} */}
      </div>
    </header>
  )
}