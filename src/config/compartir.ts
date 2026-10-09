import compartirImg from '../assets/compartir/compartir.jpg'

export const COMPARTIR = {
  eyebrow: 'COMPARTIR PLATAFORMA',
  titulo: 'Mándasela a quien tiene que verla.',
  sub: 'Dinos quién eres y a quién se la envías, y le hacemos llegar la liga con tu nombre.',
  campos: [
    { label: 'TU NOMBRE', placeholder: 'Nombre y apellido', type: 'text' },
    { label: 'TU CORREO', placeholder: 'tucorreo@empresa.com', type: 'email' },
    { label: 'TU TELÉFONO / WHATSAPP', placeholder: '81 0000 0000', type: 'tel' },
    { label: '¿A QUIÉN SE LA ENVÍAS?', placeholder: 'correo@destinatario.com', type: 'email' },
  ],
  mensaje: { label: 'MENSAJE (OPCIONAL)', placeholder: 'Mira este proyecto, te va a interesar…' },

  envio: {
    eyebrow: 'VAS A ENVIAR',
    imagen: compartirImg,
    tipo: 'Plataforma interactiva · Oficinas · San Pedro Garza García',
    enviar: 'Enviar plataforma →',
    ok: 'Enviada. El destinatario recibe la liga con tu nombre, y el envío queda registrado para darle seguimiento.',
  },
} as const