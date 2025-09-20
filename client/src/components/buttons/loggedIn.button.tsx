import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";

export const LoggedInButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { clearAuth } = useAuth();
    const { showToast } = useToast();

    const handleClick = () => setIsOpen(!isOpen);

    const handleLogoutClick = () => {
        clearAuth();
        showToast("Thông báo", "Đăng xuất thành công!", "success");
    };

    return (
        <div>
            <button className="flex px-3 py-2 gap-1 cursor-pointer font-bold rounded-[5px] 
                             hover:bg-blue-600 hover:text-white transition delay-100 duration-300 ease-in-out"
                    onClick={handleClick}
            >
                Tài khoản
            </button>
            {isOpen && (
            <ul className="absolute w-46 bg-white rounded-md top-18 right-2 border-solid border-1 border-blue-200
                           after:content-[''] 
                           after:absolute 
                           after:border-white 
                           after:border-solid 
                           after:border-t-[0px] after:border-r-[8px] after:border-b-[8px] 
                           after:border-l-[8px] after:block after:w-0 after:h-0 after:-top-[8px] after:right-15
                           after:border-l-transparent after:border-r-transparent after:border-b-white"
            >
                <NavLink to="/page/account"><li className="py-3 px-4 cursor-pointer hover:bg-blue-50 hover:text-blue-500">Thông tin tài khoản</li></NavLink>
                <li className="py-3 px-4 cursor-pointer hover:bg-blue-50 hover:text-blue-500" onClick={handleLogoutClick}>Đăng xuất</li>
            </ul>)}
        </div>
    );
};