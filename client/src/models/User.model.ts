export interface UserModel {
    id: number,
    email: string,
    password: string,
    role: 'USER' | 'DOCTOR' | 'ASSISTOR' | 'ADMIN',
    type: 'ACCOUNT' | 'GOOGLE'
    status: 'ACTIVE' | 'INACTIVE'
}
