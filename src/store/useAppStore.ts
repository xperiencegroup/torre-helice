import { create } from 'zustand'
import { EMPTY_VIDEO, VIEWS, type VideoState, type ViewId } from '../config/views'
import { CHAT_INITIAL, CHAT_RESPUESTAS, type ChatEntry } from '../config/chatXP'

// -- overlay: un solo modal global activo a la vez --
export type PremiumOverlay = { type: 'premium'; view: ViewId }
export type PaquetesOverlay = { type: 'paquetes'; fromPremium?: ViewId }
export type QrOverlay = { type: 'qr' }
export type CotizarOverlay = {
  type: 'cotizar'
  paquete?: string
  returnTo?: PaquetesOverlay | QrOverlay   // overlay al que se regresa al cerrar
}
export type XperienceOverlay = { type: 'xperience' }

export type DashboardOverlay = { type: 'dashboard' }

export type CompartirOverlay = { type: 'compartir'; returnTo?: QrOverlay }

export type Overlay =
  | PremiumOverlay
  | PaquetesOverlay
  | QrOverlay
  | CotizarOverlay
  | CompartirOverlay
  | XperienceOverlay
  | DashboardOverlay
  | null



type AppState = {
  // -- ui slice --
  menuCollapsed: boolean
  toggleMenu: () => void
  setMenuCollapsed: (v: boolean) => void

  sessionPanelCollapsed: boolean
  toggleSessionPanel: () => void

  // -- navigation slice --
  currentView: ViewId
  setView: (v: ViewId) => void

  // -- video slice (mismo contrato que VideoHandlerComponent de Serena) --
  currentVideo: VideoState
  changeVideo: (src: string, isTransition: boolean, isReverse: boolean, to?: string) => void

  // -- blocking slice (evita disparar navegación mientras corre una transición) --
  blocked: boolean
  setBlocked: (v: boolean) => void

  // -- video ready flag --
  videoReady: boolean
  setVideoReady: (v: boolean) => void

  // -- overlay slice --
  overlay: Overlay
  openOverlay: (o: NonNullable<Overlay>) => void
  closeOverlay: () => void

  // -- chat slice (demo guionado) --
  chatOpen: boolean
  chatMessages: ChatEntry[]
  toggleChat: (force?: boolean) => void
  askChat: (view: ViewId) => void
}

export const useAppStore = create<AppState>((set) => ({
  menuCollapsed: false,
  toggleMenu: () => set((s) => ({ menuCollapsed: !s.menuCollapsed })),
  setMenuCollapsed: (v) => set({ menuCollapsed: v }),

  sessionPanelCollapsed: false,
  toggleSessionPanel: () => set((s) => ({ sessionPanelCollapsed: !s.sessionPanelCollapsed })),

  currentView: VIEWS.BIENVENIDA,
  setView: (v) => set({ currentView: v }),

  currentVideo: EMPTY_VIDEO,
  changeVideo: (src, isTransition, isReverse, to) =>
    set({ currentVideo: { currentSrc: src, isTransition, isReverse, to } }),

  blocked: false,
  setBlocked: (v) => set({ blocked: v }),

  videoReady: false,
  setVideoReady: (v) => set({ videoReady: v }),

  overlay: null,
  openOverlay: (o) => set({ overlay: o }),
  closeOverlay: () => set({ overlay: null }),

  chatOpen: false,
  chatMessages: CHAT_INITIAL,
  toggleChat: (force) => set((s) => ({ chatOpen: force ?? !s.chatOpen })),
  askChat: (view) =>
    set((s) => {
      const respuesta = CHAT_RESPUESTAS[view]
      // Igual que el HTML: se agrega el intercambio cada vez que se pregunta
      return respuesta
        ? { chatOpen: true, chatMessages: [...s.chatMessages, ...respuesta] }
        : { chatOpen: true }
    }),
}))