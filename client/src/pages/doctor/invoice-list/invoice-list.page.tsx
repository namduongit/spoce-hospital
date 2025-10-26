import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ExaminationInvoiceResponse } from "../../../responses/examination-invoice.response";
import type { PrescriptionInvoiceResponse } from "../../../responses/prescription-invoice.response";

import { getExaminationInvoiceList } from "../../../services/examination-invoice.service";
import { getPrescriptionInvoiceList } from "../../../services/prescription-invoice.service";
import { printExaminationInvoice, printPrescriptionInvoice } from "../../../utils/print.util";

import useCallApi from "../../../hooks/useCallApi";

const DoctorInvoiceListPage = () => {
    const navigate = useNavigate();
    const { execute } = useCallApi();

    const [examinationInvoices, setExaminationInvoices] = useState<ExaminationInvoiceResponse[]>([]);
    const [prescriptionInvoices, setPrescriptionInvoices] = useState<PrescriptionInvoiceResponse[]>([]);
    const [activeTab, setActiveTab] = useState<'examination' | 'prescription'>('examination');
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const handleGetExaminationInvoices = async () => {
        const restResponse = await execute(getExaminationInvoiceList() as any);
        if (restResponse?.result) {
            const data: ExaminationInvoiceResponse[] = restResponse.data;
            setExaminationInvoices(Array.isArray(data) ? data : []);
        }
    };

    const handleGetPrescriptionInvoices = async () => {
        const restResponse = await execute(getPrescriptionInvoiceList() as any);
        if (restResponse?.result) {
            const data: PrescriptionInvoiceResponse[] = restResponse.data;
            setPrescriptionInvoices(Array.isArray(data) ? data : []);
        }
    };

    const filteredExaminationInvoices = examinationInvoices.filter(invoice => {
        const matchesSearch = searchTerm === "" || 
            invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.patientPhone.includes(searchTerm) ||
            invoice.id.toString().includes(searchTerm);
        
        const matchesStatus = statusFilter === "" || invoice.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const filteredPrescriptionInvoices = prescriptionInvoices.filter(invoice => {
        const matchesSearch = searchTerm === "" || 
            invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.patientPhone.includes(searchTerm) ||
            invoice.id.toString().includes(searchTerm);
        
        const matchesStatus = statusFilter === "" || invoice.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        handleGetExaminationInvoices();
        handleGetPrescriptionInvoices();
    }, []);

    const examinationStats = {
        total: examinationInvoices.length,
        pending: examinationInvoices.filter(i => i.status === 'PENDING').length,
        paid: examinationInvoices.filter(i => i.status === 'PAID').length,
        cancelled: examinationInvoices.filter(i => i.status === 'CANCELLED').length,
        totalAmount: examinationInvoices.reduce((sum, i) => sum + i.totalAmount, 0)
    };

    const prescriptionStats = {
        total: prescriptionInvoices.length,
        pending: prescriptionInvoices.filter(i => i.status === 'PENDING').length,
        dispensed: prescriptionInvoices.filter(i => i.status === 'DISPENSED').length,
        cancelled: prescriptionInvoices.filter(i => i.status === 'CANCELLED').length,
        totalAmount: prescriptionInvoices.reduce((sum, i) => sum + i.totalAmount, 0)
    };

    return (
        <main className="invoice-list-page p-4 sm:p-6">
            <div className="invoice-list-page__wrap max-w-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                        Danh sách hóa đơn
                    </h3>
                    <button
                        onClick={() => navigate("/doctor/create-invoice")}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Tạo hóa đơn mới
                    </button>
                </div>

                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('examination')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'examination'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className="fa-solid fa-receipt mr-2"></i>
                                Hóa đơn khám bệnh ({examinationStats.total})
                            </button>
                            <button
                                onClick={() => setActiveTab('prescription')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'prescription'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className="fa-solid fa-pills mr-2"></i>
                                Đơn thuốc ({prescriptionStats.total})
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'examination' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <i className="fa-solid fa-receipt text-blue-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Tổng hóa đơn</p>
                                    <p className="text-lg font-semibold">{examinationStats.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <i className="fa-solid fa-clock text-yellow-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Chờ thanh toán</p>
                                    <p className="text-lg font-semibold">{examinationStats.pending}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <i className="fa-solid fa-check-circle text-green-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Đã thanh toán</p>
                                    <p className="text-lg font-semibold">{examinationStats.paid}</p>
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
                                    <p className="text-lg font-semibold">{examinationStats.cancelled}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <i className="fa-solid fa-money-bill text-purple-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Tổng doanh thu</p>
                                    <p className="text-lg font-semibold">{examinationStats.totalAmount.toLocaleString('vi-VN')}₫</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <i className="fa-solid fa-pills text-green-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Tổng đơn thuốc</p>
                                    <p className="text-lg font-semibold">{prescriptionStats.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <i className="fa-solid fa-clock text-yellow-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Chờ cấp phát</p>
                                    <p className="text-lg font-semibold">{prescriptionStats.pending}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <i className="fa-solid fa-check-circle text-blue-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Đã cấp phát</p>
                                    <p className="text-lg font-semibold">{prescriptionStats.dispensed}</p>
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
                                    <p className="text-lg font-semibold">{prescriptionStats.cancelled}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <i className="fa-solid fa-money-bill text-purple-600"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-600">Tổng giá trị</p>
                                    <p className="text-lg font-semibold">{prescriptionStats.totalAmount.toLocaleString('vi-VN')}₫</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tìm theo tên bệnh nhân, SĐT, hoặc ID..."
                                />
                            </div>
                        </div>
                        <div className="sm:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Tất cả trạng thái</option>
                                {activeTab === 'examination' ? (
                                    <>
                                        <option value="PENDING">Chờ thanh toán</option>
                                        <option value="PAID">Đã thanh toán</option>
                                        <option value="CANCELLED">Đã hủy</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="PENDING">Chờ cấp phát</option>
                                        <option value="DISPENSED">Đã cấp phát</option>
                                        <option value="CANCELLED">Đã hủy</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {activeTab === 'examination' ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bệnh nhân</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SĐT</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredExaminationInvoices.length > 0 ? (
                                        filteredExaminationInvoices.map((invoice, index) => (
                                            <tr key={invoice.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                                <td className="px-4 py-3 text-sm text-gray-700 font-medium">#{invoice.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{invoice.patientName}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{invoice.patientPhone}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {new Date(invoice.createdAt).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                                                    {invoice.totalAmount.toLocaleString('vi-VN')} ₫
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                        invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {invoice.status === 'PENDING' ? 'Chờ thanh toán' :
                                                         invoice.status === 'PAID' ? 'Đã thanh toán' : 'Đã hủy'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-center">
                                                    <button
                                                        onClick={() => printExaminationInvoice(invoice)}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
                                                    >
                                                        <i className="fa-solid fa-print mr-1"></i>
                                                        In hóa đơn
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                                <i className="fa-solid fa-receipt text-4xl mb-4"></i>
                                                <p>Không có hóa đơn khám bệnh nào</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-green-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bệnh nhân</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SĐT</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredPrescriptionInvoices.length > 0 ? (
                                        filteredPrescriptionInvoices.map((invoice, index) => (
                                            <tr key={invoice.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors`}>
                                                <td className="px-4 py-3 text-sm text-gray-700 font-medium">#{invoice.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{invoice.patientName}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{invoice.patientPhone}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {new Date(invoice.createdAt).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                                                    {invoice.totalAmount.toLocaleString('vi-VN')} ₫
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                        invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        invoice.status === 'DISPENSED' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {invoice.status === 'PENDING' ? 'Chờ cấp phát' :
                                                         invoice.status === 'DISPENSED' ? 'Đã cấp phát' : 'Đã hủy'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-center">
                                                    <button
                                                        onClick={() => printPrescriptionInvoice(invoice)}
                                                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
                                                    >
                                                        <i className="fa-solid fa-print mr-1"></i>
                                                        In đơn thuốc
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                                <i className="fa-solid fa-pills text-4xl mb-4"></i>
                                                <p>Không có đơn thuốc nào</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DoctorInvoiceListPage;
