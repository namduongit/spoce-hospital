import type { AppointmentModel } from "../models/Appointment.model"
import type { UserProfileModel } from "../models/UserProfile.model"

export type AccountDetailDTO = {
    id: number,
    email: string,
    role: string,
    type: string,
    status: string,
    userProfileModel: UserProfileModel,
    userAppointmets: AppointmentModel[]
}

export type AppointmentDetailDTO = {
    id: number,
    fullName: string,
    phone: string,
    time: string,
    note: string,
    status: string,


};