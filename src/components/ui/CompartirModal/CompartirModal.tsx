import { useState } from 'react'
import { PROJECT } from '../../../config/project'
import { COMPARTIR } from '../../../config/compartir'
import { CloseButton } from '../CloseButton/CloseButton'
import './CompartirModal.css'
import { TRACK, track } from '../../../config/trackIds'

interface Props {
  onClose: () => void
}

// Demo: no valida ni guarda; solo muestra la confirmación (igual que el HTML).
export const CompartirModal: React.FC<Props> = ({ onClose }) => {
  const [enviado, setEnviado] = useState(false)

  return (
    <div className="compartir-modal">
      <CloseButton onClick={onClose} />

      <div className="compartir-modal__layout">
        <div className="compartir-modal__form">
          <p className="compartir-modal__eyebrow">{COMPARTIR.eyebrow}</p>
          <h3 className="compartir-modal__titulo">{COMPARTIR.titulo}</h3>
          <p className="compartir-modal__sub">{COMPARTIR.sub}</p>

          {COMPARTIR.campos.map((c) => (
            <div key={c.label} className="compartir-modal__preg">
              <label className="compartir-modal__label">{c.label}</label>
              <input type={c.type} className="compartir-modal__input" placeholder={c.placeholder} />
            </div>
          ))}

          <div className="compartir-modal__preg">
            <label className="compartir-modal__label">{COMPARTIR.mensaje.label}</label>
            <textarea
              className="compartir-modal__input compartir-modal__textarea"
              placeholder={COMPARTIR.mensaje.placeholder}
            />
          </div>
        </div>

        <div className="compartir-modal__envio">
          <p className="compartir-modal__eyebrow">{COMPARTIR.envio.eyebrow}</p>

          <div className="compartir-modal__thumb">
            <div
              className="compartir-modal__img"
              style={{ backgroundImage: `url(${COMPARTIR.envio.imagen})` }}
            />
            <div className="compartir-modal__info">
              <span className="compartir-modal__marca">{PROJECT.marca}</span>
              <span className="compartir-modal__nombre">{PROJECT.nombre}</span>
              <span className="compartir-modal__tipo">{COMPARTIR.envio.tipo}</span>
            </div>
          </div>

          {enviado ? (
            <p className="compartir-modal__ok">{COMPARTIR.envio.ok}</p>
          ) : (
            <button type="button" className="compartir-modal__enviar" onClick={() => { track(TRACK.compartir.enviar); setEnviado(true) }}>
              {COMPARTIR.envio.enviar}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}