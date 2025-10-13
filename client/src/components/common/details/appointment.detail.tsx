import { motion } from "motion/react";
import { formatNumberPhone } from "../../../utils/formatNumber.util";
import { formatDateToHourAndDay } from "../../../utils/formatDate.util";
import type { AppointmentResponse } from "../../../responses/appointment.response";

type AppointmentDetail = {
    appointmentSelect: AppointmentResponse,
    setShowDetail: (showDetail: boolean) => void
}

const AppointmentDetail = (props: AppointmentDetail) => {
    const { appointmentSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                status === 'CANCELED' ? '' : 'bg-red-100 text-red-700';
    }

    return (
        <div className="admin-detail-account fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
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
                className="admin-detail__wrap fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="admin-detail__content relative">
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="admin-detail__header flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="admin-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="admin-detail__tag font-bold">
                            <p className="flex gap-2">ID phiếu khám:
                                <span># {appointmentSelect.id}</span>
                            </p>
                            <p className="flex gap-2">Trạng thái:
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(appointmentSelect.status)}`}>
                                    {appointmentSelect.status === 'PENDING' ? 'Chưa xác nhận' : ''}
                                    {appointmentSelect.status === 'CONFIRMED' ? 'Đã xác nhận' : ''}
                                    {appointmentSelect.status === 'COMPLETED' ? 'Đã hoàn thành' : ''}
                                    {appointmentSelect.status === 'CANCELED' ? 'Đã hủy' : ''}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="admin-detail__body px-5 py-5 flex flex-col gap-5">
                        <div className="admin-detail__list flex flex-col gap-5">
                            <div className="admin-detail__item px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-indigo-600 text-lg"></i>
                                    <span>Thông tin phiếu khám</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Bệnh nhân: <span className="text-black">{appointmentSelect.fullName}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Số điện thoại: 
                                    <span className={`font-semibold`}>{formatNumberPhone(appointmentSelect.phone)}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Thời gian: <span className="text-black">{appointmentSelect.time}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Thời gian đăng ký: <span className="text-black">{formatDateToHourAndDay(new Date(appointmentSelect.createdAt))}</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="admin-detail__list flex flex-col gap-5">
                            <div className="admin-detail__item px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-calendar-day text-lg text-green-600"></i>
                                    <span>Thông tin đăng ký</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Bác sĩ: <span className="text-black">{appointmentSelect.doctorName ?? "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                   Khoa khám: 
                                    <span className="text-black">{appointmentSelect.departmentName ?? "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Phòng khám: <span className="text-black">{appointmentSelect.roomName ?? "Chưa cập nhật"}</span>
                                </p>
                            </div>
                        </div>


                        <div className="doctor-detail__item border-1 border-yellow-700 px-3 py-3 bg-yellow-100 rounded shadow">
                                <div className="doctor-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-note-sticky text-yellow-700 text-lg"></i>
                                    <span>Ghi chú</span>
                                </div>
                                <p className="flex justify-start gap-2 text-gray-600 font-medium">Ghi chú: <span className="text-black">{appointmentSelect.note}</span></p>
                            </div>

                        <div className="admin-detail__button flex gap-2">
                           
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AppointmentDetail;
