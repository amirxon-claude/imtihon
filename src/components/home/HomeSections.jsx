import { Link } from 'react-router-dom'
import ArrowIcon from '../shared/ArrowIcon.jsx'

const sectionLabel = 'text-[11px] font-bold tracking-[1.5px] text-klein'
const sectionTitle = 'text-[clamp(46px,5.4vw,76px)] leading-[1.02] font-[750] tracking-[-0.07em]'

export function PreviewSection() {
  return (
    <section className="border-t border-rule px-[5.5%] py-[110px] max-[700px]:px-[6%] max-[700px]:py-[75px]" aria-labelledby="preview-title">
      <div className="mx-auto grid max-w-[1282px] grid-cols-[0.8fr_1.2fr] gap-[8%] max-[950px]:gap-[5%] max-[700px]:grid-cols-1 max-[700px]:gap-10">
        <div>
          <span className={sectionLabel}>03 / KO‘RINISHLAR</span>
          <h2 className={`${sectionTitle} mt-7 mb-6`} id="preview-title">Har sahifa<br />o‘z o‘rnida.</h2>
          <p className="max-w-[390px] text-[16px] leading-[1.7] text-[#626269]">Kirish va ro‘yxatdan o‘tish sahifalari bir xil vizual tartibda tuzilgan. Quyidagi ko‘rinishlardan keraklisini oching.</p>
        </div>

        <div className="grid grid-cols-2 items-start gap-4 max-[700px]:gap-[10px] max-[390px]:grid-cols-1">
          <Link className="group block border border-rule bg-white transition-colors hover:border-klein" to="/login" aria-label="Kirish sahifasini ochish">
            <div className="flex h-[270px] overflow-hidden max-[950px]:h-[220px] max-[700px]:h-[190px] max-[390px]:h-[210px]">
              <div className="flex w-[38%] items-end bg-klein p-4 text-[90px] leading-[0.8] font-bold tracking-[-0.14em] text-white max-[950px]:text-[66px] max-[700px]:p-2 max-[700px]:text-[51px] max-[390px]:text-[60px]">02</div>
              <div className="flex flex-1 flex-col justify-center gap-3 px-[8%] max-[390px]:gap-2">
                <span className="text-[8px] font-bold tracking-[1px] text-klein">KIRISH</span>
                <span className="text-[17px] leading-none font-bold tracking-[-0.05em] max-[950px]:text-[13px]">Xush kelibsiz.</span>
                <span className="mt-2 h-[22px] border border-rule max-[390px]:h-4" />
                <span className="h-[22px] border border-rule max-[390px]:h-4" />
                <span className="h-[22px] bg-klein max-[390px]:h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-rule px-4 py-[18px] text-[13px] font-bold">
              <span>Kirish</span><span className="text-klein transition-transform group-hover:translate-x-1 [&>svg]:size-[18px]"><ArrowIcon diagonal /></span>
            </div>
          </Link>

          <Link className="group mt-[54px] block border border-rule bg-white transition-colors hover:border-klein max-[700px]:mt-7 max-[390px]:mt-0" to="/register" aria-label="Ro‘yxatdan o‘tish sahifasini ochish">
            <div className="flex h-[270px] overflow-hidden max-[950px]:h-[220px] max-[700px]:h-[190px] max-[390px]:h-[210px]">
              <div className="flex w-[38%] items-end bg-klein p-4 text-[90px] leading-[0.8] font-bold tracking-[-0.14em] text-white max-[950px]:text-[66px] max-[700px]:p-2 max-[700px]:text-[51px] max-[390px]:text-[60px]">03</div>
              <div className="flex flex-1 flex-col justify-center gap-[10px] px-[8%] max-[390px]:gap-[6px]">
                <span className="text-[8px] font-bold tracking-[1px] text-klein">RO‘YXAT</span>
                <span className="text-[17px] leading-none font-bold tracking-[-0.05em] max-[950px]:text-[13px]">Boshlaymiz.</span>
                <span className="mt-1 h-[20px] border border-rule max-[390px]:h-[14px]" />
                <span className="h-[20px] border border-rule max-[390px]:h-[14px]" />
                <span className="h-[20px] border border-rule max-[390px]:h-[14px]" />
                <span className="h-[20px] bg-klein max-[390px]:h-[14px]" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-rule px-4 py-[18px] text-[13px] font-bold">
              <span>Ro‘yxatdan o‘tish</span><span className="text-klein transition-transform group-hover:translate-x-1 [&>svg]:size-[18px]"><ArrowIcon diagonal /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function DetailsSection() {
  const details = [
    { number: '01', title: 'Aniq navigatsiya', text: 'Bosh sahifa, kirish va ro‘yxatdan o‘tish yo‘llari bir qarashda ko‘rinadi.' },
    { number: '02', title: 'Sodda formalar', text: 'Har bir maydon o‘z nomi bilan berilgan; kiritiladigan ma’lumotlar tushunarli.' },
    { number: '03', title: 'Moslashuvchan tartib', text: 'Sahifalar katta monitor va telefon ekranida qulay joylashadi.' },
  ]

  return (
    <section className="border-y border-rule bg-soft px-[5.5%] py-[100px] max-[700px]:px-[6%] max-[700px]:py-[75px]" aria-labelledby="details-title">
      <div className="mx-auto max-w-[1282px]">
        <div className="flex items-end justify-between gap-8 border-b border-[#c9c9ce] pb-12 max-[700px]:block">
          <div><span className={sectionLabel}>04 / TARTIB</span><h2 className={`${sectionTitle} mt-7`} id="details-title">Keraklisi<br />ko‘z oldida.</h2></div>
          <p className="max-w-[330px] pb-1 text-[15px] leading-[1.65] text-[#626269] max-[700px]:mt-6">Uch sahifani birlashtiradigan oddiy va izchil interfeys.</p>
        </div>
        <div className="grid grid-cols-3 max-[700px]:grid-cols-1">
          {details.map((item, index) => (
            <article className={`min-h-[275px] border-b border-[#c9c9ce] py-7 pr-8 max-[700px]:min-h-[215px] ${index > 0 ? 'border-l pl-8 max-[700px]:border-l-0 max-[700px]:pl-0' : ''}`} key={item.number}>
              <span className="text-[12px] font-bold text-klein">{item.number}</span>
              <div className="mt-[85px] max-[700px]:mt-[55px]">
                <h3 className="mb-3 text-[24px] font-bold tracking-[-0.04em]">{item.title}</h3>
                <p className="max-w-[280px] text-[14px] leading-[1.6] text-[#626269]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  const questions = [
    { number: '01', question: 'Qaysi sahifadan boshlayman?', answer: 'Yangi foydalanuvchi bo‘lsangiz, ro‘yxatdan o‘tish sahifasini oching. Hisobingiz bo‘lsa, kirish sahifasiga o‘ting.' },
    { number: '02', question: 'Ro‘yxatdan o‘tishda nimalar kiritiladi?', answer: 'Ism va familiya, elektron pochta hamda parol uchun alohida maydonlar bor.' },
    { number: '03', question: 'Telefon orqali ham ko‘rish mumkinmi?', answer: 'Ha. Sahifalar kichik ekranlarda ham o‘qish va foydalanish uchun moslashadi.' },
  ]

  return (
    <section className="px-[5.5%] py-[110px] max-[700px]:px-[6%] max-[700px]:py-[75px]" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1282px] grid-cols-[0.8fr_1.2fr] gap-[8%] max-[700px]:grid-cols-1 max-[700px]:gap-9">
        <div><span className={sectionLabel}>05 / SAVOLLAR</span><h2 className={`${sectionTitle} mt-7`} id="faq-title">Qisqa<br />javoblar.</h2></div>
        <div className="border-t border-[#c9c9ce]">
          {questions.map((item) => (
            <div className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#c9c9ce] py-7 max-[700px]:grid-cols-[30px_1fr]" key={item.number}>
              <span className="pt-1 text-[11px] font-bold text-klein">{item.number}</span>
              <div><h3 className="mb-3 text-[19px] font-bold tracking-[-0.025em]">{item.question}</h3><p className="max-w-[530px] text-[14px] leading-[1.65] text-[#626269]">{item.answer}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClosingSection() {
  return (
    <section className="bg-klein px-[5.5%] py-[100px] text-white max-[700px]:px-[6%] max-[700px]:py-[75px]" aria-labelledby="closing-title">
      <div className="mx-auto max-w-[1282px]">
        <div className="flex justify-between border-b border-white/45 pb-6 text-[11px] font-bold tracking-[1.5px]"><span>06 / BOSHLASH</span><span>MAKON</span></div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-10 pt-[70px] max-[700px]:grid-cols-1 max-[700px]:pt-[55px]">
          <div><h2 className="text-[clamp(52px,7vw,104px)] leading-[0.98] font-[750] tracking-[-0.08em]" id="closing-title">Keyingi qadam<br />sizniki.</h2><p className="mt-7 max-w-[510px] text-[16px] leading-[1.6] text-white/80">Yangi hisob sahifasini oching yoki mavjud hisobingiz bilan kirishni tanlang.</p></div>
          <div className="flex flex-col gap-3 max-[700px]:flex-row max-[390px]:flex-col">
            <Link className="inline-flex min-h-[54px] min-w-[200px] items-center justify-between gap-6 bg-white px-5 text-[14px] font-bold text-klein transition-transform hover:-translate-y-[3px] max-[700px]:min-w-0 max-[700px]:flex-1 [&>svg]:size-5" to="/register">Ro‘yxatdan o‘tish <ArrowIcon /></Link>
            <Link className="inline-flex min-h-[54px] min-w-[200px] items-center justify-between gap-6 border border-white px-5 text-[14px] font-bold text-white transition-colors hover:bg-white hover:text-klein max-[700px]:min-w-0 max-[700px]:flex-1 [&>svg]:size-5" to="/login">Kirish <ArrowIcon /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
