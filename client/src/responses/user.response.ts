export type UserDetailResponse = {
    fullName: string,
    phone: string,
    address: string,
    birthDate: string
}

export type DoctorProfileResponse = {
    birthDate: string,
    degree: string,
    fullName: string,
    gender: string,
    image: string,
    phone: string,
    status: string,
    workDay: string,

    departmentId: number,
    departmentName: string
}

type ProfileDetailResponse = {
    email: string,
    role: string,
    type: string,
    status: string,
    profile: UserDetailResponse
}

type DoctorDetailResponse = {
     email: string,
    role: string,
    type: string,
    status: string,
    profile: DoctorProfileResponse
}

export type { ProfileDetailResponse, DoctorDetailResponse };

/**
 * @description This file contains the type definitions for user profile responses.
 * @used This responses type is used in roles: USER, ASSISTOR and ADMIN
 */