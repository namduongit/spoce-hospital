import { api, type RestResponse } from "../api/api";

type CreatePrescriptionInvoiceParams = {
    patientName: string,
    patientPhone: string,

    userId: number | null,

    symptoms: string,
    note: string,

    medicines: {
        medicineId: number,
        quantity: number,
        usageInstructions: string,
        dosage: string
    }[];
}

export const getPrescriptionInvoiceList = async () => {
    const response = await api.get("/api/prescription-invoices");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getPrescriptionInvoiceById = async (id: number) => {
    const response = await api.get(`/api/prescription-invoices/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createPrescriptionInvoice = async (params: CreatePrescriptionInvoiceParams) => {
    const response = await api.post("/api/prescription-invoices", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

type UpdatePrescriptionInvoiceParams = {
    symptoms: string,
    note: string,
    status: string
}

export const updatePrescriptionInvoice = async (id: number, params: UpdatePrescriptionInvoiceParams) => {
    const response = await api.put(`/api/prescription-invoices/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updatePrescriptionInvoiceStatus = async (id: number, status: string) => {
    const response = await api.put(`/api/prescription-invoices/${id}/status`, { status });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

