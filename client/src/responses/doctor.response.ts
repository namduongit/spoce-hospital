type DoctorResponse = {
    id: number,
    email: string,

    image: string,
    fullName: string,  

    gender: string,
    phone: string,
    birthDate: string,
    degree: string,
    workDay: string,
    status: string,

    departmentId: number,
    departmentName: string
}

export type { DoctorResponse };