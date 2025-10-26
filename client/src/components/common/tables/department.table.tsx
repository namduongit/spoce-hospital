
import { useState } from "react";
import TablePagination from "../others/pagination";
import DepartmentDetail from "../details/department.detail";
import EditDepartment from "../edits/department.edit";

import type { DepartmentResponse } from "../../../responses/department.response";

type DepartmentTableProps = {
    departments: DepartmentResponse[];
    onSuccess?: () => void;
}

const DepartmentTable = (props: DepartmentTableProps) => {
    const { departments, onSuccess } = props;

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponse | null>(null);

    const handleShowDetail = (department: DepartmentResponse) => {
        setSelectedDepartment(department);
        setShowDetail(true);
    };

    const handleShowEdit = (department: DepartmentResponse) => {
        setSelectedDepartment(department);
        setShowEdit(true);
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên khoa</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số phòng khám</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số bác sĩ</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số phiếu khám</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(departments && departments.length > 0) ? departments.slice((page - 1) * row, page * row).map((department, idx) => (
                        <tr key={department.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {department.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{department.name}</td>
                            <td className="px-4 py-3 text-sm text-green-700 font-medium">{department.rooms.length} phòng khám</td>
                            <td className="px-4 py-3 text-sm text-blue-700 font-medium">{department.doctors.length} bác sĩ</td>
                            <td className="px-4 py-3 text-sm text-purple-700 font-medium">{department.appointments.length} phiếu khám</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowDetail(department)}
                                        title="Xem chi tiết"
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowEdit(department)}
                                        title="Chỉnh sửa"
                                    >
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-warehouse text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có khoa nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={departments} page={page} row={row} setPage={setPage} setRow={setRow} />

            {showDetail && selectedDepartment && (
                <DepartmentDetail
                    departmentSelect={selectedDepartment}
                    setShowDetail={setShowDetail}
                />
            )}

            {showEdit && selectedDepartment && (
                <EditDepartment
                    departmentSelect={selectedDepartment}
                    setShowEdit={setShowEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>

    )
}

export default DepartmentTable;