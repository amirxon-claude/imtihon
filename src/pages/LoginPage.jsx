import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import ArrowIcon from '../components/shared/ArrowIcon.jsx'
import { authInputClasses, authLabelClasses, primaryButtonClasses } from '../components/shared/uiClasses.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Allaqachon kirgan foydalanuvchi (yoki muvaffaqiyatli kirishdan keyin) bosh sahifaga o'tadi
  if (!loading && user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      number="02"
      title="Xush kelibsiz."
      description="Hisobingizga kirish uchun ma’lumotlaringizni kiriting."
      visualTitle="Hisobingizga qayting."
      alternateText="Hali hisobingiz yo‘qmi?"
      alternateLabel="Ro‘yxatdan o‘tish"
      alternateTo="/register"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className={authLabelClasses} htmlFor="login-email">Elektron pochta</label>
        <input
          className={authInputClasses}
          id="login-email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className={authLabelClasses} htmlFor="login-password">Parol</label>
        <input
          className={authInputClasses}
          id="login-password"
          type="password"
          placeholder="Parolingizni kiriting"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p className="mb-[18px] border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-700" role="alert">
            {error}
          </p>
        )}
        <button
          className={`${primaryButtonClasses} mt-[9px] h-[57px] w-full disabled:cursor-not-allowed disabled:opacity-60`}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Kirilmoqda...' : 'Kirish'} <ArrowIcon />
        </button>
      </form>
    </AuthLayout>
  )
}
