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
    const response = await api.get("/api/patient/details");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateProfileDetail = async (params: UpdateProfileDetailParams) => {
    const response = await api.put("/api/patient/details", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getAppointmentList = async () => {
    const response = await api.get("/api/patient/appointments");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createAppointment = async (params: CreateAppointmentParams) => {
    const response = await api.post("/api/patient/appointments", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getServiceInvoiceList = async () => {
    const response = await api.get("/api/patient/service-invoices");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const getPrescriptionInvoiceList = async () => {
    const response = await api.get("/api/patient/prescription-invoices");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const sendEmailContact = async (params: {
    fullName: string,
    email: string,
    phone: string,
    subject: string,
    message: string
}) => {
    const response = await api.post("/api/patient/send-contact", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}
