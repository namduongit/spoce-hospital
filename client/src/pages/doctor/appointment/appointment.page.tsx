
import { useEffect, useState } from "react";
import { appointmentStatus, dayStatus } from "../../../constants/status.constant";

import DoctorAppointmentTable from "../../../components/doctor/tables/appointment.table";
import type { AppointmentResponse } from "../../../responses/appointment.response";

import { getDoctorAppointments } from "../../../services/appointment.service";

import useCallApi from "../../../hooks/useCallApi";

const DoctorAppointmentPage = () => {
    const { execute } = useCallApi();

    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
    const [appointmentsFilter, setAppointmentsFilter] = useState<AppointmentResponse[]>([]);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        date: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetAppointmentList = async () => {
        const restResponse = await execute(getDoctorAppointments());
        if (restResponse?.result) {
            const data: AppointmentResponse[] = restResponse.data;
            setAppointments(Array.isArray(data) ? data : []);
            setAppointmentsFilter(Array.isArray(data) ? data : []);
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
    }, []);

    const stats = {
        totalAppointments: appointments.length,
        confirmedAppointments: appointments.filter(a => a.status === 'CONFIRMED').length,
        completedAppointments: appointments.filter(a => a.status === 'COMPLETED').length,
        cancelledAppointments: appointments.filter(a => a.status === 'CANCELLED').length,
        todayAppointments: appointments.filter(a => {
            const today = new Date().toDateString();
            return new Date(a.createdAt).toDateString() === today;
        }).length
    };

    return (
        <main className="appointments-page p-4 sm:p-6">
            <div className="appointments-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý lịch hẹn bác sĩ
                    </h3>
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
                                <i className="fa-solid fa-user-check text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Hoàn thành</p>
                                <p className="text-lg font-semibold">{stats.completedAppointments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-ban text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đã hủy</p>
                                <p className="text-lg font-semibold">{stats.cancelledAppointments}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="appointments__sort bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="appointments__filter flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="appointments__filter__item relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm theo tên bệnh nhân, ID hoặc SĐT..."
                                value={searchForm.input}
                                onChange={(e) => handleChangeSearch("input", e.target.value)}
                            />
                        </div>

                        <div className="appointments__filter__item flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(e) => handleChangeSearch("status", e.target.value)}
                            >
                                <option value="">Tất cả trạng thái</option>
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
                                <option value="">Sắp xếp theo ngày</option>
                                {dayStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="appointments__options flex justify-end items-center gap-2">
                        <button 
                            className="font-semibold bg-green-600 text-white hover:text-green-600 hover:bg-white hover:ring-3 hover:ring-green-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => window.location.href = '/doctor/create-invoice'}
                        >
                            <i className="fa-solid fa-receipt me-2"></i>
                            <span>Tạo hóa đơn</span>
                        </button>
                    </div>
                </div>

                <div className="appointments__data hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <DoctorAppointmentTable appointments={appointmentsFilter} onSuccess={handleGetAppointmentList} />
                    </div>
                </div>
            </div>

        </main>
    )
}

export default DoctorAppointmentPage;