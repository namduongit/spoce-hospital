import AssistorHeader from "./layout/header/header";
import AssistorFooter from "./layout/footer/footer";
import AssistorSidebar from "./components/sidebar/sidebar";
import { Outlet } from "react-router";

const AssistorPage = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <AssistorHeader />
            <div className="flex flex-1 w-full">
                <AssistorSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0 px-6">
                    <Outlet />
                </main>
            </div>  
            <AssistorFooter />
        </div>
    );
};

export default AssistorPage