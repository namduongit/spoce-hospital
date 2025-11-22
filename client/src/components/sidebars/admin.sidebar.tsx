import { useState } from "react";
import { motion } from "motion/react";
import { useSidebar } from "../../contexts/sidebar.context";

import icon from '../../assets/images/admin/icon.png'

const navLinks = [
    { id: "home", href: '/admin', label: 'Trang chủ', icon: 'fa-solid fa-chart-line' },
    { id: "medicine-dashboard", href: '/admin/medicine-dashboard', label: 'Tổng quan thuốc', icon: 'fa-solid fa-chart-pie' },
    { id: "accounts", href: '/admin/accounts', label: 'Quản lý tài khoản', icon: 'fa-solid fa-users' },
    { id: "doctor-profile", href: '/admin/doctors-profile', label: 'Quản lý bác sĩ', icon: 'fa-solid fa-user-doctor' },
    { id: "appointment", href: '/admin/appointments', label: 'Quản lý lịch hẹn', icon: 'fa-solid fa-calendar-check' },
    { id: "department-room", href: '/admin/department-room', label: 'Quản lý phòng khám', icon: 'fa-solid fa-warehouse' },
    { id: "medical-package", href: '/admin/medical-package', label: 'Quản lý gói dịch vụ', icon: 'fa-solid fa-hand-holding-medical' },
    { id: "medicine", href: '/admin/medicine', label: 'Quản lý thuốc', icon: 'fa-solid fa-pills' },
    { id: "inventory", href: '/admin/inventory', label: 'Nhập xuất kho', icon: 'fa-solid fa-boxes-stacked' },
    { id: "prescription-invoice", href: '/admin/prescription-invoice', label: 'Hóa đơn kê thuốc', icon: 'fa-solid fa-receipt' },
    { id: "service-invoice", href: '/admin/service-invoice', label: 'Hóa đơn dịch vụ', icon: 'fa-solid fa-file-invoice' }
];

const AdminSidebar = () => {
    const locationPath = window.location.pathname;
    const { toggleSidebar } = useSidebar();
    const [open, setOpen] = useState<boolean>(true);


    return (
        <div className='sidebar-component fixed top-0 start-0 h-full z-10'>
            <motion.aside
                className="flex flex-col space-y-5 bg-white border-r border-gray-200 p-4 min-h-full"
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
                <div>
                    <a href="/admin" className={`flex items-center text-xl font-bold ${open ? 'space-x-2' : 'justify-center'}`}>
                        <img src={icon} alt="" className="h-10 w-10 rounded-full" />
                        <motion.span className="font-bold text-lg text-blue-600"
                            animate={{
                                opacity: open ? 1 : 0,
                                width: open ? "auto" : 0,
                                marginLeft: open ? 8 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >Admin Dashboard</motion.span>
                    </a>
                </div>

                <nav className="flex flex-col gap-2 relative">
                    <button
                        className="absolute -right-7 font-bold text-xl -top-13 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => {
                            setOpen(!open);
                            toggleSidebar();
                        }}
                    >
                        <motion.i
                            className={`fa-solid fa-angles-${open ? 'left' : 'right'}`}
                            transition={{ duration: 0.2 }}
                        ></motion.i>
                    </button>

                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className={`overflow-hidden font-semibold flex gap-2 items-center hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-3 transition-all duration-200
                        ${locationPath === link.href && 'border-l-3 rounded-lg border-blue-600 bg-blue-50 text-blue-600'}`}>
                            <i className={`fa-solid ${link.icon} min-w-5`}></i>
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