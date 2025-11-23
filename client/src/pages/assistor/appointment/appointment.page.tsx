import { useEffect, useState } from "react";
import { appointmentStatus, dayStatus } from "../../../constants/status.constant";

import AppointmentTable from "../../../components/common/tables/appointment.table";
import type { AppointmentResponse } from "../../../responses/appointment.response";
import type { DepartmentResponse } from "../../../responses/department.response";
import type { RoomResponse } from "../../../responses/room.response";
import type { DoctorResponse } from "../../../responses/doctor.response";

import { getAppointmentList } from "../../../services/appointment.service";
import { getDepartmentList } from "../../../services/department.service";
import { getRoomList } from "../../../services/room.service";
import { getDoctorList } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";

const AssistorAppointmentsPage = () => {
    const { execute } = useCallApi();

    const [appointments, setAppointment] = useState<AppointmentResponse[]>([]);
    const [appointmentsFilter, setAppointmentsFilter] = useState<AppointmentResponse[]>([]);

    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [rooms, setRooms] = useState<RoomResponse[]>([]);
    const [doctors, setDoctors] = useState<DoctorResponse[]>([]);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        date: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetAppointmentList = async () => {
        const restResponse = await execute(getAppointmentList());
        if (restResponse?.result) {
            const data: AppointmentResponse[] = restResponse.data;
            setAppointment(Array.isArray(data) ? data : []);
            setAppointmentsFilter(Array.isArray(data) ? data : []);
        }
    }

    const handleGetDepartmentList = async () => {
        const restResponse = await execute(getDepartmentList());
        if (restResponse?.result) {
            const data: DepartmentResponse[] = restResponse.data;
            setDepartments(Array.isArray(data) ? data : []);
        }
    }

    const handleGetRoomList = async () => {
        const restResponse = await execute(getRoomList());
        if (restResponse?.result) {
            const data: RoomResponse[] = restResponse.data;
            setRooms(Array.isArray(data) ? data : []);
        }
    }

    const handleGetDoctorList = async () => {
        const restResponse = await execute(getDoctorList());
        if (restResponse?.result) {
            const data: DoctorResponse[] = restResponse.data;
            setDoctors(Array.isArray(data) ? data : []);
        }
    }

    useEffect(() => {
        let filtered = appointments.filter(appointment => {
            const matchesInput =
                searchForm.input === "" ||
                appointment.fullName?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                appointment.id?.toString().includes(searchForm.input) ||
                appointment.phone?.toString().includes(searchForm.input);

            const matchesStatus =
                searchForm.status === "" || appointment.status === searchForm.status;

            return matchesInput && matchesStatus;
        });

        if (searchForm.date === "ASC") {
            filtered = filtered.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (searchForm.date === "DESC") {
            filtered = filtered.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        setAppointmentsFilter(filtered);
    }, [searchForm, appointments]);

    useEffect(() => {
        handleGetAppointmentList();
        handleGetDepartmentList();
        handleGetRoomList();
        handleGetDoctorList();
    }, []);

    const stats = {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === 'PENDING').length,
        confirmedAppointments: appointments.filter(a => a.status === 'CONFIRMED').length,
        cancelledAppointments: appointments.filter(a => a.status === 'CANCELLED').length,
        completedAppointments: appointments.filter(a => a.status === 'COMPLETED').length,
        todayAppointments: appointments.filter(a => {
            const today = new Date().toDateString();
            return new Date(a.createdAt).toDateString() === today;
        }).length
    };

    return (
        <main className="appointments-page p-4 sm:p-6">
            <div className="appointments-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                            Quản lý lịch hẹn
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Quản lý các lịch hẹn của khách hàng</p>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalAppointments}</span> lịch hẹn</div>
                        <div>Hôm nay: <span className="font-semibold text-green-600">{stats.todayAppointments}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-calendar text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
                                <p className="text-lg font-semibold">{stats.totalAppointments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fa-solid fa-clock text-yellow-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Chờ xác nhận</p>
                                <p className="text-lg font-semibold">{stats.pendingAppointments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đã xác nhận</p>
                                <p className="text-lg font-semibold">{stats.confirmedAppointments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-calendar-check text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Hôm nay</p>
                                <p className="text-lg font-semibold">{stats.todayAppointments}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="appointments__sort bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="appointments__filter flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm theo tên bệnh nhân hoặc id ..."
                                value={searchForm.input}
                                onChange={(e) => handleChangeSearch("input", e.target.value)}
                            />
                        </div>

                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(e) => handleChangeSearch("status", e.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {appointmentStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.date}
                                onChange={(e) => handleChangeSearch("date", e.target.value)}
                            >
                                <option value="">Sắp xếp theo</option>
                                {dayStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="appointments__options flex justify-end items-center">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center">
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm lịch hẹn</span>
                        </button>
                    </div>
                </div>

                <div className="appointments__data hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <AppointmentTable appointments={appointmentsFilter} departments={departments} rooms={rooms} doctors={doctors} onSuccess={handleGetAppointmentList} />
                    </div>
                </div>
            </div>

        </main >
    )
}

export default AssistorAppointmentsPage;