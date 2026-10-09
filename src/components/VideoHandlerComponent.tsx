import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import './VideoHandlerComponent.css'
import { MEDIA } from '../config/media'

const resolveIdleByTo = (to: string = ''): string => {
  switch (to) {
    case 'bienvenida':          return MEDIA.video.bienvenida.idle
    case 'masterplan':          return MEDIA.video.masterplan.idle
    case 'masterplan-pos1':     return MEDIA.video.masterplan.positions.pos1.idle
    case 'masterplan-pos2':     return MEDIA.video.masterplan.positions.pos2.idle
    case 'masterplan-pos3':     return MEDIA.video.masterplan.positions.pos3.idle
    case 'masterplan-pos4':     return MEDIA.video.masterplan.positions.pos4.idle
    case 'masterplan-cenital':  return MEDIA.video.masterplan.cenital.idle
    default: return ''
  }
}

export const VideoHandlerComponent = () => {
  const { currentVideo } = useAppStore()

  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)
  const [currentVideoElement, setCurrentVideoElement] = useState<1 | 2>(1)

  const handleVideoEnd = () => {
    const { currentVideo: video, changeVideo: change, setBlocked: block } = useAppStore.getState()
    if (video.isTransition || video.isReverse) {
      const idleSrc = resolveIdleByTo(video.to)
      if (idleSrc) change(idleSrc, false, false)
    }
    block(false)
  }

  useEffect(() => {
    const currentRef = currentVideoElement === 1 ? videoRefA.current : videoRefB.current
    const nextRef    = currentVideoElement === 1 ? videoRefB.current : videoRefA.current
    if (!currentRef || !nextRef) return

    if (!currentVideo.currentSrc) {
      currentRef.pause(); currentRef.removeAttribute('src'); currentRef.load()
      nextRef.pause();    nextRef.removeAttribute('src');    nextRef.load()
      return
    }

    const isLoop = !currentVideo.isTransition && !currentVideo.isReverse

    nextRef.src  = currentVideo.currentSrc
    nextRef.loop = isLoop

    nextRef.play()
      .then(() => {
        currentRef.style.zIndex = '0'
        nextRef.style.zIndex    = '1'
        currentRef.pause()
        setCurrentVideoElement(currentVideoElement === 1 ? 2 : 1)
        useAppStore.getState().setVideoReady(true)
      })
      .catch((err) => console.warn('[VHC] Error:', err))
  }, [currentVideo])

  useEffect(() => {
    if (videoRefA.current) videoRefA.current.onended = handleVideoEnd
    if (videoRefB.current) videoRefB.current.onended = handleVideoEnd
  }, [currentVideo])

  return (
    <div className="vhc">
      <video ref={videoRefA} className="vhc__video" muted playsInline style={{ zIndex: 1 }} />
      <video ref={videoRefB} className="vhc__video" muted playsInline style={{ zIndex: 0 }} />
    </div>
  )
}