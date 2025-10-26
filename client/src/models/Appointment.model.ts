import type { AccountModel } from "./AccountModel.model"
import type { DepartmentModel } from "./Department.model";
import type { RoomModel } from "./RoomModel.model";

type AppointmentModel = {
    id: number,
    fullName: string,
    phone: string,
    time: string,
    note: string,
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
    createdAt: Date,
    
    accountModel: AccountModel,
    departmentModel: DepartmentModel,
    roomModel: RoomModel,
    doctorModel: AccountModel
}

export type { AppointmentModel };