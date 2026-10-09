export type Estatus = 'disp' | 'apar' | 'col'

export const DASHBOARD = {
  login: {
    marca: 'XPERIENCE PROPERTIES',
    titulo: 'Panel del administrador',
    proyecto: { label: 'PROYECTO', value: 'torre_helice' },
    password: { label: 'CONTRASEÑA', value: '......' },
    entrar: 'Entrar al dashboard →',
  },
  head: {
    marca: 'XPERIENCE PROPERTIES · PANEL ADMINISTRADOR',
    periodo: 'ÚLTIMOS 30 DÍAS',
    sub: 'DATOS DEMO · EN PRODUCCIÓN SE ALIMENTA DE LA TELEMETRÍA POR FOLIO DE LA PLATAFORMA',
  },
  kpis: [
    { valor: '486', label: 'VISITAS A LA PLATAFORMA' },
    { valor: '112', label: 'FOLIOS ÚNICOS' },
    { valor: '37', label: 'LIKES A UNIDADES' },
    { valor: '9', label: 'CITAS AGENDADAS' },
    { valor: '4/6', label: 'UNIDADES DISPONIBLES' },
  ],
  disponibilidades: {
    titulo: 'Disponibilidades',
    nota: 'LIGADAS A LOS POLÍGONOS DEL C&X — LO QUE CAMBIA AQUÍ, CAMBIA EN LA PLATAFORMA',
    columnas: ['UNIDAD', 'NIVEL', 'M²', 'ESTATUS', 'LIKES', ''],
    boton: 'CAMBIAR',
    filas: [
      { unidad: 'N2-01', nivel: 2, m2: 180, estatus: 'disp', label: 'DISPONIBLE', likes: 8 },
      { unidad: 'N2-02', nivel: 2, m2: 145, estatus: 'apar', label: 'APARTADO', likes: 11 },
      { unidad: 'N3-01', nivel: 3, m2: 220, estatus: 'disp', label: 'DISPONIBLE', likes: 6 },
      { unidad: 'N4-01', nivel: 4, m2: 450, estatus: 'disp', label: 'DISPONIBLE', likes: 9 },
      { unidad: 'N5-01', nivel: 5, m2: 300, estatus: 'col', label: 'COLOCADO', likes: 3 },
      { unidad: 'N5-02', nivel: 5, m2: 260, estatus: 'disp', label: 'DISPONIBLE', likes: 0 },
    ] as { unidad: string; nivel: number; m2: number; estatus: Estatus; label: string; likes: number }[],
  },
  leads: {
    titulo: 'Leads recientes',
    nota: 'POR FOLIO · CON SU INTELLIGENCE',
    columnas: ['FOLIO', 'SESIONES', 'TIEMPO', 'MAYOR INTERÉS', 'SEÑAL', ''],
    boton: 'VER INTELLIGENCE',
    filas: [
      { folio: 'XP-2026-000114', sesiones: 4, tiempo: '36 min', interes: 'N4-01', estatus: 'disp', senal: 'CALIENTE' },
      { folio: 'XP-2026-000121', sesiones: 2, tiempo: '18 min', interes: 'N2-02', estatus: 'apar', senal: 'TIBIO' },
      { folio: 'XP-2026-000098', sesiones: 3, tiempo: '21 min', interes: 'N3-01', estatus: 'apar', senal: 'TIBIO' },
      { folio: 'XP-2026-000130', sesiones: 1, tiempo: '6 min', interes: 'Master Plan', estatus: 'col', senal: 'EXPLORANDO' },
    ] as { folio: string; sesiones: number; tiempo: string; interes: string; estatus: Estatus; senal: string }[],
  },
  interes: {
    titulo: 'Mapa de interés',
    nota: '% DEL TIEMPO EN PLATAFORMA',
    filas: [
      { label: 'DISPONIBILIDAD', pct: 38 },
      { label: 'MASTER PLAN', pct: 24 },
      { label: 'GALERÍA', pct: 14 },
      { label: 'UBICACIÓN', pct: 12 },
      { label: 'CONTACTO', pct: 7 },
      { label: 'INFORMACIÓN', pct: 5 },
    ],
  },
  visitas: {
    titulo: 'Próximas visitas',
    nota: 'COORDINADAS',
    columnas: ['FECHA', 'FOLIO', 'VIENE CON', 'UNIDAD'],
    filas: [
      ['12 SEP · 10:30', 'XP-…114', 'Asesor Xperience', 'N4-01'],
      ['13 SEP · 12:00', 'XP-…098', 'Broker registrado', 'N3-01'],
      ['16 SEP · 17:30', 'XP-…121', 'Asesor Xperience', 'N2-02'],
    ],
    pie: 'DIRECTORIO DE INQUILINOS/DUEÑOS Y ESTATUS DE PAGOS: FASE 4 DEL BLUEPRINT — ESTE PANEL CRECE SOBRE ESTA MISMA BASE.',
  },
}