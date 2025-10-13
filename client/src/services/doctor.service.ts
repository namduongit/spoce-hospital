import { api, type RestResponse } from "../api/api";

type CreateDoctorParams = {
    image: string,
    email: string,
    password: string,
    passwordConfirm: string,
    fullName: string,
    birthDate: string,
    gender: string,
    departmentId: string,
    degree: string,
    phone: string
}

type UpdateDoctorParams = {
    image?: string,
    fullName?: string,
    gender?: string,
    phone?: string,
    birthDate?: string,
    workDay?: string,

    degree?: string,
    status?: string,

    departmentId?: number,
}

export const getDoctorList = async () => {
    const response = await api.get('/api/doctors');
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const createDoctor = async (params: CreateDoctorParams) => {
    const response = await api.post('/api/doctors', params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const updateDoctor = async (id: number, params: UpdateDoctorParams) => {
    const response = await api.put(`/api/doctors/${id}`, params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const deleteDoctor = async (id: number) => {
    const response = await api.delete(`/api/doctors/${id}`);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}