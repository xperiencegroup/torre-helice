import type { RichPart } from './chatXP'

export type Celda = string | boolean | { texto: string; mensualidad: string }

export type Paquete = {
  letra: string
  nombre: string
  precio: string
  pago: string[]            // líneas de la modalidad de pago
  destacado?: boolean
  tag?: string
}

export const PAQUETES_HEAD = {
  eyebrow: 'PAQUETES · XPERIENCE PROPERTIES',
  titulo: 'Elige qué tanto quieres activar.',
  texto:
    'Tu proyecto ya está en la plataforma. Estos son los caminos para completarlo — desde documentar tus amenidades hasta que nosotros atendamos, filtremos y cerremos por ti. Tú no pierdes tiempo con curiosos: recibes inquilinos y compradores.',
  columna: { titulo: 'QUÉ INCLUYE', sub: ['COMPARA LOS TRES', 'EN LAS MISMAS CATEGORÍAS'] },
  desde: 'DESDE',
  moneda: 'MXN',
  cotizar: 'Cotizar este',
} as const

export const PAQUETES: Paquete[] = [
  {
    letra: 'PAQUETE A',
    nombre: 'Activación',
    precio: '$38,000',
    pago: ['50% ANTICIPO · 50% FINIQUITO'],
  },
  {
    letra: 'PAQUETE B',
    nombre: 'Comercial + Disponibilidades',
    precio: '$72,500',
    pago: ['50% ANTICIPO · 50% FINIQUITO'],
    destacado: true,
    tag: 'MÁS ELEGIDO',
  },
  {
    letra: 'PAQUETE C',
    nombre: 'Full Xperience',
    precio: '$117,000',
    pago: ['$105,000 + LEVANTAMIENTO', 'A 6 PAGOS'],
  },
]

// true = ✓ · false = ✕ · string = texto · { texto, mensualidad } = texto + precio mensual
export const PAQUETES_TABLA: { grupo: string; filas: { label: string; valores: [Celda, Celda, Celda] }[] }[] = [
  {
    grupo: 'PRODUCCIÓN',
    filas: [
      { label: 'Producción in situ', valores: ['3 a 4 horas', '1 día completo', 'Desde 2 días'] },
      { label: 'Video comercial', valores: ['Básico — drone y tomas de pisos', 'Robusto', 'Robusto'] },
      { label: 'Videos cortos para redes (15–30 s)', valores: [false, '4 videos', '4 videos + nuevos cada mes'] },
      { label: 'Galería fotográfica', valores: ['20 imágenes', '40 imágenes', '40 imágenes + fotos por espacio'] },
      { label: 'Recorridos virtuales 360° de áreas comunes', valores: [true, true, true] },
      { label: 'Video tours interactivos de áreas comunes', valores: [true, true, true] },
    ],
  },
  {
    grupo: 'PLATAFORMA',
    filas: [
      { label: 'Secciones Información, Ubicación y Contacto', valores: [true, true, true] },
      { label: 'Entra al directorio Xperience Properties', valores: [true, true, true] },
      { label: 'Chatbot en la plataforma', valores: [false, 'Implementación + 6 meses', 'Implementación + 6 meses'] },
      { label: 'Sistema de QRs físicos en el edificio', valores: [false, true, true] },
    ],
  },
  {
    grupo: 'DISPONIBILIDADES',
    filas: [
      { label: 'Menú de Disponibilidades — mapa de polígonos en tiempo real', valores: [false, true, true] },
      { label: 'Levantamiento de los espacios por dentro', valores: [false, false, '100% documentado'] },
      { label: 'Recorridos de interiores por espacio', valores: [false, false, true] },
      { label: 'Video tours y fichas técnicas por unidad', valores: [false, false, true] },
    ],
  },
  {
    grupo: 'MOTOR COMERCIAL',
    filas: [
      { label: 'Xperience Intelligence — dashboard de analítica de comportamiento', valores: [false, false, 'Implementación + 6 meses'] },
      { label: 'Contenidos nuevos cada mes para pautar', valores: [false, false, true] },
      { label: 'Nosotros atendemos el lead y lo llevamos a la cita', valores: [false, false, true] },
      {
        label: 'Mensualidad a partir del mes 7',
        valores: [
          false,
          { texto: 'Chatbot', mensualidad: '$2,500 MXN / mes' },
          { texto: 'Chatbot + Intelligence', mensualidad: '$5,000 MXN / mes' },
        ],
      },
    ],
  },
]

export const PAQUETES_LEVANTAMIENTO = {
  titulo: 'PAQUETE C · LEVANTAMIENTO DE ESPACIOS',
  columnas: ['ESPACIOS A RETRATAR', 'LEVANTAMIENTO', 'TOTAL'],
  filas: [
    ['Hasta 5', '$12,000', '$117,000'],
    ['Hasta 10', '$22,000', '$127,000'],
    ['Hasta 20', '$40,000', '$145,000'],
    ['Hasta 40', '$72,000', '$177,000'],
  ],
  nota: [
    'Al paquete inicial de ', { b: '$105,000' },
    ' se le suma el levantamiento según cuántos espacios disponibles documentemos. El total se divide en ',
    { b: '6 pagos' }, '.',
  ] as RichPart[],
}

export const PAQUETES_PAUTA = {
  titulo: 'LA PAUTA VA POR SEPARADO',
  parrafos: [
    ['La inversión publicitaria en Meta y Google ', { b: 'no es parte de nuestro precio' }, ': es presupuesto tuyo, y tú decides cuánto. Nosotros lo operamos.'],
    ['Recomendación para empezar: ', { b: 'desde $1,500 MXN' }, '. Si son varios espacios, cada dueño o arrendatario puede decidir si quiere pautar el suyo y con cuánto.'],
    ['Así sabes siempre qué pagas por el servicio y qué pagas por alcance.'],
  ] as RichPart[][],
}

export const PAQUETES_NOTA = [
  'PRECIOS SIN IVA · PAQUETES A Y B SE PAGAN 50% DE ANTICIPO Y 50% DE FINIQUITO · PAQUETE C SE DIVIDE EN 6 PAGOS',
  'EL CHATBOT Y XPERIENCE INTELLIGENCE INCLUYEN IMPLEMENTACIÓN Y LOS PRIMEROS 6 MESES DE USO · A PARTIR DEL MES 7 CONTINÚAN POR MENSUALIDAD: $2,500 MXN EL CHATBOT SOLO, $5,000 MXN CHATBOT + INTELLIGENCE',
  'LICENCIA DE USO DE PLATAFORMA POR 3 AÑOS INCLUIDA · A PARTIR DEL AÑO 4 RENUEVA EN $1,800 USD ANUALES CON ACTUALIZACIÓN POR INPC',
  'VIÁTICOS FUERA DEL ÁREA METROPOLITANA DE MONTERREY SE COTIZAN POR SEPARADO',
]