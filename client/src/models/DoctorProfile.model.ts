import type { AccountModel } from "./AccountModel.model"
import type { DepartmentModel } from "./Department.model"

type DoctorProfileModel = {
    id: number,
    image: string,
    gender: 'MALE' | 'FEMALE' | 'OTHER',
    phone: string,
    birthDate: string,
    degree: string,
    workDay: string,
    status: 'AVAILABLE' | 'BUSY' | 'OFFLINE',

    accountModel: AccountModel,
    departmentModel: DepartmentModel,

}

export type { DoctorProfileModel };