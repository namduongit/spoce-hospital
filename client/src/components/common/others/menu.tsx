import { NavLink } from "react-router-dom";
import ScheduleButton from "../../buttons/schedule.button";
import OptionButton from "./option";

interface HeaderMenu {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    navLinkClass: ({ isActive }: { isActive: boolean}) => string
}

const HeaderMenu = (props: HeaderMenu) => {
    return (
        <nav className="lg:hidden bg-white border-t border-gray-200 flex flex-col space-y-2 px-4 py-3 shadow">
            <NavLink to="/" end className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Trang chủ</NavLink>
            <NavLink to="/page/services" className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Dịch vụ</NavLink>
            <NavLink to="/page/doctors" className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Bác sĩ</NavLink>
            <NavLink to="/page/about" className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Giới thiệu</NavLink>
            <NavLink to="/page/contact" className={props.navLinkClass} onClick={() => props.setIsOpen(false)}>Liên hệ</NavLink>
            <OptionButton />
            <ScheduleButton />
        </nav>
    )
}

export default HeaderMenu;
