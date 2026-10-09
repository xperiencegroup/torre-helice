import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { VIEW_PATHS, VIEWS, ADMIN_PATH } from './config/views'
import { Bienvenida } from './views/Bienvenida/Bienvenida'
import { Inicio } from './views/Inicio/Inicio'
import { Informacion } from './views/Informacion/Informacion'
import { Ubicacion } from './views/Ubicacion/Ubicacion'
import { Masterplan } from './views/MasterPlan/MasterPlan'
import { Disponibilidad } from './views/Disponibilidad/Disponibilidad'
import { Contacto } from './views/Contacto/Contacto'
import { MenuPrincipal } from './components/MenuPrincipal/MenuPrincipal'
import { VideoHandlerComponent } from './components/VideoHandlerComponent'
/* import { HomeButton } from './components/ui/HomeButton/HomeButton'
import { AdminAccessButton } from './components/ui/AdminAccessButton/AdminAccessButton' */
import { Topbar } from './components/ui/Topbar/Topbar'
import RequireAdmin from './components/admin/RequireAdmin'
import AdminPanel from './views/AdminPanel/AdminPanel'
import { BadgeXperience } from './components/ui/BadgeXperience/BadgeXperience'
import { Widgets } from './components/ui/Widgets/Widgets'
import { ChatButton } from './components/ui/ChatButton/ChatButton'
import { Overlays } from './components/Overlays/Overlays'
import { ChatPanel } from './components/ui/ChatPanel/ChatPanel'
import { useAppStore } from './store/useAppStore'
import './App.css'


function RotateNotice() {

  return (
    <div className="rotate-notice">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20h13a2 2 0 0 0 2-2V7.5L14.5 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>
        <polyline points="14 3 14 8 19 8"/>
      </svg>
      <p>Rota tu dispositivo para<br/>una mejor experiencia</p>
    </div>
  )
}


function AppShell() {
  const location = useLocation()
  const isBienvenida = location.pathname === VIEW_PATHS[VIEWS.BIENVENIDA]
  const isInicio = location.pathname === VIEW_PATHS[VIEWS.INICIO] 
  const isAdminRoute = location.pathname === ADMIN_PATH
  const initAuthListener = useAuthStore((s) => s.initAuthListener)
    // El overlay Xperience es una presentación: sin chat encima
  const hideChat = useAppStore((s) => s.overlay?.type === 'xperience')

  useEffect(() => {
    initAuthListener()
  }, [])

  
  // Ruta oculta del panel admin: sin el chrome normal de la app
  // (sin videos, sin RotateNotice, sin menús de navegación pública).
  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path={ADMIN_PATH}
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        />
      </Routes>
    )
  }

  return (
    <>
      <VideoHandlerComponent />
      <RotateNotice />
      {!isBienvenida && <Topbar />}
      {!isBienvenida && <MenuPrincipal />}            
      {isInicio && <BadgeXperience />}
      {isInicio && <Widgets />}

      {!isBienvenida && <Overlays />}       
      {!isBienvenida && !hideChat && <ChatButton />}
      {!isBienvenida && !hideChat && <ChatPanel />}           
      {/* {!isBienvenida && isInicio && <SessionPanel />} */}
      {/* HomeButton oculto por ahora */}
      {/* {!isBienvenida && !isInicio && <HomeButton />} */}

      <Routes>
        <Route path="/" element={<Navigate to={VIEW_PATHS[VIEWS.BIENVENIDA]} replace />} />
        <Route path={VIEW_PATHS[VIEWS.BIENVENIDA]} element={<Bienvenida />} />
        <Route path={VIEW_PATHS[VIEWS.INICIO]} element={<Inicio />} />
        <Route path={VIEW_PATHS[VIEWS.INFORMACION]} element={<Informacion />} />
        <Route path={VIEW_PATHS[VIEWS.UBICACION]} element={<Ubicacion />} />
        <Route path={VIEW_PATHS[VIEWS.MASTER_PLAN]} element={<Masterplan />} />
        <Route path={VIEW_PATHS[VIEWS.DISPONIBILIDAD]} element={<Disponibilidad />} />
        <Route path={VIEW_PATHS[VIEWS.CONTACTO]} element={<Contacto />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App