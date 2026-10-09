import type { ReactNode } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { LoginForm } from '../ui/LoginForm/LoginForm'
import './RequireAdmin.css'

// El login solo existe para el panel admin: cualquier cuenta autenticada
// (creadas manualmente desde el dashboard de Supabase) tiene acceso.
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <div className="require-admin__login">
        <LoginForm />
      </div>
    )
  }

  return <>{children}</>
}