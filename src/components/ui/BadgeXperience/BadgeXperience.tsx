import { PROJECT } from '../../../config/project'
import { useAppStore } from '../../../store/useAppStore'
import './BadgeXperience.css'
import { TRACK, track } from '../../../config/trackIds'

export const BadgeXperience: React.FC = () => {
  
  const openOverlay = useAppStore((s) => s.openOverlay)

  return (
    <button
      type="button"
      className="badge-xperience"
      onClick={() => {
        track(TRACK.badge.xperience)
        openOverlay({ type: 'xperience' })
      }}
    >
      DESARROLLADO POR <b className="badge-xperience__marca">{PROJECT.desarrollador}</b> ↗
    </button>
  )
}