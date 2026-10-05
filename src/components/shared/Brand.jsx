import { Link } from 'react-router-dom'

export default function Brand({ inverse = false }) {
  return (
    <Link
      className={`inline-flex items-center gap-[13px] text-[27px] leading-none font-[750] tracking-[-1.8px] max-[700px]:text-[24px] ${inverse ? 'text-white' : 'text-ink'}`}
      to="/"
      aria-label="Makon bosh sahifasi"
    >
      <span className="grid size-[23px] grid-cols-2 grid-rows-2 gap-[3px]" aria-hidden="true">
        <span className={inverse ? 'bg-white' : 'bg-klein'} />
        <span className={`${inverse ? 'bg-white' : 'bg-klein'} opacity-20`} />
        <span className={`${inverse ? 'bg-white' : 'bg-klein'} opacity-55`} />
        <span className={inverse ? 'bg-white' : 'bg-klein'} />
      </span>
      <span>makon<span className={inverse ? 'text-white' : 'text-klein'}>.</span></span>
    </Link>
  )
}
