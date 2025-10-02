import type { AppointmentModel } from "../../../models/Appointment.model";
import { motion } from "motion/react";
import { formatDateToHourAndDay } from "../../../utils/formatDate.util";

type DoctorDetailAppointment = {
    appointmentModel: AppointmentModel,
    setShowDetailAppointment: (showDetailAppointment: boolean) => void,
    departmentName: string,
    roomName: string,
    doctorName: string
}

const DoctorDetailAppointment = (props: DoctorDetailAppointment) => {
    const appointment = props.appointmentModel;
    return (
        <div className="doctor-detail-appointment fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
            <motion.div
                initial={{
                    x: 650
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className="doctor-detail__wrap fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="doctor-detail__content relative">
                    <div className="close-btnn absolute top-0 start-0 cursor-pointer" onClick={() => props.setShowDetailAppointment(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white"></i>
                    </div>

                    <div className="doctor-detail__header flex items-center px-5 py-5 pt-10 gap-3 bg-blue-600 text-white">
                        <div className="doctor-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-circle-info"></i>
                        </div>
                        <div className="doctor-detail__tag font-bold">
                            <p>Mã phiếu khám: <span># {appointment.id}</span></p>
                            <p>Trạng thái: <span>{appointment.status}</span></p>
                        </div>
                    </div>

                    <div className="doctor-detail__body px-5 py-5 flex flex-col gap-5">
                        <div className="doctor-detail__list flex flex-col gap-5">
                            <div className="doctor-detail__item px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="doctor-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-blue-600 text-lg"></i>
                                    <span>Thông tin bệnh nhân</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">Họ và tên: <span className="text-black">{appointment.fullName}</span></p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">Số điện thoại: <span className="text-black">{appointment.phone}</span></p>
                                <p>Giờ khám: <span>{formatDateToHourAndDay(new Date(appointment.time))}</span></p>
                            </div>

                            <div className="doctor-detail__item border-1 border-gray-300 px-3 py-3 bg-white rounded shadow">
                                <div className="doctor-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-check-to-slot text-green-700 text-lg"></i>
                                    <span>Thông tin khám</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">Khoa khám: <span className="text-black">{props.departmentName}</span></p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">Phòng khám: <span className="text-black">{props.roomName}</span></p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">Bác sĩ: <span className="text-black">{props.doctorName}</span></p>
                            </div>

                            <div className="doctor-detail__item border-1 border-yellow-700 px-3 py-3 bg-yellow-100 rounded shadow">
                                <div className="doctor-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-note-sticky text-yellow-700 text-lg"></i>
                                    <span>Ghi chú</span>
                                </div>
                                <p className="flex justify-start gap-2 text-gray-600 font-medium">Ghi chú: <span className="text-black">{appointment.note}</span></p>
                            </div>
                        </div>

                        <div className="doctor-detail__button flex justify-end gap-2">
                            <button className="px-3 py-2 rounded font-bold text-white bg-blue-600 shadow cursor-pointer">Khám bệnh</button>
                            <button className="px-3 py-2 rounded font-bold text-white bg-yellow-600 shadow cursor-pointer">Hủy khám</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default DoctorDetailAppointment;