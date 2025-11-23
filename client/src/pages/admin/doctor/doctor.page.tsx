import { useEffect, useState } from "react";
import { doctorStatus } from "../../../constants/status.constant";
import AddDoctor from "../../../components/common/adds/doctor.add";
import DoctorTable from "../../../components/common/tables/doctor.table";

import type { DepartmentResponse } from "../../../responses/department.response";
import type { DoctorResponse } from "../../../responses/doctor.response";

import { getDepartmentList } from "../../../services/department.service";
import { getDoctorList } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";

const AdminDoctorPage = () => {
    const { execute } = useCallApi();

    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
    const [doctorsFilter, setDoctorsFilter] = useState<DoctorResponse[]>([]);

    const [isCreateDoctor, setIsCreateDoctor] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        departmentId: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetDepartmentList = async () => {
        const restResponse = await execute(getDepartmentList());
        if (restResponse?.result) {
            const data: DepartmentResponse[] = restResponse.data;
            setDepartments(Array.isArray(data) ? data : []);
        }
    }

    const handleGetDoctorList = async () => {
        const restResponse = await execute(getDoctorList());
        if (restResponse?.result) {
            const data: DoctorResponse[] = restResponse.data;
            setDoctors(Array.isArray(data) ? data : []);
            setDoctorsFilter(Array.isArray(data) ? data : []);
        }
    }

    useEffect(() => {
        setDoctorsFilter(doctors.filter(doctor => {
            const matchesInput = searchForm.input === "" ||
                doctor.fullName?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                doctor.id?.toString().includes(searchForm.input);

            const matchesStatus = searchForm.status === "" || doctor.status === searchForm.status;

            const matchesDepartment = searchForm.departmentId === "" || doctor.departmentId?.toString() === searchForm.departmentId;

            return matchesInput && matchesStatus && matchesDepartment;
        }))
    }, [searchForm, doctors]);

    useEffect(() => {
        handleGetDepartmentList();
        handleGetDoctorList();
    }, []);

    const stats = {
        totalDoctors: doctors.length,
        totalDepartments: departments.length,
        availableDoctors: doctors.filter(d => d.status === 'AVAILABLE').length,
        busyDoctors: doctors.filter(d => d.status === 'BUSY').length,
        onLeaveDoctors: doctors.filter(d => d.status === 'OFFLINE').length,
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                            Quản lý thông tin bác sĩ
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Quản lý thông tin các bác sĩ trong bệnh viện</p>
                    </div>

                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalDoctors}</span> bác sĩ</div>
                        <div>Hoạt động: <span className="font-semibold text-green-600">{stats.availableDoctors}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-user-md text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng bác sĩ</p>
                                <p className="text-lg font-semibold">{stats.totalDoctors}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-building text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng khoa</p>
                                <p className="text-lg font-semibold">{stats.totalDepartments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đang làm việc</p>
                                <p className="text-lg font-semibold">{stats.availableDoctors}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-calendar-check text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đang bận</p>
                                <p className="text-lg font-semibold">{stats.busyDoctors}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-person-arrow-down-to-line text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tạm nghỉ</p>
                                <p className="text-lg font-semibold">{stats.onLeaveDoctors}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm kiếm theo tên hoặc id ..."
                                    value={searchForm.input}
                                    onChange={(event) => handleChangeSearch("input", event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Trạng thái
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(event) => handleChangeSearch("status", event.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {doctorStatus.map((status) => (
                                    <option key={status.id} value={status.value}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Chọn khoa
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.departmentId}
                                onChange={(event) => handleChangeSearch("departmentId", event.target.value)}
                            >
                                <option value="">Chọn khoa</option>
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
                        <DoctorTable doctors={doctorsFilter} departments={departments} onSuccess={handleGetDoctorList} />
                    </div>
                </div>
            </div>
            {isCreateDoctor && <AddDoctor setIsOpenCreateDoctor={setIsCreateDoctor} departments={departments} onSuccess={handleGetDoctorList} />}
        </main >
    )
}
export default AdminDoctorPage;