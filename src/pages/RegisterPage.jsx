import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import ArrowIcon from '../components/shared/ArrowIcon.jsx'
import { authInputClasses, authLabelClasses, primaryButtonClasses } from '../components/shared/uiClasses.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function RegisterPage() {
  const { user, loading, register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Ro'yxatdan o'tgach foydalanuvchi avtomatik kirgan bo'ladi va bosh sahifaga o'tadi
  if (!loading && user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(name.trim(), email.trim(), password)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      number="03"
      title="Boshlaymiz."
      description="Yangi hisob uchun quyidagi maydonlarni to‘ldiring."
      visualTitle="Yangi hisob yarating."
      alternateText="Hisobingiz bormi?"
      alternateLabel="Kirish"
      alternateTo="/login"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className={authLabelClasses} htmlFor="register-name">Ism va familiya</label>
        <input
          className={authInputClasses}
          id="register-name"
          type="text"
          placeholder="Ism Familiya"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={80}
          required
        />
        <label className={authLabelClasses} htmlFor="register-email">Elektron pochta</label>
        <input
          className={authInputClasses}
          id="register-email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className={authLabelClasses} htmlFor="register-password">Parol</label>
        <input
          className={authInputClasses}
          id="register-password"
          type="password"
          placeholder="Parol yarating (kamida 8 belgi)"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={128}
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
          {submitting ? 'Yaratilmoqda...' : 'Ro‘yxatdan o‘tish'} <ArrowIcon />
        </button>
      </form>
    </AuthLayout>
  )
}
