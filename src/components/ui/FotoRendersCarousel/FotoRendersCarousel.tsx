import useEmblaCarousel from 'embla-carousel-react'
import { getMediaGroup } from '../../../config/media'
import { BackButton } from '../../ui/BackButton/BackButton'
import './FotoRendersCarousel.css'

interface Props {
  onClose: () => void
}

export const FotoRendersCarousel: React.FC<Props> = ({ onClose }) => {
  const fotos = getMediaGroup('fotos.proyecto').filter((f) => f.url)

  const [emblaRef] = useEmblaCarousel({ loop: false })

  return (
    <div className="foto-renders-carousel">
      <BackButton onClick={onClose} />

      <div className="foto-renders-carousel__viewport" ref={emblaRef}>
        <div className="foto-renders-carousel__container">
          {fotos.map((foto, i) => (
            <div className="foto-renders-carousel__slide" key={i}>
              <img
                src={foto.url}
                alt={foto.label ?? `Render ${i + 1}`}
                className="foto-renders-carousel__img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}