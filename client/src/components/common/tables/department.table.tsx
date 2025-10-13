
import { useState } from "react";
import TablePagination from "../others/pagination";

import type { DepartmentResponse } from "../../../responses/department.response";

type DepartmentTable = {
    departments: DepartmentResponse[];
    onSuccess?: () => void;
}

const DepartmentTable = (props: DepartmentTable) => {
    const { departments } = props;

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên khoa</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số phòng khám</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(departments && departments.length > 0) ? departments.slice((page - 1) * row, page * row).map((department, idx) => (
                        <tr key={department.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {department.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{department.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{department.rooms.length} phòng khám</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <i className="fa-solid fa-inbox"></i>
                                    <span>Không tìm thấy dữ liệu</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={departments} page={page} row={row} setPage={setPage} setRow={setRow} />
        </>

    )
}

export default DepartmentTable;