type AccountModel = {
    id: number,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'DOCTOR' | 'ASSISTOR',
    type: 'ACCOUNT' | 'GOOGLE',
    status: 'ACTIVE' | 'INACTIVE'
}

export type { AccountModel };