import { api, type RestResponse } from "../api/api"

type CreateUserParams = {
    email: string,
    password: string,
    passwordConfirm: string,
    role: string
}

type UpdateUserParams = {
    email?: string,
    password?: string,
    role?: string,
    type?: string,
    status?: string
}

export const getAccountList = async () => {
    const response = await api.get("/api/accounts");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createAccount = async (params: CreateUserParams) => {
    const response = await api.post("/api/accounts", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteAccount = async (id: number) => {
    const response = await api.delete(`/api/accounts/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateAccount = async(id: number, params: UpdateUserParams) => {
    const response = await api.put(`/api/accounts/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}