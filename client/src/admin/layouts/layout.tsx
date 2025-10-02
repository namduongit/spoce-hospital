import { Outlet } from "react-router-dom";
import AdminMainSidebar from "../components/sidebars/main.sidebar";
import AdminFooterLayout from "./footer/footer.layout";
import AdminHeaderLayout from "./header/header.layout";

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeaderLayout />
            <div className="flex flex-1 w-full">
                <AdminMainSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0 px-6">
                    <Outlet />
                </main>
            </div>
            <AdminFooterLayout />
        </div>
    )
}

export default AdminLayout;