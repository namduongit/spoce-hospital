import { useState } from 'react';

const navLinks = [
    {
        href: "/assistor",
        label: "Trang chủ"
    },
    {
        href: "/assistor/appointments",
        label: "Lịch hẹn"
    }
];

const AssistorSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='sidebar-component'>
            <button
                className="md:hidden fixed top-3 left-4 z-30 bg-blue-600 text-white p-2 rounded shadow focus:outline-none"
                onClick={() => setIsOpen(true)}
                aria-label="Open sidebar"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <aside className="hidden md:flex flex-col justify-between w-64 bg-white border-r border-gray-200 p-4 min-h-full">
                <nav className="flex flex-col gap-2">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-2 transition">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <button className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-2 cursor-pointer transition text-start">
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    <span>Đăng xuất</span>
                </button>
            </aside>

            {isOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="fixed inset-0 bg-black opacity-40" onClick={() => setIsOpen(false)}></div>
                    <aside className="relative w-64 bg-white border-r border-gray-200 p-4 min-h-full z-50 animate-slide-in-left flex flex-col justify-between">
                        <button
                            className="absolute top-2 right-2 text-gray-700"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <nav className="flex flex-col gap-2 mt-8">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-2 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-8">
                            <button className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-2 cursor-pointer transition text-start">
                                <i className="fa-solid fa-right-from-bracket me-2"></i>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default AssistorSidebar;