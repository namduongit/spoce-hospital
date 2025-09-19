import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";

type AccountButtonProps = {
    setOpen: (value: boolean) => void;
};

const AccountButton = ({ setOpen }: AccountButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isAuthenticated, clearAuth } = useAuth();
    const { showToast } = useToast();

    const handleLogoutClick = () => {
        clearAuth();
        setIsOpen(false);
        showToast("Thông báo", "Đăng xuất thành công!", "success");
    };

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
                <nav className="account-nav bg-white flex flex-col
                ms-3
                lg:!absolute lg:shadow-xl lg:min-w-40 lg:-start-34 lg:mt-5">
                    {isAuthenticated ?
                    <>
                    <NavLink to="/account" className={() => ("text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-3")}>
                        <i className="fa-solid fa-person me-2"></i>
                        Thông tin tài khoản
                    </NavLink>
                    <div className="text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-3" onClick={handleLogoutClick}>
                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                        Đăng xuất
                    </div>
                    </> :
                    <>
                    <NavLink to="/auth/login" onClick={() => setOpen(false)}  className={() => ("text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-3")}>
                        <i className="fa-solid fa-right-to-bracket me-2"></i>
                        Đăng nhập
                    </NavLink>
                    <NavLink to="/auth/register" className={() => ("text-gray-700 hover:font-bold hover:bg-gray-100 hover:text-blue-600 px-4 py-3")}>
                        <i className="fa-solid fa-user-plus me-2"></i>
                        Đăng ký
                    </NavLink>
                    </>
                    }
                </nav>
            )}
        </div>
    )
}

export default AccountButton;