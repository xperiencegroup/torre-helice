import { track } from '../../../config/trackIds'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  trackId?: string
  type?: 'button' | 'submit'
}

// Placeholder — sin diseño de UI todavía.
export const Button: React.FC<ButtonProps> = ({ children, onClick, trackId, type = 'button' }) => {
  const handleClick = () => {
    if (trackId) track(trackId)
    onClick?.()
  }

  return (
    <button type={type} onClick={handleClick}>
      {children}
    </button>
  )
}