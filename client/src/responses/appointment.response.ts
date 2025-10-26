type AppointmentResponse = {
    id: number,
    fullName: string,
    phone: string,
    time: string,
    note: string,
    status: string,
    createdAt: string,

    email: string,

    departmentId: number,
    departmentName: string,

    doctorId: number,
    doctorName: string

    roomId: number,
    roomName: string
}

export type { AppointmentResponse };