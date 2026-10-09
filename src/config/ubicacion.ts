import type { Camera3D } from '../types/maps3d'

// Torre 6, Corporativo Santa María
export const PROJECT_LOCATION = { lat: 25.6696055, lng: -100.3747302, altitude: 0 }

// Área navegable (~12 km alrededor del proyecto)
export const MAP_BOUNDS = {
  north: 25.78,
  south: 25.56,
  east: -100.26,
  west: -100.49,
}

export const MAP_LIMITS = {
  minAltitude: 0,
  maxAltitude: 8000,
  minTilt: 0,
  maxTilt: 67.5,
}

export const FLY_DURATION = 1500

export type CapaId = 'puntos-interes' | 'vialidades'

export const UBICACION_MENU = [
  { id: 'puntos-interes', label: 'Puntos de interés' },
  { id: 'vialidades', label: 'Vialidades' },
  { id: 'master-plan', label: 'Master Plan' },
] as const

// Puntos de interés = cámara más alta; Vialidades = más baja.
// Heading/tilt base tomados de la liga de Maps (353° / 59°).
const cam = (range: number, tilt: number, heading = 353): Camera3D => ({
  center: PROJECT_LOCATION,
  range,
  tilt,
  heading,
})

export const VISTAS_DESKTOP: Record<CapaId, Camera3D> = {
  'puntos-interes': cam(6000, 1),
  'vialidades': cam(2600, 4),
}

// Pantallas bajas: más distancia para que el entorno quepa en el alto
export const VISTAS_MOBILE: Record<CapaId, Camera3D> = {
  'puntos-interes': cam(6000, 1),
  'vialidades': cam(2600, 4),
}