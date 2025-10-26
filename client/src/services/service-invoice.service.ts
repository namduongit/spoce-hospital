import { api, type RestResponse } from "../api/api";

type CreateServiceInvoiceParams = {
    patientName: string,
    patientPhone: string,

    userId: number | null,
    medicalPackages: {
        medicalPackageId: number
    }[];
}

type UpdateServiceInvoiceParams = {
    patientName?: string;
    patientPhone?: string;
    patientAddress?: string;
    dateOfBirth?: string;
    status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export const getServiceInvoiceList = async () => {
    const response = await api.get("/api/service-invoices");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getServiceInvoiceById = async (id: number) => {
    const response = await api.get(`/api/service-invoices/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createServiceInvoice = async (params: CreateServiceInvoiceParams) => {
    const response = await api.post("/api/service-invoices", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateServiceInvoice = async (id: number, params: UpdateServiceInvoiceParams) => {
    const response = await api.put(`/api/service-invoices/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteServiceInvoice = async (id: number) => {
    const response = await api.delete(`/api/service-invoices/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const changeServiceInvoiceStatus = async (id: number, status: 'PENDING' | 'COMPLETED' | 'CANCELLED') => {
    const response = await api.put(`/api/service-invoices/${id}/status`, { status });
    const restResponse: RestResponse = response.data;
    return restResponse;
}
