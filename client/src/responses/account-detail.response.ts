type UserDetail = {
    fullName: string,
    phone: string,
    address: string,
    birthDate: string
}

type DoctorDetail = {
    image: string,
    fullName: string,
    gender: string,
    phone: string,
    birthDate: string,
    degree: string,
    workDay: string,
    status: string
}

type AccountResponse = {
    id: number,
    email: string,
    role: string,
    status: string,
    type: string
}

export type { UserDetail, DoctorDetail, AccountResponse };