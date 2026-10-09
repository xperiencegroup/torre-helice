import type { ViewId } from './views'
import { VIEWS } from './views'

// Texto enriquecido sin HTML crudo: string normal o { b: 'texto en negritas' }
export type RichPart = string | { b: string }

export type ChatChipAction = 'paquetes' | 'cotizar' | null

export type ChatEntry =
  | { kind: 'bot'; parts: RichPart[]; bullets?: string[]; cierre?: string }
  | { kind: 'usr'; text: string }
  | { kind: 'chips'; chips: { label: string; action: ChatChipAction }[] }

export const CHAT_HEAD = {
  nombre: 'Chat XP',
  estado: 'XPERIENCE PROPERTIES · EN LÍNEA',
  modo: 'NAV GUIADA ON',
  placeholder: 'Escribe tu consulta...',
} as const

export const CHAT_INITIAL: ChatEntry[] = [
  {
    kind: 'bot',
    parts: [
      'Hola 👋 Soy ',
      { b: 'Chat XP' },
      '. Puedo contarte de este proyecto — ubicación, pisos, accesos — o de lo que esta plataforma puede hacer por el tuyo. ¿Por dónde empezamos?',
    ],
  },
  {
    kind: 'chips',
    chips: [
      { label: 'Sobre este proyecto', action: null },
      { label: 'Cotizar mi plataforma', action: 'cotizar' },
      { label: 'Agendar reunión', action: null },
    ],
  },
  { kind: 'usr', text: '¿Cómo activo la disponibilidad de mi edificio?' },
  {
    kind: 'bot',
    parts: [
      'Directo al grano 👌 La sección de ',
      { b: 'Disponibilidad' },
      ' se activa desde el Paquete B: cargamos tus unidades como polígonos interactivos con inventario en tiempo real. ¿Te muestro los paquetes o agendamos una reunión virtual con nuestro equipo?',
    ],
  },
  {
    kind: 'chips',
    chips: [
      { label: 'Ver paquetes', action: 'paquetes' },
      { label: 'Agendar reunión virtual', action: 'cotizar' },
    ],
  },
]

export const CHAT_RESPUESTAS: Partial<Record<ViewId, [ChatEntry, ChatEntry]>> = {
  [VIEWS.INFORMACION]: [
    { kind: 'usr', text: 'Hola, me interesa saber más sobre la sección de Información.' },
    {
      kind: 'bot',
      parts: ['Claro. La sección de ', { b: 'Información' }, ' concentra la ficha completa de tu proyecto:'],
      bullets: [
        'Datos técnicos: niveles, m² rentables, estacionamientos, año',
        'Historia y trayectoria de tu empresa',
        'Portafolio con redirección a tus otros desarrollos',
        'Documentos descargables: brochure y fichas',
      ],
      cierre: 'Todo se edita desde el panel admin, sin depender de programación. ¿Te muestro los paquetes que la activan?',
    },
  ],
  [VIEWS.UBICACION]: [
    { kind: 'usr', text: 'Hola, me interesa saber más sobre la sección de Ubicación.' },
    {
      kind: 'bot',
      parts: ['Va. La sección de ', { b: 'Ubicación' }, ' pone tu proyecto en su entorno real:'],
      bullets: [
        'Mapa interactivo conectado a Google Earth',
        'Puntos de interés: vialidades, transporte, comercio y servicios',
        'Cercanías a puntos estratégicos de la zona',
        'Funciona como filtro de búsqueda por zona dentro de Xperience Properties',
      ],
      cierre: '¿Quieres verla activa en tu proyecto?',
    },
  ],
  [VIEWS.MASTER_PLAN]: [
    { kind: 'usr', text: 'Hola, me interesa saber más sobre la sección de Master Plan.' },
    {
      kind: 'bot',
      parts: ['De lo mejor de la plataforma. El ', { b: 'Master Plan' }, ' hace que tu edificio se explore desde el aire:'],
      bullets: [
        'Navegación orbital con vistas reales de drone',
        'Vista cenital con galería de fotos curada',
        'Videotour interactivo por recorridos',
        'Foto 360 inmersiva',
      ],
      cierre: 'Y todo sale de un solo vuelo estandarizado. ¿Agendamos el tuyo?',
    },
  ],
  [VIEWS.DISPONIBILIDAD]: [
    { kind: 'usr', text: 'Hola, me interesa saber más sobre la sección de Disponibilidad.' },
    {
      kind: 'bot',
      parts: ['La sección que vende. ', { b: 'Disponibilidad' }, ' convierte tu inventario en algo vivo:'],
      bullets: [
        'Cada unidad es un polígono interactivo sobre la fachada real',
        'Estatus al minuto: disponible / apartado / colocado',
        'Ficha por unidad: m², nivel, fotos, recorrido y condiciones',
        'Analítica: sabemos qué unidades exploran más tus prospectos',
      ],
      cierre: '¿Te muestro cómo se carga tu inventario?',
    },
  ],
  [VIEWS.CONTACTO]: [
    { kind: 'usr', text: 'Hola, me interesa saber más sobre la sección de Contacto.' },
    {
      kind: 'bot',
      parts: ['Aquí es donde el clic se vuelve cita. ', { b: 'Contacto' }, ' conecta todo tu embudo:'],
      bullets: [
        'Formularios conectados a tu CRM, o te armamos uno a la medida',
        'Calendario de citas y reuniones virtuales',
        'Chat XP filtra y verifica el perfil de cada prospecto',
        'Cada lead queda registrado con su recorrido completo en la plataforma',
      ],
      cierre: '¿Quieres que te lo dejemos funcionando?',
    },
  ],
}