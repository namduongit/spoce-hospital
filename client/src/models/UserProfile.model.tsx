export interface UserProfileModel {
    userId: number,
    fullName: string,
    phone: string,
    address: string,
    birthDate: string,
    birthDay?: string,
}

export interface UserProfileResponse {
    id: number,
    fullName: string,
    phone: string,
    address: string,
    birthDay: string,
}