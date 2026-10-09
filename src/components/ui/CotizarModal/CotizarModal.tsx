import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { COTIZAR } from '../../../config/cotizar'
import { TRACK, track } from '../../../config/trackIds'
import { CloseButton } from '../CloseButton/CloseButton'
import { CalendarioCita } from '../CalendarioCita/CalendarioCita'
import './CotizarModal.css'

interface Props {
  paquete?: string
  onClose: () => void
}

type Status = 'idle' | 'sending' | 'ok' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const CotizarModal: React.FC<Props> = ({ paquete, onClose }) => {
  const [rol, setRol] = useState<string | null>(null)
  const [m2, setM2] = useState('')
  const [busca, setBusca] = useState<string[]>([])
  const [estrategia, setEstrategia] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  const esValido =
    nombre.trim() !== '' &&
    EMAIL_RE.test(correo.trim()) &&
    telefono.trim() !== '' &&
    fecha !== null &&
    hora !== null

  const toggleBusca = (op: string) =>
    setBusca((prev) => (prev.includes(op) ? prev.filter((b) => b !== op) : [...prev, op]))

  const handleEnviar = async () => {
    if (!esValido || status === 'sending') return
    setStatus('sending')
    track(TRACK.cotizar.submit, { paquete })

    const { error } = await supabase.from('t6_sta_maria_cotizaciones').insert({
      rol,
      m2: m2.trim() || null,
      busca,
      estrategia,
      paquete: paquete ?? null,
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      fecha,
      hora,
    })

    track(error ? TRACK.cotizar.error : TRACK.cotizar.success, { paquete })
    setStatus(error ? 'error' : 'ok')
    if (error) console.warn('[Cotizar]', error)
  }

  const opcion = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      className={selected ? 'cotizar-modal__op is-selected' : 'cotizar-modal__op'}
      onClick={onClick}
    >
      {label}
    </button>
  )

  return (
    <div className="cotizar-modal">
      <CloseButton onClick={onClose} />

      <div className="cotizar-modal__layout">
        {/* Formulario */}
        <div className="cotizar-modal__form">
          <p className="cotizar-modal__eyebrow">{COTIZAR.eyebrow}</p>
          <h3 className="cotizar-modal__titulo">{COTIZAR.titulo}</h3>
          <p className="cotizar-modal__sub">{COTIZAR.sub}</p>

          <div className="cotizar-modal__preg">
            <label className="cotizar-modal__label">{COTIZAR.rol.titulo}</label>
            <div className="cotizar-modal__opciones">
              {COTIZAR.rol.opciones.map((op) => opcion(op, rol === op, () => setRol(op)))}
            </div>
          </div>

          <div className="cotizar-modal__preg">
            <label className="cotizar-modal__label">{COTIZAR.m2.titulo}</label>
            <input
              type="text"
              className="cotizar-modal__input cotizar-modal__input--corto"
              placeholder={COTIZAR.m2.placeholder}
              value={m2}
              onChange={(e) => setM2(e.target.value)}
            />
          </div>

          <div className="cotizar-modal__preg">
            <label className="cotizar-modal__label">{COTIZAR.busca.titulo}</label>
            <div className="cotizar-modal__opciones">
              {COTIZAR.busca.opciones.map((op) => opcion(op, busca.includes(op), () => toggleBusca(op)))}
            </div>
          </div>

          <div className="cotizar-modal__preg">
            <label className="cotizar-modal__label">{COTIZAR.estrategia.titulo}</label>
            <p className="cotizar-modal__estrategia">
              Con <b>Xperience Intelligence</b> generamos contenidos con AI sobre tu proyecto para
              atraer leads a tu plataforma. <b>Chat XP</b> los recibe, resuelve sus dudas, los filtra
              y verifica el perfil de quien quiere visitar. Y nuestros <b>brokers</b> atienden esas
              citas con conocimiento total del proyecto — hasta entregarte un inquilino o comprador.
              Tú no pierdes tiempo. Nosotros cerramos.
            </p>
            <div className="cotizar-modal__opciones">
              {COTIZAR.estrategia.opciones.map((op) =>
                opcion(op, estrategia === op, () => setEstrategia(op))
              )}
            </div>
          </div>

          <div className="cotizar-modal__preg">
            <label className="cotizar-modal__label">{COTIZAR.contacto.titulo}</label>
            <div className="cotizar-modal__contacto">
              <input
                type="text"
                className="cotizar-modal__input"
                placeholder={COTIZAR.contacto.nombre}
                autoComplete="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                className="cotizar-modal__input"
                placeholder={COTIZAR.contacto.correo}
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="tel"
                className="cotizar-modal__input"
                placeholder={COTIZAR.contacto.telefono}
                autoComplete="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Agenda */}
        <div className="cotizar-modal__agenda">
          <p className="cotizar-modal__eyebrow">{COTIZAR.agenda.eyebrow}</p>
          <h4 className="cotizar-modal__agenda-titulo">{COTIZAR.agenda.titulo}</h4>
          <p className="cotizar-modal__sub">{COTIZAR.agenda.sub}</p>

          <CalendarioCita value={fecha} onChange={setFecha} />

          <div className="cotizar-modal__horas">
            {COTIZAR.agenda.horas.map((h) => (
              <button
                key={h}
                type="button"
                className={hora === h ? 'cotizar-modal__hora is-selected' : 'cotizar-modal__hora'}
                onClick={() => setHora(h)}
              >
                {h}
              </button>
            ))}
          </div>

          {status === 'ok' ? (
            <p className="cotizar-modal__ok">{COTIZAR.agenda.ok}</p>
          ) : (
            <>
              <button
                type="button"
                className="cotizar-modal__enviar"
                disabled={!esValido || status === 'sending'}
                onClick={handleEnviar}
              >
                {status === 'sending' ? COTIZAR.agenda.enviando : COTIZAR.agenda.enviar}
              </button>
              {!esValido && <p className="cotizar-modal__hint">{COTIZAR.agenda.faltantes}</p>}
              {status === 'error' && <p className="cotizar-modal__error">{COTIZAR.agenda.error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}