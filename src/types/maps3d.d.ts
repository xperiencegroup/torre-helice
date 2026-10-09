import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface LatLngAltitude {
  lat: number
  lng: number
  altitude: number
}

export interface Camera3D {
  center: LatLngAltitude
  range: number
  tilt: number
  heading: number
}

export interface Map3DElement extends HTMLElement, Partial<Camera3D> {
  mode?: 'SATELLITE' | 'HYBRID'
  minAltitude?: number
  maxAltitude?: number
  minTilt?: number
  maxTilt?: number
  bounds?: { north: number; south: number; east: number; west: number }
  flyCameraTo?: (opts: { endCamera: Camera3D; durationMillis?: number }) => void
  stopCameraAnimation?: () => void
  defaultUIHidden?: boolean
  defaultUIDisabled?: boolean  
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map-3d': DetailedHTMLProps<HTMLAttributes<Map3DElement>, Map3DElement> & {
        mode?: 'SATELLITE' | 'HYBRID'
      }
    }
  }
}