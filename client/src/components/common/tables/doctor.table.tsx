import { useState } from "react";
import TablePagination from "../others/pagination";
import DoctorDetail from "../details/doctor.detail";
import EditDoctor from "../edits/doctor.edit";

import type { DoctorResponse } from "../../../responses/doctor.response";
import type { DepartmentResponse } from "../../../responses/department.response";
import EditCalendarModal from "../edits/calendar.edit";

type DoctorTableProps = {
    doctors: DoctorResponse[],
    departments: DepartmentResponse[],
    onSuccess?: () => void,
}

const DoctorTable = (props: DoctorTableProps) => {
    const { doctors, departments, onSuccess } = props;

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showWorkCalendar, setShowWorkCalendar] = useState<boolean>(false);

    const [doctorSelect, setDoctorSelect] = useState<DoctorResponse>({} as DoctorResponse);

    const handleShow = (doctorSelect: DoctorResponse) => {
        setDoctorSelect(doctorSelect);
        setShowDetail(true);
    }

    const handleEdit = (doctorSelect: DoctorResponse) => {
        setDoctorSelect(doctorSelect);
        setShowEdit(true);
    }

    const handleShowWorkCalendar = (doctorSelect: DoctorResponse) => {
        setDoctorSelect(doctorSelect);
        setShowWorkCalendar(true);
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tài khoản</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên bác sĩ</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thuộc khoa</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(doctors && doctors.length > 0) ? doctors.slice((page - 1) * row, page * row).map((doctor, idx) => (
                        <tr key={doctor.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {doctor.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{doctor.email}</td>
                            <td className={`px-4 py-3 text-sm text-gray-700 font-medium ${!doctor.fullName && 'italic'}`}>{(doctor.fullName && doctor.fullName !== "") ? doctor.fullName : "Chưa cập nhật"}</td>
                            <td className={`px-4 py-3 text-sm text-gray-700 font-medium ${!doctor.departmentName && 'italic'}`}>{(doctor.departmentName && doctor.departmentName !== "") ? doctor.departmentName : "Chưa có khoa"}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {doctor.status === 'AVAILABLE' && <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Đang làm</span>}
                                {doctor.status === 'OFFLINE' && <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Tạm nghỉ</span>}
                                {doctor.status === 'BUSY' && <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Đang bận</span>}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShow(doctor)}>
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowWorkCalendar(doctor)}
                                    >
                                        <i className="fa-solid fa-calendar-days"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleEdit(doctor)}>
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-user-doctor text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có bác sĩ nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={props.doctors} page={page} row={row} setPage={setPage} setRow={setRow} />
            {(showDetail && doctorSelect) && (<DoctorDetail doctorSelect={doctorSelect} setShowDetail={setShowDetail} onSuccess={onSuccess} />)}
            {(showEdit && doctorSelect) && <EditDoctor doctorSelect={doctorSelect} departments={departments} onSuccess={onSuccess} setShowEdit={setShowEdit} />}
            {(showWorkCalendar && doctorSelect) && (<EditCalendarModal doctorSelect={doctorSelect} setShowCalendar={setShowWorkCalendar} onSuccess={onSuccess}  />)}
        </>
    )
}

export default DoctorTable;