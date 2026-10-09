import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { VIEW_PATHS } from '../../config/views'
import { PremiumModal } from '../ui/PremiumModal/PremiumModal'
import { PaquetesModal } from '../ui/PaquetesModal/PaquetesModal'
import { CotizarModal } from '../ui/CotizarModal/CotizarModal'
import { QrModal } from '../ui/QrModal/QrModal'
import { CompartirModal } from '../ui/CompartirModal/CompartirModal'
import { XperienceModal } from '../ui/XperienceModal/XperienceModal'
import { TRACK, track } from '../../config/trackIds'
import { DashboardModal } from '../ui/DashboardModal/DashboardModal'

export const Overlays: React.FC = () => {
  const overlay = useAppStore((s) => s.overlay)
  const openOverlay = useAppStore((s) => s.openOverlay)
  const closeOverlay = useAppStore((s) => s.closeOverlay)
  const setMenuCollapsed = useAppStore((s) => s.setMenuCollapsed)
  const askChat = useAppStore((s) => s.askChat)
  const navigate = useNavigate()

  if (!overlay) return null

    if (overlay.type === 'premium') {
    const { view } = overlay
    return (
      <PremiumModal
        view={view}
        onClose={() => { track(TRACK.premium.close, { view }); closeOverlay() }}
        onAskChat={() => {
          track(TRACK.premium.askChat, { view })
          track(TRACK.chat.ask, { view })
          askChat(view)
        }}
        onPaquetes={() => {
          track(TRACK.premium.paquetes, { view })
          openOverlay({ type: 'paquetes', fromPremium: view })
        }}
        onUnlock={() => {
          track(TRACK.premium.unlock, { view })
          closeOverlay()
          setMenuCollapsed(true)
          navigate(VIEW_PATHS[view])
        }}
      />
    )
  }

  if (overlay.type === 'paquetes') {
    const { fromPremium } = overlay
    const handleClose = () => {
      track(TRACK.paquetes.close)
      if (fromPremium) openOverlay({ type: 'premium', view: fromPremium })
      else closeOverlay()
    }
    return (
      <PaquetesModal
        onClose={handleClose}
        onCotizar={(paquete) => {
          track(TRACK.paquetes.cotizar, { paquete })
          openOverlay({ type: 'cotizar', paquete, returnTo: overlay })
        }}
      />
    )
  }

  if (overlay.type === 'qr') {
    return (
      <QrModal
        onClose={() => { track(TRACK.qr.close); closeOverlay() }}
        onSubir={() => { track(TRACK.qr.subir); openOverlay({ type: 'cotizar', returnTo: overlay }) }}
        onCompartir={() => { track(TRACK.qr.compartir); openOverlay({ type: 'compartir', returnTo: overlay }) }}
      />
    )
  }

  if (overlay.type === 'compartir') {
    const { returnTo } = overlay
    const handleClose = () => {
      track(TRACK.compartir.close)
      if (returnTo) openOverlay(returnTo)
      else closeOverlay()
    }
    return <CompartirModal onClose={handleClose} />
  }

  if (overlay.type === 'cotizar') {
    const { paquete, returnTo } = overlay
    const handleClose = () => {
      track(TRACK.cotizar.close)
      if (returnTo) openOverlay(returnTo)
      else closeOverlay()
    }
    return <CotizarModal paquete={paquete} onClose={handleClose} />
  }

  if (overlay.type === 'xperience') {
    return <XperienceModal onClose={() => { track(TRACK.xperience.close); closeOverlay() }} />
  }

  if (overlay.type === 'dashboard') {
    return <DashboardModal onClose={() => { track(TRACK.dashboard.close); closeOverlay() }} />
  }  

  return null
}