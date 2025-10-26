import { useState } from "react";
import TablePagination from "../common/others/pagination";
import type { AppointmentResponse } from "../../responses/appointment.response";

type AppointmentPatientProps = {
    appointments: AppointmentResponse[]
}

const AppointmentPatient = (props: AppointmentPatientProps) => {
    const { appointments } = props;

    const [row, setRow] = useState<number>(5);
    const [page, setPage] = useState<number>(1);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch hẹn khám</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {(appointments && appointments.length > 0) ? (
                    <div className="space-y-4">
                        {appointments.slice((page - 1) * row, page * row).map((appointment, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mt-1">
                                            Bệnh nhân: {appointment.fullName}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Thời gian: {appointment.time}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Số điện thoại: {appointment.phone}
                                        </p>
                                        {appointment.note && (
                                            <p className="text-sm text-gray-600">
                                                Ghi chú: {appointment.note}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        appointment.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                            appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {appointment.status === 'PENDING' ? 'Chờ xác nhận' :
                                            appointment.status === 'CONFIRMED' ? 'Đã xác nhận' :
                                                appointment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                    appointment.status === 'CANCELLED' ? 'Đã hủy' :
                                                        appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <TablePagination array={appointments} row={row} page={page} setRow={setRow} setPage={setPage}  />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <i className="fa-solid fa-calendar-xmark text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-lg">Bạn chưa có lịch hẹn nào</p>
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transistion-colors">
                            Đặt lịch hẹn mới
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppointmentPatient;