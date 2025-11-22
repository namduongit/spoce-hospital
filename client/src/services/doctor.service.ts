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
    fullName: string,
    gender: string,
    phone: string,
    birthDate: string,

    degree: string,
    status: string,

    departmentId: number
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

export const updateDoctorImage = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.put(`/api/doctors/${id}/image-avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const updateDoctorWorkDay = async (id: number, workDay: string) => {
    const response = await api.put(`/api/doctors/${id}/work-day`, { workDay });
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

/** Doctor account service */
export const getDoctorProfile = async () => {
    const response = await api.get('/api/doctors/details');
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const updateDoctorProfile = async (params: UpdateDoctorParams) => {
    const response = await api.put('/api/doctors/profile', params);
    const restResponse: RestResponse = await response.data;
    return restResponse;
}
