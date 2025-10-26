import type { AppointmentModel } from "./Appointment.model";
import type { DepartmentModel } from "./Department.model";

type RoomModel = {
    id: number,
    name: string,
    status: 'EMPTY' | 'FULL' | 'REPAIR',

    departmentModel: DepartmentModel,
    appointmentModels: AppointmentModel[]
}

export type { RoomModel };