import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { VIEWS } from '../../config/views'
import { MEDIA } from '../../config/media'
import { BackButton } from '../../components/ui/BackButton/BackButton'
import { MenuLateralRotacion } from '../../components/ui/MenuLateralRotacion/MenuLateralRotacion'
import './MasterPlan.css'

export const Masterplan: React.FC = () => {
  const setView = useAppStore((s) => s.setView)
  const changeVideo = useAppStore((s) => s.changeVideo)
  const [searchParams] = useSearchParams()

  // Con un panel abierto (foto-renders, video-tour, recorrido-360),
  // el panel controla su propio BackButton.
  const hasPanel = searchParams.has('panel')

  useEffect(() => {
    setView(VIEWS.MASTER_PLAN)
    changeVideo(MEDIA.video.masterplan.idle, false, false, 'masterplan-pos1')
  }, [])

  return (
    <div data-view="MasterPlan" className="masterplan">
      {!hasPanel && <BackButton />}
      <MenuLateralRotacion />
    </div>
  )
}