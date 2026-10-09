import { useAppStore } from '../../store/useAppStore'
import { useAuthStore } from '../../store/useAuthStore'
import { TRACK, track } from '../../config/trackIds'
import { LoginForm } from '../ui/LoginForm/LoginForm'
import './SessionPanel.css'

export const SessionPanel: React.FC = () => {
  const sessionPanelCollapsed = useAppStore((s) => s.sessionPanelCollapsed)
  const toggleSessionPanel = useAppStore((s) => s.toggleSessionPanel)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const session = useAuthStore((s) => s.session)
  const logout = useAuthStore((s) => s.logout)

  const handleToggle = () => {
    track(TRACK.session.toggle)
    toggleSessionPanel()
  }

  const handleLogout = () => {
    logout()
  }

  if (sessionPanelCollapsed) {
    return (
      <div data-component="SessionPanel" className="session-panel-collapsed" onClick={handleToggle}>
        <svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 32.0005C7.02804 32.0005 0 24.972 0 16C0 7.02804 7.02804 0 16 0C24.972 0 32 7.02804 32 16C32 24.972 24.972 32 16 32V32.0005ZM16 2.49987C8.42961 2.49987 2.49987 8.42961 2.49987 16C2.49987 23.5704 8.42961 29.5001 16 29.5001C23.5704 29.5001 29.5001 23.5704 29.5001 16C29.5001 8.42961 23.5704 2.49987 16 2.49987Z" fill="#262626" />
          <path d="M15.9999 19.7498C12.5536 19.7498 9.75 16.9462 9.75 13.4999C9.75 10.0536 12.5536 7.25 15.9999 7.25C19.4462 7.25 22.2498 10.0536 22.2498 13.4999C22.2498 16.9462 19.4462 19.7498 15.9999 19.7498ZM15.9999 9.74987C13.9322 9.74987 12.2499 11.4322 12.2499 13.4999C12.2499 15.5676 13.9322 17.2499 15.9999 17.2499C18.0676 17.2499 19.7499 15.5676 19.7499 13.4999C19.7499 11.4322 18.0676 9.74987 15.9999 9.74987Z" fill="#262626" />
          <path d="M25.3647 28.7374C24.8589 28.7374 24.3826 28.4281 24.1942 27.9265C22.9201 24.5313 19.6266 22.2503 15.9989 22.2503C12.3713 22.2503 9.07779 24.5313 7.80371 27.9265C7.5609 28.5729 6.84042 28.9001 6.19401 28.6577C5.5476 28.4154 5.22041 27.6945 5.46275 27.048C6.25917 24.9265 7.66215 23.1119 9.52123 21.8008C11.4234 20.4592 13.6636 19.75 15.9985 19.75C18.3333 19.75 20.5735 20.4592 22.4757 21.8008C24.3348 23.1119 25.7383 24.926 26.5342 27.048C26.7766 27.6945 26.4494 28.4149 25.803 28.6577C25.6581 28.7121 25.51 28.7379 25.3637 28.7379L25.3647 28.7374Z" fill="#262626" />
        </svg>
      </div>
    )
  }

  return (
    <div data-component="SessionPanel" className="session-panel-expanded">
      {isAuthenticated ? (
        <div className="session-panel-expanded__user">
          <span>Hola, {session?.user.email ?? 'usuario'}</span>
          <button type="button" onClick={handleLogout} className="session-panel-expanded__logout">
            Cerrar sesión
          </button>
        </div>
      ) : (
        <>
          <button type="button" onClick={handleToggle} className="session-panel-expanded__title">
            INICIAR SESIÓN
          </button>
          <LoginForm />
        </>
      )}
    </div>
  )
}