import image360 from '../../../assets/360/360_image.jpg'
import { BackButton } from '../BackButton/BackButton'
import { Viewer360 } from '../Viewer360/Viewer360'
import './Viewer360Panel.css'

interface Props {
  onClose: () => void
}

export const Viewer360Panel: React.FC<Props> = ({ onClose }) => (
  <div className="viewer-360-panel">
    <BackButton onClick={onClose} />
    <Viewer360 src={image360} />
  </div>
)