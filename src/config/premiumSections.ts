import type { ViewId } from './views'
import { VIEWS } from './views'
import informacionImg from '../assets/premium/informacion.jpg'
import ubicacionImg from '../assets/premium/ubicacion.jpg'
import disponibilidadImg from '../assets/premium/disponibilidad.jpg'
import contactoImg from '../assets/premium/contacto.jpg'
import masterplanImg from '../assets/premium/masterplan.jpg'

export type PremiumSection = {
  eyebrow: string
  titulo: string
  parrafos: string[]
  imagen: string
  desbloqueable: boolean   // muestra el botón "Desbloquear" (vista lista para navegar)
}

export const PREMIUM_SECTIONS: Partial<Record<ViewId, PremiumSection>> = {
  [VIEWS.INFORMACION]: {
    eyebrow: 'ESTO HACE · INFORMACIÓN',
    titulo: 'Todo tu proyecto, en un solo lugar.',
    parrafos: [
      'Aquí vive la información completa de tu proyecto: datos técnicos, la historia de tu empresa y un portafolio de tus otros desarrollos.',
      'Si tienes más de una oferta, tus prospectos se redirigen entre tus proyectos sin salir de la plataforma. Nadie se va con las manos vacías.',
    ],
    imagen: informacionImg,
    desbloqueable: false,    
  },
  [VIEWS.UBICACION]: {
    eyebrow: 'ESTO HACE · UBICACIÓN',
    titulo: 'Tu proyecto en su entorno real.',
    parrafos: [
      'Mapas interactivos conectados a Google Earth para explorar puntos de interés, vialidades y cercanías estratégicas de tu proyecto.',
      'Y hace doble trabajo: funciona como filtro de búsqueda por ubicación para los prospectos que llegan a la plataforma buscando zona antes que proyecto.',
    ],
    imagen: ubicacionImg,
    desbloqueable: true,
  },
  [VIEWS.MASTER_PLAN]: {
    eyebrow: 'ESTO HACE · MASTER PLAN',
    titulo: 'Tu edificio se explora desde el aire.',
    parrafos: [
      'Navegación orbital de tu proyecto con vistas reales capturadas con drone: rota, acércate y explora desde cualquier ángulo.',
      'Desde la vista cenital se activan la galería de fotos, el videotour interactivo y la foto 360. Tu proyecto deja de ser un PDF y se vuelve algo que se recorre.',
    ],
    imagen: masterplanImg,
    desbloqueable: true,
  },  
  [VIEWS.DISPONIBILIDAD]: {
    eyebrow: 'ESTO HACE · DISPONIBILIDAD',
    titulo: 'Inventario vivo, actualizado al minuto.',
    parrafos: [
      'Comercializa tus espacios disponibles en tiempo real: cada unidad es un polígono interactivo sobre la fachada real de tu edificio, con su ficha, fotos, recorrido y datos técnicos.',
      'Exploración interactiva unidad por unidad, con condiciones comerciales y simulaciones según tu esquema de venta o renta. Lo que se coloca, se apaga al minuto. Sin listas de Excel desactualizadas.',
    ],
    imagen: disponibilidadImg,
    desbloqueable: false,
  },
  [VIEWS.CONTACTO]: {
    eyebrow: 'ESTO HACE · CONTACTO',
    titulo: 'Cada visita puede volverse una cita.',
    parrafos: [
      'Conectamos tu plataforma con calendarios digitales, formularios de contacto, ligas para reuniones virtuales y los CRMs que ya usas internamente.',
      '¿No tienes CRM? También podemos armarte uno a la medida de tu proyecto. El punto es que ningún interesado se pierda entre el clic y la llamada.',
    ],
    imagen: contactoImg,
    desbloqueable: false,
  },
}