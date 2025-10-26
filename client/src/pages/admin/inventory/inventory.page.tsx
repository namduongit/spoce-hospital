import { useEffect, useState, useMemo } from "react";
import { transactionStatus } from "../../../constants/medicine.constant";

import type { ImportTicketResponse } from "../../../responses/import-ticket.response";
import type { MedicineResponse } from "../../../responses/medicine.response";
import useCallApi from "../../../hooks/useCallApi";
import { getMedicineList } from "../../../services/medicine.service";
import AddImport from "../../../components/common/adds/import-ticket.add";
import AddExport from "../../../components/common/adds/export-ticket.add";
import type { ExportTicketResponse } from "../../../responses/export-ticket.response";
import { getImportTicketList } from "../../../services/import-ticket.service";
import { getExportTicketList } from "../../../services/export-ticket.service";
import ImportTicketsTable from "../../../components/common/tables/import-tickets-table";
import ExportTicketsTable from "../../../components/common/tables/export-tickets-table";

const AdminInventoryPage = () => {
    const { execute } = useCallApi();

    const [select, setSelect] = useState<string>("all");

    const [importTickets, setImportTickets] = useState<ImportTicketResponse[]>([]);

    const [exportTickets, setExportTickets] = useState<ExportTicketResponse[]>([]);

    const [medicines, setMedicines] = useState<MedicineResponse[]>([]);

    const [isOpenCreateImport, setIsOpenCreateImport] = useState<boolean>(false);
    const [isOpenCreateExport, setIsOpenCreateExport] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        type: "",
        dateFrom: "",
        dateTo: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleSearch = () => {
        
    }

    const filteredImportTickets = useMemo(() => {
        return importTickets.filter(ticket => {
            const matchInput = !searchForm.input || 
                ticket.id.toString().includes(searchForm.input.toLowerCase()) ||
                ticket.performedBy.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                (ticket.supplierName && ticket.supplierName.toLowerCase().includes(searchForm.input.toLowerCase())) ||
                ticket.items.some(item => 
                    item.medicineName.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                    item.medicineId.toString().includes(searchForm.input.toLowerCase())
                );

            const matchStatus = !searchForm.status || ticket.status === searchForm.status;

            const matchDateFrom = !searchForm.dateFrom || 
                new Date(ticket.createdAt) >= new Date(searchForm.dateFrom);

            const matchDateTo = !searchForm.dateTo || 
                new Date(ticket.createdAt) <= new Date(searchForm.dateTo + 'T23:59:59');

            return matchInput && matchStatus && matchDateFrom && matchDateTo;
        });
    }, [importTickets, searchForm]);

    const filteredExportTickets = useMemo(() => {
        return exportTickets.filter(ticket => {
            const matchInput = !searchForm.input || 
                ticket.id.toString().includes(searchForm.input.toLowerCase()) ||
                ticket.performedBy.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                ticket.items.some(item => 
                    item.medicineName.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                    item.medicineId.toString().includes(searchForm.input.toLowerCase())
                );

            const matchStatus = !searchForm.status || ticket.status === searchForm.status;

            const matchDateFrom = !searchForm.dateFrom || 
                new Date(ticket.createdAt) >= new Date(searchForm.dateFrom);

            const matchDateTo = !searchForm.dateTo || 
                new Date(ticket.createdAt) <= new Date(searchForm.dateTo + 'T23:59:59');

            return matchInput && matchStatus && matchDateFrom && matchDateTo;
        });
    }, [exportTickets, searchForm]);

    const handleGetImportTicketList = async () => {
        const restResponse = await execute(getImportTicketList());
        if (restResponse?.result) {
            const data: ImportTicketResponse[] = restResponse.data;
            setImportTickets(Array.isArray(data) ? data : []);
        }
    }

    const handleGetExportTicketList = async () => {
        const restResponse = await execute(getExportTicketList());
        if (restResponse?.result) {
            const data: ExportTicketResponse[] = restResponse.data;
            setExportTickets(Array.isArray(data) ? data : []);
        }
    }

    const handleGetMedicineList = async () => {
        const restResponse = await execute(getMedicineList());
        if (restResponse?.result) {
            const data: MedicineResponse[] = restResponse.data;
            setMedicines(Array.isArray(data) ? data : []);
        }
    }

    const handleSuccessImport = () => {
        handleGetImportTicketList();
        handleGetMedicineList();
    }

    const handleSuccessExport = () => {
        handleGetExportTicketList();
        handleGetMedicineList();
    }

    const getTicketTotalAmount = (t: ImportTicketResponse | ExportTicketResponse) => {
        const asAny = t as any;
        if (typeof asAny.totalAmount === "number") return asAny.totalAmount;
        if (typeof asAny.totalPrice === "number") return asAny.totalPrice;
        if (typeof asAny.amount === "number") return asAny.amount;
        return 0;
    };

    const stats = {
        totalTransactions: filteredImportTickets.length + filteredExportTickets.length,
        totalImports: filteredImportTickets.length,
        totalExports: filteredExportTickets.length,
        totalValue: filteredImportTickets.reduce((sum, t) => sum + getTicketTotalAmount(t), 0) + filteredExportTickets.reduce((sum, t) => sum + getTicketTotalAmount(t), 0),
        pendingTransactions: filteredImportTickets.filter(t => t.status === 'PENDING').length + filteredExportTickets.filter(t => t.status === 'PENDING').length
    };

    useEffect(() => {
        handleGetImportTicketList();
        handleGetExportTicketList();
        handleGetMedicineList();
    }, []);

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý nhập xuất kho
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Tổng giao dịch: <span className="font-semibold text-blue-600">{stats.totalTransactions}</span></div>
                        <div>Chờ xử lý: <span className="font-semibold text-yellow-600">{stats.pendingTransactions}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-download text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Nhập hàng</p>
                                <p className="text-lg font-semibold">{stats.totalImports}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-upload text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Xuất hàng</p>
                                <p className="text-lg font-semibold">{stats.totalExports}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-money-bill text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng giá trị</p>
                                <p className="text-lg font-semibold">{stats.totalValue.toLocaleString()}đ</p>
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
                                <p className="text-lg font-semibold">{stats.pendingTransactions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="grid gap-4">

                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            <div className="appointments__filter__item relative">
                                <label className="block text-xs text-gray-600 mb-1">Tìm kiếm:</label>
                                <div className="relative">
                                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                    <input
                                        type="text"
                                        value={searchForm.input}
                                        onChange={(event) => handleChangeSearch("input", event.target.value)}
                                        className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Tìm kiếm theo thuốc, mã giao dịch..."
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Trạng thái:</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={searchForm.status}
                                    onChange={(event) => handleChangeSearch("status", event.target.value)}
                                >
                                    <option value="">Tất cả trạng thái</option>
                                    {transactionStatus.map((status) => (
                                        <option key={status.id} value={status.value.toUpperCase()}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Từ ngày:</label>
                                <input
                                    type="date"
                                    value={searchForm.dateFrom}
                                    onChange={(event) => handleChangeSearch("dateFrom", event.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Đến ngày:</label>
                                <input
                                    type="date"
                                    value={searchForm.dateTo}
                                    onChange={(event) => handleChangeSearch("dateTo", event.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>

                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2"
                            >
                                <i className="fa-solid fa-search"></i>
                                Tìm kiếm
                            </button>
                            <button
                                onClick={() => setSearchForm({
                                    input: "",
                                    status: "",
                                    type: "",
                                    dateFrom: "",
                                    dateTo: ""
                                })}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition text-sm"
                            >
                                <i className="fa-solid fa-refresh me-1"></i>
                                Xóa bộ lọc
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${select === "all" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                        }`}
                                    onClick={() => setSelect("all")}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${select === "import" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                        }`}
                                    onClick={() => setSelect("import")}
                                >
                                    Nhập hàng
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${select === "export" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                        }`}
                                    onClick={() => setSelect("export")}
                                >
                                    Xuất hàng
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="font-semibold bg-green-600 text-white hover:text-green-600 hover:bg-white hover:ring-2 hover:ring-green-600 px-4 py-2 rounded shadow cursor-pointer flex items-center text-sm transition-all"
                                    onClick={() => setIsOpenCreateImport(true)}
                                >
                                    <i className="fa-solid fa-download me-2"></i>
                                    <span>Nhập hàng</span>
                                </button>
                                <button
                                    className="font-semibold bg-red-600 text-white hover:text-red-600 hover:bg-white hover:ring-2 hover:ring-red-600 px-4 py-2 rounded shadow cursor-pointer flex items-center text-sm transition-all"
                                    onClick={() => setIsOpenCreateExport(true)}
                                >
                                    <i className="fa-solid fa-upload me-2"></i>
                                    <span>Xuất hàng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                        Hiển thị <strong>{filteredImportTickets.length + filteredExportTickets.length}</strong> / {importTickets.length + exportTickets.length} giao dịch
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-semibold">
                                    {select === "all" && "Lịch sử giao dịch"}
                                    {select === "import" && "Phiếu nhập hàng"}
                                    {select === "export" && "Phiếu xuất hàng"}
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        {select === "all" && `(${filteredImportTickets.length + filteredExportTickets.length} / ${importTickets.length + exportTickets.length} giao dịch)`}
                                        {select === "import" && `(${filteredImportTickets.length} / ${importTickets.length} phiếu nhập)`}
                                        {select === "export" && `(${filteredExportTickets.length} / ${exportTickets.length} phiếu xuất)`}
                                    </span>
                                </h4>

                            </div>
                            <div className="space-y-4">
                                {select === "all" && (
                                    <>
                                        {filteredImportTickets.length > 0 && (
                                            <div>
                                                <h5 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                                    <i className="fa-solid fa-download text-green-600 mr-2"></i>
                                                    Phiếu nhập hàng ({filteredImportTickets.length})
                                                </h5>
                                                <ImportTicketsTable importTickets={filteredImportTickets} reload={handleGetImportTicketList} />
                                            </div>
                                        )}
                                        {filteredExportTickets.length > 0 && (
                                            <div className="mt-8">
                                                <h5 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                                    <i className="fa-solid fa-upload text-red-600 mr-2"></i>
                                                    Phiếu xuất hàng ({filteredExportTickets.length})
                                                </h5>
                                                <ExportTicketsTable exportTickets={filteredExportTickets} reload={handleGetExportTicketList} />
                                            </div>
                                        )}
                                        {filteredImportTickets.length === 0 && filteredExportTickets.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                                                    <i className="fa-solid fa-box-open text-6xl"></i>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy giao dịch nào</h3>
                                                <p className="text-gray-500">Không có giao dịch nào phù hợp với bộ lọc hiện tại.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                                {select === "import" && <ImportTicketsTable importTickets={filteredImportTickets} reload={handleGetImportTicketList} />}
                                {select === "export" && <ExportTicketsTable exportTickets={filteredExportTickets} reload={handleGetExportTicketList} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpenCreateImport && (
                <AddImport
                    medicines={medicines}
                    onClose={() => setIsOpenCreateImport(false)}
                    onSuccess={handleSuccessImport}
                />
            )}

            {isOpenCreateExport && (
                <AddExport
                    medicines={medicines}
                    onClose={() => setIsOpenCreateExport(false)}
                    onSuccess={handleSuccessExport}
                />
            )}

        </main >
    )
}

export default AdminInventoryPage;
