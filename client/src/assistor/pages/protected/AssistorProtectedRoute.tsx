import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";

const AssistorProtectedRouter = ({ children }: any) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang xác thực...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/assistor/login" replace />
    }

    return(children);
};

export default AssistorProtectedRouter;