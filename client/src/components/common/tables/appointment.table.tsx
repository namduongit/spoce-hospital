import { useState } from "react";
import TablePagination from "../others/pagination";
import AppointmentDetail from "../details/appointment.detail";
import EditAppointment from "../edits/appointment.edit";

import { formatNumberPhone } from "../../../utils/formatNumber.util";
import { formatDateVi } from "../../../utils/formatDate.util";
import type { AppointmentResponse } from "../../../responses/appointment.response";
import type { DepartmentResponse } from "../../../responses/department.response";
import type { RoomResponse } from "../../../responses/room.response";
import type { DoctorResponse } from "../../../responses/doctor.response";

import { deleteAppointment } from "../../../services/appointment.service";

import useCallApi from "../../../hooks/useCallApi";

type AppointmentTableProps = {
    appointments: AppointmentResponse[],
    departments: DepartmentResponse[],
    rooms: RoomResponse[],
    doctors: DoctorResponse[],
    onSuccess?: () => void
}

const AppointmentTable = (props: AppointmentTableProps) => {
    const { appointments, departments, rooms, doctors, onSuccess } = props;

    const { execute, notify, doFunc } = useCallApi();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const [appointmentSelect, setAppointmentSelect] = useState<AppointmentResponse>({} as AppointmentResponse);

    const handleShow = (appointmentSelect: AppointmentResponse) => {
        setAppointmentSelect(appointmentSelect);
        setShowDetail(true);
    }

    const handleEdit = (appointmentSelect: AppointmentResponse) => {
        setAppointmentSelect(appointmentSelect);
        setShowEdit(true);
    }

    const handleDelete = async (appointmentSelect: AppointmentResponse) => {
        const restResponse = await execute(deleteAppointment(appointmentSelect.id));
        notify(restResponse!, "Xóa lịch hẹn thành công");
        doFunc(() => {
            onSuccess?.();
        });
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
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatDateVi(new Date(appointment.createdAt))}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShow(appointment)}>
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleEdit(appointment)}>
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleDelete(appointment)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <>
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <i className="fa-solid fa-calendar-check text-4xl mb-3 text-gray-300"></i>
                                        <p className="text-lg font-medium">Không có lịch hẹn nào</p>
                                        <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                    </div>
                                </td>
                            </tr>
                        </>)}
                </tbody>
            </table>
            <TablePagination array={props.appointments} page={page} row={row} setPage={setPage} setRow={setRow} />
            {(showDetail && appointmentSelect) && (<AppointmentDetail appointmentSelect={appointmentSelect} setShowDetail={setShowDetail} />)}
            {(showEdit && appointmentSelect) && (<EditAppointment appointmentSelect={appointmentSelect} setShowEdit={setShowEdit} departments={departments} rooms={rooms} doctors={doctors} onSuccess={onSuccess} />)}
        </>
    )
}

export default AppointmentTable;