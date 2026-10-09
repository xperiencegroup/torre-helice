import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { VIEWS } from '../../config/views'
import { TRACK, track } from '../../config/trackIds'
import { loadMaps3dScript } from '../../lib/loadMaps3d'
import type { Map3DElement } from '../../types/maps3d'
import {
  FLY_DURATION,
  MAP_BOUNDS,
  MAP_LIMITS,
  UBICACION_MENU,
  VISTAS_DESKTOP,
  VISTAS_MOBILE,
  type CapaId,
} from '../../config/ubicacion'
import { BackButton } from '../../components/ui/BackButton/BackButton'
import { MenuLateral, type MenuLateralItem } from '../../components/ui/MenuLateral/MenuLateral'
import './Ubicacion.css'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

// Mismo criterio que los media queries del proyecto
const isMobileLandscape = () =>
  window.matchMedia('(orientation: landscape) and (max-width: 957px)').matches

const getVista = (capa: CapaId) => (isMobileLandscape() ? VISTAS_MOBILE : VISTAS_DESKTOP)[capa]

const MENU_ITEMS: MenuLateralItem[] = UBICACION_MENU.map((i) => ({
  id: i.id,
  label: i.label,
  trackId: TRACK.ubicacion.menu,
}))

const isCapa = (id: string | null): id is CapaId =>
  id === 'puntos-interes' || id === 'vialidades'

export const Ubicacion: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)
  const openOverlay = useAppStore((s) => s.openOverlay)
  const [searchParams, setSearchParams] = useSearchParams()
  const mapRef = useRef<Map3DElement>(null)
  const readyRef = useRef(false)

  const capaParam = searchParams.get('capa')
  const capa: CapaId = isCapa(capaParam) ? capaParam : 'puntos-interes'

  useEffect(() => {
    setView(VIEWS.UBICACION)
    changeVideo('', false, false)
  }, [])

  // Carga del script + configuración inicial (sin animación)
  useEffect(() => {
    if (!API_KEY) return
    let cancel = false

    loadMaps3dScript(API_KEY)
      .then(() => customElements.whenDefined('gmp-map-3d'))
      .then(() => {
        const map = mapRef.current
        if (cancel || !map) return

        map.minAltitude = MAP_LIMITS.minAltitude
        map.maxAltitude = MAP_LIMITS.maxAltitude
        map.minTilt = MAP_LIMITS.minTilt
        map.maxTilt = MAP_LIMITS.maxTilt
        map.bounds = MAP_BOUNDS
        map.defaultUIHidden = true        // brújula, zoom, tilt y controles
        map.defaultUIDisabled = true

        const vista = getVista(capa)
        map.center = vista.center
        map.range = vista.range
        map.tilt = vista.tilt
        map.heading = vista.heading

        readyRef.current = true
      })
      .catch((e) => console.warn('[Ubicacion] Maps 3D', e))

    return () => {
      cancel = true
    }
  }, [])

  // Animación de cámara al cambiar de capa
  useEffect(() => {
    const map = mapRef.current
    if (!readyRef.current || !map?.flyCameraTo) return
    map.stopCameraAnimation?.()
    map.flyCameraTo({ endCamera: getVista(capa), durationMillis: FLY_DURATION })
  }, [capa])

  const handleMenu = (id: string) => {
    track(TRACK.ubicacion.menu, { item: id })

    // Master Plan se comporta igual que en el menú principal
    if (id === 'master-plan') {
      openOverlay({ type: 'premium', view: VIEWS.MASTER_PLAN })
      track(TRACK.premium.open, { view: VIEWS.MASTER_PLAN })
      return
    }

    if (isCapa(id) && id !== capa) {
      setSearchParams((prev) => {
        const p = new URLSearchParams(prev)
        p.set('capa', id)
        return p
      }, { replace: true })
    }
  }

  return (
    <div data-view="Ubicacion" className="ubicacion">
      <div className="ubicacion__map">
        {API_KEY ? (
          <gmp-map-3d ref={mapRef} mode="SATELLITE" className="ubicacion__map-3d" />
        ) : (
          <div className="ubicacion__placeholder">Falta VITE_GOOGLE_MAPS_API_KEY</div>
        )}
      </div>

      <div className="ubicacion__menu">
        <MenuLateral items={MENU_ITEMS} activeId={capa} onChange={handleMenu} />
      </div>

      <BackButton />
    </div>
  )
}