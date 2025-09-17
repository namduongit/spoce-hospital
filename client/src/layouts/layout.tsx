import { Outlet } from "react-router-dom";
import HeaderLayout from "./header/header.layout";
import FooterLayout from "./footer/footer.layout";

const Layout = () => {
    return (
        <div className="main-layout">
            <HeaderLayout />
            <div className="wrap-body min-h-[90vh] bg-blue-50">
                <Outlet />
            </div>
            <FooterLayout />
        </div>
    )
}

export default Layout;