import { api } from "../api/api";

export const printImportTicket = async (ticketId: number) => {
    const response = await api.get(`/api/report/import/${ticketId}`, {
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { 
        type: 'application/pdf'
    });

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    return response.data;
}

export const printExportTicket = async (ticketId: number) => {
    const response = await api.get(`/api/report/export/${ticketId}`, {
        responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    return response.data;
}

export const printPrescriptionTicket = async (ticketId: number) => {
    const response = await api.get(`/api/report/prescription/${ticketId}`, {
        responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    return response.data;
}

export const printServiceTicket = async (ticketId: number) => {
    const response = await api.get(`/api/report/service/${ticketId}`, {
        responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    return response.data;
}
