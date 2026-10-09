import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '../../../store/useAppStore'
import { MEDIA } from '../../../config/media'
import MenuInferior, { type MenuInferiorItem } from '../MenuInferior/MenuInferior'
import { FotoRendersCarousel } from '../FotoRendersCarousel/FotoRendersCarousel'
import { VTIPanel } from '../VTIPanel/VTIPanel'
import './MenuLateralRotacion.css'
import { Viewer360Panel } from '../Viewer360Panel/Viewer360Panel'

const CENITAL_MENU_ITEMS: MenuInferiorItem[] = [
  /* { id: 'informacion',    label: 'Información',    icon: '/icons/icon_info.svg' }, */
  { id: 'foto-renders',   label: 'Foto Renders',   icon: '/icons/icon_foto.svg' },
  { id: 'video-tour',     label: 'Video Tour',     icon: '/icons/icon_video tour.svg' },
  { id: 'recorrido-360',  label: 'Recorrido 360',  icon: '/icons/icon_360.svg' },
]
const POSICIONES = [
  { id: 'pos1', img: '/rotacion/pos1.jpg' },
  { id: 'pos2', img: '/rotacion/pos2.jpg' },
  { id: 'pos3', img: '/rotacion/pos3.jpg' },
  { id: 'pos4', img: '/rotacion/pos4.jpg' },
] as const

type PosKey = (typeof POSICIONES)[number]['id']

export const MenuLateralRotacion: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPos = (searchParams.get('posicion') as PosKey) || 'pos1'

  const [activePos, setActivePos] = useState<PosKey | 'cenital'>(initialPos)
  const [prevPos, setPrevPos] = useState<PosKey>(initialPos)
  const changeVideo = useAppStore((s) => s.changeVideo)
  const blocked = useAppStore((s) => s.blocked)
  const setBlocked = useAppStore((s) => s.setBlocked)

  const handlePosClick = (id: PosKey) => {
    if (blocked || id === activePos) return

    const fromNum = parseInt(activePos.replace('pos', '') || '1', 10)
    const toNum   = parseInt(id.replace('pos', ''), 10)
    const fromKey = `pos${fromNum}` as PosKey
    const diff    = Math.abs(fromNum - toNum)

    let videoSrc     = ''
    let isTransition = false
    let isReverse    = false

    // Adyacentes secuenciales (pos1<->pos2, pos2<->pos3, pos3<->pos4)
    if (diff === 1) {
      if (fromNum < toNum) {
        videoSrc     = MEDIA.video.masterplan.positions[fromKey]?.trans ?? ''
        isTransition = true
      } else {
        videoSrc     = MEDIA.video.masterplan.positions[fromKey]?.rev ?? ''
        isTransition = true
        isReverse    = true
      }
    }
    // Cierre del ciclo: pos4 <-> pos1
    else if (fromNum === 4 && toNum === 1) {
      videoSrc     = MEDIA.video.masterplan.positions.pos4.trans ?? ''
      isTransition = true
    } else if (fromNum === 1 && toNum === 4) {
      videoSrc     = MEDIA.video.masterplan.positions.pos1.rev ?? ''
      isTransition = true
      isReverse    = true
    }

    if (videoSrc) {
      setBlocked(true)
      changeVideo(videoSrc, isTransition, isReverse, `masterplan-${id}`)
    } else {
      // No adyacente: salto directo al idle, sin transición
      const idleSrc = MEDIA.video.masterplan.positions[id]?.idle ?? ''
      changeVideo(idleSrc, false, false, `masterplan-${id}`)
    }

    setActivePos(id)
    setPrevPos(id)
    setSearchParams({ posicion: id })
  }

  const handleCenitalClick = () => {
    if (blocked) return

    if (activePos === 'cenital') {
      // No existe video de reversa para cenital: salto directo al idle de la
      // posición donde estaba el usuario antes de entrar a la vista cenital.
      const idleSrc = MEDIA.video.masterplan.positions[prevPos]?.idle ?? ''
      changeVideo(idleSrc, false, false, `masterplan-${prevPos}`)
      setActivePos(prevPos)
      setSearchParams({ posicion: prevPos })
      return
    }

    setBlocked(true)
    changeVideo(MEDIA.video.masterplan.cenital.trans, true, false, 'masterplan-cenital')
    setActivePos('cenital')
    setSearchParams({ posicion: 'cenital' })
  }

  const handleCenitalMenuSelect = (id: string) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      p.set('panel', id)
      return p
    })
  }

  const panel = searchParams.get('panel')

  const handleClosePanel = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      p.delete('panel')
      p.delete('espacio')
      return p
    })
  }

  return (
    <>
      <nav className="menu-lateral-rotacion" style={{ pointerEvents: blocked ? 'none' : 'auto' }}>
      {POSICIONES.map((pos) => (
        <button
          key={pos.id}
          type="button"
          className={
            pos.id === activePos
              ? 'menu-lateral-rotacion__btn is-active'
              : 'menu-lateral-rotacion__btn'
          }
          style={{ backgroundImage: `url(${pos.img})` }}
          aria-label={pos.id}
          onClick={() => handlePosClick(pos.id)}
        />
      ))}

      <button
        type="button"
        className={
          activePos === 'cenital'
            ? 'menu-lateral-rotacion__btn menu-lateral-rotacion__btn--cenital is-active'
            : 'menu-lateral-rotacion__btn menu-lateral-rotacion__btn--cenital'
        }
        style={{ backgroundImage: `url(/rotacion/cenital.jpg)` }}
        aria-label="Vista cenital"
        onClick={handleCenitalClick}
      >
        <img src="/icons/icon_rotar.svg" alt="" className="menu-lateral-rotacion__cenital-icon" />
      </button>
    </nav>

    {!blocked && (
      <MenuInferior items={CENITAL_MENU_ITEMS} onSelect={handleCenitalMenuSelect} />
    )}

    {panel === 'foto-renders' && (
      <FotoRendersCarousel onClose={handleClosePanel} />
    )}

    {panel === 'video-tour' && (
      <VTIPanel onClose={handleClosePanel} />
    )}

    {panel === 'recorrido-360' && (
      <Viewer360Panel onClose={handleClosePanel} />
    )}
    </>
  )
}