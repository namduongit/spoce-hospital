import { api, type RestResponse } from "../api/api";

type UpdateAppointmentParams = {
    phone?: string,
    time?: string,
    note?: string,
    status?: string,

    departmentId?: string,
    doctorId?: string,
    roomId?: string,
}

export const getAppointmentList = async () => {
    const response = await api.get("/api/appointments");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateAppointment = async (appointmentId: number, params: UpdateAppointmentParams) => {
    const response = await api.put(`/api/appointments/${appointmentId}`, params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const deleteAppointment = async (appointmentId: number) => {
    const response = await api.delete(`/api/appointments/${appointmentId}`);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}