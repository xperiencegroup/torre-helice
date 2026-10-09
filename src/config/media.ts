import { fetchAllMedia, type MediaGroupItem } from './mediaResolver'

interface VideoSet {
  idle:  string
  trans: string
  rev:   string
}

interface MediaShape {
  video: {
    bienvenida: {
      idle:  string
      trans: string
    }
    masterplan: {
      idle: string // = pos1.idle, mismo slot físico que positions.pos1.idle
      positions: {
        pos1: VideoSet
        pos2: VideoSet
        pos3: VideoSet
        pos4: VideoSet
      }
      cenital: {
        idle:  string
        trans: string
      }
    }
  }
}

// Objeto mutable: arranca vacío, se puebla in-place en loadMedia().
// Los componentes que hacen `import { MEDIA } from './media'` y leen
// MEDIA.video.x.y directamente verán los valores ya resueltos siempre
// que la lectura ocurra después de que loadMedia() haya resuelto
// (ver bootstrap en main.tsx).
export const MEDIA: MediaShape = {
  video: {
    bienvenida: {
      idle:  '',
      trans: '',
    },
    masterplan: {
      idle: '',
      positions: {
        pos1: { idle: '', trans: '', rev: '' },
        pos2: { idle: '', trans: '', rev: '' },
        pos3: { idle: '', trans: '', rev: '' },
        pos4: { idle: '', trans: '', rev: '' },
      },
      cenital: {
        idle:  '',
        trans: '',
      },
    },
  },
}

// Grupos (colecciones ordenadas): vti.proyecto, fotos.proyecto, etc.
export const MEDIA_GROUPS: Record<string, MediaGroupItem[]> = {}

export const getMediaGroup = (groupKey: string): MediaGroupItem[] =>
  MEDIA_GROUPS[groupKey] ?? []

// Helper genérico por si se necesita acceso dinámico por key plano
// (ej. 'video.masterplan.positions.pos1.idle') sin romper el shape de arriba.
const FLAT_ASSETS: Record<string, string> = {}
export const getMedia = (key: string): string => FLAT_ASSETS[key] ?? ''

let isLoaded = false
export const isMediaLoaded = () => isLoaded

export const loadMedia = async (): Promise<void> => {
  const { assets, groups } = await fetchAllMedia()

  // Poblar flat lookup
  Object.assign(FLAT_ASSETS, assets)

  // Poblar shape anidado mutando in-place (no reasignar MEDIA)
  MEDIA.video.bienvenida.idle  = assets['video.bienvenida.idle']  ?? ''
  MEDIA.video.bienvenida.trans = assets['video.bienvenida.trans'] ?? ''

  MEDIA.video.masterplan.idle = assets['video.masterplan.idle'] ?? ''

  MEDIA.video.masterplan.positions.pos1.idle  = assets['video.masterplan.idle'] ?? ''
  MEDIA.video.masterplan.positions.pos1.trans = assets['video.masterplan.positions.pos1.trans'] ?? ''
  MEDIA.video.masterplan.positions.pos1.rev   = assets['video.masterplan.positions.pos1.rev']   ?? ''

  MEDIA.video.masterplan.positions.pos2.idle  = assets['video.masterplan.positions.pos2.idle']  ?? ''
  MEDIA.video.masterplan.positions.pos2.trans = assets['video.masterplan.positions.pos2.trans'] ?? ''
  MEDIA.video.masterplan.positions.pos2.rev   = assets['video.masterplan.positions.pos2.rev']   ?? ''

  MEDIA.video.masterplan.positions.pos3.idle  = assets['video.masterplan.positions.pos3.idle']  ?? ''
  MEDIA.video.masterplan.positions.pos3.trans = assets['video.masterplan.positions.pos3.trans'] ?? ''
  MEDIA.video.masterplan.positions.pos3.rev   = assets['video.masterplan.positions.pos3.rev']   ?? ''

  MEDIA.video.masterplan.positions.pos4.idle  = assets['video.masterplan.positions.pos4.idle']  ?? ''
  MEDIA.video.masterplan.positions.pos4.trans = assets['video.masterplan.positions.pos4.trans'] ?? ''
  MEDIA.video.masterplan.positions.pos4.rev   = assets['video.masterplan.positions.pos4.rev']   ?? ''

  MEDIA.video.masterplan.cenital.idle  = assets['video.masterplan.cenital.idle']  ?? ''
  MEDIA.video.masterplan.cenital.trans = assets['video.masterplan.cenital.trans'] ?? ''

  // Poblar grupos
  Object.keys(groups).forEach((groupKey) => {
    MEDIA_GROUPS[groupKey] = groups[groupKey]
  })

  isLoaded = true
}