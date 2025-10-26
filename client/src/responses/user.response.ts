export type UserDetailResponse = {
    fullName: string,
    phone: string,
    address: string,
    birthDate: string
}

type ProfileDetailResponse = {
    email: string,
    role: string,
    type: string,
    status: string,
    profile: UserDetailResponse
}

export type { ProfileDetailResponse };

/**
 * @description This file contains the type definitions for user profile responses.
 * @used This responses type is used in roles: USER, ASSISTOR and ADMIN
 */