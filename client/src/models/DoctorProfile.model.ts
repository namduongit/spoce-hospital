export interface DoctorProfileModel {
    userId: number,
    image: string,
    fullName: string,
    gender: 'MALE' | 'FEMALE' | 'OTHER',
    phone: string,
    birthDate: string,
    degree: string,
    workDate: string,
    status: 'AVAILABLE' | 'BUSY' | 'OFFLINE',
    departmentId: number,
}