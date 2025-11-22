import { useEffect, useState } from "react";
import { getServiceInvoiceList } from "../../../services/service-invoice.service";
import { formatDateVi } from "../../../utils/format-date.util";
import useCallApi from "../../../hooks/useCallApi";
import { serviceInvoiceStatus } from "../../../constants/status.constant";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import ServiceInvoiceDetail from "../../../components/common/details/service-invoice.detail";
import { formatPriceVND } from "../../../utils/format-number.util";

const AssistorServiceInvoicePage = () => {
    const { execute } = useCallApi();

    const [serviceInvoices, setServiceInvoices] = useState<ServiceInvoiceResponse[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<ServiceInvoiceResponse[]>([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<ServiceInvoiceResponse | null>(null);
    
    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        date: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    };

    const handleGetServiceInvoices = async () => {
        const restResponse = await execute(getServiceInvoiceList());
        if (restResponse?.result) {
            const data: ServiceInvoiceResponse[] = restResponse.data;
            const invoiceList = Array.isArray(data) ? data : [];
            setServiceInvoices(invoiceList);
            setFilteredInvoices(invoiceList);
        }
    };

    const handleSearchAndFilter = () => {
        let filtered = serviceInvoices;

        if (searchForm.input.trim()) {
            filtered = filtered.filter(invoice =>
                invoice.patientName.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                invoice.patientPhone.includes(searchForm.input) ||
                invoice.id.toString().includes(searchForm.input) ||
                invoice.doctorEmail.toLowerCase().includes(searchForm.input.toLowerCase())
            );
        }
        if (searchForm.status) {
            filtered = filtered.filter(invoice => invoice.status === searchForm.status);
        }

        if (searchForm.date === "ASC") {
            filtered = filtered.slice().sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
        } else if (searchForm.date === "DESC") {
            filtered = filtered.slice().sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
        }

        setFilteredInvoices(filtered);
    };

    useEffect(() => {
        handleGetServiceInvoices();
    }, []);

    useEffect(() => {
        handleSearchAndFilter();
    }, [searchForm, serviceInvoices]);

    const stats = {
        totalInvoices: serviceInvoices.length,
        totalAmount: serviceInvoices.reduce((sum, invoice) => sum + (invoice.totalAmount || 0), 0),
        totalPackages: serviceInvoices.reduce((sum, invoice) => sum + (invoice.medicalPackages?.length || 0), 0),
        pendingInvoices: serviceInvoices.filter(invoice => invoice.status === 'PENDING').length,
        paidInvoices: serviceInvoices.filter(invoice => invoice.status === 'PAID').length,
        cancelledInvoices: serviceInvoices.filter(invoice => invoice.status === 'CANCELLED').length,
        todayInvoices: serviceInvoices.filter(invoice => {
            const today = new Date().toDateString();
            return new Date(invoice.createAt).toDateString() === today;
        }).length
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'text-yellow-600 bg-yellow-100';
            case 'PAID':
                return 'text-green-600 bg-green-100';
            case 'CANCELLED':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ xử lý';
            case 'PAID':
                return 'Đã hoàn thành';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    }

    const handleShowDetail = (invoice: ServiceInvoiceResponse) => {
        setSelectedInvoice(invoice);
        setShowDetail(true);
    }

    return (
        <main className="service-invoice-page p-4 sm:p-6">
            <div className="service-invoice-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý hóa đơn dịch vụ
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalInvoices}</span> hóa đơn</div>
                        <div>Hôm nay: <span className="font-semibold text-green-600">{stats.todayInvoices}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-receipt text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng hóa đơn</p>
                                <p className="text-lg font-semibold">{stats.totalInvoices}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fa-solid fa-clock text-yellow-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Chờ xử lý</p>
                                <p className="text-lg font-semibold">{stats.pendingInvoices}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                                <p className="text-lg font-semibold">{stats.paidInvoices}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-times-circle text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đã hủy</p>
                                <p className="text-lg font-semibold">{stats.cancelledInvoices}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-hand-holding-medical text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng gói DV</p>
                                <p className="text-lg font-semibold">{stats.totalPackages}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-money-bill text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Doanh thu</p>
                                <p className="text-lg font-semibold">{(stats.totalAmount / 1000000).toFixed(1)}M</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-invoice__sort bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="service-invoice__filter flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="service-invoice__filter__item relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm theo tên bệnh nhân, bác sĩ, mã hóa đơn..."
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
                                {serviceInvoiceStatus.map((status) => (
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
                                <option value="DESC">Mới nhất</option>
                                <option value="ASC">Cũ nhất</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="service-invoice__data bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Mã HĐ</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Tên bệnh nhân</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Số điện thoại</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Email bác sĩ</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Số gói DV</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Ngày tạo</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Trạng thái</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Tổng tiền</th>
                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-blue-600">
                                                #{invoice.id}
                                            </td>
                                            <td className="px-4 py-3 text-gray-900">
                                                {invoice.patientName}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {invoice.patientPhone}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {invoice.doctorEmail}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                    {invoice.medicalPackages?.length || 0} gói
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {formatDateVi(new Date(invoice.createAt))}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                                    {getStatusText(invoice.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-blue-600">
                                                {formatPriceVND(invoice.totalAmount)} 
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleShowDetail(invoice)}
                                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-xs font-medium"
                                                        title="Xem chi tiết"
                                                    >
                                                        <i className="fa-solid fa-eye mr-1"></i>
                                                        Chi tiết
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <i className="fa-solid fa-receipt text-4xl mb-3 text-gray-300"></i>
                                                <p className="text-lg font-medium">Không có hóa đơn dịch vụ nào</p>
                                                <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredInvoices.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>
                                    Hiển thị <span className="font-medium">{filteredInvoices.length}</span> trên tổng số <span className="font-medium">{serviceInvoices.length}</span> hóa đơn
                                </span>
                                <span>
                                    Tổng giá trị: <span className="font-semibold text-blue-600">
                                        {formatPriceVND(filteredInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0))} 
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showDetail && selectedInvoice && (
                <ServiceInvoiceDetail
                    serviceInvoiceSelect={selectedInvoice}
                    setShowDetail={setShowDetail}
                    onSuccess={handleGetServiceInvoices}
                />
            )}
        </main>
    );
};

export default AssistorServiceInvoicePage;
