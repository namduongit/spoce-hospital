export interface DoctorProfileModel {
    userId: number,
    image: string,
    fullName: string,
    gender: 'MALE' | 'FEMALE',
    phone: string,
    birthDate: string,
    degree: string,
    workDate: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentId: number,
}