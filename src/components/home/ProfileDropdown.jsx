import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'

export default function ProfileDropdown({ user }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const detailsRef = useRef(null)

  async function handleLogout() {
    detailsRef.current?.removeAttribute('open')
    await logout()
    navigate('/', { replace: true })
  }

  const displayName = user?.name?.trim() || 'Profil'

  return (
    <details ref={detailsRef} className="group relative ml-[49px] max-[700px]:ml-auto">
      <summary aria-label="Profil menyusi" className="flex min-h-[48px] cursor-pointer list-none items-center gap-3 border border-ink bg-white pr-[15px] text-left transition-colors hover:border-klein [&::-webkit-details-marker]:hidden max-[700px]:min-h-[44px] max-[700px]:gap-2 max-[700px]:pr-3">
        <span className="grid size-[47px] place-items-center bg-klein text-white max-[700px]:size-[43px]" aria-hidden="true">
          <svg className="size-[22px]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 19c.5-3.1 2.8-5 6.5-5s6 1.9 6.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="max-w-[145px] truncate text-[13px] font-bold max-[700px]:max-w-[90px] max-[390px]:hidden">{displayName}</span>
        <svg className="ml-2 size-4 transition-transform group-open:rotate-180 max-[700px]:ml-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m5 7 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <div className="absolute top-[calc(100%+10px)] right-0 z-50 w-[270px] border border-rule bg-white max-[390px]:w-[250px]">
        <div className="border-b border-rule px-5 py-[18px]">
          <p className="truncate text-[15px] font-bold" title={displayName}>{displayName}</p>
          <p className="mt-1 truncate text-[12px] text-[#777]" title={user?.email || ''}>{user?.email || 'Hisob ma’lumotlari'}</p>
        </div>
        <div className="py-2">
          <button className="flex w-full items-center justify-between px-5 py-3 text-left text-[13px] font-semibold hover:bg-soft hover:text-klein" type="button">
            Profilim <span className="text-klein" aria-hidden="true">01</span>
          </button>
          <button className="flex w-full items-center justify-between px-5 py-3 text-left text-[13px] font-semibold hover:bg-soft hover:text-klein" type="button" onClick={handleLogout}>
            Chiqish <span className="text-klein" aria-hidden="true">02</span>
          </button>
        </div>
      </div>
    </details>
  )
}
