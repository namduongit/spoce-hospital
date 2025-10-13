import { api, type RestResponse } from "../api/api"

type CreateRoomParams = {
    name: string,
    status: string,
    departmentId: number
}

type UpdateRoomParams = {
    name?: string,
    status?: string,
    departmentId?: number
}

export const getRoomList = async () => {
    const response = await api.get("/api/rooms");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createRoom = async (params: CreateRoomParams) => {
    const response = await api.post("/api/rooms", params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateRoom = async (id: number, params: UpdateRoomParams) => {
    const response = await api.put(`/api/rooms/${id}`, params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteRoom = async (id: number) => {
    const response = await api.delete(`/api/rooms/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}