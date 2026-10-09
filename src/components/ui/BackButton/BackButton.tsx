import { useNavigate } from 'react-router-dom'
import { VIEW_PATHS, VIEWS } from '../../../config/views'
import { TRACK, track } from '../../../config/trackIds'
import './BackButton.css'

interface Props {
  onClick?: () => void
}

export const BackButton: React.FC<Props> = ({ onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    track(TRACK.global.back)
    if (onClick) {
      onClick()
      return
    }
    navigate(VIEW_PATHS[VIEWS.INICIO])
  }

  return (
    <button className='back-button' type='button' onClick={handleClick}>
      <svg
        className="back-button__icon"
        width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
      </svg>
      <span className="back-button__label">VOLVER</span>
    </button>
  )
}