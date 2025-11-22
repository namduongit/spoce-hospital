import { api } from "../api/api"
import type { RestResponse } from "../api/api"

type LoginParams = {
    email: string;
    password: string;
}

type RegisterParams = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export const login = async (params: LoginParams) => {
    const response = await api.post("/auth/login", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const register = async (params: RegisterParams) => {
    const response = await api.post("/auth/register", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const valid = async () => {
    const response = await api.post("/auth/auth-config")
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const forgot = async (params: { email: string }) => {
    const response = await api.post("/auth/forgot-password", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

