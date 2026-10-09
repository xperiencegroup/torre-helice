import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { VIEW_PATHS, VIEWS } from '../../config/views'
import { TRACK, track } from '../../config/trackIds'
import { MEDIA } from '../../config/media'
import './Bienvenida.css'

export const Bienvenida: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)
  const navigate = useNavigate()
  const setBlocked = useAppStore((s) => s.setBlocked)


useEffect(() => {
  setView(VIEWS.BIENVENIDA)
  setBlocked(true)
  changeVideo(MEDIA.video.bienvenida.trans, true, false, 'bienvenida')
}, [])

  const handleClick = () => {
    track(TRACK.bienvenida.explorar)
    navigate(VIEW_PATHS[VIEWS.INICIO])
  }
  
  const blocked = useAppStore((s) => s.blocked)


  return (
    <div data-view="Bienvenida" className="bienvenida">
      <img
        src="/inicio.svg"
        alt="Inicio"
        className="bienvenida__inicio-btn"
        onClick={handleClick}
        style={{ pointerEvents: blocked ? 'none' : 'auto' }}
      />
    </div>
  )
}