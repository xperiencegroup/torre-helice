import { getMediaGroup } from '../../../config/media'
import { BackButton } from '../BackButton/BackButton'
import VTI from '../../VTI'
import './VTIPanel.css'

interface Props {
  onClose: () => void
}

export const VTIPanel: React.FC<Props> = ({ onClose }) => {
  const items  = getMediaGroup('vti.proyecto')
  const videos = items.map((i) => i.url)
  const labels = items.filter((i) => i.label).map((i) => i.label as string)

  return (
    <div className="vti-panel">
      <BackButton onClick={onClose} />
      <VTI videos={videos} labels={labels} />
    </div>
  )
}