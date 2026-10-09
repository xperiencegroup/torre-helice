import { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { VIEWS } from '../../config/views'
import { BackButton } from '../../components/ui/BackButton/BackButton'

// Placeholder — sin diseño de UI todavía. Solo estructura y comportamiento base.
export const Disponibilidad: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)

  useEffect(() => {
    setView(VIEWS.DISPONIBILIDAD)
    changeVideo('', false, false) // TODO: MEDIA.video.disponibilidad.idle cuando exista media.ts
  }, [])

  return (
    <div data-view="Disponibilidad">
      <h1>Disponibilidad</h1>
      <p>Placeholder de vista — pendiente diseño UI.</p>
      <BackButton />
    </div>
  )
}
