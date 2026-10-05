import { NavLink, Link } from "react-router-dom";
import Brand from "../shared/Brand.jsx";
import ArrowIcon from "../shared/ArrowIcon.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";

export default function SiteHeader({ user = null }) {
  return (
    <header className="h-[84px] border-b border-rule bg-white max-[700px]:h-[70px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-[5.5%] max-[700px]:px-[6%]">
        <Brand />
        <nav
          className="ml-auto flex items-center gap-[37px] text-sm font-semibold max-[700px]:hidden"
          aria-label="Asosiy navigatsiya"
        >
          <NavLink
            className={({ isActive }) =>
              `py-[10px] ${isActive ? "text-klein" : "text-[#555] hover:text-klein"}`
            }
            to="/"
            end
          >
            Bosh sahifa
          </NavLink>
          {!user && (
            <NavLink
              className={({ isActive }) =>
                `py-[10px] ${isActive ? "text-klein" : "text-[#555] hover:text-klein"}`
              }
              to="/login"
            >
              Kirish
            </NavLink>
          )}
        </nav>
        {user ? (
          <ProfileDropdown user={user} />
        ) : (
          <Link
            className="ml-[49px] inline-flex items-center gap-7 border border-ink px-[17px] py-[13px] text-[13px] font-bold transition-colors duration-200 hover:bg-ink hover:text-white max-[700px]:ml-auto max-[700px]:gap-[10px] max-[700px]:px-3 max-[700px]:py-[10px] max-[700px]:text-xs max-[390px]:text-[11px] max-[390px]:[&>svg]:hidden [&>svg]:size-[17px]"
            to="/register"
          >
            Ro‘yxatdan o‘tish <ArrowIcon diagonal />
          </Link>
        )}
      </div>
    </header>
  );
}
