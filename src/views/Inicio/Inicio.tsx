import { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { VIEWS } from '../../config/views'
import { MEDIA } from '../../config/media'
import './Inicio.css'

export const Inicio: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)

  useEffect(() => {
    setView(VIEWS.INICIO)
    changeVideo(MEDIA.video.bienvenida.idle, false, false, 'bienvenida')
  }, [])

  return (
    <div data-view="Inicio" className="inicio">
      {/* MenuPrincipal y SessionPanel ya se renderizan desde AppShell */}
    </div>
  )
}