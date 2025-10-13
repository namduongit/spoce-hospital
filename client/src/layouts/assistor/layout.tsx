import AssistorHeaderLayout from "./header/header";
import AssistorFooterLayout from "./footer/footer";
import AssistorSidebar from "../../components/sidebars/assistor.sidebar";
import { Outlet } from "react-router";

const AssistorLayout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <AssistorHeaderLayout />
            <div className="flex flex-1 w-full">
                <AssistorSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0 px-6">
                    <Outlet />
                </main>
            </div>  
            <AssistorFooterLayout />
        </div>
    );
};

export default AssistorLayout;