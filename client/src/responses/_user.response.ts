export type ProfileDetailResponse = {
    fullName: string,
    phone: string,
    address: string,
    birthDate: string
}

export type AppointmentDetailResponse = {
    fullName: string,
    phone: string,
    time: string,
    note: string,
    status: string
    createdAt: string
}

type AccountDetailResponse = {
    id: number,
    email: string,
    role: string,
    type: string,
    status: string,

    profileDetail: ProfileDetailResponse
    appointmentDetails: AppointmentDetailResponse[]
}

export type { AccountDetailResponse };