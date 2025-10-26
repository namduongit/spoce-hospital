import { api, type RestResponse } from "../api/api";

type CreateMedicineCategoryParams = {
    name: string, 
    description: string
}

type CreateMedicineParams = {
    name: string,
    description: string,
    unit: string,

    price: string,

    manufacturer: string,

    minStock: string,
    maxStock: string,

    categoryId: string
}

type UpdateMedicineParams = {
    name: string,
    description: string,
    unit: string,
    price: number,
    manufacturer: string,
    status: string,
    minStock: number,
    maxStock: number,
    categoryId: number
}

export const getMedicineCategoryList = async () => {
    const response = await api.get("/api/medicine-categories");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createMedicineCategory = async (params: CreateMedicineCategoryParams) => {
    const response = await api.post("/api/medicine-categories",params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateMedicineCategory = async (id: number, name: string, description?: string, status?: string) => {
    const response = await api.put(`/api/medicine-categories/${id}`, { 
        name: name,
        description: description,
        status: status
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteMedicineCategory = async (id: number) => {
    const response = await api.delete(`/api/medicine-categories/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getMedicineList = async () => {
    const response = await api.get("/api/medicines");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createMedicine = async (params: CreateMedicineParams) => {
    const response = await api.post("/api/medicines", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateMedicine = async (id: number, params: UpdateMedicineParams) => {
    const response = await api.put(`/api/medicines/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}
