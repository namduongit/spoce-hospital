export interface UserModel {
    id: number,
    email: string,
    password: string,
    role: 'USER' | 'DOCTOR' | 'CASHIER' | 'ADMIN',
    type: 'ACCOUNT' | 'GOOGLE'
    status: 'ACTIVE' | 'INACTIVE'
}
