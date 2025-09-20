import { api, type RestResponse } from "../api/api"
import type { UserProfileModel } from "../models/UserProfile.model";

export const userDetail = async () => {
    const response = await api.get("/api/public/v1/api/v1/me");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateUserProfile = async (profileData: UserProfileModel) => {
    // Transform the data to match server expectations
    const requestData = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        address: profileData.address,
        birthDate: profileData.birthDate // client uses birthDate, server expects birthDate in request
    };
    
    const response = await api.put("/api/user/profile", requestData);
    const restResponse: RestResponse = response.data;
    return restResponse;
}