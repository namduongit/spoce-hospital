import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { getMedicineList, getMedicineCategoryList } from "../../../services/medicine.service";
import { getImportTicketList } from "../../../services/import-ticket.service";
import { getExportTicketList } from "../../../services/export-ticket.service";
import type { MedicineResponse } from "../../../responses/medicine.response";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import type { ImportTicketResponse } from "../../../responses/import-ticket.response";
import type { ExportTicketResponse } from "../../../responses/export-ticket.response";

const AdminMedicineDashboardPage = () => {
    const { execute } = useCallApi();

    const [medicines, setMedicines] = useState<MedicineResponse[]>([]);
    const [categories, setCategories] = useState<MedicineCategoryResponse[]>([]);
    const [importTickets, setImportTickets] = useState<ImportTicketResponse[]>([]);
    const [exportTickets, setExportTickets] = useState<ExportTicketResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetData = async () => {
        setIsLoading(true);
        try {
            const [medicineRes, categoryRes, importRes, exportRes] = await Promise.all([
                execute(getMedicineList()),
                execute(getMedicineCategoryList()),
                execute(getImportTicketList()),
                execute(getExportTicketList())
            ]);

            if (medicineRes?.result) {
                setMedicines(medicineRes.data);
            }
            if (categoryRes?.result) {
                setCategories(categoryRes.data);
            }
            if (importRes?.result) {
                setImportTickets(importRes.data);
            }
            if (exportRes?.result) {
                setExportTickets(exportRes.data);
            }
        } catch (error) {
            console.error("Error fetching medicine dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const stats = {
        totalMedicines: medicines.length,
        totalCategories: categories.length,

        activeMedicines: medicines.filter(m => m.status === 'active').length,
        inactiveMedicines: medicines.filter(m => m.status === 'inactive').length,
        outOfStockMedicines: medicines.filter(m => m.status === 'out_of_stock').length,

        lowStockMedicines: medicines.filter(m => m.currentStock <= m.minStock).length,
        overStockMedicines: medicines.filter(m => m.currentStock > m.maxStock).length,
        totalCurrentStock: medicines.reduce((sum, m) => sum + (m.currentStock || 0), 0),

        totalStockValue: medicines.reduce((sum, m) => sum + (m.price * m.currentStock || 0), 0),
        averagePrice: medicines.length > 0 ? medicines.reduce((sum, m) => sum + (m.price || 0), 0) / medicines.length : 0,
        highValueMedicines: medicines.filter(m => m.price > 100000).length,

        totalImports: importTickets.length,
        totalExports: exportTickets.length,
        recentImports: importTickets.filter(t => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(t.createdAt || 0) >= weekAgo;
        }).length,
        recentExports: exportTickets.filter(t => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(t.createdAt || 0) >= weekAgo;
        }).length,
    };

    const medicinesByCategory = categories.map(category => ({
        name: category.name,
        count: medicines.filter(m => m.categoryId === category.id).length,
        value: medicines.filter(m => m.categoryId === category.id).reduce((sum, m) => sum + (m.price * m.currentStock || 0), 0)
    })).sort((a, b) => b.count - a.count);

    const topMedicinesByValue = medicines
        .map(m => ({
            ...m,
            totalValue: m.price * m.currentStock
        }))
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 10);

    const medicinesNeedingAttention = medicines.filter(m =>
        m.currentStock <= m.minStock ||
        m.status === 'out_of_stock'
    ).slice(0, 8);

    if (isLoading) {
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tổng quan thuốc</h1>
                    <p className="text-sm text-gray-600 mt-1">Phân tích và thống kê kho thuốc</p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                    <a href="/admin/medicine" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <i className="fa-solid fa-pills mr-2"></i>
                        Quản lý thuốc
                    </a>
                    <a href="/admin/inventory" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fa-solid fa-boxes-stacked mr-2"></i>
                        Nhập xuất kho
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                    <i className="fa-solid fa-pills text-blue-600"></i>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Tổng số thuốc</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{stats.totalMedicines}</p>
                            <div className="text-xs text-gray-500">
                                <div>Hoạt động: {stats.activeMedicines} • Ngừng: {stats.inactiveMedicines}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-green-50 rounded-lg mr-3">
                                    <i className="fa-solid fa-coins text-green-600"></i>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Giá trị tồn kho</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{(stats.totalStockValue / 1000000)} M VNĐ</p>
                            <div className="text-xs text-gray-500">
                                <div>Giá TB: {(stats.averagePrice / 1000).toFixed(0)}K • Cao giá: {stats.highValueMedicines}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-purple-50 rounded-lg mr-3">
                                    <i className="fa-solid fa-box text-purple-600"></i>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Số lượng tồn</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{stats.totalCurrentStock.toLocaleString()}</p>
                            <div className="text-xs text-gray-500">
                                <div>Sắp hết: {stats.lowStockMedicines} • Hết: {stats.outOfStockMedicines}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-orange-50 rounded-lg mr-3">
                                    <i className="fa-solid fa-truck text-orange-600"></i>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Hoạt động kho</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{stats.recentImports + stats.recentExports}</p>
                            <div className="text-xs text-gray-500">
                                <div>Nhập: {stats.recentImports} • Xuất: {stats.recentExports} (tuần)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Phân loại thuốc</h3>
                        <span className="text-sm text-gray-500">{stats.totalCategories} loại</span>
                    </div>
                    <div className="space-y-4">
                        {medicinesByCategory.slice(0, 6).map((category) => (
                            <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium text-gray-900">{category.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">{category.count}</div>
                                    <div className="text-sm text-gray-500">{(category.value / 1000000)} M VNĐ</div>
                                </div>
                            </div>
                        ))}
                        {medicinesByCategory.length > 6 && (
                            <div className="text-center pt-2">
                                <a href="/admin/medicine" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    Xem thêm {medicinesByCategory.length - 6} loại khác →
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Cần chú ý</h3>
                        <div className="flex items-center text-red-600 font-semibold">
                            <i className="fa-solid fa-bell"></i>
                            <span className="text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                                {medicinesNeedingAttention.length}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {medicinesNeedingAttention.length > 0 ? (
                            medicinesNeedingAttention.map((medicine) => (
                                <div key={medicine.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{medicine.name}</p>
                                            <p className="text-sm text-gray-600">{medicine.categoryName}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex flex-col gap-1">
                                                {medicine.currentStock <= medicine.minStock && (
                                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                        Sắp hết: {medicine.currentStock}/{medicine.minStock}
                                                    </span>
                                                )}
                                                {medicine.status === 'out_of_stock' && (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                        Hết hàng
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <i className="fa-solid fa-check-circle text-green-500 text-3xl mb-2"></i>
                                <p className="text-gray-500">Tất cả thuốc đều trong tình trạng tốt</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Top thuốc theo giá trị tồn kho</h3>
                    <a href="/admin/medicine" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Xem tất cả →
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Hạng</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tên thuốc</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Loại</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Số lượng</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Giá</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Tổng giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topMedicinesByValue.slice(0, 8).map((medicine, index) => (
                                <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${index === 0 ? 'bg-yellow-500' :
                                                index === 1 ? 'bg-gray-400' :
                                                    index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                                            }`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{medicine.name}</div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{medicine.categoryName}</td>
                                    <td className="py-3 px-4 text-right font-medium">{medicine.currentStock}</td>
                                    <td className="py-3 px-4 text-right font-medium">{medicine.price.toLocaleString()} VNĐ</td>
                                    <td className="py-3 px-4 text-right font-bold text-blue-600">
                                        {medicine.totalValue.toLocaleString()} VNĐ
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/admin/medicine" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-pills text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Quản lý thuốc</span>
                    </a>
                    <a href="/admin/inventory" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-truck-loading text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Nhập kho</span>
                    </a>
                    <a href="/admin/inventory" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-truck text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Xuất kho</span>
                    </a>
                    <a href="/admin/medicine" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-gray-50 transition-all">
                        <i className="fa-solid fa-chart-line text-gray-600 text-lg mr-3"></i>
                        <span className="font-medium text-gray-700">Báo cáo</span>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default AdminMedicineDashboardPage;
