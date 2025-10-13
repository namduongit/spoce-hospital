export interface AppointmentModel {
    id: number,
    fullName: string,
    phone: string,
    time: string,
    note?: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED',
    createdAt: string,
    departmentId: number,
    doctorId: number,
    roomId: number,
    userId: number,
}