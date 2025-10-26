import { api, type RestResponse } from "../api/api"

type CreateImportTicketRequest = {
    reason: string,
    supplierName: string,
    items: {
        medicineId: number,
        medicineName?: string,
        quantity: number,
        unitPrice: number,
        expiryDate: string
    }[]
}

export const getImportTicketList = async () => {
    const response = await api.get("/api/import-tickets");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createImportTicket = async (params: CreateImportTicketRequest) => {
    const response = await api.post("/api/import-tickets", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const changeStatusImportTicket = async (ticketId: number, status: string) => {
    const response = await api.put(`/api/import-tickets/${ticketId}/status`, { status });
    const restResponse: RestResponse = response.data;
    return restResponse;
}