import type { AppointmentModel } from "./Appointment.model";
import type { DoctorProfileModel } from "./DoctorProfile.model";
import type { RoomModel } from "./RoomModel.model";

type DepartmentModel = {
    id: number,
    name: string,

    doctorProfileModels: DoctorProfileModel[],
    roomModels: RoomModel[],
    appointmentModels: AppointmentModel[]
}

export type { DepartmentModel };