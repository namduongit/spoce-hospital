import { useState } from "react";
import type { ImportTicketResponse } from "../../../responses/import-ticket.response";
import { formatPriceVND } from "../../../utils/formatNumber.util";
import useCallApi from "../../../hooks/useCallApi";
import { changeStatusImportTicket } from "../../../services/import-ticket.service";

type ImportTicketProps = { importTicket: ImportTicketResponse, onSuccess?: () => void };

const ImportTicket = (props: ImportTicketProps) => {
    const { importTicket, onSuccess } = props;

    const { execute, notify } = useCallApi();

    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRowExpansion = (ticketId: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(ticketId)) {
            newExpanded.delete(ticketId);
        } else {
            newExpanded.add(ticketId);
        }
        setExpandedRows(newExpanded);
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'COMPLETED': return { text: 'Hoàn thành', color: 'bg-green-100 text-green-800' };
            case 'PENDING': return { text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' };
            case 'CANCELLED': return { text: 'Đã hủy', color: 'bg-red-100 text-red-800' };
            default: return { text: status, color: 'bg-gray-100 text-gray-800' };
        }
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

    const isExpanded = expandedRows.has(importTicket.id);
    const statusDisplay = getStatusDisplay(importTicket.status);
    const totalAmount = importTicket.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const totalItems = importTicket.items.reduce((sum, item) => sum + item.quantity, 0);


    const handleChangeStatus = async (status: string) => {
        const restResponse = await execute(changeStatusImportTicket(importTicket.id, status));
        notify(restResponse!, "Cập nhật trạng thái phiếu nhập thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    }

    const handlePrintTicket = () => {
        return;
    }

    return (
        <div key={importTicket.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleRowExpansion(importTicket.id)}>
                <div className="flex">
                    <div className="flex-4 flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100">
                                    <i className="fa-solid fa-download text-green-600 text-sm"></i>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Thực hiện bởi</p>
                                <p className="font-medium text-gray-900">{importTicket.performedBy}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Nhà cung cấp</p>
                            <p className="font-medium text-gray-900 truncate">
                                {importTicket.supplierName || 'Chưa có thông tin'}
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
                            <p className="font-medium text-gray-900 text-sm">{formatDate(importTicket.createdAt)}</p>
                            <p className="text-sm font-semibold text-green-600">
                                {totalAmount.toLocaleString()}đ
                            </p>
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
                        <h4 className="font-medium text-gray-900 mb-2">Chi tiết phiếu nhập</h4>
                        <div className="text-sm">
                            <div>
                                <span className="text-gray-500">Lý do: </span>
                                <span className="text-gray-900">{importTicket.reason}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Ngày cập nhật: </span>
                                <span className="text-gray-900">{formatDate(importTicket.updatedAt)}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Nhà cung cấp: </span>
                                <span className="text-gray-900">{importTicket.supplierName || 'Chưa có thông tin'}</span>
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
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đơn giá
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {importTicket.items.map((item, index) => (
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
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            {item.unitPrice?.toLocaleString()}đ
                                        </td>
                                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                            {formatPriceVND(item.quantity * item.unitPrice)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan={4} className="px-4 py-2 text-sm font-medium text-gray-900 text-left">
                                        Tổng cộng:
                                    </td>
                                    <td className="px-4 py-2 text-sm font-bold text-gray-900">
                                        {formatPriceVND(totalAmount)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="mt-4 flex justify-end space-x-2">
                            {importTicket.status === 'PENDING' && (
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

export default ImportTicket;