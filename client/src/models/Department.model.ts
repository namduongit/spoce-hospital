import type { AppointmentModel } from "./Appointment.model";
import type { DoctorProfileModel } from "./DoctorProfile.model";
import type { RoomModel } from "./Room.model";

export interface DepartmentModel {
    id: number,
    name: string,

    roomModels: RoomModel[],
    appointmentModels: AppointmentModel[],
    doctorProfileModels: DoctorProfileModel[]
}