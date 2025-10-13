import { api, type RestResponse } from "../api/api";

export const getDepartmentList = async () => {
    const response = await api.get("/api/departments");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createDepartment = async (name: string) => {
    const response = await api.post("/api/departments", { name: name });
    const restResponse: RestResponse = response.data;
    return restResponse;
}