import type { RichPart } from '../../../config/chatXP'
import { Fragment } from 'react'
import {
  PAQUETES,
  PAQUETES_HEAD,
  PAQUETES_LEVANTAMIENTO,
  PAQUETES_NOTA,
  PAQUETES_PAUTA,
  PAQUETES_TABLA,
  type Celda,
} from '../../../config/paquetes'
import { CloseButton } from '../CloseButton/CloseButton'
import './PaquetesModal.css'

interface Props {
  onClose: () => void
  onCotizar: (paquete: string) => void
}

const Rich: React.FC<{ parts: RichPart[] }> = ({ parts }) => (
  <>{parts.map((p, i) => (typeof p === 'string' ? p : <b key={i}>{p.b}</b>))}</>
)

const CeldaValor: React.FC<{ valor: Celda }> = ({ valor }) => {
  if (valor === true) return <span className="paquetes-modal__si">✓</span>
  if (valor === false) return <span className="paquetes-modal__no">✕</span>
  if (typeof valor === 'string') return <>{valor}</>
  return (
    <>
      {valor.texto}
      <br />
      <span className="paquetes-modal__mens">{valor.mensualidad}</span>
    </>
  )
}

// Clase de la columna destacada (B)
const dst = (i: number) => (PAQUETES[i]?.destacado ? ' is-destacado' : '')

export const PaquetesModal: React.FC<Props> = ({ onClose, onCotizar }) => (
  <div className="paquetes-modal">
    <CloseButton onClick={onClose} />

    <div className="paquetes-modal__wrap">
      <div className="paquetes-modal__head">
        <p className="paquetes-modal__eyebrow">{PAQUETES_HEAD.eyebrow}</p>
        <h3 className="paquetes-modal__titulo">{PAQUETES_HEAD.titulo}</h3>
        <p className="paquetes-modal__texto">{PAQUETES_HEAD.texto}</p>
      </div>

      {/* Tabla comparativa */}
      <div className="paquetes-modal__tabla-scroll">
        <table className="paquetes-modal__tabla">
          <thead>
            <tr>
              <th>
                <span className="paquetes-modal__letra">{PAQUETES_HEAD.columna.titulo}</span>
                <span className="paquetes-modal__pago paquetes-modal__pago--sin-margen">
                  {PAQUETES_HEAD.columna.sub[0]}
                  <br />
                  {PAQUETES_HEAD.columna.sub[1]}
                </span>
              </th>
              {PAQUETES.map((paq, i) => (
                <th key={paq.letra} className={dst(i).trim()}>
                  {paq.tag && <span className="paquetes-modal__tag">{paq.tag}</span>}
                  <span className="paquetes-modal__letra">{paq.letra}</span>
                  <span className="paquetes-modal__nombre">{paq.nombre}</span>
                  <span className="paquetes-modal__desde">{PAQUETES_HEAD.desde}</span>
                  <span className="paquetes-modal__precio">
                    {paq.precio}
                    <span className="paquetes-modal__cur">{PAQUETES_HEAD.moneda}</span>
                  </span>
                  <span className="paquetes-modal__pago">
                    {paq.pago.map((l, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {l}
                      </span>
                    ))}
                  </span>
                  <button
                    type="button"
                    className="paquetes-modal__btn"
                    onClick={() => onCotizar(paq.letra)}
                  >
                    {PAQUETES_HEAD.cotizar}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAQUETES_TABLA.map((g) => (
              <Fragment key={g.grupo}>
                <tr className="paquetes-modal__grupo">
                  <td colSpan={4}>{g.grupo}</td>
                </tr>
                {g.filas.map((f) => (
                  <tr key={f.label}>
                    <td className="paquetes-modal__lbl">{f.label}</td>
                    {f.valores.map((v, i) => (
                      <td key={i} className={`paquetes-modal__val${dst(i)}`}>
                        <CeldaValor valor={v} />
                      </td>
                    ))}
                  </tr>                  
                ))}    
              </Fragment>                          
            ))}
          </tbody>
        </table>
      </div>

      {/* Cajas de apoyo */}
      <div className="paquetes-modal__bloques">
        <div className="paquetes-modal__caja">
          <h5>{PAQUETES_LEVANTAMIENTO.titulo}</h5>
          <table className="paquetes-modal__esc">
            <thead>
              <tr>
                <td>{PAQUETES_LEVANTAMIENTO.columnas[0]}</td>
                <td className="is-n">{PAQUETES_LEVANTAMIENTO.columnas[1]}</td>
                <td className="is-t">{PAQUETES_LEVANTAMIENTO.columnas[2]}</td>
              </tr>
            </thead>
            <tbody>
              {PAQUETES_LEVANTAMIENTO.filas.map(([esp, lev, total]) => (
                <tr key={esp}>
                  <td>{esp}</td>
                  <td className="is-n">{lev}</td>
                  <td className="is-t">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="paquetes-modal__caja-nota">
            <Rich parts={PAQUETES_LEVANTAMIENTO.nota} />
          </p>
        </div>

        <div className="paquetes-modal__caja">
          <h5>{PAQUETES_PAUTA.titulo}</h5>
          {PAQUETES_PAUTA.parrafos.map((p, i) => (
            <p key={i}>
              <Rich parts={p} />
            </p>
          ))}
        </div>
      </div>

      <p className="paquetes-modal__nota">
        {PAQUETES_NOTA.map((l, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {l}
          </span>
        ))}
      </p>
    </div>
  </div>
)