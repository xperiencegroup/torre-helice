type XpMedia =
  | { kind: 'video'; embed: string; liga: string; titulo: string }
  | { kind: 'servicios'; items: string[] }
  | { kind: 'portafolio'; items: [string, string][] }

export type XpSlide = {
  eyebrow: string
  titulo: string
  resaltado: string
  salto?: boolean            // salto de línea antes del resaltado
  parrafos: string[]
  stats?: { valor: string; label: string }[]
  cta?: { label: string; url: string }
  media: XpMedia
}

export const XPERIENCE_SLIDES: XpSlide[] = [
  {
    eyebrow: '1/4 · QUIÉN ES XPERIENCE',
    titulo: 'Reinventamos cómo se vende ',
    resaltado: 'el real estate.',
    parrafos: [
      'Nacimos volando drones en 2014. Hoy somos un grupo creativo que convierte proyectos inmobiliarios en experiencias interactivas que cierran ventas — desde el aire hasta el clic.',
    ],
    stats: [
      { valor: '12', label: 'AÑOS EN OPERACIÓN' },
      { valor: '+25', label: 'PLATAFORMAS ENTREGADAS' },
      { valor: '85%', label: 'RETENCIÓN DE CLIENTES' },
    ],
    media: {
      kind: 'video',
      embed: 'https://www.youtube-nocookie.com/embed/3UlTPZO2G3w',
      liga: 'https://youtu.be/3UlTPZO2G3w',
      titulo: 'Xperience Real Estate',
    },
  },
  {
    eyebrow: '2/4 · QUÉ ES CLICK & XPERIENCE',
    titulo: 'No vendemos plataformas.',
    resaltado: 'Vendemos experiencias que cierran.',
    salto: true,
    parrafos: [
      'Click & Xperience es la plataforma interactiva donde tu proyecto se explora, se filtra y se comercializa: navegación aérea real, inventario vivo, recorridos por unidad y analítica de cada clic de tus prospectos.',
      'Esta plataforma que estás navegando ahorita — es exactamente eso.',
    ],
    media: {
      kind: 'video',
      embed: 'https://www.youtube-nocookie.com/embed/l1Vw2i-bKyg',
      liga: 'https://www.youtube.com/watch?v=l1Vw2i-bKyg',
      titulo: 'Click & Xperience',
    },
  },
  {
    eyebrow: '3/4 · TODO LO QUE PODEMOS HACER POR TI',
    titulo: 'Un solo aliado. ',
    resaltado: 'Seis proveedores en uno.',
    parrafos: [
      'Producción aérea cinematográfica, fotografía y video, recorridos 360°, plataforma interactiva, showroom inteligente, marketing digital con generación de leads y análisis del comportamiento de tus prospectos.',
      'Sin rodeos, sin intermediarios, sin coordinar seis agencias distintas.',
    ],
    media: {
      kind: 'servicios',
      items: [
        'Vuelo de drone y captura in situ',
        'Producción de foto, video y 360°',
        'Plataforma Click & Xperience',
        'Chat XP + Xperience Intelligence',
        'Marketing, pauta y contenidos con AI',
        'Atención broker hasta el cierre',
      ],
    },
  },
  {
    eyebrow: '4/4 · PORTAFOLIO',
    titulo: 'Desarrolladoras que ya ',
    resaltado: 'venden diferente.',
    parrafos: [
      'Más de 25 plataformas entregadas para proyectos residenciales, verticales e industriales — en preventa y en operación — en México, LATAM y Europa.',
      '[CASOS Y LOGOS CON AUTORIZACIÓN CONFIRMADA — pendiente validación con Dirección de Operaciones]',
    ],
    cta: { label: 'Conócenos → xperience.realestate', url: 'https://xperience.realestate/' },
    media: {
      kind: 'portafolio',
      items: [
        ['PROYECTO', 'RESIDENCIAL'],
        ['PROYECTO', 'VERTICAL'],
        ['PROYECTO', 'INDUSTRIAL'],
        ['SHOWROOM', 'INTELIGENTE'],
        ['PROYECTO', 'TERMINADO'],
        ['PROYECTO', 'INTERNACIONAL'],
      ],
    },
  },
]

export const XPERIENCE_NAV = {
  siguiente: 'SIGUIENTE →',
  verYoutube: 'VER EN YOUTUBE ↗',
} as const