import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import SiteHeader from "../components/home/SiteHeader.jsx";
import {
  PreviewSection,
  DetailsSection,
  FaqSection,
  ClosingSection,
} from "../components/home/HomeSections.jsx";
import ArrowIcon from "../components/shared/ArrowIcon.jsx";
import { primaryButtonClasses } from "../components/shared/uiClasses.js";

export default function HomePage() {
  const { user: authUser } = useAuth();
  const [searchParams] = useSearchParams();
  // Faqat development rejimida: /?preview=profile dizaynni backendsiz ko'rsatadi
  const previewUser =
    import.meta.env.DEV && searchParams.get("preview") === "profile"
      ? { name: "Ism Familiya", email: "name@example.com" }
      : null;
  const user = authUser || previewUser;
  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main>
        <section className="mx-auto max-w-[1440px] px-[5.5%] pt-[30px] max-[700px]:px-[6%] max-[700px]:pt-[25px]">
          <div className="flex justify-between text-[10px] font-[750] tracking-[1.5px] text-[#626269] max-[700px]:text-[9px]">
            <span>01 / 03</span>
            <span>BOSH SAHIFA</span>
          </div>
          <div className="grid min-h-[600px] grid-cols-[1.15fr_0.85fr] items-center gap-[3%] max-[950px]:min-h-[510px] max-[950px]:grid-cols-[1fr_0.8fr] max-[700px]:flex max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-[25px] max-[700px]:pt-[70px]">
            <div className="py-[35px] pb-[55px] max-[700px]:p-0">
              <h1 className="mb-[38px] whitespace-nowrap text-[clamp(57px,7.1vw,112px)] leading-[0.98] font-[750] tracking-[-0.09em] max-[950px]:text-[clamp(50px,7.3vw,80px)] max-[700px]:mb-6 max-[700px]:whitespace-normal max-[700px]:text-[clamp(51px,10vw,72px)] max-[390px]:text-[48px]">
                Bir joydan
                <br />
                <span className="text-klein">boshlang.</span>
              </h1>
              <p className="mb-[37px] max-w-[480px] text-[17px] leading-[1.65] text-[#54545a] max-[700px]:mb-7 max-[700px]:text-[15px]">
                Makon bilan tanishing. Boshlash uchun ro‘yxatdan o‘tish yoki
                mavjud hisobingizga kirish sahifasini tanlang.
              </p>
              <div className="flex items-center gap-[31px] max-[390px]:gap-5">
                <Link className={primaryButtonClasses} to="/register">
                  Boshlash <ArrowIcon />
                </Link>
                <Link
                  className="inline-flex items-center gap-[14px] border-b border-ink py-[10px] text-sm font-bold hover:border-klein hover:text-klein [&>svg]:size-[17px]"
                  to="/login"
                >
                  Hisobim bor <ArrowIcon diagonal />
                </Link>
              </div>
            </div>
            <div
              className="relative grid h-[470px] place-items-center overflow-hidden bg-klein max-[950px]:h-[370px] max-[700px]:h-[290px]"
              aria-hidden="true"
            >
              <div className="absolute top-1/2 h-px w-full bg-white/20" />
              <div className="absolute left-1/2 h-full w-px bg-white/20" />
              <div className="relative aspect-square w-[min(65%,310px)] border border-white max-[700px]:w-[190px]">
                <div className="absolute inset-[16%] border border-white/70" />
                <div className="absolute top-[27.5%] left-[27.5%] aspect-square w-[45%] rounded-full bg-white" />
              </div>
              <span className="absolute bottom-[22px] left-[25px] text-[11px] font-bold tracking-[1.6px] text-white">
                M / 01
              </span>
            </div>
          </div>
          <div className="flex h-[65px] items-center justify-between border-t border-[#c9c9ce] text-[10px] font-[750] tracking-[1.5px] max-[700px]:mt-[26px]">
            <span>KIRISH / RO‘YXATDAN O‘TISH</span>
            <span className="max-[700px]:hidden">SAHIFALAR ↓</span>
          </div>
        </section>

        <section
          className="border-t border-rule bg-soft px-[5.5%] pt-[95px] pb-[120px] max-[700px]:px-[6%] max-[700px]:pt-[70px] max-[700px]:pb-20"
          aria-labelledby="options-title"
        >
          <div className="grid grid-cols-[1fr_2fr] items-start border-b border-[#c9c9ce] pb-12 max-[700px]:grid-cols-1 max-[700px]:gap-[25px]">
            <span className="text-[11px] font-bold tracking-[1.4px] text-klein">
              02 / SAHIFALAR
            </span>
            <h2
              className="text-[clamp(48px,5.5vw,76px)] leading-none font-[750] tracking-[-0.07em]"
              id="options-title"
            >
              Qayerdan
              <br />
              boshlaysiz?
            </h2>
          </div>
          <div className="grid grid-cols-2 max-[700px]:grid-cols-1">
            <Link
              className="relative flex min-h-[270px] flex-col justify-between border-b border-[#c9c9ce] py-[30px] pr-[30px] transition-[padding,background-color] duration-200 hover:bg-white hover:pl-5 max-[700px]:min-h-[210px]"
              to="/register"
            >
              <span className="text-xs font-bold text-klein">01</span>
              <div>
                <h3 className="mb-[10px] text-[27px] font-bold tracking-[-0.04em]">
                  Ro‘yxatdan o‘tish
                </h3>
                <p className="leading-normal text-[#626269]">
                  Yangi hisob yaratish sahifasini ko‘ring.
                </p>
              </div>
              <span className="absolute right-[30px] bottom-9 text-klein [&>svg]:size-6">
                <ArrowIcon diagonal />
              </span>
            </Link>
            <Link
              className="relative flex min-h-[270px] flex-col justify-between border-b border-l border-[#c9c9ce] p-[30px] transition-[padding,background-color] duration-200 hover:bg-white hover:pl-[50px] max-[700px]:min-h-[210px] max-[700px]:border-l-0 max-[700px]:pl-0 max-[700px]:hover:pl-5"
              to="/login"
            >
              <span className="text-xs font-bold text-klein">02</span>
              <div>
                <h3 className="mb-[10px] text-[27px] font-bold tracking-[-0.04em]">
                  Kirish
                </h3>
                <p className="leading-normal text-[#626269]">
                  Mavjud hisobga kirish sahifasini ko‘ring.
                </p>
              </div>
              <span className="absolute right-[30px] bottom-9 text-klein [&>svg]:size-6">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </div>
        </section>
        <PreviewSection />
        <DetailsSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <footer className="flex items-center justify-between border-t border-rule px-[5.5%] py-7 text-[13px] max-[700px]:px-[6%] max-[700px]:py-6">
        <span className="text-[22px] font-[750] tracking-[-1.5px]">makon.</span>
        <span>© 2026 Makon</span>
        <Link className="font-bold hover:text-klein" to="/">
          Bosh sahifa ↑
        </Link>
      </footer>
    </div>
  );
}
