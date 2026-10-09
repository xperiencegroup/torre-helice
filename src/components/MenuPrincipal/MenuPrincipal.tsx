import { Link, useLocation } from 'react-router-dom'
import type { ViewId } from '../../config/views'
import { useAppStore } from '../../store/useAppStore'
import { VIEW_PATHS, VIEWS } from '../../config/views'
import { PREMIUM_SECTIONS } from '../../config/premiumSections'
import { TRACK, track } from '../../config/trackIds'
import './MenuPrincipal.css'

const ITEMS: { view: ViewId; label: string; trackId: string }[] = [
  { view: VIEWS.INFORMACION, label: 'Información', trackId: TRACK.inicio.menu.informacion },
  { view: VIEWS.UBICACION, label: 'Ubicación', trackId: TRACK.inicio.menu.ubicacion },
  { view: VIEWS.MASTER_PLAN, label: 'Master Plan', trackId: TRACK.inicio.menu.masterPlan },
  { view: VIEWS.DISPONIBILIDAD, label: 'Disponibilidad', trackId: TRACK.inicio.menu.disponibilidad },
  { view: VIEWS.CONTACTO, label: 'Contacto', trackId: TRACK.inicio.menu.contacto },
]

// Toda vista con contenido en PREMIUM_SECTIONS pasa primero por el modal.
const hasPremiumModal = (view: ViewId) => view in PREMIUM_SECTIONS

export const MenuPrincipal: React.FC = () => {
  const menuCollapsed = useAppStore((s) => s.menuCollapsed)
  const toggleMenu = useAppStore((s) => s.toggleMenu)
  const openOverlay = useAppStore((s) => s.openOverlay)
  const { pathname } = useLocation()

  const handleToggle = () => {
    track(TRACK.inicio.menu.toggle)
    toggleMenu()
  }

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: ViewId,
    trackId: string
  ) => {
    track(trackId)

    // Ya estamos en esa vista (se pasó por "Desbloquear"): no reabrir el modal
    // ni renavegar, para no perder params como ?posicion=
    if (pathname === VIEW_PATHS[view]) {
      e.preventDefault()
      return
    }

    if (hasPremiumModal(view)) {
      e.preventDefault()
      openOverlay({ type: 'premium', view })
      track(TRACK.premium.open, { view })
    }
  }
  return (
    <nav className={menuCollapsed ? 'menu-principal is-collapsed' : 'menu-principal'}>
      <button type="button" className="menu-principal__toggle" onClick={handleToggle}>
        {menuCollapsed ? 'MENÚ ▸' : 'MENÚ ▾'}
      </button>

      {!menuCollapsed && (
        <ul className="menu-principal__list">
          {ITEMS.map((item) => (
            <li key={item.view}>
              <Link
                to={VIEW_PATHS[item.view]}
                className="menu-principal__link"
                onClick={(e) => handleItemClick(e, item.view, item.trackId)}                
              >
                <span className="menu-principal__dot" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}