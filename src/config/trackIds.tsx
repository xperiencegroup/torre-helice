// ─────────────────────────────────────────────
// trackIds.ts — IDs centralizados del proyecto Xperience Properties
// Fuente única de verdad para el mapa de trazabilidad.
// Importar desde cada vista/componente en lugar de strings inline.
// ─────────────────────────────────────────────

const P = 'xperience_properties' // prefijo del proyecto

declare global {
  function gtag(...args: unknown[]): void
}

export function track(eventId: string, extra?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log('[track]', eventId, extra)
    return
  }
  if (typeof gtag === 'undefined') return
  gtag('event', eventId, {
    event_category: eventId.split(':')[1] ?? 'general',
    ...extra,
  })
}

export const TRACK = {

  // ── Bienvenida ──
  bienvenida: {
    view:     `${P}:bienvenida:view`,
    explorar: `${P}:bienvenida:explorar:click`,
  },

  // ── Global ──
  global: {
    back: `${P}:global:back:click`,
    home: `${P}:global:home:click`,
  },

  // ── Sesión / Auth ──
  session: {
    toggle: `${P}:session:toggle`,
  },
  auth: {
    submit:      `${P}:auth:login:submit`,
    success:     `${P}:auth:login:success`,
    error:       `${P}:auth:login:error`,
    logout:      `${P}:auth:logout:click`,
  },

  // ── Menú Principal (Inicio) ──
  inicio: {
    view: `${P}:inicio:view`,
    menu: {
      toggle:         `${P}:inicio:menu:toggle`,
      informacion:    `${P}:inicio:menu:informacion:click`,
      ubicacion:      `${P}:inicio:menu:ubicacion:click`,
      masterPlan:  `${P}:inicio:menu:rotacion:click`,
      disponibilidad: `${P}:inicio:menu:disponibilidad:click`,
      contacto:       `${P}:inicio:menu:contacto:click`,
    },
  },

  // ── Información ──
  informacion: {
    view: `${P}:informacion:view`,
  },

  // ── Ubicación ──
  ubicacion: {
    view: `${P}:ubicacion:view`,
    menu: `${P}:ubicacion:menu:click`,
  },

  // ── Plano de Conjunto ──
  masterPlan: {
    view: `${P}:rotacion:view`,
  },

  // ── Disponibilidad ──
  disponibilidad: {
    view: `${P}:disponibilidad:view`,
  },

  // ── Contacto ──
  contacto: {
    view: `${P}:contacto:view`,
  },

  
  // ── Topbar ──
  topbar: {
    precios:   `${P}:topbar:precios:click`,
    cotiza:    `${P}:topbar:cotiza:click`,
    dashboard: `${P}:topbar:dashboard:click`,
  },

  // ── Badge / Widgets ──
  badge: {
    xperience: `${P}:badge:xperience:click`,
  },
  widgets: {
    qr: `${P}:widgets:qr:click`,
  },

  // ── Chat XP ──
  chat: {
    toggle: `${P}:chat:toggle`,              // extra: { open }
    chip:   `${P}:chat:chip:click`,          // extra: { label, action }
    ask:    `${P}:chat:ask`,                 // extra: { view }
  },

  // ── Overlays ──
  premium: {
    open:      `${P}:premium:open`,          // extra: { view }
    close:     `${P}:premium:close:click`,   // extra: { view }
    paquetes:  `${P}:premium:paquetes:click`,
    askChat:   `${P}:premium:ask_chat:click`,
    unlock:    `${P}:premium:unlock:click`,
  },
  paquetes: {
    close:   `${P}:paquetes:close:click`,
    cotizar: `${P}:paquetes:cotizar:click`,  // extra: { paquete }
  },
  cotizar: {
    close:   `${P}:cotizar:close:click`,
    submit:  `${P}:cotizar:submit`,          // extra: { paquete }
    success: `${P}:cotizar:success`,
    error:   `${P}:cotizar:error`,
  },
  qr: {
    close:     `${P}:qr:close:click`,
    imprimir:  `${P}:qr:imprimir:click`,
    subir:     `${P}:qr:subir:click`,
    compartir: `${P}:qr:compartir:click`,
  },
  compartir: {
    close:  `${P}:compartir:close:click`,
    enviar: `${P}:compartir:enviar:click`,
  },
  xperience: {
    close:     `${P}:xperience:close:click`,
    siguiente: `${P}:xperience:siguiente:click`,   // extra: { slide }
    dot:       `${P}:xperience:dot:click`,         // extra: { slide }
    youtube:   `${P}:xperience:youtube:click`,     // extra: { video }
    cta:       `${P}:xperience:cta:click`,
  },  
  dashboard: {
    close:  `${P}:dashboard:close:click`,
    entrar: `${P}:dashboard:entrar:click`,
  },  

} as const