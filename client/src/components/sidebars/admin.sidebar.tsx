import { useState } from "react";
import { motion } from "motion/react";

const navLinks = [
    { id:"home", href: '/admin', label: 'Trang chủ', icon: 'fa-solid fa-chart-line' },
    { id:"accounts", href: '/admin/accounts', label: 'Quản lý tài khoản', icon: 'fa-solid fa-users' },
    { id:"doctor-profile", href: '/admin/doctors-profile', label: 'Quản lý bác sĩ', icon: 'fa-solid fa-user-doctor' },
    { id:"assitor-profile", href: '/admin/assitors-profile', label: 'Quản lý nhân viên', icon: 'fa-solid fa-user-nurse' },
    { id:"appointment", href: '/admin/appointments', label: 'Quản lý lịch hẹn', icon: 'fa-solid fa-calendar-check' },
    { id:"department-room", href: '/admin/department-room', label: 'Quản lý phòng khám', icon: 'fa-solid fa-warehouse' }
];

const AdminSidebar = () => {
    const locationPath = window.location.pathname;
    const [open, setOpen] = useState<boolean>(true);

    return (
        <div className='sidebar-component'>
            <motion.aside 
                className="flex flex-col justify-between bg-white border-r border-gray-200 p-4 min-h-full"
                animate={{
                    width: open ? 256 : 80
                }}
                transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
            >
                <nav className="flex flex-col gap-2 relative">
                    <button 
                        className="absolute -right-7 font-bold text-xl top-0 cursor-pointer hover:text-blue-600 transition-colors" 
                        onClick={() => setOpen(!open)}
                    >
                        <motion.i 
                            className={`fa-solid fa-angles-${open ? 'left' : 'right'}`}
                            transition={{ duration: 0.3 }}
                        ></motion.i>
                    </button>

                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className={`overflow-hidden font-semibold flex gap-2 items-center hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-3 transition-all duration-200
                        ${locationPath === link.href && 'border-l-3 rounded-lg border-blue-600 bg-blue-50 text-blue-600'}`}>
                            <i className={`fa-solid ${link.icon} min-w-[20px]`}></i>
                            <motion.span 
                                className="whitespace-nowrap"
                                animate={{ 
                                    opacity: open ? 1 : 0,
                                    width: open ? "auto" : 0,
                                    marginLeft: open ? 8 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {link.label}
                            </motion.span>
                        </a>
                    ))}
                </nav>
                {/* <LogoutButton /> */}
            </motion.aside>
        </div>
    )
}

export default AdminSidebar;