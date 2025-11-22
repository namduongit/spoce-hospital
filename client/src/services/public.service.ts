import { api, type RestResponse } from "../api/api";

export const getDoctorList = async () => {
    const response = await api.get('/api/public/doctors');
    const restResponse: RestResponse = await response.data;
    return restResponse;
}

export const getMedicalPackageList = async () => {
    const response = await api.get("/api/public/medical-packages");
    const restResponse: RestResponse = response.data;
    return restResponse;
}