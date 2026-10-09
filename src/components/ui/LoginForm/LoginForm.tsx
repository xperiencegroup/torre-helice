import { useState, type FormEvent } from 'react'
import { useAuthStore } from '../../../store/useAuthStore'
import { TRACK, track } from '../../../config/trackIds'
import './LoginForm.css'

const EMAIL_DOMAIN = '@example.local'

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    track(TRACK.auth.submit)
    const email = `${username.trim()}${EMAIL_DOMAIN}`
    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="Usuario:"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
        required
        className="login-form__input"
      />
      <input
        type="password"
        placeholder="Contraseña:"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-form__input"
      />
      <button type="submit" disabled={loading} className="login-form__submit">
        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>
      {error && <p role="alert" className="login-form__error">Credenciales inválidas</p>}
    </form>
  )
}