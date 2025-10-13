import { useState } from "react";
import type { RestResponse } from "../api/api";
import { useToast } from "../contexts/toastContext";

const useCallApi = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const execute = async (apiCall: Promise<RestResponse>) => {
        try {
            setLoading(true);
            const restResponse = await apiCall;
            return restResponse;
        } catch (error: any) {
            console.error("API call error:", error);
            showToast("Cảnh báo", "Máy chủ không phản hồi", "error");
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