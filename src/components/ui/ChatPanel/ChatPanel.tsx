import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../../../store/useAppStore'
import { CHAT_HEAD, type ChatChipAction, type RichPart } from '../../../config/chatXP'
import { TRACK, track } from '../../../config/trackIds'
import './ChatPanel.css'

const Rich: React.FC<{ parts: RichPart[] }> = ({ parts }) => (
  <>
    {parts.map((p, i) => (typeof p === 'string' ? p : <b key={i}>{p.b}</b>))}
  </>
)

// Mismo criterio que los media queries del proyecto
const isMobile = () =>
  window.matchMedia('(orientation: landscape) and (max-width: 957px)').matches

export const ChatPanel: React.FC = () => {
  const chatOpen = useAppStore((s) => s.chatOpen)
  const messages = useAppStore((s) => s.chatMessages)
  const openOverlay = useAppStore((s) => s.openOverlay)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Con el teclado abierto en mobile, el panel ocupa todo el ancho y el alto visible
  const [kbOpen, setKbOpen] = useState(false)
  const [vv, setVv] = useState<{ top: number; height: number } | null>(null)

  useEffect(() => {
    const v = window.visualViewport
    if (!kbOpen || !v) {
      setVv(null)
      return
    }
    const update = () => setVv({ top: v.offsetTop, height: v.height })
    update()
    v.addEventListener('resize', update)
    v.addEventListener('scroll', update)
    return () => {
      v.removeEventListener('resize', update)
      v.removeEventListener('scroll', update)
    }
  }, [kbOpen])

  // Mantener el scroll al final: mensajes nuevos, al abrir y al cambiar el alto por teclado
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, chatOpen, vv])

  if (!chatOpen) return null

  const handleChip = (label: string, action: ChatChipAction) => {
    track(TRACK.chat.chip, { label, action })
    if (action === 'paquetes') openOverlay({ type: 'paquetes' })
    if (action === 'cotizar') openOverlay({ type: 'cotizar' })
  }

  return (
    <div
      className={kbOpen ? 'chat-panel is-keyboard' : 'chat-panel'}
      style={vv ? { top: vv.top, height: vv.height } : undefined}
    >
      <div className="chat-panel__head">
        <div className="chat-panel__avatar">XP</div>
        <div className="chat-panel__head-info">
          <h5>{CHAT_HEAD.nombre}</h5>
          <span>{CHAT_HEAD.estado}</span>
        </div>
        <span className="chat-panel__modo">{CHAT_HEAD.modo}</span>
      </div>

      <div className="chat-panel__body" ref={bodyRef}>
        {messages.map((m, i) => {
          if (m.kind === 'usr') {
            return <div key={i} className="chat-panel__msg chat-panel__msg--usr">{m.text}</div>
          }
          if (m.kind === 'bot') {
            return (
              <div key={i} className="chat-panel__msg chat-panel__msg--bot">
                <Rich parts={m.parts} />
                {m.bullets && (
                  <ul className="chat-panel__bullets">
                    {m.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {m.cierre && <p className="chat-panel__cierre">{m.cierre}</p>}
              </div>
            )
          }
          return (
            <div key={i} className="chat-panel__chips">
              {m.chips.map((c) => (
                <button key={c.label} type="button" onClick={() => handleChip(c.label, c.action)}>
                  {c.label}
                </button>
              ))}
            </div>
          )
        })}
      </div>

      <div className="chat-panel__input">
        <input
          type="text"
          placeholder={CHAT_HEAD.placeholder}
          onFocus={() => isMobile() && setKbOpen(true)}
          onBlur={() => setKbOpen(false)}
        />
        <button type="button" aria-label="Enviar">→</button>
      </div>
    </div>
  )
}