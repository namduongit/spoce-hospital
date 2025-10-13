import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/sidebars/admin.sidebar";
import AdminFooterLayout from "./footer/footer.layout";
import AdminHeaderLayout from "./header/header.layout";

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeaderLayout />
            <div className="flex flex-1 w-full">
                <AdminSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0 px-6">
                    <Outlet />
                </main>
            </div>
            <AdminFooterLayout />
        </div>
    )
}

export default AdminLayout;