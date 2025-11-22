import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/sidebars/admin.sidebar";
import AdminFooterLayout from "./footer/footer.layout";
import AdminHeaderLayout from "./header/header.layout";
import { useSidebar } from "../../contexts/sidebar.context";

const AdminLayout = () => {
    const { isOpen } = useSidebar();

    return (
        <div className="flex flex-col">
            <AdminHeaderLayout />
            <div className="flex flex-1 w-full">
                <AdminSidebar />
                <main className={`flex-1 p-4 bg-gray-150 h-[1000px] overflow-y-auto px-6 ${isOpen ? 'ps-65' : 'ps-20'} transition-padding duration-300`}>
                    <Outlet />
                </main>
            </div>
            <AdminFooterLayout />
        </div>
    )
}

export default AdminLayout;