import { useState } from "react";
import { motion } from "motion/react";

const navLinks = [
    { id:"home", href: '/admin', label: 'Trang chủ', icon: 'fa-solid fa-chart-line' },
    { id:"accounts", href: '/admin/accounts', label: 'Quản lý tài khoản', icon: 'fa-solid fa-users' },
    { id:"doctor-profile", href: '/admin/doctor-profile', label: 'Quản lý bác sĩ', icon: 'fa-solid fa-user-doctor' },
    { id:"assitor-profile", href: '/admin/assitor-profile', label: 'Quản lý nhân viên', icon: 'fa-solid fa-user-nurse' },
    { id:"appointment", href: '/admin/appointment', label: 'Quản lý lịch hẹn', icon: 'fa-solid fa-calendar-check' },
    { id:"medician-store", href: '/admin/medician-store', label: 'Quản lý kho thuốc', icon: 'fa-solid fa-warehouse' },
    { id:"none1", href: '/admin/', label: 'Quản lý nhập hàng', icon: 'fa-solid fa-file-import' },
    { id:"none2", href: '/admin/', label: 'Báo cáo thống kê', icon: 'fa-solid fa-chart-pie' },
]

const AdminMainSidebar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [tabActive, setTabActive] = useState<string>("home");

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
                            animate={{ rotate: open ? 0 : 180 }}
                            transition={{ duration: 0.3 }}
                        ></motion.i>
                    </button>

                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className={`overflow-hidden font-semibold flex gap-2 items-center hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-3 transition-all duration-200
                        ${tabActive === link.id && 'border-l-3 rounded-lg border-blue-600 bg-blue-50 text-blue-600'}
                        `} onClick={() => {setTabActive(link.id)}}>
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

export default AdminMainSidebar;