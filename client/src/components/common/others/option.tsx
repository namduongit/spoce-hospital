import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";

const OptionButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useAuth();

    return (
        <div className="relative account-button lg:text-white lg:py-2 lg:px-3 lg:rounded-[5px] lg:bg-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <i className="!hidden lg:!inline-block fa-regular fa-user"></i>
            <span className="relative px-2 py-1 block text-gray-700 hover:text-blue-600 ali
            lg:hidden"
            >
                Tài khoản
                <i className={`fa-solid ${isOpen ? 'fa-caret-up' : 'fa-caret-down'} lg:!hidden ms-1.5`}></i>
            </span>

            {isOpen && (
                <nav className="account-nav bg-white flex flex-col ms-5 lg:!absolute lg:shadow-xl lg:min-w-40 lg:-start-34 lg:mt-5">
                    {auth.isAuthenticated ? (
                        <>
                            <NavLink to="/page/account" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Tài khoản
                            </NavLink>
                            <NavLink to="/auth/history" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Lịch sử
                            </NavLink>
                            <NavLink to="/auth/logout" className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-1 lg:py-3">
                                Đăng xuất
                            </NavLink>
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