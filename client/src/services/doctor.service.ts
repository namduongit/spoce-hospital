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
    image: string,
    fullName: string,
    gender: string,
    phone: string,
    birthDate: string,
    
    workDate?: string,

    degree: string,
    status: string,

    departmentId: string,
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

export const getDoctorProfile = async () => {
    const response = await api.get('/api/doctors/profile');
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const updateDoctorProfile = async (params: UpdateDoctorParams) => {
    const response = await api.put('/api/doctors/profile', params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const updateDoctorWorkDate = async (workDate: string) => {
    const response = await api.put('/api/doctors/profile/work-date', { workDate });
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const getDoctorSchedule = async () => {
    const response = await api.get('/api/doctors/schedule');
    const restResponse: RestResponse = await response.data;
    return restResponse;
}