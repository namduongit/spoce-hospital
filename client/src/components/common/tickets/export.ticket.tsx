import { useState } from "react";
import type { ExportTicketResponse } from "../../../responses/export-ticket.response";
import useCallApi from "../../../hooks/useCallApi";
import { changeStatusExportTicket } from "../../../services/export-ticket.service";

type ExportTicketProps = { exportTicket: ExportTicketResponse, onSuccess?: () => void };

const ExportTicket = (props: ExportTicketProps) => {
    const { exportTicket, onSuccess } = props;
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const { execute, notify } = useCallApi();

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'COMPLETED': return { text: 'Hoàn thành', color: 'bg-green-100 text-green-800' };
            case 'PENDING': return { text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' };
            case 'CANCELLED': return { text: 'Đã hủy', color: 'bg-red-100 text-red-800' };
            default: return { text: status, color: 'bg-gray-100 text-gray-800' };
        }
    };

    const toggleRowExpansion = (ticketId: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(ticketId)) {
            newExpanded.delete(ticketId);
        } else {
            newExpanded.add(ticketId);
        }
        setExpandedRows(newExpanded);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isExpanded = expandedRows.has(exportTicket.id);
    const statusDisplay = getStatusDisplay(exportTicket.status);
    const totalItems = exportTicket.items.reduce((sum, item) => sum + item.quantity, 0);

    const handlePrintTicket = () => {
        return;
        onSuccess?.();
    }

    const handleChangeStatus = async (status: string) => {
        const restResponse = await execute(changeStatusExportTicket(exportTicket.id, status));
        notify(restResponse!, "Cập nhật trạng thái phiếu xuất thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    }

    return (
        <div key={exportTicket.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleRowExpansion(exportTicket.id)}>
                <div className="flex">
                    <div className="flex-4 flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                                    <i className="fa-solid fa-upload text-red-600 text-sm"></i>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Thực hiện bởi</p>
                                <p className="font-medium text-gray-900">{exportTicket.performedBy}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Lý do</p>
                            <p className="font-medium text-gray-900 truncate">
                                {exportTicket.reason}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Trạng thái</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusDisplay.color}`}>
                                {statusDisplay.text}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 text-right flex justify-end items-center">
                        <div>
                            <p className="text-sm text-gray-500">Ngày tạo</p>
                            <p className="font-medium text-gray-900 text-sm">{formatDate(exportTicket.createdAt)}</p>
                            <p className="text-xs text-gray-500">
                                {totalItems} sản phẩm
                            </p>
                        </div>
                        <div className="ml-4">
                            <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400`}></i>
                        </div>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="bg-white p-4 border-t border-gray-200">
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Chi tiết phiếu xuất</h4>
                        <div className="text-sm">
                            <div>
                                <span className="text-gray-500">Lý do: </span>
                                <span className="text-gray-900">{exportTicket.reason}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Ngày cập nhật: </span>
                                <span className="text-gray-900">{formatDate(exportTicket.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mã thuốc
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thuốc
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Số lượng
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {exportTicket.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            {item.medicineId}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            {item.medicineName}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            {item.quantity.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900" colSpan={2}>Tổng cộng</td>
                                    <td className="px-4 py-2 text-sm font-bold text-gray-900">
                                        {totalItems.toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                        <div className="mt-4 flex justify-end space-x-2">
                            {exportTicket.status === 'PENDING' && (
                                <>
                                    <button className="bg-blue-600 text-white px-4 py-2.5 rounded font-bold transition"
                                        onClick={() => handleChangeStatus('COMPLETED')}
                                    >Xác nhận</button>
                                    <button className="bg-red-600 text-white px-4 py-2.5 rounded font-bold transition">Xóa phiếu</button>
                                </>
                            )}
                            <button
                                className="bg-green-600 text-white px-4 py-2.5 rounded font-bold transition gap-2 flex items-center hover:bg-green-700"
                                onClick={handlePrintTicket}
                            >
                                <i className="fa-solid fa-print"></i>
                                <span>In phiếu</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default ExportTicket;