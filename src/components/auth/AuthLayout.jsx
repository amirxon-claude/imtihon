import { Link } from 'react-router-dom'
import Brand from '../shared/Brand.jsx'
import ArrowIcon from '../shared/ArrowIcon.jsx'

export default function AuthLayout({ number, title, description, visualTitle, children, alternateText, alternateLabel, alternateTo }) {
  return (
    <main className="grid min-h-screen grid-cols-[45%_55%] max-[950px]:grid-cols-[39%_61%] max-[700px]:block">
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-klein px-[7.2%] py-11 text-white max-[950px]:px-[8%] max-[950px]:py-9 max-[700px]:min-h-[155px] max-[700px]:px-[6%] max-[700px]:py-6" aria-label="Makon taqdimoti">
        <div className="pointer-events-none absolute top-1/4 -left-[260px] size-[600px] rounded-full border border-white/15 max-[700px]:hidden" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 right-[21%] h-full w-px bg-white/20 max-[700px]:hidden" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-between">
          <Brand inverse />
          <span className="text-[11px] font-bold tracking-[1.3px] max-[700px]:text-[10px]">{number} / 03</span>
        </div>
        <div className="relative z-10 mb-[4%] max-[700px]:hidden">
          <span className="-ml-[0.07em] text-[clamp(145px,22vw,340px)] leading-[0.8] font-bold tracking-[-0.13em] max-[950px]:text-[19vw]">{number}</span>
          <div className="my-[30px] h-px w-full bg-white/65" aria-hidden="true" />
          <p className="m-0 text-[clamp(30px,3vw,47px)] leading-[1.1] font-semibold tracking-[-0.055em]">{visualTitle}</p>
        </div>
        <div className="relative z-10 flex items-center justify-between border-t border-white/45 pt-[19px] text-[11px] font-bold tracking-[1.3px] max-[700px]:hidden">
          <span>MAKON</span><span className="max-[950px]:hidden">Kirish / Ro‘yxatdan o‘tish</span>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-between px-[8%] py-12 max-[950px]:px-[8%] max-[950px]:py-10 max-[700px]:min-h-[calc(100vh-155px)] max-[700px]:px-[6%] max-[700px]:py-[26px]">
        <div className="flex items-center justify-between text-xs">
          <Link className="inline-flex items-center gap-[9px] font-bold hover:text-klein" to="/">
            <span className="inline-flex rotate-180 [&>svg]:size-5"><ArrowIcon /></span> Bosh sahifa
          </Link>
          <span className="tracking-[1px] text-[#777]">{number} / 03</span>
        </div>
        <div className="mx-auto my-[65px] w-full max-w-[430px] max-[700px]:mb-[55px]">
          <span className="text-[11px] font-[750] tracking-[1.5px] text-klein">MAKON / {number === '02' ? 'KIRISH' : 'RO‘YXAT'}</span>
          <h1 className="mt-[23px] mb-4 text-[clamp(48px,5.4vw,74px)] leading-none font-[750] tracking-[-0.075em] max-[700px]:text-[56px] max-[390px]:text-[50px]">{title}</h1>
          <p className="mb-[38px] max-w-[340px] text-[15px] leading-[1.6] text-[#65656c] max-[700px]:mb-[30px]">{description}</p>
          {children}
          <div className="mt-[35px] flex items-center justify-between gap-3 border-t border-rule pt-[25px] text-[13px] max-[390px]:flex-col max-[390px]:items-start">
            <span className="text-[#73737a]">{alternateText}</span>
            <Link className="inline-flex items-center gap-[6px] whitespace-nowrap font-[750] text-klein hover:underline [&>svg]:size-[17px]" to={alternateTo}>{alternateLabel} <ArrowIcon diagonal /></Link>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-rule pt-5 text-xs text-[#777]"><span>© Makon</span><span>Interfeys namunasi</span></div>
      </section>
    </main>
  )
}
