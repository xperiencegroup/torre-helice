import { useNavigate } from 'react-router-dom'
import { VIEW_PATHS, VIEWS } from '../../../config/views'
import { TRACK, track } from '../../../config/trackIds'
import './HomeButton.css'

export const HomeButton: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    track(TRACK.global.home)
    navigate(VIEW_PATHS[VIEWS.INICIO])
  }

  return (
    <button
      type="button"
      className="home-button"
      onClick={handleClick}
      aria-label="Ir a inicio"
    >
      <img src="/icons/icon_home.svg" alt="" className="home-button__icon" />
    </button>
  )
}