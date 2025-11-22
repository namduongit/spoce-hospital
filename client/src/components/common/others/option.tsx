import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";
import { useToast } from "../../../contexts/toast.context";

const OptionButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useAuth();
    const toast = useToast();

    const handleLogout = () => {
        auth.clearAuth();
        toast.showToast("Thông báo", "Đăng xuất thành công", "success");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return (
        <div className="relative account-button lg:text-white lg:py-2 lg:px-3 lg:rounded-[5px] lg:bg-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <i className="!hidden lg:!inline-block fa-regular fa-user"></i>
            <span className="relative py-1 block text-gray-700 hover:text-blue-600 ali
            lg:hidden"
            >
                Tài khoản
                <i className={`fa-solid ${isOpen ? 'fa-caret-up' : 'fa-caret-down'} lg:!hidden ms-1.5`}></i>
            </span>

            {isOpen && (
                <nav className="account-nav bg-white flex flex-col ms-1 lg:!absolute lg:shadow-xl lg:min-w-40 lg:-start-34 lg:mt-5">
                    {auth.isAuthenticated ? (
                        <>
                            <NavLink to="/page/account" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Tài khoản
                            </NavLink>
                            <NavLink to="/auth/history" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Lịch sử
                            </NavLink>
                            <button onClick={handleLogout} className="text-start text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/auth/login" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Đăng nhập
                            </NavLink>
                            <NavLink to="/auth/register" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Đăng ký
                            </NavLink>
                        </> 
                    )}
                </nav>
            )}
        </div >
    )
}

export default OptionButton;