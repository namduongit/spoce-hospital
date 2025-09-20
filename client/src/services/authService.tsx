import { api } from "../api/api"
import type { RestResponse } from "../api/api"

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
        email: email,
        password: password
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const valid = async() => {
    const response = await api.post("/auth/authConfig")
    const restResponse: RestResponse = response.data;
    return restResponse;
}

