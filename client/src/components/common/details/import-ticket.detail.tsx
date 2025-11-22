import type { ImportTicketResponse } from "../../../responses/import-ticket.response";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import { formatPriceVND } from "../../../utils/format-number.util";

type ImportTicketDetail = {
    importTicketSelect: ImportTicketResponse,
    setShowDetail: (showDetail: boolean) => void
}

const ImportTicketDetail = (props: ImportTicketDetail) => {
    const { importTicketSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Đang chờ';
            case 'COMPLETED': return 'Hoàn thành';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    }

    const totalItems = importTicketSelect.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const totalValue = importTicketSelect.items?.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) || 0;

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-arrow-down-to-bracket text-green-600"></i>
                        Chi tiết phiếu nhập #{importTicketSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(importTicketSelect.status)}`}>
                            {getStatusText(importTicketSelect.status)}
                        </span>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-info-circle text-blue-600"></i>
                            Thông tin phiếu nhập
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Nhà cung cấp</label>
                                <p className="text-gray-900 font-medium">{importTicketSelect.supplierName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Người thực hiện</label>
                                <p className="text-gray-900">{importTicketSelect.performedBy}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian tạo</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(importTicketSelect.createdAt))}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian cập nhật</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(importTicketSelect.updatedAt))}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-chart-bar text-green-600"></i>
                            Thống kê
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Tổng số mặt hàng</p>
                                        <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
                                    </div>
                                    <div className="text-blue-600">
                                        <i className="fa-solid fa-boxes-stacked text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Tổng giá trị</p>
                                        <p className="text-xl font-bold text-green-600">{formatPriceVND(totalValue)}</p>
                                    </div>
                                    <div className="text-green-600">
                                        <i className="fa-solid fa-dollar-sign text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-file-text text-orange-600"></i>
                            Lý do nhập
                        </h3>
                        <p className="text-gray-900">{importTicketSelect.reason}</p>
                    </div>

                    {importTicketSelect.items && importTicketSelect.items.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-pills text-purple-600"></i>
                                Danh sách thuốc nhập ({importTicketSelect.items.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b">
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">STT</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Tên thuốc</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-600">Số lượng</th>
                                            <th className="text-right py-3 px-4 font-medium text-gray-600">Đơn giá</th>
                                            <th className="text-right py-3 px-4 font-medium text-gray-600">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importTicketSelect.items.map((item, index) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4 font-medium">{item.medicineName}</td>
                                                <td className="py-3 px-4 text-center font-semibold">{item.quantity}</td>
                                                <td className="py-3 px-4 text-right">{formatPriceVND(item.unitPrice)}</td>
                                                <td className="py-3 px-4 text-right font-semibold text-green-600">
                                                    {formatPriceVND(item.unitPrice * item.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="border-t-2 border-gray-300 bg-gray-50">
                                            <td colSpan={4} className="py-3 px-4 text-right font-bold">Tổng cộng:</td>
                                            <td className="py-3 px-4 text-right font-bold text-green-600 text-lg">
                                                {formatPriceVND(totalValue)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setShowDetail(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImportTicketDetail;
