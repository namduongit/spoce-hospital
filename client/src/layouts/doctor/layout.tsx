import { Outlet } from "react-router-dom";
import DoctorHeaderLayout from "./header/header.layout";
import DoctorFooterLayout from "./footer/footer.layout";
import DoctorSidebar from "../../components/doctor/doctor.sidebar";

const DoctorLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <DoctorHeaderLayout />
            <div className="flex flex-1 w-full">
                <DoctorSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0 px-6">
                    <Outlet />
                </main>
            </div>  
            <DoctorFooterLayout />
        </div>
    );
};

export default DoctorLayout;