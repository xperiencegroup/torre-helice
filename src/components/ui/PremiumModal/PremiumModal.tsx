import type { ViewId } from '../../../config/views'
import { PREMIUM_SECTIONS } from '../../../config/premiumSections'
import { CloseButton } from '../CloseButton/CloseButton'
import './PremiumModal.css'

interface Props {
  view: ViewId
  onClose: () => void
  onUnlock: () => void
  onPaquetes: () => void
  onAskChat: () => void
}

export const PremiumModal: React.FC<Props> = ({ view, onClose, onUnlock, onPaquetes, onAskChat }) => {
  const section = PREMIUM_SECTIONS[view]
  if (!section) return null

  return (
    <div className="premium-modal">
      <CloseButton onClick={onClose} />

      <div className="premium-modal__layout">
        <div className="premium-modal__galeria">
          <div
            className="premium-modal__foto"
            style={{ backgroundImage: `url(${section.imagen})` }}
          />
          <div className="premium-modal__nav" aria-hidden="true">
            <span className="is-active" />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="premium-modal__info">
          <p className="premium-modal__eyebrow">{section.eyebrow}</p>
          <h3 className="premium-modal__titulo">{section.titulo}</h3>
          {section.parrafos.map((p, i) => (
            <p key={i} className="premium-modal__texto">{p}</p>
          ))}

          <div className="premium-modal__cta">
            <button
              type="button"
              className="premium-modal__btn premium-modal__btn--principal"
              onClick={onPaquetes}
            >
              Ver precios y paquetes
            </button>
            <button
              type="button"
              className="premium-modal__btn premium-modal__btn--secundario"
              onClick={onAskChat}
            >
              Pregúntale a Chat XP
            </button>
          </div>

          {section.desbloqueable && (
            <button
              type="button"
              className="premium-modal__btn premium-modal__btn--desbloquear"
              onClick={onUnlock}
            >
              Desbloquear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}