
const LogoutButton = () => {
    const handleLogoutClick = () => {

    };

    return(
        <button 
            className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 rounded px-3 py-2 cursor-pointer transition text-start"
            onClick={handleLogoutClick}
        >
            <i className="fa-solid fa-right-from-bracket me-2"></i>
            <span>Đăng xuất</span>
        </button>
    );
};

export default LogoutButton;