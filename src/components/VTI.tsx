import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MenuLateral, type MenuLateralItem } from './ui/MenuLateral/MenuLateral'
import './VTI.css'

interface VTIProps {
  videos:        readonly string[]
  labels:        readonly string[]
  initialIndex?: number
}

export default function VTI({ videos, labels = [], initialIndex = 0 }: VTIProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const espacioParam    = searchParams.get('espacio')
  const initialFromUrl  = labels.findIndex(l =>
    l.toLowerCase().replace(/\s/g, '-') === espacioParam
  )
  const resolvedInitial = initialFromUrl >= 0 ? initialFromUrl : initialIndex

  const [currentIndex, setCurrentIndex] = useState(resolvedInitial * 2)
  const [activeBtn, setActiveBtn]       = useState(resolvedInitial)
  const [useFirst, setUseFirst]         = useState(true)
  const [opacity, setOpacity]           = useState(1)

  const refA     = useRef<HTMLVideoElement>(null)
  const refB     = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setOpacity(0.4), 20000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const playNext = (index?: number, isClick = false) => {
    if (isClick && index === currentIndex) return
    let next = index !== undefined ? index : currentIndex + 1
    if (next >= videos.length) next = 0

    const btnIndex = Math.floor(next / 2)
    setCurrentIndex(next)
    setUseFirst(prev => !prev)
    setActiveBtn(btnIndex)
    setSearchParams(prev => {
      const p = new URLSearchParams(prev)
      p.set('espacio', labels[btnIndex].toLowerCase().replace(/\s/g, '-'))
      return p
    })
  }

  useEffect(() => {
    const current = useFirst ? refA.current : refB.current
    const next    = useFirst ? refB.current : refA.current
    if (!current || !next) return

    current.src          = videos[currentIndex]
    current.style.zIndex = '2'
    next.style.zIndex    = '1'
    current.loop         = false

    current.play().catch((e) => console.warn('[VTI]', e))
    current.onended = () => playNext()

    return () => { current.onended = null }
  }, [currentIndex, useFirst])

  const menuItems: MenuLateralItem[] = labels.map((label, i) => ({
    id:      String(i),
    label,
    trackId: `vti:${label}:click`,
  }))

  return (
    <div
      className="vti"
      onMouseEnter={() => { setOpacity(1); resetTimer() }}
      onTouchStart={() => { setOpacity(1); resetTimer() }}
    >
      <video ref={refA} className="vti__video" muted playsInline />
      <video ref={refB} className="vti__video" muted playsInline />

      <div className="vti__menu" style={{ opacity, transition: 'opacity 0.5s ease' }}>
        <MenuLateral
          items={menuItems}
          activeId={String(activeBtn)}
          onChange={(id) => playNext(parseInt(id) * 2, true)}
          align="center"
        />
      </div>
    </div>
  )
}