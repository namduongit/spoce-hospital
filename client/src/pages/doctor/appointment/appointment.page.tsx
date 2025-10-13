
import { useState } from "react";

import { rows } from "../../../constants/row.constant";
import TablePagination from "../../../components/common/pagination";
import type { AppointmentModel } from "../../../models/Appointment.model";
import DoctorDetailAppointment from "../../../components/doctor/details/detail.appointment";

const DoctorAppointmentPage = () => {
    const [row, setRow] = useState<number>(5);
    const [page, setPage] = useState<number>(1);

    const [showDetailAppointment, setShowDetailAppointment] = useState<boolean>(false);
    const [appointment, setAppoinment] = useState<AppointmentModel>({} as AppointmentModel);

    return (
        <main className="appointment-page p-4 sm:p-6">
            <div className="appointment-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Danh sách cuộc hẹn
                    </h3>
                    <div className="text-sm text-gray-600">
                        Tổng: <span className="font-semibold text-blue-600">{appointments.length}</span> cuộc hẹn
                    </div>
                </div>

                <div className="appointment__sort bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex gap-3">
                        <div className="space-y-1 flex-1">
                            <select className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                <option value="">Chọn phòng</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1 flex-1">
                            <select className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                <option value="">Chọn khoa</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1 flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                onChange={(event) => {
                                    setRow(parseInt(event.target.value));
                                    console.log(event.target.value)
                                }}
                            >
                                <option value="">Số hàng</option>
                                {rows.map((row) => (
                                    <option key={row.id} value={row.value}>
                                        {row.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1 flex justify-end">
                        <div className="relative">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm theo tên bệnh nhân, số điện thoại..."
                            />
                        </div>
                    </div>
                </div>

                <div className="appointment__data hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thời gian</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.slice((page - 1) * row, page * row).map((appointment, idx) => (
                                    <tr key={appointment.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">#{appointment.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{appointment.fullName}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                                ${appointment.status === 'CANCELED' ? 'bg-gray-100 text-gray-700' : ''}
                                                ${appointment.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : ''}
                                                ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : ''}
                                            `}>
                                                {appointment.status === 'PENDING' ? 'Chờ xác nhận' :
                                                    appointment.status === 'CONFIRMED' ? 'Đã xác nhận' :
                                                        appointment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                            appointment.status === 'CANCELED' ? 'Đã hủy' : appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{appointment.phone}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{appointment.time}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs font-medium"
                                                    onClick={() => {
                                                        setShowDetailAppointment(true);
                                                        setAppoinment(appointment);
                                                    }}
                                                >
                                                    <i className="fa-solid fa-eye mr-1"></i>
                                                    Xem
                                                </button>
                                                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-xs font-medium">
                                                    <i className="fa-solid fa-times mr-1"></i>
                                                    Hủy
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="appointment__data lg:hidden space-y-4">
                    {appointments.slice((page - 1) * row, page * row).map((appointment) => (
                        <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-lg">{appointment.fullName}</h4>
                                    <p className="text-sm text-gray-500">ID: #{appointment.id}</p>
                                </div>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                    ${appointment.status === 'CANCELED' ? 'bg-gray-100 text-gray-700' : ''}
                                    ${appointment.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : ''}
                                `}>
                                    {appointment.status === 'PENDING' ? 'Chờ xác nhận' :
                                        appointment.status === 'CONFIRMED' ? 'Đã xác nhận' :
                                            appointment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                appointment.status === 'CANCELED' ? 'Đã hủy' : appointment.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm">
                                    <i className="fa-solid fa-phone text-gray-400 w-4 mr-2"></i>
                                    <span className="text-gray-600">{appointment.phone}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fa-solid fa-clock text-gray-400 w-4 mr-2"></i>
                                    <span className="text-gray-600">{appointment.time}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-gray-100">
                                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
                                    <i className="fa-solid fa-eye mr-2"></i>
                                    Xem chi tiết
                                </button>
                                <button className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-md hover:bg-red-200 transition-colors text-sm font-medium">
                                    <i className="fa-solid fa-times mr-2"></i>
                                    Hủy hẹn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="appointment__pagination mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                        Hiển thị {((page - 1) * row) + 1} - {Math.min(page * row, appointments.length)} của {appointments.length} cuộc hẹn
                    </div>
                    <TablePagination array={appointments} page={page} setPage={setPage} row={row} />
                </div>
            </div>

            {showDetailAppointment && (<DoctorDetailAppointment appointmentModel={{ ...appointment }} setShowDetailAppointment={setShowDetailAppointment} departmentName="Khoa kham noi quat" roomName="Phong 2" doctorName="Nam Duong" />)}
        </main>
    )
}

export default DoctorAppointmentPage;