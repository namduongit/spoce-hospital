import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import PatientScheduleButton from "../../../components/buttons/schedule.button";
import HeaderMenu from "../../../components/common/others/menu";
import OptionButton from "../../../components/common/others/option";

const HeaderLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 block text-gray-700 hover:text-blue-600 transition ${
      isActive
        ? "font-bold text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
        : ""
    }`;

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

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
          <button 
            className="relative px-2 py-1 text-gray-700 hover:text-blue-600 transition"
            onClick={() => scrollToSection('service-section')}
          >
            Dịch vụ
          </button>
          <button 
            className="relative px-2 py-1 text-gray-700 hover:text-blue-600 transition"
            onClick={() => scrollToSection('package-section')}
          >
            Gói khám
          </button>
          <button 
            className="relative px-2 py-1 text-gray-700 hover:text-blue-600 transition"
            onClick={() => scrollToSection('doctor-section')}
          >
            Bác sĩ
          </button>
          <button 
            className="relative px-2 py-1 text-gray-700 hover:text-blue-600 transition"
            onClick={() => scrollToSection('contact-section')}
          >
            Liên hệ
          </button>
          <PatientScheduleButton />
          <OptionButton />
        </nav>

        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {isOpen && (<HeaderMenu navLinkClass={navLinkClass} isOpen={isOpen} setIsOpen={setIsOpen} />)}
    </header> 
  );
};

export default HeaderLayout;
