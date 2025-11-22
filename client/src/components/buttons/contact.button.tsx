import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useToast } from "../../contexts/toast.context";

const PatientLogoutButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useAuth();
    const toast = useToast();

    const handleClick = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        auth.clearAuth();
        toast.showToast("Thông báo", "Đăng xuất thành công", "success");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

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
                <li className="py-3 px-4 cursor-pointer hover:bg-blue-50 hover:text-blue-500" onClick={handleLogout}>Đăng xuất</li>
            </ul>)}
        </div>
    );
}

export default PatientLogoutButton;