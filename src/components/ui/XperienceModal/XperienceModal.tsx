import { useState } from 'react'
import { XPERIENCE_NAV, XPERIENCE_SLIDES, type XpSlide } from '../../../config/xperience'
import { TRACK, track } from '../../../config/trackIds'
import { CloseButton } from '../CloseButton/CloseButton'
import './XperienceModal.css'

interface Props {
  onClose: () => void
}

// Solo se monta el media del slide activo: al cambiar de slide el iframe
// se desmonta y el video de YouTube se detiene.
const Media: React.FC<{ media: XpSlide['media'] }> = ({ media }) => {
  if (media.kind === 'video') {
    return (
      <div className="xperience-modal__video">
        <iframe
          src={media.embed}
          title={media.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <a
          className="xperience-modal__liga"
          href={media.liga}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(TRACK.xperience.youtube, { video: media.titulo })}
        >
          {XPERIENCE_NAV.verYoutube}
        </a>
      </div>
    )
  }

  if (media.kind === 'servicios') {
    return (
      <div className="xperience-modal__servicios">
        {media.items.map((s, i) => (
          <div key={s} className="xperience-modal__srv">
            <span>{String(i + 1).padStart(2, '0')}</span>
            {s}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="xperience-modal__portafolio">
      {media.items.map(([a, b]) => (
        <div key={a + b}>
          {a}
          <br />
          {b}
        </div>
      ))}
    </div>
  )
}

export const XperienceModal: React.FC<Props> = ({ onClose }) => {
  const [idx, setIdx] = useState(0)
  const slide = XPERIENCE_SLIDES[idx]

  const siguiente = () => {
    const next = (idx + 1) % XPERIENCE_SLIDES.length
    track(TRACK.xperience.siguiente, { slide: next + 1 })
    setIdx(next)
  }

  const irA = (i: number) => {
    track(TRACK.xperience.dot, { slide: i + 1 })
    setIdx(i)
  }

  const abrirCta = (url: string) => {
    track(TRACK.xperience.cta)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="xperience-modal">
      <CloseButton onClick={onClose} />

      <div className="xperience-modal__slide">
        <div className="xperience-modal__media">
          <Media key={idx} media={slide.media} />
        </div>

        <div className="xperience-modal__txt">
          <p className="xperience-modal__eyebrow">{slide.eyebrow}</p>
          <h3 className="xperience-modal__titulo">
            {slide.titulo}
            {slide.salto && <br />}
            <span className="xperience-modal__resaltado">{slide.resaltado}</span>
          </h3>

          {slide.parrafos.map((p) => (
            <p key={p} className="xperience-modal__texto">{p}</p>
          ))}

          {slide.stats && (
            <div className="xperience-modal__stats">
              {slide.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.valor}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {slide.cta && (
            <button
              type="button"
              className="xperience-modal__cta"
              onClick={() => abrirCta(slide.cta!.url)}
            >
              {slide.cta.label}
            </button>
          )}
        </div>
      </div>

      <div className="xperience-modal__nav">
        <div className="xperience-modal__dots">
          {XPERIENCE_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a ${i + 1}`}
              className={i === idx ? 'is-active' : ''}
              onClick={() => irA(i)}
            />
          ))}
        </div>
        <button type="button" className="xperience-modal__siguiente" onClick={siguiente}>
          {XPERIENCE_NAV.siguiente}
        </button>
      </div>
    </div>
  )
}