import { api, type RestResponse } from "../api/api"

type UpdateProfileDetailParams = {
    fullName: string,
    phone: string,
    address: string,
    birthDate: string
}

type CreateAppointmentParams = {
    fullName: string,
    phone: string,
    date: string,
    time: string,
    note: string
}

export const getUserDetail = async () => {
    const response = await api.get("/api/public/details");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateProfileDetail = async (params: UpdateProfileDetailParams) => {
    const response = await api.put("/api/public/details", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createAppointment = async (params: CreateAppointmentParams) => {
    const response = await api.post("/api/public/appointments", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}