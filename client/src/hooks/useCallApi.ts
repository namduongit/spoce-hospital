import { useState } from "react";
import type { RestResponse } from "../api/api";
import { useToast } from "../contexts/toast.context";

const useCallApi = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const execute = async (apiCall: Promise<RestResponse>) => {
        try {
            setLoading(true);
            const restResponse = await apiCall;
            const statusCode = restResponse?.statusCode || 500;
            if (statusCode === 401) {
                showToast("Cảnh báo", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại", "error");
            }
            if (statusCode === 403) {
                showToast("Cảnh báo", "Bạn không có quyền truy cập tài nguyên này", "error");
            }
            return restResponse;
        } catch (error: any) {
            console.error("API call error:", error.message);
            showToast("Cảnh báo", "Máy chủ không phản hồi", "error");
            return { result: false, statusCode: 500, data: null, message: "", errorMessage: ["Máy chủ không phản hồi"] } as RestResponse;
        } finally {
            setLoading(false);
        }
    }

    const doFunc = async (func: () => void) => {
        try {
            func();
        } catch (error: any) {
            console.error("Error occurred while executing function:", error);
            showToast("Lưu ý", error?.message || "Có lỗi xảy ra", "warning");
        }
    }

    const notify = (restResponse: RestResponse, successMessage?: string) => {
        if (!restResponse) return;
        const isSuccess = restResponse.result && (restResponse.statusCode == 200 || restResponse.statusCode == 201);
        if (isSuccess) {
            if (successMessage) {
                showToast("Thành công", successMessage, "success");
            }
        } else {
            const apiErrorMessage = restResponse.errorMessage;
            if (apiErrorMessage) {
                if (Array.isArray(apiErrorMessage)) {
                    apiErrorMessage.forEach((error: string) => {
                        showToast("Lưu ý", error, "warning");
                    });
                } else {
                    showToast("Lưu ý", apiErrorMessage, "warning");
                }
            }
        }
    }

    return { execute, doFunc, notify, loading };
}

export default useCallApi;