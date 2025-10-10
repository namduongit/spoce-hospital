import nurseIcon from '../../../assets/images/cashier/nurse.png';

const AssistorHeader = () => {
    return(
        <header className="header-layout w-full bg-white shadow sticky top-0 start-0 z-10">
            <div className="header-wrap flex items-center justify-between px-4 py-2">
                <a href="/assistor" className="header__logo flex items-center space-x-2 text-xl font-bold">
                    <img src={nurseIcon} alt="Doctor Logo" className="h-10 w-10 rounded-full" />
                    <span className="font-bold text-lg text-blue-600">Trang nhân viên</span>
                </a>
                <nav className="flex gap-4">
                    <a href="/assistor/settings" className="text-gray-700 hover:text-blue-600 transition font-semibold">Cài đặt</a>
                </nav>
            </div>
        </header>
    );
};

export default AssistorHeader;