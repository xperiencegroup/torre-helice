import { useState } from 'react'
import { PROJECT } from '../../../config/project'
import { DASHBOARD } from '../../../config/dashboard'
import { TRACK, track } from '../../../config/trackIds'
import { CloseButton } from '../CloseButton/CloseButton'
import './DashboardModal.css'

interface Props {
  onClose: () => void
}

// Demo: login simulado (cualquier click entra) y datos estáticos, igual que el HTML.
export const DashboardModal: React.FC<Props> = ({ onClose }) => {
  const [dentro, setDentro] = useState(false)
  const { login, head, kpis, disponibilidades, leads, interes, visitas } = DASHBOARD

  const entrar = () => {
    track(TRACK.dashboard.entrar)
    setDentro(true)
  }

  return (
    <div className="dashboard-modal">
      <CloseButton onClick={onClose} />

      {!dentro ? (
        <div className="dashboard-modal__login">
          <p className="dashboard-modal__marca">{login.marca}</p>
          <h3 className="dashboard-modal__login-titulo">{login.titulo}</h3>
          <label className="dashboard-modal__label">{login.proyecto.label}</label>
          <input type="text" className="dashboard-modal__input" defaultValue={login.proyecto.value} />
          <label className="dashboard-modal__label">{login.password.label}</label>
          <input type="password" className="dashboard-modal__input" defaultValue={login.password.value} />
          <button type="button" className="dashboard-modal__entrar" onClick={entrar}>
            {login.entrar}
          </button>
        </div>
      ) : (
        <div className="dashboard-modal__dash">
          <div className="dashboard-modal__head">
            <span className="dashboard-modal__marca">{head.marca}</span>
            <h3 className="dashboard-modal__titulo">{PROJECT.nombre}</h3>
            <span className="dashboard-modal__chip">{head.periodo}</span>
          </div>
          <p className="dashboard-modal__sub">{head.sub}</p>

          <div className="dashboard-modal__kpis">
            {kpis.map((k) => (
              <div key={k.label} className="dashboard-modal__kpi">
                <b>{k.valor}</b>
                <span>{k.label}</span>
              </div>
            ))}
          </div>

          <div className="dashboard-modal__grid">
            <div>
              <section className="dashboard-modal__bloque">
                <h4>
                  {disponibilidades.titulo} <span>{disponibilidades.nota}</span>
                </h4>
                <div className="dashboard-modal__tabla-wrap">
                  <table className="dashboard-modal__tabla">
                    <thead>
                      <tr>{disponibilidades.columnas.map((c, i) => <th key={i}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {disponibilidades.filas.map((f) => (
                        <tr key={f.unidad}>
                          <td>{f.unidad}</td>
                          <td>{f.nivel}</td>
                          <td>{f.m2}</td>
                          <td><span className={`dashboard-modal__est dashboard-modal__est--${f.estatus}`}>{f.label}</span></td>
                          <td>{f.likes}</td>
                          <td><button type="button" className="dashboard-modal__btn-mini">{disponibilidades.boton}</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="dashboard-modal__bloque">
                <h4>
                  {leads.titulo} <span>{leads.nota}</span>
                </h4>
                <div className="dashboard-modal__tabla-wrap">
                  <table className="dashboard-modal__tabla">
                    <thead>
                      <tr>{leads.columnas.map((c, i) => <th key={i}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {leads.filas.map((f) => (
                        <tr key={f.folio}>
                          <td>{f.folio}</td>
                          <td>{f.sesiones}</td>
                          <td>{f.tiempo}</td>
                          <td>{f.interes}</td>
                          <td><span className={`dashboard-modal__est dashboard-modal__est--${f.estatus}`}>{f.senal}</span></td>
                          <td><button type="button" className="dashboard-modal__btn-mini">{leads.boton}</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div>
              <section className="dashboard-modal__bloque">
                <h4>
                  {interes.titulo} <span>{interes.nota}</span>
                </h4>
                <div className="dashboard-modal__interes">
                  {interes.filas.map((f) => (
                    <div key={f.label} className="dashboard-modal__int-fila">
                      <span>{f.label}</span>
                      <div className="dashboard-modal__int-barra">
                        <i style={{ width: `${f.pct}%` }} />
                      </div>
                      <b>{f.pct}%</b>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dashboard-modal__bloque">
                <h4>
                  {visitas.titulo} <span>{visitas.nota}</span>
                </h4>
                <div className="dashboard-modal__tabla-wrap">
                  <table className="dashboard-modal__tabla">
                    <thead>
                      <tr>{visitas.columnas.map((c) => <th key={c}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {visitas.filas.map((f) => (
                        <tr key={f[1]}>{f.map((c, i) => <td key={i}>{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="dashboard-modal__nota">{visitas.pie}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}