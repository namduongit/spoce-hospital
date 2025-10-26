import { api, type RestResponse } from "../api/api";

type CreateMedicalPackageParams = {
    name: string,
    description: string,
    status: string,
    price: string
}

type UpdateMedicalPackageParams = {
    name?: string,
    description?: string,
    status?: string,
    price?: string
}

export const getMedicalPackageList = async () => {
    const response = await api.get("/api/medical-packages");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createMedicalPackage = async (params: CreateMedicalPackageParams) => {
    const response = await api.post("/api/medical-packages", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateMedicalPackage = async (id: number, params: UpdateMedicalPackageParams) => {
    const response = await api.put(`/api/medical-packages/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const changeMedicalPackageStatus = async (id: number, status: string) => {
    const response = await api.put(`/api/medical-packages/${id}/status`, { status });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

