import { api, type RestResponse } from "../api/api"

type CreateExportTicketRequest = {
    reason: string,
    items: {
        medicineId: number,
        medicineName?: string,
        quantity: number
    }[]
}

export const getExportTicketList = async () => {
    const response = await api.get("/api/export-tickets");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createExportTicket = async (params: CreateExportTicketRequest) => {
    const response = await api.post("/api/export-tickets", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const changeStatusExportTicket = async (ticketId: number, status: string) => {
    const response = await api.put(`/api/export-tickets/${ticketId}/status`, { status });
    const restResponse: RestResponse = response.data;
    return restResponse;
}   
