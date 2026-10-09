import { useState } from 'react'
import './CalendarioCita.css'

interface Props {
  value: string | null            // 'YYYY-MM-DD'
  onChange: (iso: string) => void
}

const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const toISO = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

export const CalendarioCita: React.FC<Props> = ({ value, onChange }) => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const [mes, setMes] = useState({ y: hoy.getFullYear(), m: hoy.getMonth() })

  const esMesActual = mes.y === hoy.getFullYear() && mes.m === hoy.getMonth()
  const diasEnMes = new Date(mes.y, mes.m + 1, 0).getDate()
  // Semana inicia en lunes: getDay() 0=domingo → 6
  const offset = (new Date(mes.y, mes.m, 1).getDay() + 6) % 7

  const titulo = new Date(mes.y, mes.m, 1)
    .toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
    .toUpperCase()

  const cambiarMes = (delta: number) =>
    setMes(({ y, m }) => {
      const d = new Date(y, m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })

  return (
    <div className="calendario-cita">
      <div className="calendario-cita__mes">
        <button
          type="button"
          className="calendario-cita__flecha"
          onClick={() => cambiarMes(-1)}
          disabled={esMesActual}
          aria-label="Mes anterior"
        >
          ◂
        </button>
        <span>{titulo}</span>
        <button
          type="button"
          className="calendario-cita__flecha"
          onClick={() => cambiarMes(1)}
          aria-label="Mes siguiente"
        >
          ▸
        </button>
      </div>

      <div className="calendario-cita__grid">
        {DIAS.map((d, i) => (
          <div key={i} className="calendario-cita__dia-h">{d}</div>
        ))}

        {Array.from({ length: offset }).map((_, i) => (
          <div key={`v${i}`} />
        ))}

        {Array.from({ length: diasEnMes }, (_, i) => i + 1).map((d) => {
          const fecha = new Date(mes.y, mes.m, d)
          const finde = fecha.getDay() === 0 || fecha.getDay() === 6
          const pasado = fecha < hoy
          const iso = toISO(mes.y, mes.m, d)
          const off = finde || pasado

          return (
            <button
              key={iso}
              type="button"
              disabled={off}
              className={[
                'calendario-cita__dia',
                off ? 'is-off' : '',
                value === iso ? 'is-selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onChange(iso)}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}