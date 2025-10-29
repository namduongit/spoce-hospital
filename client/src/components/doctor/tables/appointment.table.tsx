import { useState } from "react";
import TablePagination from "../../common/others/pagination";
import AppointmentDetail from "../../common/details/appointment.detail";

import { formatNumberPhone } from "../../../utils/format-number.util";
import { formatDateVi } from "../../../utils/format-date.util";
import type { AppointmentResponse } from "../../../responses/appointment.response";

import { changeAppointmentStatus } from "../../../services/appointment.service";

import useCallApi from "../../../hooks/useCallApi";

type DoctorAppointmentTableProps = {
    appointments: AppointmentResponse[],
    onSuccess?: () => void
}

const DoctorAppointmentTable = (props: DoctorAppointmentTableProps) => {
    const { appointments, onSuccess } = props;

    const { execute, notify } = useCallApi();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [appointmentSelect, setAppointmentSelect] = useState<AppointmentResponse>({} as AppointmentResponse);

    const handleShowDetail = (appointmentSelect: AppointmentResponse) => {
        setAppointmentSelect(appointmentSelect);
        setShowDetail(true);
    }

    const handleCompleteAppointment = async (appointment: AppointmentResponse) => {
        const restResponse = await execute(changeAppointmentStatus(appointment.id, "COMPLETED"));
        notify(restResponse!, "Đánh dấu hoàn thành thành công");
        onSuccess?.();
    }

    const handleCancelAppointment = async (appointment: AppointmentResponse) => {
        const restResponse = await execute(changeAppointmentStatus(appointment.id, "CANCELLED"));
        notify(restResponse!, "Hủy lịch hẹn thành công");
        onSuccess?.();
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên bệnh nhân</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái phiếu</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thời gian hẹn</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo phiếu</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(appointments && appointments.length > 0) ? appointments.slice((page - 1) * row, page * row).map((appointment, idx) => (
                        <tr key={appointment.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {appointment.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{appointment.fullName}</td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                    ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : ''}
                                    ${appointment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : ''}
                                `}>
                                    {appointment.status === 'PENDING' ? 'Chưa xác nhận' : ''}
                                    {appointment.status === 'CONFIRMED' ? 'Đã xác nhận' : ''}
                                    {appointment.status === 'COMPLETED' ? 'Đã hoàn thành' : ''}
                                    {appointment.status === 'CANCELLED' ? 'Đã hủy' : ''}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                {formatNumberPhone(appointment.phone)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{appointment.time}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatDateVi(new Date(appointment.createdAt))}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button 
                                        className="px-3 py-1 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
                                        onClick={() => handleShowDetail(appointment)}
                                    >
                                        <i className="fa-solid fa-eye mr-1"></i>
                                        Xem
                                    </button>

                                    {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                                        <>
                                            <button 
                                                className="px-3 py-1 text-green-600 border border-green-300 rounded-md hover:bg-green-50 transition-colors text-xs font-medium"
                                                onClick={() => handleCompleteAppointment(appointment)}
                                            >
                                                <i className="fa-solid fa-check mr-1"></i>
                                                Hoàn thành
                                            </button>
                                            <button 
                                                className="px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors text-xs font-medium"
                                                onClick={() => handleCancelAppointment(appointment)}
                                            >
                                                <i className="fa-solid fa-times mr-1"></i>
                                                Hủy
                                            </button>
                                        </>
                                    )}

                                    {appointment.status === 'COMPLETED' && (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                                            <i className="fa-solid fa-check-circle mr-1"></i>
                                            Hoàn thành
                                        </span>
                                    )}

                                    {appointment.status === 'CANCELLED' && (
                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">
                                            <i className="fa-solid fa-ban mr-1"></i>
                                            Đã hủy
                                        </span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={7} className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <i className="fa-solid fa-inbox"></i>
                                    <span>Không tìm thấy dữ liệu</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={props.appointments} page={page} row={row} setPage={setPage} setRow={setRow} />
            {(showDetail && appointmentSelect) && (<AppointmentDetail appointmentSelect={appointmentSelect} setShowDetail={setShowDetail} />)}
        </>
    )
}

export default DoctorAppointmentTable;