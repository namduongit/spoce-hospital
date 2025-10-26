import { api, type RestResponse } from "../api/api";

type UpdateAppointmentParams = {
    phone: string,
    time: string,
    note: string,
    status: string,

    departmentId: string,
    doctorId: string,
    roomId: string,
}

export const getAppointmentList = async () => {
    const response = await api.get("/api/appointments");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateAppointment = async (id: number, params: UpdateAppointmentParams) => {
    const response = await api.put(`/api/appointments/${id}`, params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const changeAppointmentStatus = async (id: number, status: string) => {
    const response = await api.put(`/api/appointments/${id}/status`, { status });
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const deleteAppointment = async (id: number) => {
    const response = await api.delete(`/api/appointments/${id}`);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const getDoctorAppointments = async () => {
    const response = await api.get("/api/appointments/doctor");
    const restResponse: RestResponse = response.data;
    return restResponse;
}