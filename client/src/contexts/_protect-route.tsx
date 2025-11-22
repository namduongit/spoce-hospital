import type { JSX } from "react";
import { useAuth } from "./auth.context";

type ProtectRouteProps = {
    children: JSX.Element;
    roles: string[];
};

const ProtectRoute = ({ children, roles }: ProtectRouteProps) => {
    const auth = useAuth();

    console.log("Require roles:", roles);
    console.log("User role:", auth.role);
    console.log("Auth loading:", auth.loadingSession);
    console.log("Authenticated:", auth.isAuthenticated);

    if (auth.loadingSession) {
        return null; 
    }

    if (!auth.isAuthenticated) {
        window.location.href = "/auth/login";
        return null;
    }

    if (roles.length === 0) {
        return children;
    }

    if (!roles.includes(auth.role!)) {
        if (auth.role === "USER") {
            window.location.href = "/";
            return null;
        }
        window.location.href = `/${auth.role?.toLowerCase()}`;
        return null;
    }

    return children;
};

export default ProtectRoute;
