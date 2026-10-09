// Vistas de Santa María (Xperience Properties).
export const VIEWS = {
  BIENVENIDA:      'bienvenida',
  INICIO:          'inicio',
  INFORMACION:     'informacion',
  UBICACION:       'ubicacion',
  MASTER_PLAN:     'master-plan',
  DISPONIBILIDAD:  'disponibilidad',
  CONTACTO:        'contacto',
} as const

export type ViewId = (typeof VIEWS)[keyof typeof VIEWS]

// Video de estado "idle"/transición por vista. `to` es el destino lógico
// (ej. 'masterplan-pos2', 'masterplan-cenital') que VideoHandlerComponent
// usa para resolver el idle correcto cuando termina una transición/reversa.
export type VideoState = {
  currentSrc:   string
  isTransition: boolean
  isReverse:    boolean
  to?:          string
}

export const EMPTY_VIDEO: VideoState = {
  currentSrc:   '',
  isTransition: false,
  isReverse:    false,
  to:           undefined,
}

// Rutas asociadas a cada vista (para router + BackButton "volver a inicio")
export const VIEW_PATHS: Record<ViewId, string> = {
  [VIEWS.BIENVENIDA]:     '/bienvenida',
  [VIEWS.INICIO]:         '/inicio',
  [VIEWS.INFORMACION]:    '/informacion',
  [VIEWS.UBICACION]:      '/ubicacion',
  [VIEWS.MASTER_PLAN]:    '/masterplan',
  [VIEWS.DISPONIBILIDAD]: '/disponibilidad',
  [VIEWS.CONTACTO]:       '/contacto',
}

export const ADMIN_PATH = '/t6-panel'