import { useState } from "react";
import { NavLink } from "react-router-dom";
import ScheduleNowButton from "../../components/buttons/scheduleNow.button";
import MenuHeader from "../../components/menus/header.menu";
import AccountButton from "../../components/buttons/account.button";

const HeaderLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 block text-gray-700 hover:text-blue-600 transition ${
      isActive
        ? "font-bold text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
        : ""
    }`;

  return (
    <header className="header-layout w-full bg-white shadow sticky top-0 start-0 z-10">
      <div className="header-wrap flex items-center justify-between px-4 py-2">

        <a href="/" className="header__logo flex items-center space-x-2 text-xl font-bold">
          <i className="fa-solid fa-hospital text-blue-600"></i>
          <span>SPOCETech</span>
        </a>

        <nav className="header__nav hidden lg:flex items-center md:space-x-1 lg:space-x-1 xl:space-x-3">
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/page/services" className={navLinkClass}>
            Dịch vụ
          </NavLink>
          <NavLink to="/page/doctors" className={navLinkClass}>
            Bác sĩ
          </NavLink>
          <NavLink to="/page/about" className={navLinkClass}>
            Giới thiệu
          </NavLink>
          <NavLink to="/page/contact" className={navLinkClass}>
            Liên hệ
          </NavLink>
          <ScheduleNowButton />
          <AccountButton />
        </nav>

        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {isOpen && (<MenuHeader navLinkClass={navLinkClass} isOpen={isOpen} setIsOpen={setIsOpen} />)}
    </header> 
  );
};

export default HeaderLayout;
