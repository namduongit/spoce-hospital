import type { JSX } from "react";
import { useAuth } from "./auth.context";

type AuthDirectProps = {
    children: JSX.Element
}

const AuthDirect = ({ children }: AuthDirectProps) => {
    const auth = useAuth();
    if (auth.isAuthenticated) {
        auth.role !== "USER" ? window.location.href = `/${auth.role?.toLocaleLowerCase()}` : "/";
        return;
    } 
    return children;
}

export default AuthDirect;