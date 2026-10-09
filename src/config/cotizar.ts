export const COTIZAR = {
  eyebrow: 'COTIZA YA',
  titulo: 'Cuéntanos qué tienes. Nosotros armamos el cómo.',
  sub: 'Cinco preguntas y una cita. Sin formularios eternos.',

  rol: {
    titulo: '01 · ¿QUÉ ERES?',
    opciones: ['Administro o desarrollo el proyecto completo', 'Soy dueño de una unidad o local'],
  },
  m2: {
    titulo: '02 · ¿DE CUÁNTOS M² HABLAMOS?',
    placeholder: 'Ej. 250 m²',
  },
  busca: {
    titulo: '03 · ¿QUÉ BUSCAS? (ELIGE TODO LO QUE APLIQUE)',
    opciones: ['Fotos', 'Videos', 'Recorridos 360°', 'Plataforma completa'],
  },
  estrategia: {
    titulo: '04 · NUESTRA ESTRATEGIA VA POR EL CIERRE',
    opciones: ['Quiero la estrategia completa', 'Empiezo con contenido y plataforma'],
  },
  contacto: {
    titulo: '05 · ¿CÓMO TE CONTACTAMOS?',
    nombre: 'Nombre completo',
    correo: 'Correo electrónico',
    telefono: 'Teléfono',
  },

  agenda: {
    eyebrow: 'AGENDA TU CITA',
    titulo: 'Hablemos de tu proyecto.',
    sub: 'Reunión virtual de 30 minutos. No te vamos a leer una lista de precios: salimos con el plan para ser la extensión digital y comercial de tu equipo de ventas.',
    horas: ['9:00', '10:30', '12:00', '16:00', '17:30'],
    enviar: 'Agendar la reunión →',
    enviando: 'Agendando...',
    faltantes: 'Completa tus datos de contacto, fecha y hora para agendar.',
    ok: 'Listo. Te llega la confirmación con la liga de la reunión. Nos vemos ahí — trae tus planos y tus dudas, nosotros llevamos el plan.',
    error: 'No pudimos agendar tu cita. Intenta de nuevo en un momento.',
  },
} as const