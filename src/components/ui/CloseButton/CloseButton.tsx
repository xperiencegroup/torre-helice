import './CloseButton.css'

interface Props {
  onClick: () => void
}

export const CloseButton: React.FC<Props> = ({ onClick }) => (
  <button type="button" className="close-button" onClick={onClick} aria-label="Cerrar">
    ✕
  </button>
)