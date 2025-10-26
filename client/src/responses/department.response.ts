import type { AppointmentResponse } from "./appointment.response";
import type { DoctorResponse } from "./doctor.response";
import type { RoomResponse } from "./room.response";

type DepartmentResponse = {
    id: number,
    name: string,
    
    rooms: RoomResponse[],
    doctors: DoctorResponse[],
    appointments: AppointmentResponse[]
}

export type { DepartmentResponse };