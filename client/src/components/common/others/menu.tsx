import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ScheduleButton from "../../buttons/schedule.button";
import OptionButton from "./option";

type HeaderMenuProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    navLinkClass: ({ isActive }: { isActive: boolean}) => string
}

const HeaderMenu = (props: HeaderMenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId: string) => {
        props.setIsOpen(false);
        
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
        <nav className="lg:hidden bg-white border-t border-gray-200 flex flex-col space-y-2 px-4 py-3 shadow">
            <NavLink to="/" end className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Trang chủ</NavLink>
            <button 
                className="text-left py-2 px-0 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                onClick={() => scrollToSection('service-section')}
            >
                Dịch vụ
            </button>
            <button 
                className="text-left py-2 px-0 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                onClick={() => scrollToSection('package-section')}
            >
                Gói khám
            </button>
            <button 
                className="text-left py-2 px-0 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                onClick={() => scrollToSection('doctor-section')}
            >
                Bác sĩ
            </button>
            <button 
                className="text-left py-2 px-0 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                onClick={() => scrollToSection('contact-section')}
            >
                Liên hệ
            </button>
            <OptionButton />
            <ScheduleButton />
        </nav>
    )
}

export default HeaderMenu;
