import { PROJECT } from '../../../config/project'
import { QR } from '../../../config/qr'
import { CloseButton } from '../CloseButton/CloseButton'
import './QrModal.css'
import { TRACK, track } from '../../../config/trackIds'

interface Props {
  onClose: () => void
  onSubir: () => void
  onCompartir: () => void

}

export const QrModal: React.FC<Props> = ({ onClose, onSubir, onCompartir }) => (
  <div className="qr-modal">
    <CloseButton onClick={onClose} />

    <div className="qr-modal__hoja">
      <div className="qr-modal__txt">
        <p className="qr-modal__eyebrow">{QR.eyebrow}</p>
        <h3 className="qr-modal__titulo">
          {QR.tituloAntes}
          <span className="qr-modal__resaltado">{QR.tituloResaltado}</span>
          {QR.tituloDespues}
        </h3>
        <p className="qr-modal__texto">{QR.texto}</p>
        <p className="qr-modal__linea">
          {PROJECT.marca} · {PROJECT.nombre} · {PROJECT.dominio}
        </p>
      </div>

      <div className="qr-modal__lado">
        <div className="qr-modal__escanea">
          {QR.escanea[0]}
          <br />
          {QR.escanea[1]}
        </div>
        <div className="qr-modal__flecha">↓</div>
        <div className="qr-modal__caja">
          <img src={PROJECT.qr} alt={`QR ${PROJECT.nombre}`} className="qr-modal__img" />
        </div>
        <p className="qr-modal__sub">{QR.sub}</p>
      </div>
    </div>

    <div className="qr-modal__acciones">
      <button
        type="button"
        className="qr-modal__btn qr-modal__btn--principal"
        onClick={() => { track(TRACK.qr.imprimir); window.print() }}
      >
        {QR.acciones.imprimir}
      </button>
      <button type="button" className="qr-modal__btn" onClick={onSubir}>
        {QR.acciones.subir}
      </button>
      <button type="button" className="qr-modal__btn" onClick={onCompartir}>
        {QR.acciones.compartir}
      </button>
    </div>
  </div>
)