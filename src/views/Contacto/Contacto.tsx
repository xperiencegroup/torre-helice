import { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { VIEWS } from '../../config/views'
import { BackButton } from '../../components/ui/BackButton/BackButton'

// Placeholder — sin diseño de UI todavía. Solo estructura y comportamiento base.
export const Contacto: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)

  useEffect(() => {
    setView(VIEWS.CONTACTO)
    changeVideo('', false, false) // TODO: MEDIA.video.contacto.idle cuando exista media.ts
  }, [])

  return (
    <div data-view="Contacto">
      <h1>Contacto</h1>
      <p>Placeholder de vista — pendiente diseño UI.</p>
      <BackButton />
    </div>
  )
}
