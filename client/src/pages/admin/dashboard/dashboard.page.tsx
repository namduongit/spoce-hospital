import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { getMedicineList } from "../../../services/medicine.service";
import { getAccountList } from "../../../services/account.service";
import { getAppointmentList } from "../../../services/appointment.service";
import type { MedicineResponse } from "../../../responses/medicine.response";
import type { AppointmentResponse } from "../../../responses/appointment.response";
import type { AccountResponse } from "../../../responses/account.response";

const AdminDashboardPage = () => {
    const { execute, loading } = useCallApi();

    const [medicines, setMedicines] = useState<MedicineResponse[]>([]);
    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);

    const handleGetData = async () => {
        const [medicineRes, accountRes, appointmentRes] = await Promise.all([
            execute(getMedicineList()),
            execute(getAccountList()),
            execute(getAppointmentList())
        ]);

        if (medicineRes?.result) {
            setMedicines(medicineRes.data);
        }
        if (accountRes?.result) {
            setAccounts(accountRes.data);
        }
        if (appointmentRes?.result) {
            setAppointments(appointmentRes.data);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const stats = {
        totalUsers: accounts.length,
        totalPatients: accounts.filter((a: AccountResponse) => a.role === 'USER').length,
        totalDoctors: accounts.filter((a: AccountResponse) => a.role === 'DOCTOR').length,
        totalAssistors: accounts.filter((a: AccountResponse) => a.role === 'ASSISTOR').length,

        totalAppointments: appointments.length,
        todayAppointments: appointments.filter((a: AppointmentResponse) => {
            const today = new Date().toDateString();
            return new Date(a.time).toDateString() === today;
        }).length,
        pendingAppointments: appointments.filter((a: AppointmentResponse) => a.status === 'PENDING').length,
        completedAppointments: appointments.filter((a: AppointmentResponse) => a.status === 'COMPLETED').length,

        totalMedicines: medicines.length,
        activeMedicines: medicines.filter(m => m.status === 'ACTIVE').length,
        lowStockMedicines: medicines.filter(m => m.currentStock <= m.minStock).length,
        outOfStockMedicines: medicines.filter(m => m.status === 'OUT_OF_STOCK').length,
        totalStockValue: medicines.reduce((sum, m) => sum + (m.price * m.currentStock || 0), 0),
    };

    const recentAppointments = appointments
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 5);

    const lowStockMedicines = medicines
        .filter(m => m.currentStock <= m.minStock)
        .slice(0, 5);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Tổng quan hệ thống bệnh viện</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                    Cập nhật lúc: {new Date().toLocaleString('vi-VN')}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <i className="fa-solid fa-users text-blue-600 text-xl"></i>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                <span>Bệnh nhân: {stats.totalPatients} • Bác sĩ: {stats.totalDoctors}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <i className="fa-solid fa-calendar-check text-green-600 text-xl"></i>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-600">Lịch hẹn</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                <span>Hôm nay: {stats.todayAppointments} • Chờ: {stats.pendingAppointments}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <i className="fa-solid fa-pills text-purple-600 text-xl"></i>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-600">Thuốc</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalMedicines}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                <span>Hoạt động: {stats.activeMedicines} • Sắp hết: {stats.lowStockMedicines}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <i className="fa-solid fa-coins text-orange-600 text-xl"></i>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-600">Giá trị kho</p>
                            <p className="text-2xl font-bold text-gray-900">{(stats.totalStockValue / 1000000).toFixed(1)}M</p>
                            <div className="text-xs text-gray-500 mt-1">
                                <span>VNĐ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Lịch hẹn gần đây</h3>
                        <a href="/admin/appointments" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Xem tất cả →
                        </a>
                    </div>
                    <div className="space-y-3">
                        {recentAppointments.length > 0 ? (
                            recentAppointments.map((appointment) => (
                                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{appointment.fullName}</p>
                                        <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(appointment.createdAt).toLocaleDateString('vi-VN')}
                                        </p>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {appointment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                appointment.status === 'PENDING' ? 'Chờ xử lý' :
                                                    appointment.status === 'CANCELLED' ? 'Đã hủy' : 'Khác'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">Không có lịch hẹn nào</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Thuốc sắp hết hàng</h3>
                        <a href="/admin/medicine" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Xem tất cả →
                        </a>
                    </div>
                    <div className="space-y-3">
                        {lowStockMedicines.length > 0 ? (
                            lowStockMedicines.map((medicine) => (
                                <div key={medicine.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{medicine.name}</p>
                                        <p className="text-sm text-gray-600">{medicine.categoryName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-red-600">
                                            Còn: {medicine.currentStock}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Tối thiểu: {medicine.minStock}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">Tất cả thuốc đều đủ số lượng</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/admin/accounts" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-user-plus text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Thêm tài khoản</span>
                    </a>
                    <a href="/admin/appointments" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-calendar-plus text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Tạo lịch hẹn</span>
                    </a>
                    <a href="/admin/medicine" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-pills text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Quản lý thuốc</span>
                    </a>
                    <a href="/admin/inventory" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-boxes-stacked text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Nhập xuất kho</span>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboardPage;
