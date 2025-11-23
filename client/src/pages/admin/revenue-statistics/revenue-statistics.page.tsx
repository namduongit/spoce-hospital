import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { getServiceInvoiceList } from "../../../services/service-invoice.service";
import { getPrescriptionInvoiceList } from "../../../services/prescription-invoice.service";
import { getAppointmentList } from "../../../services/appointment.service";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import type { PrescriptionInvoiceResponse } from "../../../responses/prescription-invoice.response";
import type { AppointmentResponse } from "../../../responses/appointment.response";

type RevenueByPeriod = {
    period: string,
    serviceRevenue: number,
    prescriptionRevenue: number,
    totalRevenue: number,
    appointmentCount: number
}

type RevenueByPackage = {
    packageName: string,
    quantity: number,
    revenue: number
}

type RevenueByMedicine = {
    medicineName: string,
    quantity: number,
    revenue: number
}

const AdminRevenueStatisticsPage = () => {
    const { execute, loading } = useCallApi();

    const [serviceInvoices, setServiceInvoices] = useState<ServiceInvoiceResponse[]>([]);
    const [prescriptionInvoices, setPrescriptionInvoices] = useState<PrescriptionInvoiceResponse[]>([]);
    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);

    const [filterForm, setFilterForm] = useState({
        fromDate: "",
        toDate: "",
        // day, week, month, year
        groupBy: "day"
    });

    const [revenueByPeriod, setRevenueByPeriod] = useState<RevenueByPeriod[]>([]);
    const [revenueByPackage, setRevenueByPackage] = useState<RevenueByPackage[]>([]);
    const [revenueByMedicine, setRevenueByMedicine] = useState<RevenueByMedicine[]>([]);

    const handleChangeFilter = (field: keyof typeof filterForm, value: string) => {
        setFilterForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetData = async () => {
        const [serviceRes, prescriptionRes, appointmentRes] = await Promise.all([
            execute(getServiceInvoiceList()),
            execute(getPrescriptionInvoiceList()),
            execute(getAppointmentList())
        ]);

        if (serviceRes?.result) {
            const data: ServiceInvoiceResponse[] = serviceRes.data;
            setServiceInvoices(Array.isArray(data) ? data : []);
        }
        if (prescriptionRes?.result) {
            const data: PrescriptionInvoiceResponse[] = prescriptionRes.data;
            setPrescriptionInvoices(Array.isArray(data) ? data : []);
        }
        if (appointmentRes?.result) {
            const data: AppointmentResponse[] = appointmentRes.data;
            setAppointments(Array.isArray(data) ? data : []);
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {
        calculateStatistics();
    }, [serviceInvoices, prescriptionInvoices, appointments, filterForm]);

    const filterDataByDateRange = <T extends { createAt: string } | { createdAt: string }>(data: T[]): T[] => {
        let filtered = data;

        if (filterForm.fromDate) {
            filtered = filtered.filter(item => {
                const dateStr = 'createAt' in item ? item.createAt : item.createdAt;
                const itemDate = new Date(dateStr);
                const fromDate = new Date(filterForm.fromDate);
                return itemDate >= fromDate;
            });
        }

        if (filterForm.toDate) {
            filtered = filtered.filter(item => {
                const dateStr = 'createAt' in item ? item.createAt : item.createdAt;
                const itemDate = new Date(dateStr);
                const toDate = new Date(filterForm.toDate);
                toDate.setHours(23, 59, 59, 999);
                return itemDate <= toDate;
            });
        }

        return filtered;
    }

    const getGroupKey = (date: Date): string => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        switch (filterForm.groupBy) {
            case "day":
                return `${day}/${month + 1}/${year}`;
            case "week":
                const weekNum = Math.ceil(day / 7);
                return `Tuần ${weekNum} - Tháng ${month + 1}/${year}`;
            case "month":
                return `Tháng ${month + 1}/${year}`;
            case "year":
                return `Năm ${year}`;
            default:
                return date.toISOString();
        }
    }

    const calculateStatistics = () => {
        const filteredServiceInvoices = filterDataByDateRange(
            serviceInvoices.filter(inv => inv.status === 'PAID')
        );
        const filteredPrescriptionInvoices = filterDataByDateRange(
            prescriptionInvoices.filter(inv => inv.status === 'PAID')
        );
        const filteredAppointments = filterDataByDateRange(
            appointments.filter(apt => apt.createdAt)
        );

        const periodMap = new Map<string, RevenueByPeriod>();

        filteredServiceInvoices.forEach(invoice => {
            const key = getGroupKey(new Date(invoice.createAt));
            const existing = periodMap.get(key) || {
                period: key,
                serviceRevenue: 0,
                prescriptionRevenue: 0,
                totalRevenue: 0,
                appointmentCount: 0
            };
            existing.serviceRevenue += invoice.totalAmount;
            existing.totalRevenue += invoice.totalAmount;
            periodMap.set(key, existing);
        });

        filteredPrescriptionInvoices.forEach(invoice => {
            const key = getGroupKey(new Date(invoice.createAt));
            const existing = periodMap.get(key) || {
                period: key,
                serviceRevenue: 0,
                prescriptionRevenue: 0,
                totalRevenue: 0,
                appointmentCount: 0
            };
            existing.prescriptionRevenue += invoice.totalAmount;
            existing.totalRevenue += invoice.totalAmount;
            periodMap.set(key, existing);
        });

        filteredAppointments.forEach(appointment => {
            const key = getGroupKey(new Date(appointment.createdAt));
            const existing = periodMap.get(key);
            if (existing) {
                existing.appointmentCount += 1;
            } else {
                periodMap.set(key, {
                    period: key,
                    serviceRevenue: 0,
                    prescriptionRevenue: 0,
                    totalRevenue: 0,
                    appointmentCount: 1
                });
            }
        });

        setRevenueByPeriod(Array.from(periodMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue));

        const packageMap = new Map<string, RevenueByPackage>();
        filteredServiceInvoices.forEach(invoice => {
            invoice.medicalPackages?.forEach(pkg => {
                const existing = packageMap.get(pkg.medicalPackageName) || {
                    packageName: pkg.medicalPackageName,
                    quantity: 0,
                    revenue: 0
                };
                existing.quantity += 1;
                existing.revenue += pkg.price;
                packageMap.set(pkg.medicalPackageName, existing);
            });
        });
        setRevenueByPackage(Array.from(packageMap.values()).sort((a, b) => b.revenue - a.revenue));

        const medicineMap = new Map<string, RevenueByMedicine>();
        filteredPrescriptionInvoices.forEach(invoice => {
            invoice.medicines?.forEach(med => {
                const existing = medicineMap.get(med.medicineName) || {
                    medicineName: med.medicineName,
                    quantity: 0,
                    revenue: 0
                };
                existing.quantity += med.quantity;
                existing.revenue += med.unitPrice * med.quantity;
                medicineMap.set(med.medicineName, existing);
            });
        });
        setRevenueByMedicine(Array.from(medicineMap.values()).sort((a, b) => b.revenue - a.revenue));
    }

    const totalStats = {
        totalServiceRevenue: serviceInvoices
            .filter(inv => inv.status === 'PAID')
            .reduce((sum, inv) => sum + inv.totalAmount, 0),
        totalPrescriptionRevenue: prescriptionInvoices
            .filter(inv => inv.status === 'PAID')
            .reduce((sum, inv) => sum + inv.totalAmount, 0),
        totalAppointments: appointments.length,
        paidServiceInvoices: serviceInvoices.filter(inv => inv.status === 'PAID').length,
        paidPrescriptionInvoices: prescriptionInvoices.filter(inv => inv.status === 'PAID').length,
        totalRevenue: 0
    }

    totalStats.totalRevenue = totalStats.totalServiceRevenue + totalStats.totalPrescriptionRevenue;

    const handleExportReport = () => {
        alert('Chức năng xuất báo cáo đang được phát triển');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="revenue-statistics-page p-4 sm:p-6">
            <div className="revenue-statistics-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                            Thống kê doanh thu
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Phân tích doanh thu và lợi nhuận theo thời gian
                        </p>
                    </div>
                    <button
                        onClick={handleExportReport}
                        className="mt-3 sm:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                        <i className="fa-solid fa-file-export mr-2"></i>
                        Xuất báo cáo
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-money-bill-wave text-green-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng doanh thu</p>
                                <p className="text-lg font-semibold text-green-600">
                                    {(totalStats.totalRevenue / 1000000).toFixed(1)}M
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-hand-holding-medical text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">DT Dịch vụ</p>
                                <p className="text-lg font-semibold text-blue-600">
                                    {(totalStats.totalServiceRevenue / 1000000).toFixed(1)}M
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-pills text-purple-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">DT Thuốc</p>
                                <p className="text-lg font-semibold text-purple-600">
                                    {(totalStats.totalPrescriptionRevenue / 1000000).toFixed(1)}M
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-calendar-check text-orange-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
                                <p className="text-lg font-semibold text-orange-600">
                                    {totalStats.totalAppointments}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Từ ngày
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filterForm.fromDate}
                                onChange={(e) => handleChangeFilter("fromDate", e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đến ngày
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filterForm.toDate}
                                onChange={(e) => handleChangeFilter("toDate", e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nhóm theo
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filterForm.groupBy}
                                onChange={(e) => handleChangeFilter("groupBy", e.target.value)}
                            >
                                <option value="day">Theo ngày</option>
                                <option value="week">Theo tuần</option>
                                <option value="month">Theo tháng</option>
                                <option value="year">Theo năm</option>
                            </select>
                        </div>
                        {(filterForm.fromDate || filterForm.toDate) && (
                            <button
                                onClick={() => setFilterForm(prev => ({ ...prev, fromDate: "", toDate: "" }))}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                <i className="fa-solid fa-times mr-1"></i>
                                Xóa lọc
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        <i className="fa-solid fa-chart-line mr-2 text-blue-600"></i>
                        Doanh thu theo thời gian
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Thời gian</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">DT Dịch vụ</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">DT Thuốc</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">Tổng doanh thu</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">Lịch hẹn</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {revenueByPeriod.length > 0 ? (
                                    revenueByPeriod.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{item.period}</td>
                                            <td className="px-4 py-3 text-right text-blue-600">
                                                {item.serviceRevenue.toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="px-4 py-3 text-right text-purple-600">
                                                {item.prescriptionRevenue.toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold text-green-600">
                                                {item.totalRevenue.toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">
                                                {item.appointmentCount}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            Không có dữ liệu trong khoảng thời gian này
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            <i className="fa-solid fa-hand-holding-medical mr-2 text-blue-600"></i>
                            Doanh thu theo gói dịch vụ
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Gói dịch vụ</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">SL</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {revenueByPackage.length > 0 ? (
                                        revenueByPackage.slice(0, 10).map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-900">{item.packageName}</td>
                                                <td className="px-4 py-3 text-right text-gray-600">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold text-blue-600">
                                                    {item.revenue.toLocaleString('vi-VN')} đ
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            <i className="fa-solid fa-pills mr-2 text-purple-600"></i>
                            Doanh thu theo thuốc
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Tên thuốc</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">SL</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {revenueByMedicine.length > 0 ? (
                                        revenueByMedicine.slice(0, 10).map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-900">{item.medicineName}</td>
                                                <td className="px-4 py-3 text-right text-gray-600">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold text-purple-600">
                                                    {item.revenue.toLocaleString('vi-VN')} đ
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminRevenueStatisticsPage;
