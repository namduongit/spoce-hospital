import { useEffect, useState } from "react";
import { doctorStatus } from "../../../constants/status.constant";
import AddDoctor from "../../../components/common/adds/doctor.add";
import DoctorTable from "../../../components/common/tables/doctor.table";

import type { DepartmentResponse } from "../../../responses/department.response";
import type { DoctorResponse } from "../../../responses/doctor.response";

import { getDepartmentList } from "../../../services/department.service";
import { getDoctorList } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";

const AdminDoctorsPage = () => {
    const { execute, doFunc } = useCallApi();

    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [doctors, setDoctors] = useState<DoctorResponse[]>([]);

    const [isCreateDoctor, setIsCreateDoctor] = useState<boolean>(false);

    const handleGetDepartmentList = async () => {
        const restResponse = await execute(getDepartmentList());
        doFunc(() => {
            if (restResponse?.result) {
                const data: DepartmentResponse[] = restResponse.data;
                setDepartments(Array.isArray(data) ? data : []);
            }
        });
    }

    const handleGetDoctorList = async () => {
        const restResponse = await execute(getDoctorList());
        doFunc(() => {
            if (restResponse?.result) {
                const data: DoctorResponse[] = restResponse.data;
                setDoctors(Array.isArray(data) ? data : []);
            }
        });
    }

    useEffect(() => {
        handleGetDepartmentList();
        handleGetDoctorList();
    }, []);

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý thông tin bác sĩ
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{doctors.length}</span> bác sĩ</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="appointments__filter__item relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm kiếm theo tên hoặc id ..."
                            />
                        </div>

                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                <option value="">Chọn trạng thái</option>
                                {doctorStatus.map((status) => (
                                    <option key={status.id} value={status.value}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="department">Chọn khoa</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center" onClick={() => setIsCreateDoctor(true)}>
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm bác sĩ</span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <DoctorTable doctors={doctors} departments={departments} onSuccess={handleGetDoctorList} />
                    </div>
                </div>
            </div>
            {isCreateDoctor && <AddDoctor setIsOpenCreateDoctor={setIsCreateDoctor} departments={departments} onSuccess={handleGetDoctorList} />}
        </main >
    )
}
export default AdminDoctorsPage;