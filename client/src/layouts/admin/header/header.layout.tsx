import icon from '../../../assets/images/admin/icon.png'

const AdminHeaderLayout = () => {
    return (
        <header className="header-layout w-full bg-white shadow sticky top-0 start-0 z-10">
            <div className="header-wrap flex items-center justify-between px-4 py-2">
                <a href="/admin" className="header__logo flex items-center space-x-2 text-xl font-bold">
                    <img src={icon} alt="Doctor Logo" className="h-10 w-10 rounded-full" />
                    <span className="font-bold text-lg text-blue-600">Admin Dashboard</span>
                </a>
                <nav className="flex gap-4">
                    <a href="/admin/settings" className="text-gray-700 hover:text-blue-600 transition font-semibold">Cài đặt</a>
                </nav>
            </div>
        </header>
    )
}

export default AdminHeaderLayout;